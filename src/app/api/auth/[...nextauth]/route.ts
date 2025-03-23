import NextAuth, { SessionStrategy, NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

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

      // Busca informações do usuário no back-end
      if (token.accessToken) {
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

          if (response.ok) {
            const userData = await response.json();
            console.log(
              "Session Callback - Dados do usuário recebidos:",
              userData
            );
            session.user = userData.user;
            session.companies = userData.companies;
            session.currentCompany = userData.companies[0] || null;
            console.log(
              "Session Callback - Sessão atualizada com dados do usuário"
            );
          } else {
            console.error(
              "Erro ao buscar dados do usuário:",
              await response.text()
            );
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      } else {
        console.warn(
          "Token de acesso não disponível para buscar dados do usuário"
        );
      }
      console.log("Session Callback - Sessão final:", session);
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
