import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // Type assertion to bypass the clientSecret requirement
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      tenantId: process.env.AZURE_AD_TENANT_ID || '',
      authorization: {
        params: {
          scope: process.env.AZURE_AD_SCOPES || 'openid profile email',
          code_challenge_method: 'S256',
        },
      },
      checks: ['pkce', 'state'],
    } as any), // <--- Add `as any` to bypass the type error
  ],
  debug: true,
});

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

// import NextAuth, { Session, User } from 'next-auth';
// import { JWT } from 'next-auth/jwt';
// import AzureADProvider from 'next-auth/providers/azure-ad';

// export default NextAuth({
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID || '',
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
//       tenantId: process.env.AZURE_AD_TENANT_ID,
//       authorization: {
//         params: {
//           scopes: process.env.AZURE_AD_SCOPES,
//         },
//       },
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
