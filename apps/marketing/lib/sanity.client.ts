import { createClient } from 'next-sanity';

/**
 * Single Sanity client for the marketing site. Reads-only (no token needed
 * for published content on a public dataset); pass useCdn: false while
 * iterating so edits show up immediately.
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3dg6yd6t',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
});
