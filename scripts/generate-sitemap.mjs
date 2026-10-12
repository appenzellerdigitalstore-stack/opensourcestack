// scripts/generate-sitemap.mjs
// Build-time sitemap generator. Reads route data and writes a static sitemap.xml
// to public/ (so Nitro's cloudflare-pages preset copies it to dist/).
//
// Run via: node scripts/generate-sitemap.mjs
// Wire in via npm run build: "build": "node scripts/generate-sitemap.mjs && vite build"
//
// Configurable at the top: SITEMAP_BASE_URL + per-site routes array.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ------------------ CONFIG ------------------
// Edit this for each site. Listed here as the example for opensourcestack.
const SITE_CONFIG = {
  // opensourcestack.ink
  base: "https://opensourcestack.ink",
  changefreq: {
    home: "weekly",
    listing: "monthly",
    static: "monthly",
  },
  priority: {
    home: "1.0",
    listing: "0.8",
    static: "0.5",
  },
};
// --------------------------------------------

// Load listings (101) from the Astro data
const dataDir = resolve(ROOT, "data", "listings");
const listingFiles = readdirSync(dataDir).filter(f => f.endsWith(".json"));
const slugs = listingFiles
  .map(f => f.replace(/\.json$/, ""))
  .filter(s => s !== "listings-index"); // exclude index file if it exists

const today = new Date().toISOString().split("T")[0];

const urls = [
  { loc: SITE_CONFIG.base + "/", changefreq: SITE_CONFIG.changefreq.home, priority: SITE_CONFIG.priority.home, lastmod: today },
  { loc: SITE_CONFIG.base + "/about", changefreq: SITE_CONFIG.changefreq.static, priority: SITE_CONFIG.priority.static },
  { loc: SITE_CONFIG.base + "/methodology", changefreq: SITE_CONFIG.changefreq.static, priority: SITE_CONFIG.priority.static },
  { loc: SITE_CONFIG.base + "/contact", changefreq: SITE_CONFIG.changefreq.static, priority: SITE_CONFIG.priority.static },
  ...slugs.map(s => ({
    loc: `${SITE_CONFIG.base}/listings/${s}`,
    changefreq: SITE_CONFIG.changefreq.listing,
    priority: SITE_CONFIG.priority.listing,
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

const out = resolve(ROOT, "public", "sitemap.xml");
writeFileSync(out, xml, "utf8");
console.log(`OK: wrote ${urls.length} URLs to ${out}`);
