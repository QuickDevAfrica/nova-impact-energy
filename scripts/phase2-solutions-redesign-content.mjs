// Phase 2 (content-depth-v2 branch) -- Solutions page content-standard
// redesign: new hero, reduced 3-column copy, per-solution tagline + short
// body + "What you'll gain" cards (replacing "How it works" + FAQs), a new
// Platforms section, and a new closing CTA.
//
// Safe to run any time: .patch().set() (merge) on servicesPage and the two
// existing Solution documents, plus 5 platform documents (purpose text
// only). Does not touch project images, Home/About/Proof content, or
// anything else already in Studio. FAQ documents (FAQ-001..006) are left
// as-is in the dataset -- only unreferenced from this page's rendering
// (code change, not a data deletion).
//
// Run from a machine with normal internet access (api.sanity.io is outside
// this build sandbox's network allowlist):
//
//   cd nova-impact-energy
//   git checkout -- package-lock.json && git pull origin content-depth-v2
//   npm install
//   SANITY_API_TOKEN=<a token with write access> node scripts/phase2-solutions-redesign-content.mjs

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
  return `sr-k${keyCounter}`;
}

function block(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    children: [{ _type: 'span', _key: key(), text }],
  };
}

async function run() {
  console.log(`Applying Solutions page redesign content to ${projectId}/${dataset} ...`);

  // ---------- servicesPage ----------
  await client
    .patch('servicesPage')
    .set({
      introText: "Building Africa's Energy Ecosystem.",
      introBody:
        'Every solution we create is designed to strengthen the renewable energy ecosystem—from engineering and technical training to strategic partnerships and intelligent digital platforms. Together, they help accelerate the transition to cleaner, more reliable energy across Africa.',
      valuesColumns: [
        {
          _key: key(),
          leadIn: 'Engineering & Capacity',
          bodyText:
            'Building technical expertise through engineering support, practical training and professional development for businesses, engineers and renewable energy installers.',
          linkLabel: 'Explore our solutions →',
          linkHref: '/solutions',
        },
        {
          _key: key(),
          leadIn: 'Strategic Partnerships',
          bodyText:
            'Helping global manufacturers, developers and institutions expand through trusted local partnerships, technical representation and market expertise.',
          linkLabel: 'Explore partnerships →',
          linkHref: '/solutions#oem',
        },
        {
          _key: key(),
          leadIn: 'Digital Innovation',
          bodyText: 'Developing intelligent platforms that simplify monitoring, reporting, asset management and the future of connected clean energy.',
          linkLabel: 'Discover our platform →',
          linkHref: '/solutions#platforms',
        },
      ],
      platformsHeadline: 'Building the next generation of energy solutions.',
      platformsBody:
        "We're expanding beyond engineering services to develop digital platforms that help renewable energy systems become smarter, more connected and easier to manage.",
      featuredPlatforms: [
        { _type: 'reference', _ref: 'platform-plt-007', _key: key() }, // ENOVA
        { _type: 'reference', _ref: 'platform-plt-002', _key: key() }, // Monitoring
        { _type: 'reference', _ref: 'platform-plt-004', _key: key() }, // Carbon
        { _type: 'reference', _ref: 'platform-plt-005', _key: key() }, // Battery Swap
        { _type: 'reference', _ref: 'platform-plt-006', _key: key() }, // EV Charging
      ],
      closingCtaHeadline: "Let's build what's next.",
      closingCtaBody: "Whether you're developing a renewable energy project, expanding into Nigeria or building technical capability, we'd love to hear about it.",
      closingCtaButtonLabel: 'Get in touch →',
      closingCtaButtonHref: '/contact',
    })
    .commit();
  console.log('  servicesPage updated: hero, valuesColumns, platforms section, closing CTA');

  // ---------- Solution SOL-001 (Training) ----------
  await client
    .patch('solution-sol-001')
    .set({
      name: 'Certified Training',
      tagline: 'Building confident renewable energy professionals.',
      summaryText: [
        block(
          "Practical, industry-focused training that combines technical knowledge with real-world installation experience, preparing engineers and installers for today's renewable energy industry."
        ),
      ],
      ctaLabel: 'Explore Training →',
      processSteps: [
        {
          _key: key(),
          title: 'Practical Experience',
          description: 'Train using real renewable energy equipment and real installation environments.',
        },
        {
          _key: key(),
          title: 'Industry Standards',
          description: 'Learn engineering practices aligned with recognized safety and technical standards.',
        },
        {
          _key: key(),
          title: 'Technical Confidence',
          description: 'Develop the skills required to install, maintain and troubleshoot renewable energy systems.',
        },
        {
          _key: key(),
          title: 'Career Readiness',
          description: 'Build practical experience valued by employers, project developers and OEM partners.',
        },
      ],
      faqs: [],
    })
    .commit();
  console.log('  solution-sol-001 (Training) updated: name, tagline, summaryText, ctaLabel, processSteps (4), faqs cleared');

  // ---------- Solution SOL-002 (OEM) ----------
  await client
    .patch('solution-sol-002')
    .set({
      name: 'OEM Partnerships',
      tagline: 'Helping global manufacturers succeed locally.',
      summaryText: [
        block(
          'We work with international renewable energy manufacturers to provide technical representation, engineering support, installer development and long-term market growth across Nigeria and West Africa.'
        ),
      ],
      ctaLabel: 'Become a Partner →',
      processSteps: [
        {
          _key: key(),
          title: 'Market Development',
          description: 'Helping manufacturers understand the local market and identify practical opportunities.',
        },
        {
          _key: key(),
          title: 'Technical Representation',
          description: 'Providing engineering support before, during and after deployment.',
        },
        {
          _key: key(),
          title: 'Installer Network',
          description: 'Building local technical capacity through trained installation partners.',
        },
        {
          _key: key(),
          title: 'After-sales Support',
          description: 'Supporting warranty coordination, diagnostics and customer success.',
        },
        {
          _key: key(),
          title: 'Government & Development',
          description: 'Helping manufacturers engage with donor-funded programmes, public institutions and strategic partnerships.',
        },
      ],
      faqs: [],
    })
    .commit();
  console.log('  solution-sol-002 (OEM) updated: name, tagline, summaryText, ctaLabel, processSteps (5), faqs cleared');

  // ---------- Platform purpose text (5 featured on the new Platforms section) ----------
  const platformPurposes = [
    { id: 'platform-plt-007', label: 'PLT-007 -- ENOVA', purpose: 'One connected platform for renewable energy management.' },
    { id: 'platform-plt-002', label: 'PLT-002 -- Monitoring', purpose: 'Live monitoring and performance insights.' },
    { id: 'platform-plt-004', label: 'PLT-004 -- Carbon', purpose: 'Carbon reporting and environmental impact management.' },
    { id: 'platform-plt-005', label: 'PLT-005 -- Battery Swap', purpose: 'Digital infrastructure supporting battery swapping ecosystems.' },
    { id: 'platform-plt-006', label: 'PLT-006 -- EV Charging', purpose: 'Smart charging management for electric mobility.' },
  ];
  for (const { id, label, purpose } of platformPurposes) {
    await client.patch(id).set({ purpose }).commit();
    console.log(`  ${label} purpose updated`);
  }

  console.log('');
  console.log('Done. FAQ-001..006 documents themselves were not deleted -- only unreferenced from');
  console.log('the two Solutions (faqs cleared) and no longer rendered by the Solutions page code.');
}

run().catch((err) => {
  console.error('Solutions redesign content update failed:', err);
  process.exit(1);
});
