/**
 * Build Charter constitution, rule 2: "Nothing is hardcoded. Every word of
 * copy comes from a CMS field. If a field is empty, the build fails loudly
 * in development -- it never silently falls back to placeholder English
 * written into a component."
 *
 * Every page component calls this on every required field it renders.
 * In production we log and render nothing for that slot rather than
 * crashing a live page for a visitor -- but in development it throws,
 * so a missing field is caught immediately, at the desk, not in prod.
 */
export function requireField<T>(value: T | null | undefined, fieldPath: string): T {
  const isEmpty =
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0);

  if (isEmpty) {
    const message = `[Content OS] Required field "${fieldPath}" is empty in Sanity. Nothing is hardcoded -- fill in this field in the CMS rather than adding placeholder text to the component.`;
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(message);
    }
    // eslint-disable-next-line no-console
    console.error(message);
  }

  return value as T;
}
