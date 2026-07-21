import { defineField, defineType } from 'sanity';

/**
 * Content OS Core Object 14 -- FAQ. Modeled in packages/content-model/src/
 * types.ts from the start (question, answer, category, relatedSolution,
 * relatedCourse, relatedPlatform) but never had a live Sanity schema until
 * Phase 2 task 5 -- Ecosystem Review Section 3 asks for "an FAQ section per
 * Solution... implement it as a real reusable object, not hardcoded per
 * page." A real document type (not an inline array of strings) is what
 * makes it reusable -- the same FAQ could in principle be linked from a
 * Solution and a Platform at once.
 */
export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'nucid',
      title: 'NUCID (e.g. FAQ-001) -- internal reference only, never shown on the site',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^FAQ-\d{3}$/, { name: 'NUCID format' }),
    }),
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'relatedSolution', title: 'Related solution', type: 'reference', to: [{ type: 'solution' }] }),
    defineField({ name: 'relatedPlatform', title: 'Related platform', type: 'reference', to: [{ type: 'platform' }] }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'nucid' },
  },
});
