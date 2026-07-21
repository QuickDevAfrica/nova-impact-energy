import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  companyName, statesLabel, contactEmail, contactPhone, contactWebsite,
  navLinks, navCtaLabel, navCtaHref, footerCopyright
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroHeadline, heroSubtext, heroCtaPrimaryLabel, heroCtaPrimaryHref,
  servicesTeaserHeadline,
  finalCtaHeadline, finalCtaSubtext, finalCtaButtonLabel, finalCtaButtonHref,
  "featuredSolutions": featuredSolutions[]->{
    nucid, name, slug, painPoint, ctaLabel, ctaLink, status
  },
  "featuredPlatforms": featuredPlatforms[]->{
    nucid, name, purpose, status
  }
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  headline, bodyBlocks, whatWeBelieveQuote
}`;

export const servicesPageQuery = groq`*[_type == "servicesPage"][0]{
  introText,
  "featuredSolutions": featuredSolutions[]->{
    nucid, name, slug, summaryText, ctaLabel, ctaLink, status
  }
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  headline, bodyText, formOptions
}`;

export const proofPageQuery = groq`*[_type == "proofPage"][0]{
  headline, closingCtaHeadline, closingCtaButtonLabel, closingCtaButtonHref
}`;

/**
 * Every project doc, ordered -- feeds both the Our Impact page and the
 * derived stat strip (getStats.ts). Never fetch a hand-typed stats object.
 */
export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  nucid, title, location, scope, results, capacityKw, storageKwh,
  featured, order,
  images[]{ "url": asset->url, alt, isPlaceholder }
}`;
