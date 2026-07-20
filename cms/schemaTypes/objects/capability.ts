import { defineField, defineType } from 'sanity';

/** Content OS Core Object 2 -- Capability. Not directly rendered as its own
 * page/card in V1; referenced inside Solution/Project copy per the
 * Content OS-to-UI Process Step 2 table. */
export default defineType({
  name: 'capability',
  title: 'Capability',
  type: 'document',
  fields: [
    defineField({
      name: 'nucid',
      title: 'NUCID (e.g. CAP-001)',
      type: 'string',
      validation: (Rule) => Rule.required().regex(/^CAP-\d{3}$/, { name: 'NUCID format' }),
    }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({ name: 'problemSolved', title: 'Problem solved', type: 'text' }),
    defineField({ name: 'competencies', title: 'Competencies', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'owner', title: 'Owner (accountable person)', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['active', 'latent'], layout: 'radio' },
      initialValue: 'active',
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
