import { defineField, defineType } from 'sanity';

/** Content OS Core Object 12 -- Download. */
export default defineType({
  name: 'download',
  title: 'Download',
  type: 'document',
  fields: [
    defineField({
      name: 'nucid',
      title: 'NUCID (e.g. DL-001)',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^DL-\d{3}$/, { name: 'NUCID format' }),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'file', title: 'File', type: 'file' }),
    defineField({ name: 'relatedSolution', title: 'Related solution', type: 'reference', to: [{ type: 'solution' }] }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['live', 'planned'], layout: 'radio' },
      initialValue: 'planned',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'nucid' } },
});
