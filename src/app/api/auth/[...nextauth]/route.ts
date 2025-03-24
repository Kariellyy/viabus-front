import NextAuth, { SessionStrategy, NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

// Cache para evitar múltiplas chamadas à API durante recarregamentos
let userDataCache: {
  [key: string]: {
    data: any;
    timestamp: number;
  };
} = {};

// 5 minutos de cache
const CACHE_TTL = 5 * 60 * 1000;
// Tempo de cooldown após erros de rate limit (10 segundos)
const RATE_LIMIT_COOLDOWN = 10000;
// Mapeia tokens para timestamps de erros de rate limit
const rateLimitErrors: { [token: string]: number } = {};

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_DOMAIN as string,
      authorization: {
        params: {
          prompt: "login",
          audience: process.env.AUTH0_ISSUER,
          redirect_uri:
            process.env.NEXT_PUBLIC_APP_URL + "/api/auth/callback/auth0",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as SessionStrategy,
    // Aumentado para 24h para reduzir necessidade de reautenticação
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        console.log("JWT Callback - Token atualizado com access_token");
      }
      return token;
    },
    async session({ session, token }: any) {
      console.log("Session Callback - Iniciando processamento da sessão");
      session.accessToken = token.accessToken;
      console.log("Session Callback - Access token adicionado à sessão");

      // Verifica se temos um token
      if (!token.accessToken) {
        console.warn(
          "Token de acesso não disponível para buscar dados do usuário"
        );
        return session;
      }

      // Gera uma chave única para o cache baseada no token
      const cacheKey = token.sub || token.accessToken;

      // Verifica se estamos em período de cooldown após rate limit para este token
      const now = Date.now();
      if (
        rateLimitErrors[cacheKey] &&
        now - rateLimitErrors[cacheKey] < RATE_LIMIT_COOLDOWN
      ) {
        console.warn(
          "Em cooldown após erro de rate limit. Usando dados em cache se disponíveis."
        );
        if (userDataCache[cacheKey] && userDataCache[cacheKey].data) {
          // Use os dados em cache, mas não atualize o timestamp para manter o cache fresco
          const cachedData = userDataCache[cacheKey].data;
          session.user = cachedData.user;
          session.companies = cachedData.companies || [];
          session.currentCompany = cachedData.currentCompany;
          console.log(
            "Session Callback - Usando dados de usuário em cache durante cooldown"
          );
          return session;
        }
        // Se não temos cache, continuamos mesmo em cooldown, mas com cautela
      }

      // Verifica se temos dados em cache e se eles são válidos
      if (
        userDataCache[cacheKey] &&
        now - userDataCache[cacheKey].timestamp < CACHE_TTL
      ) {
        const cachedData = userDataCache[cacheKey].data;
        session.user = cachedData.user;
        session.companies = cachedData.companies || [];
        session.currentCompany = cachedData.currentCompany;
        console.log("Session Callback - Usando dados de usuário em cache");
        return session;
      }

      // Se não temos cache válido, buscamos do backend
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log(
          "Session Callback - Buscando dados do usuário na API:",
          apiUrl
        );

        // Enviar o token para nossa API para validação e obtenção dos dados do usuário
        const response = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token.accessToken }),
        });

        // Se recebemos erro 429 (Rate Limiting), registramos o timestamp e usamos cache se disponível
        if (response.status === 429) {
          console.error("Erro de rate limit (429) ao buscar dados do usuário");
          rateLimitErrors[cacheKey] = now;

          if (userDataCache[cacheKey] && userDataCache[cacheKey].data) {
            const cachedData = userDataCache[cacheKey].data;
            session.user = cachedData.user;
            session.companies = cachedData.companies || [];
            session.currentCompany = cachedData.currentCompany;
            console.log(
              "Session Callback - Usando dados de usuário em cache após erro 429"
            );
            return session;
          }
          // Se não temos cache, continuamos com o que temos na sessão atual
          console.warn(
            "Sem cache disponível após erro 429. Mantendo sessão atual."
          );
          return session;
        }

        if (response.ok) {
          const userData = await response.json();
          console.log(
            "Session Callback - Dados do usuário recebidos:",
            userData
          );

          // Remover qualquer registro de erro de rate limit para este token
          delete rateLimitErrors[cacheKey];

          // Prepara os dados que serão armazenados em cache
          const dataToCache = {
            user: userData.user,
            companies: userData.companies || [],
            currentCompany: null,
          };

          // Atribui os dados do usuário à sessão
          session.user = userData.user;

          // Garante que temos a lista de empresas
          const companies = userData.companies || [];
          session.companies = companies;

          // Tenta usar a primeira empresa disponível para currentCompany
          if (companies.length > 0) {
            dataToCache.currentCompany = companies[0];
            session.currentCompany = companies[0];
            console.log(
              "Session Callback - Definindo empresa atual:",
              companies[0]
            );
          } else {
            console.warn("Session Callback - Usuário sem empresas!");
          }

          // Armazena os dados em cache
          userDataCache[cacheKey] = {
            data: dataToCache,
            timestamp: now,
          };

          console.log(
            "Session Callback - Sessão atualizada com dados do usuário"
          );
        } else {
          console.error(
            "Erro ao buscar dados do usuário:",
            await response.text()
          );

          // Se temos cache mesmo vencido, usamos em caso de erro
          if (userDataCache[cacheKey] && userDataCache[cacheKey].data) {
            const cachedData = userDataCache[cacheKey].data;
            session.user = cachedData.user;
            session.companies = cachedData.companies || [];
            session.currentCompany = cachedData.currentCompany;
            console.log(
              "Session Callback - Usando dados de usuário em cache após erro"
            );
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);

        // Se temos cache mesmo vencido, usamos em caso de erro
        if (userDataCache[cacheKey] && userDataCache[cacheKey].data) {
          const cachedData = userDataCache[cacheKey].data;
          session.user = cachedData.user;
          session.companies = cachedData.companies || [];
          session.currentCompany = cachedData.currentCompany;
          console.log(
            "Session Callback - Usando dados de usuário em cache após exceção"
          );
        }
      }

      console.log("Session Callback - Sessão final:", session);
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
