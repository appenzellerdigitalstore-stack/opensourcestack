import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Github, ExternalLink, Shield, Activity } from "lucide-react";
import { getListing, relatedListings } from "@/lib/directory";

export const Route = createFileRoute("/listings/$slug")({
  loader: ({ params }) => {
    const listing = getListing(params.slug);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: loaderData.listing.seo.metaTitle },
      { name: "description", content: loaderData.listing.seo.metaDescription },
      { property: "og:title", content: loaderData.listing.name },
      { property: "og:description", content: loaderData.listing.tagline },
      { property: "og:type", content: "article" },
    ],
  }) : {},
  component: ListingPage,
});

function ListingPage() {
  const { listing } = Route.useLoaderData();
  const initial = listing.name.charAt(0).toUpperCase();
  const related = relatedListings(listing.slug, listing.category, 3);
  const sections = parseLongDescription(listing.longDescription);

  return <main className="listing-page shell">
    <div className="listing-header">
      <span className="project-logo" data-tone="violet" aria-hidden>{initial}</span>
      <div>
        <div className="eyebrow">{categoryName(listing.category)}</div>
        <h1>{listing.name}</h1>
        <p className="tagline">{listing.tagline}</p>
      </div>
    </div>

    <div className="meta-row">
      <span className="small-tag"><Shield size={10} style={{ marginRight: 4, verticalAlign: -1 }} />{listing.trust.isOfficial ? "Official" : "Community"}</span>
      <span className="small-tag">Verified</span>
      <span>Security: <strong>{listing.trust.securityScore}/100</strong></span>
      <span>Quality: <strong>{listing.trust.qualityScore}/100</strong></span>
      <span><Activity size={10} style={{ verticalAlign: -1 }} /> {listing.status.uptimePct30d.toFixed(1)}% uptime · {listing.status.avgLatencyMs}ms · {relativeTime(listing.status.lastCheck)}</span>
    </div>

    <div className="listing-actions">
      {listing.externalUrl && <a className="btn-glow" href={listing.externalUrl} target="_blank" rel="noreferrer">Visit {listing.name}<ExternalLink size={12} /></a>}
      {listing.repoUrl && <a className="btn-outline" href={listing.repoUrl} target="_blank" rel="noreferrer"><Github size={12} />Source</a>}
    </div>

    <div className="listing-body">
      <article className="listing-content">
        {sections.map((s, i) => {
          if (s.kind === "h2") return <h2 key={i}>{s.text}</h2>;
          if (s.kind === "h3") return <h3 key={i}>{s.text}</h3>;
          if (s.kind === "ul") return <ul key={i}>{s.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
          if (s.kind === "pre") return <pre key={i}><code>{s.text}</code></pre>;
          return <p key={i}>{s.text}</p>;
        })}
        <h2>Before you build</h2>
        <p>This project was selected from the original OpenSourceStack directory. Consult its original review and current documentation for licensing, installation instructions, maintenance status, and security considerations. Editorial selection is not a claim of direct testing.</p>
        {related.length > 0 && <>
          <h2>More in {categoryName(listing.category)}</h2>
          <ul>
            {related.map(r => <li key={r.slug}><Link to="/listings/$slug" params={{ slug: r.slug }}>{r.name}</Link> — {r.tagline}</li>)}
          </ul>
        </>}
      </article>
      <aside className="listing-sidebar">
        <div className="sidebar-card">
          <h3>Pricing</h3>
          <p style={{ color: "var(--foreground)", fontFamily: "var(--font-display)", fontSize: 18, margin: 0 }}>{listing.pricing === "free" ? "Free & open source" : listing.pricing === "freemium" ? "Freemium" : listing.pricing}</p>
          <p style={{ fontSize: 12, marginTop: 8 }}>{listing.pricingDetails}</p>
        </div>
        <div className="sidebar-card">
          <h3>Trust</h3>
          <ScoreBar label="Security" value={listing.trust.securityScore} />
          <ScoreBar label="Quality" value={listing.trust.qualityScore} />
          <p style={{ fontSize: 11, marginTop: 8, color: "var(--muted-foreground)" }}>Last checked: {new Date(listing.trust.lastVerifiedAt).toLocaleDateString()}</p>
        </div>
        {listing.tags.length > 0 && <div className="sidebar-card">
          <h3>Tags</h3>
          <div className="tag-cloud">{listing.tags.map(t => <span key={t} className="small-tag">{t}</span>)}</div>
        </div>}
        {listing.useCases.length > 0 && <div className="sidebar-card">
          <h3>Use cases</h3>
          <ul style={{ paddingLeft: 18, color: "var(--muted-foreground)", fontSize: 13, lineHeight: 1.6 }}>
            {listing.useCases.map(u => <li key={u}>{u}</li>)}
          </ul>
        </div>}
        {listing.installCommand && <div className="sidebar-card">
          <h3>Quick install</h3>
          <pre style={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: 6, padding: 10, font: "11px var(--font-mono)", color: "var(--violet-soft)", overflowX: "auto", margin: 0 }}>{listing.installCommand}</pre>
        </div>}
      </aside>
    </div>
  </main>;
}

function ScoreBar({ label, value }) {
  return <div className="score-bar">
    <span style={{ width: 70 }}>{label}</span>
    <div className="fill"><span style={{ width: `${value}%` }} /></div>
    <span style={{ color: "var(--foreground)", minWidth: 38, textAlign: "right" }}>{value}/100</span>
  </div>;
}

function categoryName(slug) {
  const map = {
    "databases": "Databases", "analytics": "Analytics", "crm": "CRM",
    "communication": "Communication", "project-management": "Project management",
    "cms": "CMS", "email-marketing": "Email marketing", "authentication": "Authentication",
    "search": "Search", "storage": "Storage", "automation": "Automation",
    "monitoring": "Monitoring", "code-hosting": "Code hosting", "business-intelligence": "Business intelligence",
  };
  return map[slug] ?? slug;
}

function relativeTime(iso) {
  const d = new Date(iso);
  const ms = Date.now() - d.getTime();
  const days = Math.floor(ms / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function parseLongDescription(md) {
  const out = [];
  const blocks = md.split(/\n{2,}/);
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("### ")) out.push({ kind: "h3", text: trimmed.slice(4).trim() });
    else if (trimmed.startsWith("## ")) out.push({ kind: "h2", text: trimmed.slice(3).trim() });
    else if (/^[-*] /m.test(trimmed)) out.push({ kind: "ul", items: trimmed.split("\n").map(l => l.replace(/^[-*]\s+/, "").trim()).filter(Boolean) });
    else out.push({ kind: "p", text: trimmed });
  }
  return out;
}