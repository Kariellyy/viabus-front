import { checkUser } from "@/services/user/checkUser";
import { createUser } from "@/services/user/createUser";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account }) {
      let role = ""; // Variável para armazenar o role
      try {
        // Verifica se o usuário já existe no back-end
        const response = await checkUser(account?.id_token!);
        if (response.ok) {
          console.log("Usuário já existe no back-end");
          role = response.data.role; // Armazena o role do usuário
        } else {
          // Cria o usuário no back-end
          const createResponse = await createUser(account?.id_token!);
          if (createResponse.ok) {
            console.log("Usuário criado no back-end");
            role = createResponse.data.role; // Armazena o role após criação
          } else {
            console.error("Erro ao criar ou autenticar o usuário no back-end");
            return false;
          }
        }
        // Adiciona o role ao objeto `account`
        if (account) {
          account.role = role;
        }
        return true;
      } catch (error) {
        console.error(
          "Erro ao criar ou autenticar o usuário no back-end",
          error
        );
        return false;
      }
    },

    async jwt({ token, account }) {
      // Na primeira vez que o usuário faz login, `account` estará presente
      if (account) {
        token.jwt = account.id_token; // Adiciona o token JWT
        token.role = account.role; // Adiciona o role ao token JWT
      }

      return token;
    },

    async session({ session, token }) {
      session.jwt = token.jwt as string;
      session.user.role = token.role; // Adiciona o role à sessão
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/",
  },
};
