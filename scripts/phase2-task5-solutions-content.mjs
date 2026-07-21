// Phase 2 (content-depth-v2 branch) -- Task 5 content: deepen the Solutions
// pages (Training & OEM Partnerships) per Ecosystem Review Section 3.
//
// Safe to run any time: .patch().set() (merge) on the two existing Solution
// documents -- touches only processSteps/faqs -- and .createIfNotExists()
// for 6 new FAQ documents (Content OS Core Object 14), which don't exist
// in Sanity yet. Nothing here touches project images, Home/About content
// from task 4, or anything else already in Studio.
//
// Run from a machine with normal internet access (api.sanity.io is outside
// this build sandbox's network allowlist):
//
//   cd nova-impact-energy
//   npm install
//   SANITY_API_TOKEN=<a token with write access> node scripts/phase2-task5-solutions-content.mjs
//
// What this does:
//   1. Creates 6 FAQ documents (FAQ-001..003 for Training, FAQ-004..006 for
//      OEM) -- content drawn from the OEM Representation Breakdown and FAQ
//      material supplied for this phase, plus paraphrases of copy already
//      seeded on the live Solution records (nothing invented)
//   2. Patches solution-sol-001 (Training): adds a 5-step processSteps
//      breakdown and links FAQ-001..003
//   3. Patches solution-sol-002 (OEM): adds a 6-step processSteps breakdown
//      taken directly from the OEM Representation Breakdown document's own
//      six service categories, and links FAQ-004..006

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
  return `t5-k${keyCounter}`;
}

// ---------- FAQs (Content OS Core Object 14 -- none seeded before now) ----------

const faqs = [
  {
    _id: 'faq-faq-001',
    _type: 'faq',
    nucid: 'FAQ-001',
    question: 'Do you provide training?',
    answer:
      'Yes. We offer technical training, professional development, installer certification support, and capacity-building programmes for individuals, organizations, and equipment manufacturers.',
    category: 'Training',
    relatedSolution: { _type: 'reference', _ref: 'solution-sol-001' },
  },
  {
    _id: 'faq-faq-002',
    _type: 'faq',
    nucid: 'FAQ-002',
    question: 'Is the training hands-on or classroom-based?',
    answer:
      "Both -- weighted toward hands-on practice. Trainees work on real systems, including the same equipment they'll be certified to install, rather than learning only in a classroom.",
    category: 'Training',
    relatedSolution: { _type: 'reference', _ref: 'solution-sol-001' },
  },
  {
    _id: 'faq-faq-003',
    _type: 'faq',
    nucid: 'FAQ-003',
    question: 'What certification do I receive?',
    answer:
      'Certification aligned to REA (Rural Electrification Agency) and NEMSA (Nigerian Electricity Management Services Agency) standards -- the same standards referenced throughout our installer training.',
    category: 'Training',
    relatedSolution: { _type: 'reference', _ref: 'solution-sol-001' },
  },
  {
    _id: 'faq-faq-004',
    _type: 'faq',
    nucid: 'FAQ-004',
    question: 'Do you represent international manufacturers?',
    answer:
      'Yes. We work with international manufacturers seeking reliable technical and commercial representation within Nigeria and, over time, across West Africa.',
    category: 'OEM partnerships',
    relatedSolution: { _type: 'reference', _ref: 'solution-sol-002' },
  },
  {
    _id: 'faq-faq-005',
    _type: 'faq',
    nucid: 'FAQ-005',
    question: 'Can you help with government-funded renewable energy projects?',
    answer:
      'Yes. Our team supports project development, technical advisory, partnership development, and engagement with renewable energy programmes implemented by government agencies and development partners.',
    category: 'OEM partnerships',
    relatedSolution: { _type: 'reference', _ref: 'solution-sol-002' },
  },
  {
    _id: 'faq-faq-006',
    _type: 'faq',
    nucid: 'FAQ-006',
    question: "Are you tied to a single manufacturer's product line?",
    answer:
      "No -- we're brand-agnostic by design. Our value to OEM partners is technical credibility, not loyalty to one product line.",
    category: 'OEM partnerships',
    relatedSolution: { _type: 'reference', _ref: 'solution-sol-002' },
  },
];

