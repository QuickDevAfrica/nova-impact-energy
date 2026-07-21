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
    defineField({
      name: 'founderStoryHeadline',
      title: 'Founder / origin story -- headline (Ecosystem Review Section 3)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'founderStoryBody',
      title: 'Founder / origin story -- body (rich text)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'howWeWorkHeadline',
      title: 'How we work -- headline (research-driven approach)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'howWeWorkBody',
      title: 'How we work -- body (rich text)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'whatWeBelieveQuote', title: '"What we believe" pulled quote', type: 'text', validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: 'headline' } },
});
