import NextAuth, { SessionStrategy } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

const auth0Options = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_DOMAIN as string,
      authorization: {
        url: process.env.NEXT_PUBLIC_APP_URL,
        params: {
          prompt: 'login',
          audience: process.env.AUTH0_ISSUER,
          redirect_uri:
            process.env.NEXT_PUBLIC_APP_URL + '/api/auth/callback/auth0',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
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
      return session;
    },
  },
};

const handler = NextAuth(auth0Options);

export { handler as GET, handler as POST };
