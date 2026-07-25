// Phase 2 (content-depth-v2 branch) -- adds the office address to
// siteSettings so it shows up in the Footer (every page) and on the
// Contact page.
//
// Safe to run any time: .patch('siteSettings').set() (merge) -- only
// touches officeAddress.
//
// Run from a machine with normal internet access (api.sanity.io is outside
// this build sandbox's network allowlist):
//
//   cd nova-impact-energy
//   git checkout -- package-lock.json && git pull origin content-depth-v2
//   npm install
//   SANITY_API_TOKEN=<a token with write access> node scripts/phase2-office-address-content.mjs

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
  console.log(`Applying office address to ${projectId}/${dataset} ...`);

  await client
    .patch('siteSettings')
    .set({
      officeAddress: 'Suite 16B Salamah Plaza, 8/10 Ogunlana Street, Egbeda B/S, Lagos, Nigeria',
    })
    .commit();

  console.log('  siteSettings updated: officeAddress');
  console.log('');
  console.log('Done.');
}

run().catch((err) => {
  console.error('Office address content update failed:', err);
  process.exit(1);
});
