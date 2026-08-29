# OpenSourceStack

> Hand-curated directory of open source SaaS alternatives.

**Live site:** https://opensourcestack.ink (when deployed)
**Status:** Phase 2 — initial build, ready to deploy.

---

## What this is

A static-first directory of open source alternatives to popular SaaS. Every project is hand-reviewed, tested where possible, and scored for production-readiness. No user accounts, no database, no login wall.

**Why it exists:** every other OSS directory is either an auto-aggregator (alternativeto.net) or stale (switching.software). There's room for an opinionated, well-maintained, editorially-scored list.

## Stack

Identical to AgentStack — Astro 5 + Tailwind + JSON-in-repo + Cloudflare Pages + Cloudflare Web Analytics + Google AdSense + PayPal + GitHub Actions.

**Total monthly cost:** $0 (just the domain, ~$2.98/yr on Namecheap promo TLDs).

## Quick start

```bash
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static build to dist/
```

## Adding a new listing

Create `/data/listings/your-slug.json` following the same shape as the existing 20. Commit and push.

## Deployment

1. Buy `opensourcestack.ink` at Namecheap (~$2.98/yr)
2. Push to GitHub (already done — see `appenzellerdigitalstore-stack/opensourcestack`)
3. Connect Cloudflare Pages → connect to the repo → build `npm run build` / output `dist`
4. Add custom domain `opensourcestack.ink` → add the CNAME at Namecheap
5. Enable Cloudflare Web Analytics
6. Apply for AdSense after ~1 month of traffic

## Sister site

AgentStack (https://agentstack.ink) — the same playbook applied to AI agent components. They share the same codebase, same monetization, same status-check cron.

## License

Content is CC-BY-SA 4.0. Code is MIT.
