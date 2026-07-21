// Phase 4 -- populate real V1 content into Sanity.
//
// Every value below is copied verbatim from the Master Build Brief /
// Content OS documents (Section 3 page copy, Section 1 solution/capability/
// project records) -- nothing here is invented. The one exception is
// PRJ-004's `location` field: the source documents never specify a city for
// the AutoCAD design project, so this script uses the honest, non-invented
// value "Nigeria" rather than guessing a location. Correct it in the Studio
// if you know the real one.
//
// This script cannot be run from the build sandbox (api.sanity.io is
// outside its network allowlist) -- run it yourself:
//
//   cd nova-impact-energy
//   npm install
//   SANITY_API_TOKEN=<your token> node scripts/seed-content.mjs
//
// It is idempotent in the sense that every document has a fixed _id, so
// re-running it never creates duplicates -- but createOrReplace REPLACES
// the whole document. Do not re-run this after uploading real photos or
// any other content directly in Studio (project images, for instance) --
// anything added in Studio that isn't a field in this file will be wiped.
// For phase-2-style incremental CMS changes, write/use a small script that
// .patch(id).set({...}) the specific changed fields instead -- see
// scripts/phase2-content-depth-updates.mjs for an example of that pattern.

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
  return `k${keyCounter}`;
}

function block(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    children: [{ _type: 'span', _key: key(), text }],
  };
}

// ---------- Capabilities (Content OS Section 1, Core Object 2) ----------

const capabilities = [
  {
    _id: 'capability-cap-001',
    _type: 'capability',
    nucid: 'CAP-001',
    name: 'Installer training & certification',
    description:
      'Training and certifying solar and EV installers to REA- and NEMSA-aligned standards.',
    status: 'active',
  },
  {
    _id: 'capability-cap-002',
    _type: 'capability',
    nucid: 'CAP-002',
    name: 'OEM enablement',
    description:
      'Local technical support, training, and warranty administration for international manufacturers entering Nigeria.',
    status: 'active',
  },
  {
    _id: 'capability-cap-003',
    _type: 'capability',
    nucid: 'CAP-003',
    name: 'Technical consulting & engineering',
    description: 'Technical consulting and engineering support across solar and energy storage projects.',
    status: 'active',
  },
  {
    _id: 'capability-cap-004',
    _type: 'capability',
    nucid: 'CAP-004',
    name: 'Energy system design',
    description: 'Designing energy systems -- from component specification to full system layout.',
    status: 'active',
  },
  {
    _id: 'capability-cap-005',
    _type: 'capability',
    nucid: 'CAP-005',
    name: 'Monitoring & diagnostics',
    description: 'Remote monitoring and diagnostics for deployed energy systems.',
    status: 'latent',
  },
  {
    _id: 'capability-cap-006',
    _type: 'capability',
    nucid: 'CAP-006',
    name: 'Carbon & ESG intelligence',
    description: 'Carbon accounting and ESG reporting intelligence tied to deployed systems.',
    status: 'latent',
  },
];

// ---------- Industries (only the two real projects actually use) ----------

const industries = [
  {
    _id: 'industry-ind-001',
    _type: 'industry',
    nucid: 'IND-001',
    name: 'Residential / individuals',
  },
  {
    _id: 'industry-ind-002',
    _type: 'industry',
    nucid: 'IND-002',
    name: 'Commercial & industrial',
  },
];

// ---------- Solutions (Master Build Brief Section 3.3, live in V1) ----------

