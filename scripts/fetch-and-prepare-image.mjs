// Image pipeline: Unsplash search -> approve -> WebP conversion -> place asset.
//
// This repo has two genuinely different image destinations, and this script
// handles both -- pick the right one per image:
//
//   1. STATIC section images (e.g. the Home hero, ENOVA feature, service
//      cards) -- these are referenced directly in JSX by file path
//      (apps/marketing/app/page.tsx currently has empty placeholder <div>s
//      with comments like "/images/home/hero-energy.webp"). They are NOT
//      Sanity fields. `prepare --dest <static dir>` writes the WebP there;
//      wiring the actual <Image> tag into the component is a separate code
//      change (not done by this script).
//
//   2. SANITY-driven images (e.g. `project.images`, which has a real
//      `isPlaceholder` boolean field in the schema) -- `publish-sanity`
//      uploads the asset to Sanity and patches the target document, tagged
//      isPlaceholder: true, matching the existing project/schema design.
//
// Both Unsplash and Sanity API calls require real outbound network access
// -- run this from your own machine, not inside a sandboxed build
// environment (same constraint as scripts/seed-content.mjs).
//
// Setup:
//   cd nova-impact-energy
//   npm install
//   export UNSPLASH_ACCESS_KEY=<your Unsplash access key>   (https://unsplash.com/developers)
//
// Usage:
//   node scripts/fetch-and-prepare-image.mjs search "solar panel installation Nigeria" [--per-page 5]
//   node scripts/fetch-and-prepare-image.mjs prepare <photoId> --slug hero-energy --dest apps/marketing/public/images/home [--width 1920] [--quality 82]
//   node scripts/fetch-and-prepare-image.mjs publish-sanity <slug> --file <path/to/converted.webp> --doc-type project --doc-id project-prj-001 --alt "Descriptive alt text"
//     (publish-sanity additionally requires SANITY_API_TOKEN with write access)

import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_API = 'https://api.unsplash.com';

function requireUnsplashKey() {
  if (!UNSPLASH_ACCESS_KEY) {
    console.error(
      'Missing UNSPLASH_ACCESS_KEY.\nGet one at https://unsplash.com/developers, then:\n  export UNSPLASH_ACCESS_KEY=your_access_key'
    );
    process.exit(1);
  }
}

