/**
 * Nova Impact Energy Content OS -- the 16 core objects, in code.
 * Source: Content OS v3, Section 1. This is the constitution restated as types --
 * nothing here is invented; every field maps 1:1 to a Content OS field.
 *
 * NUCID prefixes (Content OS Section 5):
 *   SOL Solution, CAP Capability, PLT Platform, IND Industry, PRJ Project,
 *   PTR Partner, CRS Course, CRT Certification, ART/GD/WP Knowledge subtypes,
 *   VID Video, DL Download, EVT Event, FAQ, PRD Product, PPL People.
 *
 * NUCIDs are for the CMS, code, and file naming only -- Build Charter rule 6:
 * they must never be rendered in user-facing copy.
 */

export type NUCID = string; // e.g. "SOL-001", "PRJ-004"

/** Every object carries this per Content OS Section 4 ("designing for AI"). */
export interface ContentMeta {
  nucid: NUCID;
  summary?: string; // 50-100 words
  keywords?: string[];
  tags?: string[];
  lastUpdated?: string;
  version?: string;
}

// ---- Live in V1 (real Sanity schemas exist in cms/, Phase 1) ----

export type SolutionStatus = 'live' | 'planned';

export interface Solution extends ContentMeta {
  name: string;
  /** Short bold subheadline shown under the name on the Services page
   * (content-standard redesign). */
  tagline?: string;
  /** Anchor id for the Home page teaser card (e.g. "training", "oem") --
   * links to /services#{slug}. Kept separate from ctaLabel/ctaLink, which
   * are the Services page block's own CTA (usually -> /contact). Same
   * object, two contexts -- Content OS Law 3. */
  slug: string;
  audience?: string;
  painPoint?: string;
  outcome?: string;
  benefits: string[];
  process?: string;
  pricingModel?: string;
  relatedCapabilities?: NUCID[];
  relatedPlatforms?: NUCID[];
  relatedProjects?: NUCID[];
  faqs?: NUCID[];
  ctaLabel: string;
  ctaLink: string;
  status: SolutionStatus;
}

export type CapabilityStatus = 'active' | 'latent';

export interface Capability extends ContentMeta {
  name: string;
  description: string;
  problemSolved?: string;
  competencies?: string[];
  relatedSolutions?: NUCID[];
  relatedProjects?: NUCID[];
  relatedArticles?: NUCID[];
  status: CapabilityStatus;
  owner?: string;
}

export type ProjectStatus = 'featured' | 'standard';

export interface Project extends ContentMeta {
  title: string;
  client?: string;
  country?: string;
  state?: string;
  location?: string;
  industry?: NUCID;
  technology?: string;
  capacity?: string;
  scope?: string;
  /** Phase 2, Ecosystem Review Section 3 -- full case-study depth: what the
   * client needed and how we solved it, alongside the existing scope/results/
   * testimonial fields. */
  problem?: string;
  technicalApproach?: string;
  images?: { url: string; alt: string; isPlaceholder: boolean }[];
  videos?: string[];
  results?: string;
  carbonReduction?: string;
  testimonial?: string;
  relatedSolutions?: NUCID[];
  relatedArticles?: NUCID[];
  relatedOem?: NUCID;
  completionDate?: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
}

export interface Industry extends ContentMeta {
  name: string;
  description?: string;
}

export type PlatformStatus = 'planned' | 'live';

export interface Platform extends ContentMeta {
  name: string;
  purpose?: string;
  users?: string;
  features?: string[];
  screens?: string[];
  api?: string;
  integrations?: string[];
  roadmap?: string;
  status: PlatformStatus;
  releaseNotes?: string;
}

export type DownloadStatus = 'live' | 'planned';

export interface Download extends ContentMeta {
  title: string;
  version?: string;
  language?: string;
  file?: string;
  preview?: string;
  tags?: string[];
  relatedSolution?: NUCID;
  status: DownloadStatus;
}

// ---- Modeled now, no live Sanity schema/records yet (per Platform Directory) ----

export interface Partner extends ContentMeta {
  name: string;
  type?: string;
  country?: string;
  logo?: string;
  description?: string;
  programs?: string[];
  products?: string[];
  documents?: string[];
  website?: string;
  contacts?: string[];
}

export interface Course extends ContentMeta {
  title: string;
  level?: string;
  duration?: string;
  instructor?: string;
  price?: string;
  certification?: NUCID;
  modules?: string[];
  videos?: NUCID[];
  downloads?: NUCID[];
  exam?: string;
  badge?: string;
  relatedStandards?: string[];
  faqs?: NUCID[];
}

export interface Certification extends ContentMeta {
  name: string;
  requirements?: string;
  validity?: string;
  renewal?: string;
  digitalBadge?: string;
  certificate?: string;
  assessment?: string;
}

export type KnowledgeType =
  | 'article' | 'guide' | 'whitepaper' | 'research' | 'industryReport'
  | 'checklist' | 'caseStudy' | 'faq' | 'glossary' | 'news';

export interface Knowledge extends ContentMeta {
  title: string;
  type: KnowledgeType;
  summaryText: string;
  author?: string;
  readingTime?: string;
  difficulty?: string;
  relatedObjects?: NUCID[];
  downloads?: NUCID[];
}

export interface Video extends ContentMeta {
  title: string;
  speaker?: string;
  duration?: string;
  transcript?: string;
  captions?: string;
  topics?: string[];
  downloads?: NUCID[];
  relatedCourses?: NUCID[];
}

export interface EventRecord extends ContentMeta {
  date: string;
  venue?: string;
  registration?: string;
  agenda?: string;
  speakers?: string[];
  slides?: string;
  recording?: string;
}

export interface FAQ extends ContentMeta {
  question: string;
  answer: string;
  category?: string;
  relatedSolution?: NUCID;
  relatedCourse?: NUCID;
  relatedPlatform?: NUCID;
}

export interface Product extends ContentMeta {
  brand: string;
  model: string;
  category?: string;
  datasheet?: string;
  warranty?: string;
  compatiblePlatforms?: NUCID[];
  trainingCourses?: NUCID[];
  oemPartner?: NUCID;
  downloads?: NUCID[];
}

export interface Person extends ContentMeta {
  name: string;
  role?: string;
  bio?: string;
  expertise?: string[];
  projects?: NUCID[];
  courses?: NUCID[];
  publications?: string[];
  socialLinks?: string[];
}

export interface Company {
  name: string;
  mission?: string;
  vision?: string;
  coreValues?: string[];
  history?: string;
  brandStory?: string;
  locations?: string[];
  contacts?: { email: string; phone: string; website: string };
  legal?: string;
  socialLinks?: string[];
}

/** Derived, never hand-typed -- Content OS Section 5 / Build Charter rule 5. */
export interface SiteStats {
  projectsDelivered: number;
  inverterCapacityKw: number;
  batteryStorageKwh: number;
  statesLabel: string;
}
