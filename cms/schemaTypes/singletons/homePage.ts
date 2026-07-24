import { defineField, defineType } from 'sanity';

/** Singleton -- Master Build Brief Section 5 / 3.1. Every copy block on
 * Home is a named field here. If a field is empty, the frontend fails
 * loudly in development rather than falling back to placeholder text.
 *
 * Homepage content-standard redesign (Apple/Linear/Stripe-inspired,
 * 9-section structure): several fields below are reused as-is from the
 * pre-redesign schema (hero, "why now", closing CTA) because their
 * semantic role didn't change. `servicesTeaserHeadline`, `featuredSolutions`,
 * `featuredPlatforms`, and the `proofPreview*` fields are kept but no
 * longer rendered -- Section 6 replaces the old Proof-preview band
 * completely, and the Solutions/Ecosystem teasers became fully bespoke
 * copy blocks (`whatWeDoCards` / `ecosystemCards`) instead, since the new
 * card copy doesn't map 1:1 onto the existing Solution/Platform records'
 * own fields. Left in place (validation relaxed to optional) rather than
 * deleted, so no existing references break.
 */
export default defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    // ---- Section 1: Hero ----
    defineField({ name: 'heroHeadline', title: 'Hero headline', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroSubtext', title: 'Hero subtext', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroCtaPrimaryLabel', title: 'Hero primary CTA label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroCtaPrimaryHref', title: 'Hero primary CTA href', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroCtaSecondaryLabel', title: 'Hero secondary CTA label ("See our work →")', type: 'string' }),
    defineField({ name: 'heroCtaSecondaryHref', title: 'Hero secondary CTA href', type: 'string' }),

    // ---- Section 2: "The energy transition needs more than hardware." ----
    defineField({
      name: 'whyNowHeadline',
      title: 'Section 2 -- headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whyNowBody',
      title: 'Section 2 -- body (rich text)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),

    // ---- Section 3: "What we do today." -- 3 large cards ----
    defineField({ name: 'whatWeDoHeadline', title: 'Section 3 -- headline ("What we do today.")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'whatWeDoCards',
      title: 'Section 3 -- 3 cards (Engineering, Training, OEM Representation)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'whatWeDoCard',
          fields: [
            defineField({ name: 'headline', title: 'Card headline', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Card body (one sentence)', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'ctaHref', title: 'CTA href', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(3),
    }),

    // ---- Section 4: "What we're building next." -- ENOVA feature + 4 mini cards ----
    defineField({ name: 'ecosystemHeadline', title: 'Section 4 -- headline ("What we’re building next.")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'ecosystemIntro', title: 'Section 4 -- small intro line', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'enovaHeadline', title: 'Section 4 -- ENOVA feature headline ("ENOVA")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'enovaBody', title: 'Section 4 -- ENOVA feature body', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'enovaCtaLabel', title: 'Section 4 -- ENOVA CTA label ("Discover ENOVA →")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'enovaCtaHref', title: 'Section 4 -- ENOVA CTA href', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'ecosystemCards',
      title: 'Section 4 -- 4 mini cards (Monitoring, Installer Network, OEM Portal, Carbon)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ecosystemCard',
          fields: [
            defineField({ name: 'headline', title: 'Card headline', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Card body (one sentence)', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(4).max(4),
    }),

    // ---- Section 5: "Built for long-term impact." -- 3 columns ----
    defineField({ name: 'impactHeadline', title: 'Section 5 -- headline ("Built for long-term impact.")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'impactBody', title: 'Section 5 -- body copy', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'impactColumns',
      title: 'Section 5 -- 3 columns (Engineering, Partnerships, Communities)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'impactColumn',
          fields: [
            defineField({ name: 'headline', title: 'Column headline', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Column body (one sentence)', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(3),
    }),

    // ---- Section 6: "Endless Possibilities." -- ticker + cinematic carousel ----
    defineField({ name: 'endlessHeadline', title: 'Section 6 -- headline ("Endless Possibilities.")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'tickerItems',
      title: 'Section 6 -- Row One price-ticker items (illustrative, not a live feed)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tickerItem',
          fields: [
            defineField({ name: 'manufacturer', title: 'Manufacturer', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'model', title: 'Model', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'price', title: 'Price', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'change', title: 'Daily change (e.g. "+1.2%")', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'direction',
              title: 'Direction',
              type: 'string',
              options: { list: ['up', 'down', 'flat'] },
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'carouselItems',
      title: 'Section 6 -- Row Two cinematic project cards (anonymized project types, not named companies -- explicit decision to avoid unverified claims about unaffiliated companies)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'carouselItem',
          fields: [
            defineField({ name: 'title', title: 'Project type', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'location', title: 'Location', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'stat', title: 'Impact statistic', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // ---- Section 7: "Engineering that lasts." -- full-bleed feature ----
    defineField({ name: 'engineeringHeadline', title: 'Section 7 -- headline ("Engineering that lasts.")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'engineeringBody', title: 'Section 7 -- body', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'engineeringCtaLabel', title: 'Section 7 -- CTA label ("See the proof →")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'engineeringCtaHref', title: 'Section 7 -- CTA href', type: 'string', validation: (Rule) => Rule.required() }),

    // ---- Section 8: split cards (Training / Partnerships) ----
    defineField({
      name: 'splitCards',
      title: 'Section 8 -- 2 split cards (Training, Partnerships)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'splitCard',
          fields: [
            defineField({ name: 'headline', title: 'Card headline', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Card body', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'ctaHref', title: 'CTA href', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(2),
    }),

    // ---- Section 9: closing CTA (reused field names, unchanged role) ----
    defineField({ name: 'finalCtaHeadline', title: 'Section 9 -- closing CTA headline', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'finalCtaSubtext', title: 'Section 9 -- closing CTA subtext', type: 'string' }),
    defineField({ name: 'finalCtaButtonLabel', title: 'Section 9 -- closing CTA button label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'finalCtaButtonHref', title: 'Section 9 -- closing CTA button href', type: 'string', validation: (Rule) => Rule.required() }),

    // ---- Legacy fields -- no longer rendered on the redesigned homepage,
    // kept so existing references/content don't break ----
    defineField({ name: 'servicesTeaserHeadline', title: '[Legacy, unused] Services teaser headline', type: 'string' }),
    defineField({
      name: 'featuredSolutions',
      title: '[Legacy, unused] Featured solutions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
    }),
    defineField({
      name: 'featuredPlatforms',
      title: '[Legacy, unused] Featured platforms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'platform' }] }],
    }),
    defineField({ name: 'proofPreviewHeadline', title: '[Legacy, unused] Proof preview headline', type: 'string' }),
    defineField({ name: 'proofPreviewBody', title: '[Legacy, unused] Proof preview body', type: 'text' }),
    defineField({ name: 'proofPreviewButtonLabel', title: '[Legacy, unused] Proof preview button label', type: 'string' }),
    defineField({ name: 'proofPreviewButtonHref', title: '[Legacy, unused] Proof preview button href', type: 'string' }),
  ],
  preview: { select: { title: 'heroHeadline' } },
});
