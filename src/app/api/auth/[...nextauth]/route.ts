// import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { checkUser } from "@/services/user/checkUser";
// import { createUser } from "@/services/user/createUser";

// const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: <string>process.env.GOOGLE_CLIENT_ID,
//       clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async signIn({ account, user, profile }) {
//       try {
//         const response = await checkUser(account?.id_token!);
//         if (response.ok) {
//           console.log("Usuário já existe no back-end");
//           return true;
//         } else {
//           const response = await createUser(account?.id_token!);
//           if (response.ok) {
//             console.log("Usuário criado no back-end");
//             return true;
//           } else {
//             console.error("Erro ao criar ou autenticar o usuário no back-end");
//             return false;
//           }
//         }
//       } catch (error) {
//         console.error("Erro ao criar ou autenticar o usuário no back-end");
//         return false;
//       }
//     },

//     async jwt({ token, account }) {
//       if (account) {
//         token.jwt = account.id_token;
//       }

//       return token;
//     },

//     async session({ session, token, user }) {
//       session.jwt = token.jwt as string;

//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET!,
//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };