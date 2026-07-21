// Phase 2 (content-depth-v2 branch) -- Task 4 content: deepen Home + About
// per Ecosystem Review Section 3, using the market research / founder story /
// ENOVA material supplied for this phase.
//
// Safe to run any time: uses .patch().set() (merge) on homePage/aboutPage --
// touches only the fields listed below -- and .createIfNotExists() for the
// 7 Platform documents, which don't exist in Sanity yet. Nothing here can
// wipe project images or any other Studio-added content.
//
// Run from a machine with normal internet access (api.sanity.io is outside
// this build sandbox's network allowlist):
//
//   cd nova-impact-energy
//   npm install
//   SANITY_API_TOKEN=<a token with write access> node scripts/phase2-task4-home-about-content.mjs
//
// What this does:
//   1. Creates 7 Platform documents (PLT-001..006, the six Content OS starting
//      records, none of which existed in Sanity before this phase -- plus
//      PLT-007 "ENOVA", the umbrella platform name per this phase's decision)
//   2. Patches homePage: whyNow* fields, proofPreview* fields, and sets
//      featuredPlatforms to reference all 7 Platform docs (Ecosystem section)
//   3. Patches aboutPage: founderStory* fields (verbatim text supplied) and
//      howWeWork* fields

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
  return `t4-k${keyCounter}`;
}

function block(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    children: [{ _type: 'span', _key: key(), text }],
  };
}

// ---------- Platforms (Content OS Core Object 4 -- none seeded before now) ----------

const platforms = [
  {
    _id: 'platform-plt-001',
    _type: 'platform',
    nucid: 'PLT-001',
    name: 'Installer App',
    purpose:
      'A mobile app for installers certified through our Training & Installer Academy -- course access, certification tracking, and job assignment in one place, so certification stays current and verifiable long after the training itself ends.',
    users: 'Certified installers',
    features: ['Course access', 'Certification tracking', 'Job assignment'],
    roadmap: 'Builds once Training (SOL-001) has enough certified installers to justify its own app rather than a page.',
    status: 'planned',
  },
  {
    _id: 'platform-plt-002',
    _type: 'platform',
    nucid: 'PLT-002',
    name: 'Monitoring Platform',
    purpose:
      'Remote monitoring and diagnostics for deployed solar and storage systems -- asset performance, preventive maintenance alerts, and performance analytics in one dashboard, instead of a separate app per equipment brand.',
    users: 'Facility managers and system owners',
    features: ['Asset monitoring', 'Remote diagnostics', 'Preventive maintenance', 'Performance analytics'],
    roadmap: 'The first piece of ENOVA to actually ship, once real deployed-system data exists to monitor.',
    status: 'planned',
  },
  {
    _id: 'platform-plt-003',
    _type: 'platform',
    nucid: 'PLT-003',
    name: 'OEM Portal',
    purpose:
      'A dedicated portal for the manufacturers we represent -- warranty claims, technical resources, and installer certification status, so OEM partnerships stay transparent and easy to manage on both sides.',
    users: 'OEM partners and their installer networks',
    features: ['Warranty claims', 'Technical resources', 'Installer certification status'],
    roadmap: 'Builds once the first formal OEM partnership record exists.',
    status: 'planned',
  },
  {
    _id: 'platform-plt-004',
    _type: 'platform',
    nucid: 'PLT-004',
    name: 'Carbon Platform',
    purpose:
      'Carbon accounting and ESG reporting tied directly to the systems we deploy or monitor -- turning verified energy data into the sustainability reporting our commercial and development partners increasingly need.',
    users: 'Sustainability and ESG teams at commercial clients',
    features: ['Carbon accounting', 'ESG reporting', 'Verified energy data'],
    roadmap: 'Builds once the Monitoring Platform has enough real data flowing through it to report on.',
    status: 'planned',
  },
  {
    _id: 'platform-plt-005',
    _type: 'platform',
    nucid: 'PLT-005',
    name: 'Battery Swap Software',
    purpose:
      "Software to manage battery swap operations as electric mobility grows in Nigeria -- tracking battery health, swap station activity, and asset utilization.",
    users: 'Fleet operators and mobility partners',
    features: ['Battery health tracking', 'Swap station activity', 'Asset utilization'],
    roadmap: 'Builds once Electric Mobility (SOL-005) becomes real -- explicitly out of scope to build today.',
    status: 'planned',
  },
  {
    _id: 'platform-plt-006',
    _type: 'platform',
    nucid: 'PLT-006',
    name: 'EV Charging Software',
    purpose:
      'Management software for EV charging infrastructure -- session billing, station uptime, and integration with the broader energy systems we already monitor.',
    users: 'Fleet operators and mobility partners',
    features: ['Session billing', 'Station uptime', 'Energy system integration'],
    roadmap: 'Builds once Electric Mobility (SOL-005) becomes real -- explicitly out of scope to build today.',
    status: 'planned',
  },
  {
    _id: 'platform-plt-007',
    _type: 'platform',
    nucid: 'PLT-007',
    name: 'ENOVA',
    purpose:
      'ENOVA is the connected system the platforms above will eventually run on -- one place for asset monitoring, diagnostics, warranty management, installer and customer portals, and carbon reporting, instead of a separate disconnected app per equipment brand. Future releases are expected to extend it to EV charging, battery swap management, and predictive maintenance.',
    users: 'Everyone above, eventually',
    features: [
      'Asset monitoring',
      'Remote diagnostics',
      'Preventive maintenance',
      'Warranty management',
      'Installer management',
      'Customer portals',
      'Technical support',
      'Performance analytics',
      'Carbon reporting',
      'Energy intelligence',
    ],
    roadmap:
      'Monitoring and diagnostics first, extending over time into installer/customer portals and carbon reporting, and eventually electric mobility management -- as each underlying platform moves from planned to live.',
    status: 'planned',
  },
];

