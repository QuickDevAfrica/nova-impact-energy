import { defineField, defineType } from 'sanity';

/** Singleton -- Master Build Brief Section 3.5 / 6.5. `formOptions` is the
 * "I'm reaching out about" pill list -- adding an option is a CMS edit,
 * never a code change. */
export default defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Eyebrow label ("CONTACT") -- content-standard redesign', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'bodyText', title: 'Body text (2-3 short lines)', type: 'text', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'formOptions',
      title: '"I\'m reaching out about" options',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: { select: { title: 'headline' } },
});
