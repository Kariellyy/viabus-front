import { checkUser } from "@/services/user/checkUser";
import { createUser } from "@/services/user/createUser";
import IResponse from "@/types/response";
import { User } from "@/types/user";
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
      let role; // Variável para armazenar o role
      try {
        // Verifica se o usuário já existe no back-end
        const response = (await checkUser(account?.id_token!)) as IResponse;
        console.log(response);
        if (response.success) {
          console.log("Usuário já existe no back-end");
          let data = response.data as User;
          role = data.role;
        } else {
          // Cria o usuário no back-end
          const createResponse = (await createUser(
            account?.id_token!
          )) as IResponse;
          if (createResponse.success) {
            console.log("Usuário criado no back-end");
            let data = createResponse.data as User;
            console.log(data);
            role = data.role;
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
