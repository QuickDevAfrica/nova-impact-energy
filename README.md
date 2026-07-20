# Nova Impact Energy Limited -- production website

Turborepo monorepo, built per the Build Charter's five-phase order. Status:

- [x] Phase 1 -- design tokens, content model, Sanity schemas, asset folders
- [x] Phase 2 -- shared UI component library (`packages/ui`)
- [x] Phase 3 -- the five marketing pages (`apps/marketing`), each fetching every word of copy from Sanity
- [ ] Phase 4 -- real content in the CMS (script written, needs to be run by you -- see below)
- [ ] Phase 5 -- deploy to Vercel via GitHub (needs to be done by you -- see below)

Phases 4 and 5 need two things this build environment doesn't have: network access to
`api.sanity.io` / `vercel.com`, and your actual Vercel account. Everything up to that
point -- all schemas, all components, all five pages, the seed script, the contact
form's Resend + Airtable wiring -- is written, and the marketing app builds cleanly
(`next build` passes with zero type errors).

## Repo layout

```
apps/marketing        Next.js 14 App Router site -- Home, About, Services, Our Impact, Contact
packages/design-tokens Brand tokens (colors/type/spacing), CSS + Tailwind preset -- one source of truth
packages/content-model TypeScript types for all 16 Content OS objects
packages/ui            Shared components: Nav, Button, Card, SolutionCard, EcosystemCard,
                        ProjectCard, StatStrip, Footer, ContactForm, IllustrationFrame, etc.
packages/assets         Shared image/icon/illustration folders (empty at scaffold time -- see below)
cms/                    Sanity Studio -- schemas for solution, capability, project, industry,
                        download, platform, and the five page singletons
scripts/seed-content.mjs  Phase 4 -- populates the 2 live Solutions + 4 Projects + page copy
```

## Non-negotiables this build follows

Every word on every page is a Sanity field -- there is no English text hardcoded into a
component. In development, a missing required field throws (`lib/requireField.ts`)
instead of silently falling back to placeholder copy. Brand tokens are copy-pasted
verbatim from the Master Build Brief / UI-UX Handoff into `packages/design-tokens` --
nothing approximated. Every Solution/Platform status (`live`/`planned`) and Capability
status (`active`/`latent`) drives a muted "coming soon" treatment automatically
(`StatusBadge`, `SolutionCard`, `EcosystemCard`) -- no page hand-adds a disclaimer.
NUCIDs (`SOL-001`, etc.) only ever appear in `nucid` fields and code comments, never in
rendered copy. Illustrations are wrapped in `IllustrationFrame`, which only accepts
`large` / `medium` / `small`. The stat strip is computed from real `project` documents
at fetch time (`lib/getStats.ts`) -- there is no hand-typed "4 projects" anywhere.

One content-model decision that wasn't fully specified in the five source documents:
the Home page teaser card and the Services page block both render the same `solution`
document, but need different links (Home -> `/services#slug` to read more; Services ->
`/contact` to enquire). Resolved by adding a `slug` field to `solution` and letting the
Home page override the card's CTA -- same object, two contexts, per Content OS Law 3.
Documenting it here rather than silently deciding it.

## Local setup

```bash
npm install
cp apps/marketing/.env.example apps/marketing/.env.local
cp cms/.env.example cms/.env
```

Fill in `apps/marketing/.env.local`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` -- already defaulted to `3dg6yd6t` / `production`
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` -- see Resend note below
- `AIRTABLE_API_TOKEN`, `AIRTABLE_BASE_ID` (defaulted to `app83eoh8xGfwbaAz`), `AIRTABLE_TABLE_NAME`

Run the Studio: `npm run dev --workspace=@nova/cms` (opens locally, connects to the real project/dataset).
Run the site: `npm run dev --workspace=@nova/marketing`.

## Phase 4 -- populate real content

This has to be run from a machine with normal internet access (this build sandbox's
network is locked to an allowlist that excludes `api.sanity.io`):

```bash
npm install
SANITY_API_TOKEN=<a token with write access> node scripts/seed-content.mjs
```

