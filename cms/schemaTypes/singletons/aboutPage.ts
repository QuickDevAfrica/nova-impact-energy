import { defineField, defineType } from 'sanity';

/**
 * Singleton -- Master Build Brief Section 3.2.
 *
 * Content-standard redesign (explicit instruction): 8 sections, closer to
 * Apple's communication style. Several fields are reused for new content
 * rather than adding parallel fields for the same shape:
 *   - `bodyBlocks` now holds the hero's 2 short paragraphs (previously a
 *     3-paragraph structure).
 *   - `founderStoryHeadline`/`founderStoryBody` now hold Section 3 ("Why
 *     we exist") -- same shape (headline + rich text body), new copy. The
 *     founder-story content this held before is superseded by this
 *     section, not preserved elsewhere on this page.
 *   - `howWeWorkHeadline` now holds Section 5's "How we work." heading;
 *     `howWeWorkBody` now holds its short 2-sentence intro (not the old
 *     "research-driven approach" body).
 *   - `whatWeBelieveQuote` is kept (not deleted) but no longer rendered --
 *     the new 8-section spec doesn't include a pulled-quote section.
 * Everything else below is new.
 */
export default defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({ name: 'heroLabel', title: 'Hero eyebrow label ("ABOUT")', type: 'string' }),
    defineField({ name: 'headline', title: 'Hero headline ("Built on engineering. Driven by impact.")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'bodyBlocks',
      title: 'Hero body (rich text, 2 short paragraphs)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({ name: 'pillarsHeadline', title: 'Pillars section headline ("Four pillars. One mission.")', type: 'string' }),
    defineField({ name: 'pillarsBody', title: 'Pillars section subhead', type: 'text' }),
    defineField({
      name: 'pillars',
      title: 'Pillars (4 equal cards, in order)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pillarCard',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    defineField({
      name: 'founderStoryHeadline',
      title: '"Why we exist" headline (repurposed field -- was the founder/origin story headline)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'founderStoryBody',
      title: '"Why we exist" body, rich text (repurposed field -- was the founder/origin story body)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({ name: 'valueHeadline', title: '"How we create value" headline', type: 'string' }),
    defineField({
      name: 'valueCards',
      title: '"How we create value" cards (3, in order)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'valueCard',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),

    defineField({
      name: 'howWeWorkHeadline',
      title: '"How we work" headline (repurposed field)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'howWeWorkBody',
      title: '"How we work" short intro, rich text (repurposed field -- was the longer research-driven-approach body)',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'processCards',
      title: '"How we work" process steps (5 horizontal cards, in order)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'processCard',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        },
      ],
      validation: (Rule) => Rule.max(5),
    }),

    defineField({ name: 'visionHeadline', title: '"Looking ahead" headline', type: 'string' }),
    defineField({
      name: 'visionBody',
      title: '"Looking ahead" body, rich text',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({ name: 'guidesHeadline', title: '"What guides us" headline', type: 'string' }),
    defineField({
      name: 'coreValues',
      title: '"What guides us" values (4 minimalist cards, in order)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'coreValueCard',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    defineField({ name: 'closingCtaHeadline', title: 'Closing CTA headline ("Let\'s build what\'s next.")', type: 'string' }),
    defineField({ name: 'closingCtaBody', title: 'Closing CTA body text', type: 'text' }),
    defineField({ name: 'closingCtaButtonLabel', title: 'Closing CTA button label ("Get in touch →")', type: 'string' }),
    defineField({ name: 'closingCtaButtonHref', title: 'Closing CTA button href', type: 'string' }),

    defineField({ name: 'whatWeBelieveQuote', title: '"What we believe" pulled quote (kept, not currently rendered on this page)', type: 'text' }),
  ],
  preview: { select: { title: 'headline' } },
});