const solutions = [
  {
    _id: 'solution-sol-001',
    _type: 'solution',
    nucid: 'SOL-001',
    name: 'Certified Training & Installer Academy',
    slug: 'training',
    painPoint:
      'REA- and NEMSA-aligned certification for solar and EV installers -- hands-on, not classroom-only.',
    summaryText: [
      block(
        'Solar and EV installation is still mostly informal in Nigeria -- learned on the job, with no consistent standard behind it. We train installers to REA- and NEMSA-aligned standards, so certification means something real to the client hiring them and the manufacturer backing their work.'
      ),
      block(
        "Hands-on, not classroom-only -- trainees work on real systems, including the same equipment they'll be certified to install."
      ),
    ],
    relatedCapabilities: [{ _type: 'reference', _ref: 'capability-cap-001' }],
    ctaLabel: 'Enquire about training',
    ctaLink: '/contact',
    status: 'live',
  },
  {
    _id: 'solution-sol-002',
    _type: 'solution',
    nucid: 'SOL-002',
    name: 'OEM Technical & Channel Partnerships',
    slug: 'oem',
    painPoint: 'Local technical support, training, and warranty administration for manufacturers entering Nigeria.',
    summaryText: [
      block(
        "International manufacturers entering Nigeria need more than a distributor -- they need a technical partner who can train installers on their product, handle warranty claims, and support customers after the sale. That's the role we play. We've already delivered on this at scale: a 150kW hybrid inverter system with 250kWh of battery storage, installed and trained on-site for a leading Nigerian bank branch in Lagos."
      ),
      block(
        "We're brand-agnostic by design -- our value is technical credibility, not loyalty to a single manufacturer's product line."
      ),
    ],
    relatedCapabilities: [
      { _type: 'reference', _ref: 'capability-cap-002' },
      { _type: 'reference', _ref: 'capability-cap-003' },
    ],
    ctaLabel: 'Talk to us about partnership',
    ctaLink: '/contact',
    status: 'live',
  },
];

// ---------- Projects (Master Build Brief Section 3.4) ----------

const projects = [
  {
    _id: 'project-prj-001',
    _type: 'project',
    nucid: 'PRJ-001',
    title: 'Leading Nigerian bank branch, Lagos -- commercial hybrid power system',
    location: 'Lagos',
    industry: { _type: 'reference', _ref: 'industry-ind-002' },
    capacityKw: 150,
    storageKwh: 250,
    scope:
      '150kW hybrid inverter system, 250kWh HV lithium battery, 120 x 560W PV modules -- installed with on-site technical training for facility staff. Our largest commercial deployment to date.',
    relatedSolutions: [
      { _type: 'reference', _ref: 'solution-sol-001' },
      { _type: 'reference', _ref: 'solution-sol-002' },
    ],
    status: 'featured',
    featured: true,
    order: 1,
  },
  {
    _id: 'project-prj-002',
    _type: 'project',
    nucid: 'PRJ-002',
    title: 'Residential facility, Mowe, Ogun State',
    location: 'Mowe, Ogun State',
    industry: { _type: 'reference', _ref: 'industry-ind-001' },
    capacityKw: 6.5,
    storageKwh: 5,
    scope: '6.5kW inverter, 5kWh lithium-ion battery, 6 PV modules -- everyday reliability for a home.',
    status: 'standard',
    featured: false,
    order: 2,
  },
  {
    _id: 'project-prj-003',
    _type: 'project',
    nucid: 'PRJ-003',
    title: 'Residential facility, Lekki, Lagos',
    location: 'Lekki, Lagos',
    industry: { _type: 'reference', _ref: 'industry-ind-001' },
    capacityKw: 6.5,
    storageKwh: 5,
    scope: '6.5kW inverter, 5kWh lithium-ion battery, 10 PV modules -- a full home solar and storage system.',
    status: 'standard',
    featured: false,
    order: 3,
  },
  {
    _id: 'project-prj-004',
    _type: 'project',
    nucid: 'PRJ-004',
    title: 'Bank branch -- solar system design',
    // Source documents don't specify a city for this project -- see file header.
    location: 'Nigeria',
    industry: { _type: 'reference', _ref: 'industry-ind-002' },
    scope: 'Complete solar power system design in AutoCAD, from layout to specification, ready for installation.',
    relatedSolutions: [{ _type: 'reference', _ref: 'solution-sol-002' }],
    status: 'standard',
    featured: false,
    order: 4,
  },
];

