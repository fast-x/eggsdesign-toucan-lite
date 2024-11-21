import { loadEnvConfig } from '@next/env';
import { createClient } from '@sanity/client';

// Load environment variables dynamically
const dev = process.env.NODE_ENV !== 'production';
loadEnvConfig(process.cwd(), dev, { info: () => null, error: console.error });

// Extract environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const token = process.env.SANITY_TOKEN!;

// Define Sanity client
const client = createClient({
  projectId,
  dataset,
  token,
  // useCdn: !token && process.env.NODE_ENV === 'production',
  apiVersion: '2023-11-19',
});

export default client;

// Asset URL helper function
export function sanityAssetUrl(value: { asset: { _ref: string } }, params: string): string {
  if (!value.asset?._ref) return '';

  const [, filename, size, filetype] = value.asset._ref.split('-');
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${filename}-${size}.${filetype}?${params}`;
}

// import { loadEnvConfig } from '@next/env'
// import { defineCliConfig } from 'sanity/cli'

// // const { NEXT_PUBLIC_SANITY_TOKEN, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_PROJECT_ID } = process.env;

// const client = sanityClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
//   token: process.env.SANITY_TOKEN,
// });

// export default client;

// export function sanityAssetUrl(value: { asset: { _ref: string } }, params: string): string {
//   if (!value.asset?._ref?.split('-')) return '';

//   const [, filename, size, filetype] = value.asset._ref.split('-');
//   return `https://cdn.sanity.io/images/${process.env.SANITY_PROJECT_ID}/${process.env.SANITY_DATASET}/${filename}-${size}.${filetype}?${params}`;
// }