async function unsplashFetch(url) {
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } });
  if (!res.ok) {
    throw new Error(`Unsplash API error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

function humanSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

// ---------------------------------------------------------------- search --

async function cmdSearch(query, { perPage = 5 } = {}) {
  requireUnsplashKey();
  if (!query) {
    console.error('Usage: search "<query>" [--per-page 5]');
    process.exit(1);
  }
  const url = `${UNSPLASH_API}/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
  const data = await unsplashFetch(url);

  if (!data.results?.length) {
    console.log('No results.');
    return;
  }

  console.log(`Top ${data.results.length} results for "${query}":\n`);
  data.results.forEach((p, i) => {
    console.log(`[${i + 1}] id=${p.id}`);
    console.log(`    ${p.description || p.alt_description || '(no description)'}`);
    console.log(`    ${p.width}x${p.height} -- by ${p.user.name} (${p.user.links.html})`);
    console.log(`    preview: ${p.urls.small}`);
    console.log(`    page:    ${p.links.html}`);
    console.log('');
  });
}

// --------------------------------------------------------------- prepare --

async function downloadAndConvert(photoId, { width = 1920, quality = 82 } = {}) {
  const photo = await unsplashFetch(`${UNSPLASH_API}/photos/${photoId}`);

  // Required by Unsplash API guidelines: register the download before use.
  await fetch(photo.links.download_location, {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  }).catch(() => {});

  const rawUrl = `${photo.urls.raw}&w=${width}&fm=jpg&q=90&fit=max`;
  const imgRes = await fetch(rawUrl);
  if (!imgRes.ok) throw new Error(`Failed to download image: HTTP ${imgRes.status}`);
  const originalBuffer = Buffer.from(await imgRes.arrayBuffer());

  const converted = await sharp(originalBuffer)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer();

  const meta = await sharp(converted).metadata();

  return { photo, originalBuffer, converted, meta };
}

async function writeCredits(dest, entry) {
  const creditsPath = path.join(dest, 'CREDITS.json');
  let credits = [];
  try {
    credits = JSON.parse(await fs.readFile(creditsPath, 'utf8'));
  } catch {}
  credits = credits.filter((c) => c.slug !== entry.slug);
  credits.push(entry);
  await fs.writeFile(creditsPath, JSON.stringify(credits, null, 2));
  return creditsPath;
}

async function cmdPrepare(photoId, opts) {
  requireUnsplashKey();
  const { slug, dest, width, quality } = opts;
  if (!photoId || !slug || !dest) {
    console.error(
      'Usage: prepare <photoId> --slug <name> --dest <dir> [--width 1920] [--quality 82]'
    );
    process.exit(1);
  }

  const { photo, originalBuffer, converted, meta } = await downloadAndConvert(photoId, {
    width: width ? Number(width) : undefined,
    quality: quality ? Number(quality) : undefined,
  });

  await fs.mkdir(dest, { recursive: true });
  const outPath = path.join(dest, `${slug}.webp`);
  await fs.writeFile(outPath, converted);

  console.log('Before/after:');
  console.log(`  downloaded (jpg) : ${humanSize(originalBuffer.length)}`);
  console.log(`  converted (webp) : ${humanSize(converted.length)}  (${meta.width}x${meta.height})`);
  console.log(
    `  reduction        : ${(100 - (converted.length / originalBuffer.length) * 100).toFixed(0)}%`
  );
  console.log(`  saved to         : ${outPath}`);
  console.log('');
  console.log('Attribution (Unsplash requires credit):');
  console.log(`  Photo by ${photo.user.name} on Unsplash -- ${photo.links.html}`);

  const creditsPath = await writeCredits(dest, {
    slug,
    unsplashId: photo.id,
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
    photoUrl: photo.links.html,
    isPlaceholder: true,
    addedAt: new Date().toISOString(),
  });
  console.log(`  credit recorded  : ${creditsPath}`);
}

// ---------------------------------------------------------- publish-sanity --

async function cmdPublishSanity(slug, opts) {
  const { file, docType, docId, alt } = opts;
  if (!file || !docType || !docId || !alt) {
    console.error(
      'Usage: publish-sanity <slug> --file <path/to/converted.webp> --doc-type <type> --doc-id <id> --alt "<alt text>"'
    );
    process.exit(1);
  }

  const projectId = process.env.SANITY_PROJECT_ID || '3dg6yd6t';
  const dataset = process.env.SANITY_DATASET || 'production';
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    console.error('Missing SANITY_API_TOKEN. Set it to a token with write access, then re-run.');
    process.exit(1);
  }

  const { createClient } = await import('@sanity/client');
  const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

  const buffer = await fs.readFile(file);
  console.log(`Uploading ${file} (${humanSize(buffer.length)}) to Sanity asset store...`);
  const asset = await client.assets.upload('image', buffer, { filename: `${slug}.webp` });

  console.log(`Patching ${docType}/${docId} -- appending image (isPlaceholder: true)...`);
  await client
    .patch(docId)
    .setIfMissing({ images: [] })
    .append('images', [
      {
        _type: 'image',
        _key: `${slug}-${Date.now()}`,
        asset: { _type: 'reference', _ref: asset._id },
        alt,
        isPlaceholder: true,
      },
    ])
    .commit();

  console.log('Done. Published to Sanity (production dataset -- live immediately, no separate draft/publish step for this content type).');
}

// -------------------------------------------------------------------- CLI --

function parseFlags(args) {
  const flags = {};
  const positional = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const value = args[i + 1] !== undefined && !args[i + 1].startsWith('--') ? args[++i] : true;
      flags[key] = value;
    } else {
      positional.push(args[i]);
    }
  }
  return { flags, positional };
}

function printUsage() {
  console.log(`Usage:
  node scripts/fetch-and-prepare-image.mjs search "<query>" [--per-page 5]
  node scripts/fetch-and-prepare-image.mjs prepare <photoId> --slug <name> --dest <dir> [--width 1920] [--quality 82]
  node scripts/fetch-and-prepare-image.mjs publish-sanity <slug> --file <path> --doc-type <type> --doc-id <id> --alt "<text>"

Env:
  UNSPLASH_ACCESS_KEY   required for search/prepare -- https://unsplash.com/developers
  SANITY_API_TOKEN      required for publish-sanity (write access)
  SANITY_PROJECT_ID     defaults to 3dg6yd6t
  SANITY_DATASET        defaults to production
`);
}

async function main() {
  const [, , cmd, ...rest] = process.argv;
  const { flags, positional } = parseFlags(rest);

  if (cmd === 'search') {
    await cmdSearch(positional.join(' '), { perPage: Number(flags['per-page']) || 5 });
  } else if (cmd === 'prepare') {
    await cmdPrepare(positional[0], {
      slug: flags.slug,
      dest: flags.dest,
      width: flags.width,
      quality: flags.quality,
    });
  } else if (cmd === 'publish-sanity') {
    await cmdPublishSanity(positional[0], {
      file: flags.file,
      docType: flags['doc-type'],
      docId: flags['doc-id'],
      alt: flags.alt,
    });
  } else {
    printUsage();
    process.exit(cmd ? 1 : 0);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