// ---------- Singletons ----------

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  companyName: 'Nova Impact Energy',
  statesLabel: 'Lagos & Ogun States',
  contactEmail: 'ask@novaimpactenergy.com',
  contactPhone: '+234 816 137 6589',
  contactWebsite: 'www.novaimpactenergy.com',
  navLinks: [
    { _key: key(), label: 'About us', href: '/about' },
    { _key: key(), label: 'Solutions', href: '/solutions' },
    { _key: key(), label: 'Proof', href: '/proof' },
    { _key: key(), label: 'Contact', href: '/contact' },
  ],
  navCtaLabel: 'Get in touch',
  navCtaHref: '/contact',
  footerCopyright: `© ${new Date().getFullYear()} Nova Impact Energy Limited. All rights reserved.`,
};

const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  heroHeadline: "Technical credibility for Nigeria's clean energy transition.",
  heroSubtext:
    'Nova Impact Energy trains certified installers and represents international manufacturers on the ground -- so solar systems in Nigeria get built right, and stay supported.',
  heroCtaPrimaryLabel: 'See our work',
  heroCtaPrimaryHref: '/proof',
  servicesTeaserHeadline: 'Two things, done properly.',
  featuredSolutions: [
    { _type: 'reference', _ref: 'solution-sol-001', _key: key() },
    { _type: 'reference', _ref: 'solution-sol-002', _key: key() },
  ],
  finalCtaHeadline: 'Have a project, or want to get certified?',
  finalCtaSubtext: "Tell us what you need -- we'll take it from there.",
  finalCtaButtonLabel: 'Get in touch',
  finalCtaButtonHref: '/contact',
};

const aboutPage = {
  _id: 'aboutPage',
  _type: 'aboutPage',
  headline: "We're not another installer. We're the credibility layer behind the installs.",
  bodyBlocks: [
    block(
      'Nova Impact Energy Limited is a Nigerian energy technology company. We do two things well: we train and certify solar installers, and we represent international manufacturers who need a trusted technical partner on the ground in Nigeria.'
    ),
    block(
      "We already do installation work too -- when a client asks us directly. But our business isn't built on moving hardware. It's built on the training, standards, and partnerships that make hardware actually work, long after the sale."
    ),
    block(
      "We started small and deliberately -- a handful of real projects, done properly, rather than a large claim with nothing behind it. Every system we've trained on or represented is one we'd put our name next to."
    ),
  ],
  whatWeBelieveQuote:
    "Reliable energy access depends less on more panels arriving in the market, and more on the people who install them and the manufacturers willing to stand behind them. That's the gap we're closing.",
};

const servicesPage = {
  _id: 'servicesPage',
  _type: 'servicesPage',
  introText: 'Two things, done properly.',
  featuredSolutions: [
    { _type: 'reference', _ref: 'solution-sol-001', _key: key() },
    { _type: 'reference', _ref: 'solution-sol-002', _key: key() },
  ],
};

const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  headline: "Let's talk.",
  bodyText:
    "Whether you're a manufacturer looking for a local technical partner, an installer who wants to get certified, or you have a project you'd like built -- we want to hear from it.",
  formOptions: [
    'Manufacturer / OEM partnership',
    'Installer training / certification',
    "I have a project I'd like installed",
    'Something else',
  ],
};

async function run() {
  const allDocs = [
    ...capabilities,
    ...industries,
    ...solutions,
    ...projects,
    siteSettings,
    homePage,
    aboutPage,
    servicesPage,
    contactPage,
  ];

  console.log(`Seeding ${allDocs.length} documents into ${projectId}/${dataset} ...`);

  let tx = client.transaction();
  for (const doc of allDocs) {
    tx = tx.createOrReplace(doc);
  }
  await tx.commit();

  console.log('Done. Populated:');
  console.log(`  ${capabilities.length} capabilities`);
  console.log(`  ${industries.length} industries`);
  console.log(`  ${solutions.length} solutions (SOL-001, SOL-002 -- both live)`);
  console.log(`  ${projects.length} projects (PRJ-001..004)`);
  console.log('  siteSettings, homePage, aboutPage, servicesPage, contactPage');
  console.log('');
  console.log('Note: no project has an image yet -- upload real (or AI-generated placeholder,');
  console.log('tagged isPlaceholder: true) photos in the Studio for each project record.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
