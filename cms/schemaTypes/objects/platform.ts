import { defineField, defineType } from 'sanity';

/** Content OS Core Object 4 -- Platform. Powers the Ecosystem section.
 * All six starting records are `planned` today -- none is live -- and the
 * Ecosystem card component must render every one of them muted until a
 * status genuinely flips. */
export default defineType({
  name: 'platform',
  title: 'Platform',
  type: 'document',
  fields: [
    defineField({
      name: 'nucid',
      title: 'NUCID (e.g. PLT-001)',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^PLT-\d{3}$/, { name: 'NUCID format' }),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'purpose', title: 'Purpose', type: 'text' }),
    defineField({ name: 'users', title: 'Users', type: 'text' }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'roadmap', title: 'Roadmap', type: 'text' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['planned', 'live'], layout: 'radio' },
      initialValue: 'planned',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'nucid', status: 'status' },
    prepare({ title, subtitle, status }) {
      return { title, subtitle: `${subtitle} -- ${status}` };
    },
  },
});
