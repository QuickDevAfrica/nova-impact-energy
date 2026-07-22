import { createClient } from 'next-sanity';

/**
 * Single Sanity client for the marketing site. Reads-only (no token needed
 * for published content on a public dataset).
 *
 * useCdn is hard false, not conditional on NODE_ENV. It used to be
 * `NODE_ENV === 'production'`, which is true for every Vercel deployment
 * (Preview and Production both run `next build`/`next start`, so NODE_ENV
 * is always 'production' regardless of which Vercel environment it is) --
 * meaning every deployed instance of this site read through Sanity's CDN
 * edge cache, not the live API. That CDN has its own propagation delay on
 * top of anything Studio does, independent of draft/publish state, and was
 * the actual cause of nav labels (and other content) showing stale values
 * on production well after the correct data was published in Sanity.
 * Every page here is already `dynamic = 'force-dynamic'` (no ISR, fresh
 * SSR on every request), so there's no caching benefit worth trading
 * accuracy for -- direct-to-API reads guarantee what's rendered always
 * matches what's actually published.
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3dg6yd6t',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
});
