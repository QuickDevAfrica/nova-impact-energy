// Phase 2 (content-depth-v2 branch) -- CMS changes for tasks 1-3 only.
//
// Unlike scripts/seed-content.mjs, this uses .patch().set() (merge) on
// existing documents rather than createOrReplace -- it only touches the
// specific fields listed below, so it cannot wipe the project images or
// anything else you've since added directly in Studio. The one exception
// is `proofPage`, which is brand new (created by this phase) and safe to
// createOrReplace since nothing exists there yet to lose.
//
// Run from a machine with normal internet access (api.sanity.io is outside
// this build sandbox's network allowlist):
//
//   cd nova-impact-energy
//   npm install
//   SANITY_API_TOKEN=<a token with write access> node scripts/phase2-content-depth-updates.mjs
//
// What this does:
//   1. Updates siteSettings.navLinks to About us / Solutions / Proof / Contact
//      (was About / Services / Our impact / Contact)
//   2. Updates homePage.heroCtaPrimaryHref from /impact to /proof
//   3. Creates the new proofPage singleton (headline + closing CTA) -- this
//      page's copy was previously hardcoded in the component, which the
//      Phase 2 rebuild fixed; without this document, the live /proof page
//      will throw in development / fail to render the headline in production
//      until this is run.

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

let keyCounter = 0;
function key() {
  keyCounter += 1;
  return `phase2-k${keyCounter}`;
}

async function run() {
  console.log(`Applying Phase 2 CMS updates to ${projectId}/${dataset} ...`);

  await client
    .patch('siteSettings')
    .set({
      navLinks: [
        { _key: key(), label: 'About us', href: '/about' },
        { _key: key(), label: 'Solutions', href: '/solutions' },
        { _key: key(), label: 'Proof', href: '/proof' },
        { _key: key(), label: 'Contact', href: '/contact' },
      ],
    })
    .commit();
  console.log('  siteSettings.navLinks updated');

  await client.patch('homePage').set({ heroCtaPrimaryHref: '/proof' }).commit();
  console.log('  homePage.heroCtaPrimaryHref updated to /proof');

  await client.createIfNotExists({
    _id: 'proofPage',
    _type: 'proofPage',
    headline: "What we've actually built, so far.",
    closingCtaHeadline: 'Want your project to be the next one here?',
    closingCtaButtonLabel: 'Get in touch',
    closingCtaButtonHref: '/contact',
  });
  console.log('  proofPage created (or already existed -- left untouched if so)');

  console.log('');
  console.log('Done. Existing project images and any other Studio-added content were not touched.');
}

run().catch((err) => {
  console.error('Phase 2 update failed:', err);
  process.exit(1);
});
