import { defineField, defineType } from 'sanity';

/**
 * Content OS Core Object 3 -- Solution. "What a customer actually buys."
 * `status` is the field the Content OS-to-UI Process document's Step 2/4
 * depends on: live Solutions render fully, planned Solutions render in the
 * muted "coming soon" treatment -- the frontend never hardcodes which is which.
 */
export default defineType({
  name: 'solution',
  title: 'Solution',
  type: 'document',
  fields: [
    defineField({
      name: 'nucid',
      title: 'NUCID (e.g. SOL-001) -- internal reference only, never shown on the site',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^SOL-\d{3}$/, { name: 'NUCID format' }),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (anchor id used by the Home page teaser card, e.g. "training", "oem")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'audience', title: 'Audience', type: 'text' }),
    defineField({ name: 'painPoint', title: 'Pain point', type: 'text' }),
    defineField({ name: 'outcome', title: 'Outcome', type: 'text' }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'process', title: 'Process', type: 'text' }),
    defineField({ name: 'pricingModel', title: 'Pricing model', type: 'string' }),
    defineField({
      name: 'summaryText',
      title: 'Body copy (rich text, used on the Services page block)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'relatedCapabilities',
      title: 'Related capabilities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'capability' }] }],
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Related projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label (the Services page block button -- e.g. "Enquire about training")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA link (the Services page block button -- usually /contact)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['live', 'planned'], layout: 'radio' },
      initialValue: 'planned',
      validation: (Rule) => Rule.required(),
      description: 'Drives visible vs. muted "coming soon" card treatment automatically. Never a manual disclaimer.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'nucid', status: 'status' },
    prepare({ title, subtitle, status }) {
      return { title, subtitle: `${subtitle} -- ${status}` };
    },
  },
});
