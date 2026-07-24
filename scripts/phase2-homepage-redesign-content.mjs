// Phase 2 (content-depth-v2 branch) -- Homepage content-standard redesign:
// full 9-section rebuild (Apple/Linear/Stripe-inspired). Patches the
// homePage singleton with every section's copy, plus the Section 6 ticker
// and carousel item lists.
//
// Two content notes, both explicit decisions confirmed with the client
// before this script was written:
//   - tickerItems are illustrative/representative prices, not a live
//     market-data feed (none exists yet).
//   - carouselItems are anonymized project *types* (no named companies --
//     the original brief's examples, e.g. "Tesla Gigafactory", would be
//     unverified capacity claims about unaffiliated companies).
//
// Safe to run any time: .patch('homePage').set() (merge) -- only touches
// the fields listed below.
//
// Run from a machine with normal internet access (api.sanity.io is outside
// this build sandbox's network allowlist):
//
//   cd nova-impact-energy
//   git checkout -- package-lock.json && git pull origin content-depth-v2
//   npm install
//   SANITY_API_TOKEN=<a token with write access> node scripts/phase2-homepage-redesign-content.mjs

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

const tickerItems = [
  { manufacturer: 'JA Solar', model: '610W Bifacial', price: '₦185,000', change: '+1.2%', direction: 'up' },
  { manufacturer: 'Pylontech', model: 'UF5000', price: '₦1,240,000', change: '-0.4%', direction: 'down' },
  { manufacturer: 'Canadian Solar', model: '550W HiKu6', price: '₦172,500', change: '+0.8%', direction: 'up' },
  { manufacturer: 'Jinko Solar', model: 'Tiger Neo 585W', price: '₦178,900', change: '0.0%', direction: 'flat' },
  { manufacturer: 'Trina Solar', model: 'Vertex 600W', price: '₦181,200', change: '+0.6%', direction: 'up' },
  { manufacturer: 'Deye', model: 'SUN-10K Hybrid', price: '₦2,150,000', change: '-1.1%', direction: 'down' },
  { manufacturer: 'Victron Energy', model: 'MultiPlus-II 5kVA', price: '₦1,890,000', change: '+0.3%', direction: 'up' },
  { manufacturer: 'Huawei', model: 'SUN2000 10KTL', price: '₦2,340,000', change: '+1.5%', direction: 'up' },
  { manufacturer: 'Growatt', model: 'SPF 6000ES', price: '₦980,000', change: '-0.2%', direction: 'down' },
  { manufacturer: 'Dyness', model: 'Powerbox 5.3kWh', price: '₦1,105,000', change: '+0.9%', direction: 'up' },
  { manufacturer: 'CATL', model: 'EnerOne 5MWh', price: 'POA', change: '0.0%', direction: 'flat' },
  { manufacturer: 'BYD', model: 'Battery-Box Premium', price: '₦2,780,000', change: '+2.1%', direction: 'up' },
  { manufacturer: 'ABB', model: 'PVS-100', price: '₦3,120,000', change: '-0.6%', direction: 'down' },
  { manufacturer: 'Felicity Solar', model: 'FL-IH 8kW', price: '₦1,650,000', change: '+0.4%', direction: 'up' },
  { manufacturer: 'GoodWe', model: 'GW10K-ET', price: '₦2,010,000', change: '+0.7%', direction: 'up' },
  { manufacturer: 'Solis', model: 'S6-EH3P10K', price: '₦1,975,000', change: '-0.3%', direction: 'down' },
  { manufacturer: 'Sungrow', model: 'SH10RT', price: '₦2,225,000', change: '+1.0%', direction: 'up' },
  { manufacturer: 'Schneider Electric', model: 'Conext XW Pro', price: '₦2,540,000', change: '0.0%', direction: 'flat' },
];

const carouselItems = [
  { title: 'Gigafactory Campus', location: 'Nevada, USA', stat: '70MW Solar Installation' },
  { title: 'Corporate Headquarters', location: 'California, USA', stat: '17MW Rooftop Solar' },
  { title: 'Sustainable City District', location: 'Abu Dhabi, UAE', stat: '100% Renewable-Powered' },
  { title: 'Waterfront Business District', location: 'Singapore', stat: 'Floating Solar Integration' },
  { title: 'University Research Campus', location: 'California, USA', stat: '30MW Solar Array' },
  { title: 'Airport Terminal Complex', location: 'India', stat: '18MW Rooftop Solar' },
  { title: 'Floating Solar Farm', location: 'Southeast Asia', stat: '60MW Floating Array' },
  { title: 'Commercial Rooftop Portfolio', location: 'Nigeria', stat: '5MW Aggregated Capacity' },
  { title: 'Battery Storage Plant', location: 'California, USA', stat: '300MWh Storage' },
  { title: 'Rural Mini-Grid Network', location: 'Northern Nigeria', stat: '2MW Community Power' },
  { title: 'Solar Irrigation Scheme', location: 'East Africa', stat: '500 Hectares Powered' },
  { title: 'Industrial Manufacturing Plant', location: 'Germany', stat: '22MW On-Site Solar' },
  { title: 'Utility-Scale Solar Farm', location: 'Morocco', stat: '200MW Capacity' },
  { title: 'Solar-Powered Hospital', location: 'Kenya', stat: '1.2MW Off-Grid Solar' },
  { title: 'Solar-Powered University', location: 'South Africa', stat: '6MW Campus Solar' },
  { title: 'EV Charging Hub', location: 'United Kingdom', stat: '50 Fast-Charging Bays' },
];