This creates: 6 Capabilities, 2 Industries (Residential, Commercial & Industrial),
2 live Solutions (SOL-001 Training & Certification, SOL-002 OEM Technical & Channel
Partnerships) with the real V1 copy, 4 Projects (PRJ-001..004) with the real capacity/
storage figures -- which is where the site's "163kW+" and "260kWh" stats actually come
from, derived, not typed in -- and all five page singletons. It's idempotent (fixed
`_id` per document, `createOrReplace`), so re-running it after a copy fix just updates
those same records.

Two things to do by hand afterward in the Studio, since they need real files/decisions
this script can't make for you:
1. Upload an image to each of the 4 Project documents (tag `isPlaceholder: true` until
   real project photography replaces it -- Master Build Brief Section 6/9.4).
2. PRJ-004's `location` field is set to `"Nigeria"` -- the source documents never state
   a specific city for that project. Correct it in the Studio if you know the real one.

## Phase 5 -- deploy to Vercel via GitHub

This build sandbox can't reach `vercel.com` either, so this is a you-step:

1. Push this repo to `github.com/QuickDevAfrica/nova-impact-energy` (main branch).
2. In Vercel: **Add New Project** -> import that repo -> set **Root Directory** to
   `apps/marketing` (this is a monorepo; Vercel needs to know which app to build).
3. Add these environment variables in the Vercel project settings:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `3dg6yd6t`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `CONTACT_TO_EMAIL` = `ask@novaimpactenergy.com`
   - `AIRTABLE_API_TOKEN`
   - `AIRTABLE_BASE_ID` = `app83eoh8xGfwbaAz`
   - `AIRTABLE_TABLE_NAME` = whatever you name the table (see below)
4. Deploy. Every push to `main` auto-deploys from then on (Master Build Brief Section 4).
5. Point `novaimpactenergy.com` at the Vercel project (Vercel's dashboard walks you
   through the DNS records) once you're ready to go live.

To deploy the Studio itself (so non-technical editors have a URL to log into,
separate from the Next.js site): `npm run deploy --workspace=@nova/cms` from a machine
with normal network access -- this publishes to `<project>.sanity.studio` via Sanity's
own hosting.

### Resend
`RESEND_FROM_EMAIL` has to be an address on a domain you've verified in Resend's
dashboard (Resend won't send "from" an unverified domain). If `novaimpactenergy.com`
isn't verified there yet, verify it first, or send from Resend's onboarding domain
temporarily and switch once it's verified.

### Airtable
The contact form logs each submission to a table via the Airtable REST API
(`app/api/contact/route.ts`). Create a table in base `app83eoh8xGfwbaAz` with these
exact field names (or adjust the field names in `route.ts` to match a table you
already have): `Name`, `Email`, `Phone`, `Reaching out about`, `Message`,
`Submitted at`. This build sandbox couldn't read your base's existing schema
(`api.airtable.com` is outside its network allowlist), so this wasn't verified against
what's actually in `app83eoh8xGfwbaAz` -- check before going live.

## QA checklist (Content OS-to-UI Process, Step 5) -- run per page before shipping

- [ ] Every dark section background is `#0B3B37`
- [ ] Every CTA button is `#F7E6A0` with `#0A2422` text
- [ ] Accent color (links/icons/highlights) is `#7FE3A8` mint
- [ ] All body/heading text on light backgrounds is `#0A2422`
- [ ] Every stat shown is derived from real project data
- [ ] Every "planned" Solution/Platform is visibly muted vs. "live" ones
- [ ] No NUCID appears in rendered copy
- [ ] Every illustration is large/medium/small, never an arbitrary size
- [ ] Every Solution/Ecosystem card carries a real illustration or icon

`packages/assets` ships with empty folders (`.gitkeep` only) -- V1 launches on
AI-generated/stock placeholder imagery per Master Build Brief Section 9.4 while real
project photography is gathered, so the last two checklist items apply once
illustrations/icons are actually sourced (unDraw/Tabler per Section 9.2-9.3) and
dropped into those folders.
