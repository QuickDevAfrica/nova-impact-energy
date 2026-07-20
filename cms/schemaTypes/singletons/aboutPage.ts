import { defineField, defineType } from 'sanity';

/** Singleton -- Master Build Brief Section 3.2. */
export default defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'bodyBlocks',
      title: 'Body (rich text -- the three-paragraph structure)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'whatWeBelieveQuote', title: '"What we believe" pulled quote', type: 'text', validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: 'headline' } },
});
