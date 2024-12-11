import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scopes: process.env.AZURE_AD_SCOPES,
        },
      },
    }),
  ],

  debug: true,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: process.env.NODE_ENV === 'production', // Disable in development
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Consider 'none' if your site involves cross-site requests
        path: '/',
      },
    },
  },

  callbacks: {
    async session({ session, token }) {
      console.log('TEST 22 ...authnext ]Session details:', { session, token });
      return session;
    },
    async jwt({ token, user }) {
      console.log('JWT Token:', token);
      return token;
    },
  },
});
