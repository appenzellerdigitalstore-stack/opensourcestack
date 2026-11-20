import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Github, ExternalLink, Shield, Activity } from "lucide-react";
import { getListing, relatedListings, getPublisher, getCategory } from "@/lib/directory";

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
      { property: "og:description", content: loaderData.listing.shortDescription || loaderData.listing.tagline },
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
  const install = parseInstallSteps(listing.installInstructions);
  const category = categoryName(listing.category);
  const publisher = getPublisher(listing.publisher);

  return <main className="listing-page shell">
    <div className="listing-header">
      <span className="project-logo" data-tone="violet" aria-hidden>{initial}</span>
      <div>
        <div className="eyebrow">{category}</div>
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
        {listing.shortDescription && <p className="listing-lede">{listing.shortDescription}</p>}
        {sections.map((s, i) => {
          if (s.kind === "h2") return <h2 key={i}>{s.text}</h2>;
          if (s.kind === "h3") return <h3 key={i}>{s.text}</h3>;
          if (s.kind === "ul") return <ul key={i}>{s.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
          if (s.kind === "pre") return <pre key={i}><code>{s.text}</code></pre>;
          return <p key={i}>{s.text}</p>;
        })}

        {install.length > 0 && <>
          <h2>Getting it running</h2>
          {install.map((group, i) => <div key={i} className="install-block">
            {group.label && <div className="install-label">{group.label}</div>}
            <ol className="install-steps">
              {group.steps.map((step, j) => <li key={j}>{inline(step)}</li>)}
            </ol>
          </div>)}
        </>}

        <h2>Before you build</h2>
        <dl className="listing-facts">
          <div><dt>Category</dt><dd>{category}</dd></div>
          <div><dt>Type</dt><dd>{prettySlug(listing.kind)}</dd></div>
          <div><dt>Runtime</dt><dd>{runtimeLabel(listing.runtime)}</dd></div>
          <div><dt>Cost and licence</dt><dd>{listing.pricingDetails}</dd></div>
          {publisher && <div><dt>Published by</dt><dd><a href={publisher.websiteUrl} target="_blank" rel="noreferrer">{publisher.name}</a></dd></div>}
          {listing.integrations.length > 0 && <div><dt>Integrates with</dt><dd>{listing.integrations.map(i => prettySlug(i)).join(", ")}</dd></div>}
          {listing.useCases.length > 0 && <div><dt>Typical uses</dt><dd>{listing.useCases.map(u => prettySlug(u)).join(", ")}</dd></div>}
          {listing.repoUrl && <div><dt>Source</dt><dd><a href={listing.repoUrl} target="_blank" rel="noreferrer">{repoLabel(listing.repoUrl)}</a></dd></div>}
          <div><dt>Listed since</dt><dd>{formatDate(listing.dateAdded)}</dd></div>
          <div><dt>Last status check</dt><dd>{relativeTime(listing.status.lastCheck)}</dd></div>
        </dl>
        <p className="listing-note">
          {listing.name} sits in our {category} selection, where it was added on {formatDate(listing.dateAdded)}; the
          status figures above come from the automated check on {formatDate(listing.status.lastCheck)}. Licensing,
          installation and integration details are taken from {listing.name}&rsquo;s own documentation and repository —
          we have not run a hands-on deployment of {listing.name}, so treat these notes as editorial reading rather
          than a test report.
        </p>

        {related.length > 0 && <>
          <h2>More in {category}</h2>
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
  // Single source of truth: data/categories.json.
  return getCategory(slug)?.name ?? prettySlug(slug);
}

// "project-management" -> "Project management", "self-hosted" -> "Self hosted"
function prettySlug(value?: string) {
  if (!value) return "";
  return value.replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function runtimeLabel(runtime?: string) {
  if (!runtime) return "Not specified";
  const map: Record<string, string> = {
    node: "Node.js", nodejs: "Node.js", bun: "Bun", deno: "Deno",
    python: "Python", go: "Go", golang: "Go", rust: "Rust", ruby: "Ruby",
    php: "PHP", java: "Java", dotnet: ".NET", elixir: "Elixir", haskell: "Haskell",
    docker: "Docker", kubernetes: "Kubernetes", "self-hosted": "Self-hosted",
    selfhosted: "Self-hosted", saas: "Hosted service", browser: "Browser",
  };
  const key = runtime.toLowerCase().trim();
  return map[key] ?? prettySlug(runtime);
}

function repoLabel(url?: string) {
  if (!url) return "Not listed";
  try {
    const parts = new URL(url).pathname.replace(/\.git$/, "").split("/").filter(Boolean);
    if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
    return parts[0] ?? url;
  } catch {
    return url;
  }
}

function formatDate(iso?: string) {
  if (!iso) return "Unknown";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

// Renders **bold** and `code` inline.
function inline(text: string) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    return <span key={i}>{part}</span>;
  });
}

// Turns the **Label:** + numbered list shape of installInstructions into render groups.
function parseInstallSteps(text?: string) {
  if (!text) return [];
  const groups: { label: string; steps: string[] }[] = [];
  for (const block of text.split(/\n{2,}/)) {
    const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    let label = "";
    let rest = lines;
    const head = lines[0].match(/^\*\*(.+?)\*\*\s*:?\s*(.*)$/);
    if (head) {
      label = head[1].trim();
      rest = head[2] ? [head[2], ...lines.slice(1)] : lines.slice(1);
    }
    const steps = rest
      .map(l => l.replace(/^\d+[.)]\s*/, "").replace(/^[-*]\s*/, "").trim())
      .filter(Boolean);
    if (steps.length) groups.push({ label, steps });
  }
  return groups;
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
