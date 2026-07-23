// Phase 2 (content-depth-v2 branch) -- Solutions page "Values" section
// content: the Apple "Designed to make a difference" style overview block
// (eyebrow -> headline -> body -> 3 columns).
//
// Safe to run any time: .patch('servicesPage').set() (merge) -- only
// touches the new valuesEyebrow/valuesHeadline/valuesBody/valuesColumns
// fields. Does not touch introText or featuredSolutions.
//
// Run from a machine with normal internet access (api.sanity.io is outside
// this build sandbox's network allowlist):
//
//   cd nova-impact-energy
//   git checkout -- package-lock.json && git pull origin content-depth-v2
//   npm install
//   SANITY_API_TOKEN=<a token with write access> node scripts/phase2-task-solutions-values.mjs

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
  return `values-k${keyCounter}`;
}

async function run() {
  console.log(`Applying Solutions page Values section content to ${projectId}/${dataset} ...`);

  await client
    .patch('servicesPage')
    .set({
      valuesHeadline: "Building Africa's Energy Ecosystem.",
      valuesBody:
        "We're creating the technology, partnerships, engineering expertise and professional capabilities that make renewable energy easier to deploy, manage and scale. From technical advisory and OEM partnerships to digital platforms, training and intelligent asset management, we're building solutions designed for long-term impact.",
      valuesColumns: [
        {
          _key: key(),
          leadIn: 'Engineering & Capacity Building:',
          bodyText:
            'Independent technical expertise, practical training and professional support that help businesses, engineers and installers design, deploy and optimize reliable renewable energy systems.',
          linkLabel: 'Explore our services →',
          linkHref: '/solutions',
        },
        {
          _key: key(),
          leadIn: 'Strategic Partnerships:',
          bodyText:
            'Connecting global manufacturers, project developers, investors and institutions to accelerate renewable energy adoption across Nigeria and West Africa.',
          linkLabel: 'Explore partnerships →',
          linkHref: '/solutions#oem',
        },
        {
          _key: key(),
          leadIn: 'Digital Innovation:',
          bodyText: 'Building intelligent platforms for monitoring, asset management, reporting and the future of connected clean energy.',
          linkLabel: 'Discover our platform →',
          linkHref: '/#ecosystem',
        },
      ],
    })
    .commit();
  console.log('  servicesPage.valuesHeadline / valuesBody / valuesColumns updated');

  console.log('');
  console.log('Done. introText and featuredSolutions were not touched.');
}

run().catch((err) => {
  console.error('Solutions Values content update failed:', err);
  process.exit(1);
});
