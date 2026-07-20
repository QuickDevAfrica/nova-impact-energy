import { defineField, defineType } from 'sanity';

/** Content OS Core Object 6 -- Project (Evidence). Powers the Our Impact page
 * and, at build/fetch time, the derived stat strip -- never a hand-typed number. */
export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'nucid',
      title: 'NUCID (e.g. PRJ-001)',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^PRJ-\d{3}$/, { name: 'NUCID format' }),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'industry', title: 'Industry', type: 'reference', to: [{ type: 'industry' }] }),
    defineField({ name: 'technology', title: 'Technology', type: 'string' }),
    defineField({
      name: 'capacityKw',
      title: 'Inverter capacity (kW) -- feeds the derived stat strip',
      type: 'number',
    }),
    defineField({
      name: 'storageKwh',
      title: 'Battery storage (kWh) -- feeds the derived stat strip',
      type: 'number',
    }),
    defineField({ name: 'scope', title: 'Scope / description', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            defineField({ name: 'alt', title: 'Alt text (descriptive, per-image)', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'isPlaceholder', title: 'Is placeholder (stock/AI-generated, not real project photography)', type: 'boolean', initialValue: true }),
          ],
        },
      ],
    }),
    defineField({ name: 'results', title: 'Results', type: 'text' }),
    defineField({ name: 'testimonial', title: 'Testimonial', type: 'text' }),
    defineField({
      name: 'relatedSolutions',
      title: 'Related solutions (which Solution this project validates)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'solution' }] }],
    }),
    defineField({ name: 'completionDate', title: 'Completion date', type: 'date' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['featured', 'standard'], layout: 'radio' },
      initialValue: 'standard',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'featured', title: 'Featured (large card on Our Impact)', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required() }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'nucid', media: 'images.0' },
  },
});
