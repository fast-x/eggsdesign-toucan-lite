// export default NextAuth({
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     AzureADProvider({
//       clientId: '7374dd2c-04bd-47bc-b685-90db430810a1',
//       tenantId: '8b87af7d-8647-4dc7-8df4-5f69a2011bb5',
//       authorization: {
//         params: {
//           scope: 'api://7374dd2c-04bd-47bc-b685-90db430810a1/Read',
//         },
//       },
//       checks: ['pkce', 'state'],
//     } as any),
//   ],
//   debug: true,
// });

// export default NextAuth({
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID || '',
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
//       tenantId: process.env.AZURE_AD_TENANT_ID,
//       authorization: {
//         params: {
//           scope: process.env.AZURE_AD_SCOPES || 'openid profile email',
//           response_type: 'code',
//           code_challenge_method: 'S256',
//         },
//       },
//       checks: ['pkce', 'state'],
//     }),
//   ],
//   callbacks: {
//     async jwt({ token }: { token: JWT }) {
//       return token;
//     },
//     async session({ session, user }: { session: Session; user: User }) {
//       session.user = {
//         name: user.name,
//         email: user.email,
//       };

//       return session;
//     },
//   },
//   debug: true,
// });

import NextAuth, { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import AzureADProvider from 'next-auth/providers/azure-ad';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          response_type: 'code',
          scope: process.env.AZURE_AD_SCOPES || 'openid profile email',
          code_challenge_method: 'S256',
        },
      },
      checks: ['pkce', 'state'],
    } as any),
  ],
  callbacks: {
    async jwt({ token }: { token: JWT }) {
      return token;
    },
    async session({ session, user }: { session: Session; user: User }) {
      session.user = {
        name: user.name,
        email: user.email,
      };
      return session;
    },
  },
  debug: true,
});
