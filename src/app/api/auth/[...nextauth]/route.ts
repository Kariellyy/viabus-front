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
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;

      // Busca informações do usuário no back-end
      if (token.accessToken) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
            session.user = userData.user;
            session.companies = userData.companies;
            session.currentCompany = userData.companies[0] || null;
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
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
