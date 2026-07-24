// Phase 2 (content-depth-v2 branch) -- Contact page content-standard
// refresh: eyebrow label + tightened body copy. Layout and the form itself
// are untouched.
//
// Safe to run any time: .patch('contactPage').set() (merge) -- only
// touches label/headline/bodyText. formOptions is not touched.
//
// Run from a machine with normal internet access (api.sanity.io is outside
// this build sandbox's network allowlist):
//
//   cd nova-impact-energy
//   git checkout -- package-lock.json && git pull origin content-depth-v2
//   npm install
//   SANITY_API_TOKEN=<a token with write access> node scripts/phase2-contact-redesign-content.mjs

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
  console.log(`Applying Contact page redesign content to ${projectId}/${dataset} ...`);

  await client
    .patch('contactPage')
    .set({
      label: 'CONTACT',
      headline: "Let's talk.",
      bodyText: "Manufacturer, installer or project developer -- we're ready to help. Tell us what you're building and we'll get back to you quickly.",
    })
    .commit();
  console.log('  contactPage updated: label, headline, bodyText');

  console.log('');
  console.log('Done. formOptions was not touched.');
}

run().catch((err) => {
  console.error('Contact page redesign content update failed:', err);
  process.exit(1);
});