// ---------- Training (SOL-001) process steps ----------

const trainingProcessSteps = [
  {
    _key: key(),
    title: 'Apply & assess',
    description:
      "Tell us your experience level and what you're looking to get certified in -- we assess where you're starting from before building a training plan.",
  },
  {
    _key: key(),
    title: 'Classroom fundamentals',
    description:
      'REA- and NEMSA-aligned technical fundamentals: system design basics, safety standards, and the regulatory context installers are expected to know.',
  },
  {
    _key: key(),
    title: 'Hands-on installation practice',
    description:
      "Trainees work on real systems, including the same equipment they'll be certified to install -- not simulations.",
  },
  {
    _key: key(),
    title: 'Certification exam',
    description: 'A REA- and NEMSA-aligned assessment of both technical knowledge and practical installation skill.',
  },
  {
    _key: key(),
    title: 'Certified & job-ready',
    description:
      'Certified installers are added to our network -- the same network our OEM partners and commercial clients draw from when they need trained installers on the ground.',
  },
];

// ---------- OEM (SOL-002) process steps -- from the OEM Representation
//            Breakdown document's own six service categories, verbatim ----------

const oemProcessSteps = [
  {
    _key: key(),
    title: 'Market entry strategy',
    description:
      'We help manufacturers understand the Nigerian renewable energy landscape, identify target customer segments, evaluate competitors, and develop practical go-to-market strategies.',
  },
  {
    _key: key(),
    title: 'Business development',
    description: 'We identify opportunities, generate qualified leads, support commercial negotiations, and facilitate strategic partnerships.',
  },
  {
    _key: key(),
    title: 'Technical representation',
    description: 'We provide engineering support, product demonstrations, commissioning assistance, and technical advisory services.',
  },
  {
    _key: key(),
    title: 'Installer network development',
    description: 'We recruit, train, certify, and support installers to ensure products are installed correctly and consistently.',
  },
  {
    _key: key(),
    title: 'Warranty & after-sales support',
    description: 'We coordinate warranty claims, diagnostics, field inspections, replacement processes, and customer communication.',
  },
  {
    _key: key(),
    title: 'Government & development engagement',
    description:
      'We assist manufacturers in navigating opportunities involving REA programmes, donor-funded projects, development finance institutions, and public sector initiatives.',
  },
];

async function run() {
  console.log(`Applying Phase 2 Task 5 content to ${projectId}/${dataset} ...`);

  for (const faq of faqs) {
    await client.createIfNotExists(faq);
    console.log(`  FAQ ${faq.nucid} ensured`);
  }

  await client
    .patch('solution-sol-001')
    .set({
      processSteps: trainingProcessSteps,
      faqs: [
        { _type: 'reference', _ref: 'faq-faq-001', _key: key() },
        { _type: 'reference', _ref: 'faq-faq-002', _key: key() },
        { _type: 'reference', _ref: 'faq-faq-003', _key: key() },
      ],
    })
    .commit();
  console.log('  solution-sol-001 (Training) updated: processSteps (5), faqs (3)');

  await client
    .patch('solution-sol-002')
    .set({
      processSteps: oemProcessSteps,
      faqs: [
        { _type: 'reference', _ref: 'faq-faq-004', _key: key() },
        { _type: 'reference', _ref: 'faq-faq-005', _key: key() },
        { _type: 'reference', _ref: 'faq-faq-006', _key: key() },
      ],
    })
    .commit();
  console.log('  solution-sol-002 (OEM) updated: processSteps (6), faqs (3)');

  console.log('');
  console.log('Done. Existing project images and any other Studio-added content were not touched.');
}

run().catch((err) => {
  console.error('Phase 2 Task 5 content update failed:', err);
  process.exit(1);
});
