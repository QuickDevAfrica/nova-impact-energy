import type { StructureResolver } from 'sanity/structure';
import { singletonTypes } from './schemaTypes';

/**
 * Pins the five page singletons + siteSettings at the top of the desk,
 * each editable as one document (never a list) -- then lists every
 * repeatable content type below. Keeps non-technical editors from
 * accidentally creating a second "Home page" document.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Site settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem().title('Home page').child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem().title('About page').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem().title('Solutions page (Services)').child(S.document().schemaType('servicesPage').documentId('servicesPage')),
      S.listItem().title('Proof page').child(S.document().schemaType('proofPage').documentId('proofPage')),
      S.listItem().title('Contact page').child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() && !singletonTypes.has(item.getId() as string)),
    ]);
