import { defineField, defineType } from 'sanity';

/**
 * Singleton -- Master Build Brief Section 5: this document holds ONLY the
 * page-level intro. The Solution copy itself lives in the `solution`
 * documents (avoids duplicating what Content OS already models).
 *
 * valuesHeadline/valuesBody/valuesColumns (added this phase) power the
 * Apple "Designed to make a difference" style overview section: a headline
 * + one body paragraph, then exactly 3 columns (icon assigned in code by
 * position -- no real icon assets exist yet, so this stays copy-only in
 * the CMS), each with a bold lead-in, body text, and a link. Solutions
 * page only -- not reused on Home.
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
    defineField({ name: 'valuesEyebrow', title: 'Values section eyebrow label (optional)', type: 'string' }),
    defineField({ name: 'valuesHeadline', title: 'Values section headline ("Building Africa\'s Energy Ecosystem.")', type: 'string' }),
    defineField({ name: 'valuesBody', title: 'Values section body paragraph', type: 'text' }),
    defineField({
      name: 'valuesColumns',
      title: 'Values section columns (exactly 3, in order)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'valueColumn',
          fields: [
            defineField({ name: 'leadIn', title: 'Bold lead-in phrase (e.g. "Engineering & Capacity Building:")', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'bodyText', title: 'Body text following the lead-in', type: 'text', validation: (Rule) => Rule.required() }),
            defineField({ name: 'linkLabel', title: 'Link label (e.g. "Explore our services →")', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'linkHref', title: 'Link href', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'leadIn' } },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: { select: { title: 'introText' } },
});
