import { defineField, defineType } from 'sanity';

/** Singleton -- Master Build Brief Section 5 / 3.1. Every copy block on
 * Home is a named field here. If a field is empty, the frontend fails
 * loudly in development rather than falling back to placeholder text. */
export default defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero headline', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroSubtext', title: 'Hero subtext', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroCtaPrimaryLabel', title: 'Hero primary CTA label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroCtaPrimaryHref', title: 'Hero primary CTA href', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'whyNowHeadline',
      title: 'Why now -- headline (Ecosystem Review Section 3: Nigeria energy-transition context)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whyNowBody',
      title: 'Why now -- body (rich text)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'servicesTeaserHeadline', title: 'Services teaser headline ("Two things, done properly.")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'featuredSolutions',
      title: 'Featured solutions (which Solutions show in the teaser)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'featuredPlatforms',
      title: 'Featured platforms (Ecosystem section)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'platform' }] }],
    }),
    defineField({
      name: 'proofPreviewHeadline',
      title: 'Proof preview -- headline (closing section that previews Proof rather than just linking to it)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'proofPreviewBody', title: 'Proof preview -- body', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'proofPreviewButtonLabel', title: 'Proof preview -- button label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'proofPreviewButtonHref', title: 'Proof preview -- button href', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'finalCtaHeadline', title: 'Final CTA band headline', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'finalCtaSubtext', title: 'Final CTA band subtext', type: 'string' }),
    defineField({ name: 'finalCtaButtonLabel', title: 'Final CTA button label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'finalCtaButtonHref', title: 'Final CTA button href', type: 'string', validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: 'heroHeadline' } },
});
