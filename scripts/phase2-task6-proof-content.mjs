// Phase 2 (content-depth-v2 branch) -- Task 6 content: expand each Project
// into a full case study, per Ecosystem Review Section 3.
//
// Safe to run any time: .patch().set() (merge) on the 4 existing Project
// documents -- touches only problem/technicalApproach/results, all three
// new or previously-empty fields. Does NOT touch images, title, location,
// or anything else -- including anything uploaded directly in Studio.
//
// Run from a machine with normal internet access (api.sanity.io is outside
// this build sandbox's network allowlist):
//
//   cd nova-impact-energy
//   npm install
//   SANITY_API_TOKEN=<a token with write access> node scripts/phase2-task6-proof-content.mjs
//
// Honesty note: no client quotes or additional per-project photography were
// supplied for this phase (the content package had general suggested photo
// *categories* and company-wide quotes, not project-specific ones) -- so
// `testimonial` is deliberately left untouched on all 4 projects rather than
// inventing one. Add real testimonials directly in Studio once you have
// them; the Proof page already renders that block conditionally and will
// pick it up automatically. Every problem/technicalApproach/results
// sentence below is built only from facts already established in the
// existing scope/capacityKw/storageKwh/relatedSolutions fields -- nothing
// new is invented.

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

const projectUpdates = [
  {
    id: 'project-prj-001',
    label: 'PRJ-001 -- bank branch, Lagos',
    patch: {
      problem:
        'A commercial bank branch in Lagos needed dependable, high-capacity backup power -- grid instability and diesel generator costs were driving up operating expense, and downtime risked disrupting day-to-day banking operations.',
      technicalApproach:
        'We designed and installed a 150kW hybrid inverter system paired with a 250kWh high-voltage lithium battery bank and 120 x 560W PV modules -- sized for continuous commercial load, not just backup -- and delivered on-site technical training so facility staff could operate and maintain the system directly.',
      results:
        "Our largest commercial deployment to date: a fully operational hybrid power system reducing the branch's dependence on grid power and diesel generation, with facility staff trained to manage it day to day.",
    },
  },
  {
    id: 'project-prj-002',
    label: 'PRJ-002 -- residential, Mowe',
    patch: {
      problem:
        'A household in Mowe, Ogun State needed reliable everyday power without relying on grid supply or a diesel generator for daily use.',
      technicalApproach:
        'A 6.5kW inverter paired with a 5kWh lithium-ion battery and 6 PV modules -- sized for consistent daily household load rather than emergency backup alone.',
      results: 'Everyday reliability for the household, with solar and storage covering routine daily use.',
    },
  },
  {
    id: 'project-prj-003',
    label: 'PRJ-003 -- residential, Lekki',
    patch: {
      problem: 'A household in Lekki, Lagos wanted a full home solar and storage system rather than a partial backup solution.',
      technicalApproach:
        "A 6.5kW inverter, 5kWh lithium-ion battery, and 10 PV modules -- more panel capacity than the Mowe residential system, sized for the property's full home solar and storage needs.",
      results: 'A complete home solar and storage system, installed and operational.',
    },
  },
  {
    id: 'project-prj-004',
    label: 'PRJ-004 -- bank branch, solar system design',
    patch: {
      problem:
        'A bank branch needed a complete, installation-ready solar system design -- specified correctly before any equipment was ordered or installed.',
      technicalApproach:
        'We produced the complete solar power system design in AutoCAD, from layout to full technical specification, ready to hand to an installation team.',
      results:
        'A complete, installation-ready design -- delivered as part of our OEM technical representation work, and validating the technical representation capability described on the OEM solution.',
    },
  },
];

async function run() {
  console.log(`Applying Phase 2 Task 6 content to ${projectId}/${dataset} ...`);

  for (const { id, label, patch } of projectUpdates) {
    await client.patch(id).set(patch).commit();
    console.log(`  ${label} updated: problem, technicalApproach, results`);
  }

  console.log('');
  console.log('Done. testimonial left untouched on all 4 (none supplied yet -- add directly in');
  console.log('Studio once available). Images and every other field were not touched.');
}

run().catch((err) => {
  console.error('Phase 2 Task 6 content update failed:', err);
  process.exit(1);
});