// ---------- Home page additions ----------

const homePagePatch = {
  whyNowHeadline: "Nigeria's energy transition is already underway.",
  whyNowBody: [
    block(
      "Nigeria is experiencing one of the fastest shifts toward decentralized renewable energy in Africa. Grid instability, rising electricity tariffs, and the cost of diesel have pushed businesses and households toward solar and storage -- and government programmes like the Rural Electrification Agency's DARES initiative, alongside development partners such as All On, GIZ, the World Bank, IFC, and AfDB, continue to accelerate that investment."
    ),
    block(
      "Equipment supply has grown fast, led largely by manufacturers out of China. What hasn't kept pace is the ecosystem around that equipment -- qualified installers, after-sales support, and coordination between manufacturers, financiers, and the people actually using the systems. That gap, not a shortage of hardware, is where Nova Impact Energy works."
    ),
  ],
  proofPreviewHeadline: 'See it in the field.',
  proofPreviewBody:
    'Four real projects, from a 150kW commercial hybrid system in Lagos to home solar installs across Lagos and Ogun State -- with the technical detail behind each one.',
  proofPreviewButtonLabel: 'See the proof',
  proofPreviewButtonHref: '/proof',
  featuredPlatforms: platforms.map((p) => ({ _type: 'reference', _ref: p._id, _key: key() })),
};

// ---------- About page additions ----------

const aboutPagePatch = {
  founderStoryHeadline: 'Why Nova Impact Energy exists',
  founderStoryBody: [
    block(
      'Nova Impact Energy Limited was founded on the belief that Nigeria does not simply need more solar companies -- it needs a stronger, more connected renewable energy ecosystem.'
    ),
    block(
      'As renewable energy adoption continues to grow across the country, significant gaps remain in technical support, after-sales service, digital monitoring, professional training, asset management, and collaboration between manufacturers, developers, financiers, government institutions, and end users. Recognizing these challenges created an opportunity to build a different kind of company -- one focused not only on deploying renewable energy solutions, but on strengthening the ecosystem that enables them to succeed.'
    ),
    block(
      "Established to accelerate Africa's clean energy transition, Nova Impact Energy combines engineering expertise, technology, strategic partnerships, and digital innovation to deliver practical, scalable, and sustainable energy solutions. The company is committed to helping businesses, communities, governments, and development partners improve energy reliability, optimize asset performance, build technical capacity, and unlock new opportunities through clean energy."
    ),
    block(
      "By focusing on innovation, collaboration, and long-term impact, Nova Impact Energy is building the infrastructure, services, and digital platforms that will support the next generation of Africa's renewable energy economy."
    ),
  ],
  howWeWorkHeadline: 'How we work',
  howWeWorkBody: [
    block(
      "Before we commit to a solution, we study the market it's meant to serve. Across training, OEM representation, and the platforms on our roadmap, we start with the same question: what does Nigeria's renewable energy ecosystem actually need right now, not what looks impressive on paper."
    ),
    block(
      "That discipline shapes how we're building ENOVA, our connected monitoring and asset-management platform, in stages rather than all at once -- guided by what the market and our own field experience tell us is genuinely needed first, rather than by what's technically possible to ship soonest."
    ),
  ],
};

async function run() {
  console.log(`Applying Phase 2 Task 4 content to ${projectId}/${dataset} ...`);

  for (const platform of platforms) {
    await client.createIfNotExists(platform);
    console.log(`  Platform ${platform.nucid} (${platform.name}) ensured`);
  }

  await client.patch('homePage').set(homePagePatch).commit();
  console.log('  homePage updated: whyNow*, proofPreview*, featuredPlatforms (all 7)');

  await client.patch('aboutPage').set(aboutPagePatch).commit();
  console.log('  aboutPage updated: founderStory*, howWeWork*');

  console.log('');
  console.log('Done. Existing project images, solutions, and any other Studio-added content were not touched.');
}

run().catch((err) => {
  console.error('Phase 2 Task 4 content update failed:', err);
  process.exit(1);
});
