# @nova/assets

Shared image/icon/illustration/video library for the entire Nova ecosystem
(Master Build Brief Section 9). Every app -- `apps/marketing` today, and
`apps/learn` / `apps/partners` / `apps/monitor` later -- pulls from this one
package. Update an asset once here; every connected app reflects it.

## Structure
```
images/hero        hero backgrounds (hero-home.avif, hero-about.avif, ...)
images/projects     Our Impact project photos, real + tagged placeholders
                    (project-bank-branch-lagos.avif, project-residential-mowe.avif, ...)
images/team         team/work photography
images/services     Services page imagery
illustrations       flat, line-based, brand-recolored SVGs -- ONE style only
                    (source: unDraw primary, Storyset backup) -- see sizing rule below
icons               SVG only, Tabler primary / Lucide+Heroicons backup, colored
                    via CSS from design-tokens, never a hardcoded fill
logos               logo-mark.svg, logo-full.svg
lottie              motion, used sparingly -- state changes only, never decorative
videos              training/cohort footage, once it exists
```

## Rules (Build Charter constitution + Master Build Brief Section 9)
- Naming: `hero-home.avif`, `project-bank-branch-lagos.avif`, `icon-solar-panel.svg`,
  `logo-mark.svg`. Never version-in-filename (`final-v2`) -- version control is
  Git/CMS history, not the filename.
- Every illustration ships in exactly three fixed sizes: **large** (full hero/section,
  100% width of a two-column block), **medium** (card-level, Solution/Ecosystem cards),
  **small** (inline icon-scale, list items/FAQ/footer). Never an arbitrary size.
  See `packages/ui`'s `IllustrationFrame` component, which enforces this at the
  component level.
- Every stock/AI-generated placeholder image is tagged `isPlaceholder: true` in the
  Sanity `image` field it's attached to (Master Build Brief Section 6) -- never
  swapped by editing a component.
- Flat, line-based illustration style only -- no 3D, no isometric, no gradients.
- Icons inherit color from design-tokens CSS variables (`--nova-sage` muted,
  `--nova-teal` interactive) -- never a hardcoded hex in the SVG itself.

This folder is intentionally empty of real binaries at scaffold time (V1 launches
on placeholder/AI-generated imagery per Master Build Brief Section 9.4 while real
project photography is gathered) -- `.gitkeep` files hold the folder structure so
the pipeline in Section 9.9 has somewhere to land assets from day one.
