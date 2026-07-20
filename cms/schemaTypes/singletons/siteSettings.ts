import { defineField, defineType } from 'sanity';

/**
 * Singleton. Content OS Core Object 1 (Company) contact fields, plus the
 * stats block. `stats` are intentionally NOT stored as manually-typed numbers --
 * Build Charter rule 5 / Master Build Brief Section 5: the stat strip is
 * computed from live `project` documents at fetch time. This schema only
 * holds the `statesLabel` string (e.g. "Lagos & Ogun States") since that's
 * prose, not a derivable number -- the three numeric stats are computed in
 * apps/marketing/lib/getStats.ts, never entered here.
 */
export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: 'Company name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'statesLabel', title: 'States label (e.g. "Lagos & Ogun States")', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'contactPhone', title: 'Contact phone', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'contactWebsite', title: 'Website', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'navLinks',
      title: 'Nav links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'href', title: 'Href', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({ name: 'navCtaLabel', title: 'Nav CTA label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'navCtaHref', title: 'Nav CTA href', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'footerCopyright', title: 'Footer copyright line', type: 'string', validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: 'companyName' } },
});
