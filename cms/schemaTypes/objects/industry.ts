import { defineField, defineType } from 'sanity';

/** Content OS Core Object 5 -- Industry. */
export default defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({
      name: 'nucid',
      title: 'NUCID (e.g. IND-001)',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^IND-\d{3}$/, { name: 'NUCID format' }),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
  ],
  preview: { select: { title: 'name', subtitle: 'nucid' } },
});
