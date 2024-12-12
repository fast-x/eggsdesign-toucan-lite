import NextAuth, { AuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions: AuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: process.env.AZURE_AD_SCOPES!,
        },
      },
    }),
  ],
  debug: true,
};

export default NextAuth(authOptions);

// import NextAuth from 'next-auth';
// import AzureADProvider from 'next-auth/providers/azure-ad';

// export default NextAuth({
//   providers: [
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID!,
//       tenantId: process.env.AZURE_AD_TENANT_ID!,
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           scope: process.env.AZURE_AD_SCOPES,
//         },
//       },
//     } as any),
//   ],
//   debug: true,
// });
