import { defineField, defineType } from 'sanity';

/**
 * Singleton -- Master Build Brief Section 5: this document holds ONLY the
 * page-level intro. The Solution copy itself lives in the `solution`
 * documents (avoids duplicating what Content OS already models).
 */
export default defineType({
  name: 'servicesPage',
  title: 'Services page',
  type: 'document',
  fields: [
    defineField({ name: 'introText', title: 'Intro text ("Two things, done properly.")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'featuredSolutions',
      title: 'Solutions to render on this page, in order',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: { select: { title: 'introText' } },
});