async function run() {
  console.log(`Applying Homepage redesign content to ${projectId}/${dataset} ...`);

  await client
    .patch('homePage')
    .set({
      heroHeadline: 'Engineering the future of clean energy.',
      heroSubtext:
        'Building the technology, partnerships and engineering capabilities that make renewable energy easier to deploy, manage and scale across Africa.',
      heroCtaPrimaryLabel: 'Explore our solutions →',
      heroCtaPrimaryHref: '/solutions',
      heroCtaSecondaryLabel: 'See our work →',
      heroCtaSecondaryHref: '/proof',

      whyNowHeadline: 'The energy transition needs more than hardware.',
      whyNowBody: [
        {
          _type: 'block',
          _key: 'whynow1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'whynow1span',
              text: 'Solar equipment is becoming easier to buy. Building reliable renewable energy systems is still difficult.',
            },
          ],
        },
        {
          _type: 'block',
          _key: 'whynow2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'whynow2span',
              text: 'Nova Impact Energy helps bridge that gap through engineering, technical training, OEM partnerships and connected digital platforms.',
            },
          ],
        },
      ],

      whatWeDoHeadline: 'What we do today.',
      whatWeDoCards: [
        {
          _type: 'whatWeDoCard',
          _key: 'wwd1',
          headline: 'Engineering & Technical Advisory',
          body: 'Independent engineering support for commercial, industrial and utility-scale renewable energy projects.',
          ctaLabel: 'Explore our solutions →',
          ctaHref: '/solutions',
        },
        {
          _type: 'whatWeDoCard',
          _key: 'wwd2',
          headline: 'Training & Installer Academy',
          body: 'Developing certified installers through practical training aligned with industry standards.',
          ctaLabel: 'Learn about training →',
          ctaHref: '/solutions#training',
        },
        {
          _type: 'whatWeDoCard',
          _key: 'wwd3',
          headline: 'OEM Representation',
          body: 'Helping international manufacturers build trusted technical and commercial operations across Nigeria.',
          ctaLabel: 'Explore partnerships →',
          ctaHref: '/solutions#oem',
        },
      ],

      ecosystemHeadline: "What we're building next.",
      ecosystemIntro: "Today's services become tomorrow's connected ecosystem.",
      enovaHeadline: 'ENOVA',
      enovaBody:
        'One connected platform for monitoring, installer management, OEM support, warranty administration and intelligent energy infrastructure.',
      enovaCtaLabel: 'Discover ENOVA →',
      enovaCtaHref: '/solutions#platforms',
      ecosystemCards: [
        { _type: 'ecosystemCard', _key: 'eco1', headline: 'Monitoring Platform', body: 'Real-time system monitoring and diagnostics.' },
        { _type: 'ecosystemCard', _key: 'eco2', headline: 'Installer Network', body: 'Connecting certified installers with opportunities.' },
        { _type: 'ecosystemCard', _key: 'eco3', headline: 'OEM Portal', body: 'Technical support, warranty and channel management.' },
        { _type: 'ecosystemCard', _key: 'eco4', headline: 'Carbon Platform', body: 'Data and reporting for measurable environmental impact.' },
      ],

      impactHeadline: 'Built for long-term impact.',
      impactBody:
        'Engineering is only part of the solution. We also invest in people, skills and partnerships that expand access to reliable, affordable clean energy.',
      impactColumns: [
        { _type: 'impactColumn', _key: 'imp1', headline: 'Engineering', body: 'Reliable technical expertise.' },
        { _type: 'impactColumn', _key: 'imp2', headline: 'Partnerships', body: 'Connecting global manufacturers with local capability.' },
        { _type: 'impactColumn', _key: 'imp3', headline: 'Communities', body: "Supporting cleaner energy access where it's needed most." },
      ],

      endlessHeadline: 'Endless Possibilities.',
      tickerItems: tickerItems.map((item, i) => ({ _type: 'tickerItem', _key: `ticker${i}`, ...item })),
      carouselItems: carouselItems.map((item, i) => ({ _type: 'carouselItem', _key: `carousel${i}`, ...item })),

      engineeringHeadline: 'Engineering that lasts.',
      engineeringBody: "Every project strengthens the experience, partnerships and engineering capabilities behind everything we're building.",
      engineeringCtaLabel: 'See the proof →',
      engineeringCtaHref: '/proof',

      splitCards: [
        {
          _type: 'splitCard',
          _key: 'split1',
          headline: 'Training the next generation.',
          body: 'Practical training that prepares installers for real projects.',
          ctaLabel: 'Explore training →',
          ctaHref: '/solutions#training',
        },
        {
          _type: 'splitCard',
          _key: 'split2',
          headline: 'Building stronger partnerships.',
          body: 'Helping manufacturers grow with trusted technical representation across Nigeria.',
          ctaLabel: 'Explore partnerships →',
          ctaHref: '/solutions#oem',
        },
      ],

      finalCtaHeadline: "Let's build what's next.",
      finalCtaSubtext:
        "Whether you're deploying a renewable energy project, looking for technical support or exploring partnership opportunities, we'd love to hear from you.",
      finalCtaButtonLabel: 'Get in touch →',
      finalCtaButtonHref: '/contact',
    })
    .commit();

  console.log('  homePage updated: all 9 sections');
  console.log('');
  console.log('Done.');
}

run().catch((err) => {
  console.error('Homepage redesign content update failed:', err);
  process.exit(1);
});
