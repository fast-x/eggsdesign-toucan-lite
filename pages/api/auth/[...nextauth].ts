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
  callbacks: {
    async session({ session, token }) {
      console.log('Session:', session);
      console.log('Token:', token);
      return session;
    },
    async jwt({ token, user }) {
      console.log('JWT Token:', token);
      return token;
    },
  },
});
