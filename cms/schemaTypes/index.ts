import solution from './objects/solution';
import capability from './objects/capability';
import project from './objects/project';
import industry from './objects/industry';
import download from './objects/download';
import platform from './objects/platform';
import faq from './objects/faq';
import siteSettings from './singletons/siteSettings';
import homePage from './singletons/homePage';
import aboutPage from './singletons/aboutPage';
import servicesPage from './singletons/servicesPage';
import contactPage from './singletons/contactPage';
import proofPage from './singletons/proofPage';

/**
 * V1 schema set -- Master Build Brief Section 5 + Platform Directory:
 * "Schemas live now for: Solution, Capability, Project, Industry, Download"
 * plus Platform and the five page singletons. Course, Certification,
 * Partner, Video, Event, Product, People are modeled as TS types in
 * packages/content-model but stay out of the CMS until each has a first
 * real record (Platform Directory, "cms/" section).
 */
export const schemaTypes = [
  // documents
  solution,
  capability,
  project,
  industry,
  download,
  platform,
  faq,
  // singletons
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  contactPage,
  proofPage,
];

export const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'servicesPage',
  'contactPage',
  'proofPage',
]);
