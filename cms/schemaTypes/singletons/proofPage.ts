import { defineField, defineType } from 'sanity';

/**
 * Singleton -- the Proof/Evidence page (route: /proof, renamed from
 * /impact per Phase 2 task 2). New schema: the original build hardcoded
 * this page's headline and closing CTA directly into the component,
 * which violates Build Charter rule 2 ("nothing hardcoded") -- fixed here
 * by giving it a real page singleton, same pattern as homePage/aboutPage/
 * servicesPage/contactPage.
 */
export default defineType({
  name: 'proofPage',
  title: 'Proof page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'bodyText', title: 'Body paragraph (below the headline)', type: 'text' }),
    defineField({ name: 'growingLine', title: 'Short standalone line (e.g. "Our portfolio is growing...")', type: 'string' }),
    defineField({ name: 'closingCtaHeadline', title: 'Closing CTA headline', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'closingCtaSubtext', title: 'Closing CTA subtext (optional line below the headline)', type: 'string' }),
    defineField({ name: 'closingCtaButtonLabel', title: 'Closing CTA button label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'closingCtaButtonHref', title: 'Closing CTA button href', type: 'string', validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: 'headline' } },
});
