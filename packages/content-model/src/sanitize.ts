/**
 * Build Charter rule 6: "NUCIDs are internal only ... they never appear in
 * user-facing copy." That rule was written as an editorial instruction
 * (don't type SOL-001 into a CMS field meant for visitors), but the same
 * discipline the Charter applies to status ("structural, not manual" --
 * rule 4) belongs here too: rendering should strip a leaked NUCID rather
 * than trust every editor to remember not to type one into, say, an image
 * alt-text field.
 *
 * Matches a leading NUCID + separator, e.g. "PRJ-001 -- ", "SOL-001 — ",
 * "CAP-001 - " -- covering every prefix in Content OS Section 5.
 */
const NUCID_PREFIX = /^(SOL|CAP|PLT|IND|PRJ|PTR|CRS|CRT|ART|GD|WP|VID|DL|EVT|FAQ|PRD|PPL)-\d{2,4}\s*[—–-]\s*/i;

export function stripLeakedNucid(text: string): string {
  return text.replace(NUCID_PREFIX, '');
}
