// Phase 2 (content-depth-v2 branch) -- Proof page hero + closing CTA
// content rework. Replaces the numeric-stat hero and "Get in touch"
// closing CTA with new qualitative copy (explicit instruction).
//
// Safe to run any time: .patch('proofPage').set() (merge) -- only touches
// the fields listed below. Does not touch anything project-related.
//
// Run from a machine with normal internet access (api.sanity.io is outside
// this build sandbox's network allowlist):
//
//   cd nova-impact-energy
//   git checkout -- package-lock.json && git pull origin content-depth-v2
//   npm install
//   SANITY_API_TOKEN=<a token with write access> node scripts/phase2-proof-hero-cta-content.mjs

import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID || '3dg6yd6t';
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('Missing SANITY_API_TOKEN. Set it to a token with write access, then re-run.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function run() {
  console.log(`Applying Proof page hero + closing CTA content to ${projectId}/${dataset} ...`);

  await client
    .patch('proofPage')
    .set({
      headline: 'Designed for performance. Built for the real world.',
      bodyText:
        'We believe the best proof of our work is how it performs over time. Every project is approached with the same focus on engineering quality, reliable technology, and solutions that create lasting value for our clients.',
      growingLine: 'Our portfolio is growing, one carefully delivered project at a time.',
      closingCtaHeadline: 'Your project could be next.',
      closingCtaSubtext: "We'd love to help bring it to life.",
      closingCtaButtonLabel: 'Explore our solutions →',
      closingCtaButtonHref: '/solutions',
    })
    .commit();
  console.log('  proofPage headline/bodyText/growingLine/closingCta* updated');

  console.log('');
  console.log('Done. No project documents were touched.');
}

run().catch((err) => {
  console.error('Proof page hero/CTA content update failed:', err);
  process.exit(1);
});
