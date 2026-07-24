// Phase 2 (content-depth-v2 branch) -- About page content-standard
// redesign: 8 sections, new copy throughout.
//
// Safe to run any time: .patch('aboutPage').set() (merge) -- only touches
// the fields listed below. Several fields are reused for new content under
// their old names (see aboutPage.ts for the reuse notes) -- this replaces
// their previous values, which is intended.
//
// Run from a machine with normal internet access (api.sanity.io is outside
// this build sandbox's network allowlist):
//
//   cd nova-impact-energy
//   git checkout -- package-lock.json && git pull origin content-depth-v2
//   npm install
//   SANITY_API_TOKEN=<a token with write access> node scripts/phase2-about-redesign-content.mjs

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
  return `ar-k${keyCounter}`;
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
  console.log(`Applying About page redesign content to ${projectId}/${dataset} ...`);

  await client
    .patch('aboutPage')
    .set({
      // ---------- Section 1 -- hero ----------
      heroLabel: 'ABOUT',
      headline: 'Built on engineering. Driven by impact.',
      bodyBlocks: [
        block(
          "Nova Impact Energy is an engineering and energy technology company strengthening Africa's renewable energy ecosystem through technical expertise, strategic partnerships, intelligent digital platforms and inclusive impact."
        ),
        block(
          'We believe clean energy creates its greatest value when it is reliable, accessible and supported by the right people, technology and partnerships.'
        ),
      ],

      // ---------- Section 2 -- Four pillars ----------
      pillarsHeadline: 'Four pillars. One mission.',
      pillarsBody: 'Everything we do is designed to strengthen the renewable energy ecosystem.',
      pillars: [
        {
          _key: key(),
          title: 'Engineering Excellence',
          body: 'Independent engineering expertise that helps renewable energy systems perform safely, efficiently and reliably.',
        },
        {
          _key: key(),
          title: 'Strategic Partnerships',
          body: 'Connecting manufacturers, developers and institutions with trusted local engineering and market expertise.',
        },
        {
          _key: key(),
          title: 'Digital Innovation',
          body: 'Developing intelligent platforms for monitoring, asset management and connected renewable energy operations.',
        },
        {
          _key: key(),
          title: 'Inclusive Impact',
          body: 'Expanding access to clean energy, strengthening local technical capacity and supporting underserved communities across Africa.',
        },
      ],

      // ---------- Section 3 -- Why we exist (repurposed founderStory* fields) ----------
      founderStoryHeadline: 'Why we exist.',
      founderStoryBody: [
        block('Renewable energy is growing rapidly across Africa.'),
        block(
          'But the industry still faces major challenges—from technical capacity and after-sales support to fragmented systems and limited access for underserved communities.'
        ),
        block(
          'Nova Impact Energy exists to help close these gaps by combining engineering expertise, technology and strategic partnerships that strengthen the ecosystem—not just individual projects.'
        ),
      ],

      // ---------- Section 4 -- How we create value ----------
      valueHeadline: 'How we create value.',
      valueCards: [
        {
          _key: key(),
          title: 'For Businesses',
          body: 'Helping commercial and industrial customers design, deploy and manage reliable renewable energy solutions that improve operational resilience.',
        },
        {
          _key: key(),
          title: 'For Industry Partners',
          body: 'Supporting manufacturers, developers and institutions through technical representation, engineering services and long-term partnerships.',
        },
        {
          _key: key(),
          title: 'For Communities',
          body: 'Building technical capacity, expanding access to clean energy and creating opportunities that deliver measurable social and economic impact.',
        },
      ],

      // ---------- Section 5 -- How we work (repurposed howWeWork* fields) ----------
      howWeWorkHeadline: 'How we work.',
      howWeWorkBody: [
        block('We believe the best solutions begin with understanding the problem.'),
        block('Every engagement follows the same disciplined approach.'),
      ],
      processCards: [
        { _key: key(), title: 'Understand', body: 'Study the technical, commercial and operational challenge.' },
        { _key: key(), title: 'Design', body: 'Develop practical engineering solutions tailored to real-world conditions.' },
        { _key: key(), title: 'Collaborate', body: 'Work alongside customers, manufacturers and development partners.' },
        { _key: key(), title: 'Deliver', body: 'Focus on quality, reliability and long-term performance.' },
        { _key: key(), title: 'Improve', body: 'Continue learning, supporting and improving every solution over time.' },
      ],

      // ---------- Section 6 -- Looking ahead ----------
      visionHeadline: 'Looking ahead.',
      visionBody: [
        block("We're building more than an engineering company."),
        block(
          'Our long-term vision is to create a connected renewable energy ecosystem that brings together engineering, technical training, OEM partnerships and intelligent digital platforms—including monitoring, asset management, carbon reporting and future clean energy technologies.'
        ),
        block('Every new capability we develop is designed to make renewable energy easier to deploy, manage and scale across Africa.'),
      ],

      // ---------- Section 7 -- What guides us ----------
      guidesHeadline: 'What guides us.',
      coreValues: [
        { _key: key(), title: 'Excellence', body: 'We hold ourselves to high engineering and professional standards.' },
        { _key: key(), title: 'Integrity', body: 'We build lasting relationships through honesty, transparency and accountability.' },
        { _key: key(), title: 'Innovation', body: 'We embrace technology that creates practical value.' },
        {
          _key: key(),
          title: 'Impact',
          body: 'We believe reliable energy should improve lives, strengthen communities and create long-term opportunities.',
        },
      ],

      // ---------- Section 8 -- closing CTA ----------
      closingCtaHeadline: "Let's build what's next.",
      closingCtaBody:
        "Whether you're developing a renewable energy project, entering the Nigerian market or looking for a trusted engineering partner, we'd love to hear from you.",
      closingCtaButtonLabel: 'Get in touch →',
      closingCtaButtonHref: '/contact',
    })
    .commit();
  console.log('  aboutPage updated: all 8 sections');

  console.log('');
  console.log('Done. whatWeBelieveQuote was not touched (kept, no longer rendered on this page).');
}

run().catch((err) => {
  console.error('About page redesign content update failed:', err);
  process.exit(1);
});
