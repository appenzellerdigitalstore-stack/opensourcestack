import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/changelog")({
  head: () => ({ meta: [
    { title: "Changelog - OpenSourceStack" },
    { name: "description", content: "Documented updates to the OpenSourceStack directory: new listings, removals, editorial changes, and infrastructure work." },
    { name: "robots", content: "index, follow" },
  ] }),
  component: ChangelogPage,
});

const changes: { date: string; entries: { tag: string; text: string }[] }[] = [
  {
    date: "2026-10-17",
    entries: [
      { tag: "Added", text: "Legal pages: /privacy and /terms, with plain-English coverage of cookies, advertising, third-party services, and visitor rights." },
      { tag: "Added", text: "Insights section (/insights) with the first editorial article: 'What open source alternative actually means in 2026'." },
      { tag: "Added", text: "Changelog page (this page), populated with documented updates." },
      { tag: "Added", text: "/ads.txt at the root, with a placeholder AdSense publisher ID pending account approval." },
      { tag: "Changed", text: "SiteFooter rewritten. Three-row layout: brand + tagline, footer links (About / Methodology / Contact / Privacy / Terms / Sister site), and an editor byline + last-updated row." },
      { tag: "Changed", text: "Sitemap regenerated. 107 URLs (was 102; +5 from new pages)." },
    ],
  },
  {
    date: "Earlier in 2026",
    entries: [
      { tag: "Added", text: "Initial launch: 101 curated open-source listings across 14 categories, with per-listing detail pages, trust scores, and install commands." },
      { tag: "Added", text: "About and contact pages with editor byline and clear contact paths." },
      { tag: "Added", text: "Methodology page documenting selection criteria and the limits of editorial review." },
      { tag: "Removed", text: "Submit feature (UI removed; original code preserved at src/.archive/ for restore). Replaced with a contact-page suggestion path." },
    ],
  },
];

function ChangelogPage() {
  return <main className="prose-page shell">
    <div className="eyebrow">// Changelog</div>
    <h1>What changed.</h1>
    <p className="lead">Documented updates to OpenSourceStack: new listings, removals, editorial rewrites, and infrastructure work. Reverse-chronological, dated, and signed by the editor.</p>

    {changes.map(group => <section key={group.date} style={{ marginTop: 24, borderBottom: "1px solid var(--border)", paddingBottom: 24 }}>
      <h2 style={{ fontSize: 14, color: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}>{group.date}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {group.entries.map((e, i) => <li key={i} style={{ padding: "10px 0", borderBottom: "1px dashed var(--border)" }}>
          <span style={{
            display: "inline-block", minWidth: 78, fontFamily: "var(--font-mono)", fontSize: 11,
            padding: "2px 8px", borderRadius: 4, marginRight: 12,
            background: e.tag === "Added" ? "#22c55e22" : e.tag === "Removed" ? "#ef444422" : e.tag === "Changed" ? "#3b82f622" : "var(--background)",
            color: e.tag === "Added" ? "#16a34a" : e.tag === "Removed" ? "#dc2626" : e.tag === "Changed" ? "#2563eb" : "var(--muted-foreground)",
          }}>{e.tag}</span>
          {e.text}
        </li>)}
      </ul>
    </section>)}

    <p style={{ marginTop: 32, color: "var(--muted-foreground)", fontSize: 13 }}>
      Entries are added as changes ship. If you spot something that should be here and is not, the <Link to="/contact">contact page</Link> is the fastest way to flag it.
    </p>

    <p style={{ marginTop: 16 }}>
      <Link to="/" className="text-primary inline-flex items-center gap-1 underline-offset-4 hover:underline">Browse the directory<ArrowUpRight size={12} /></Link>
    </p>
  </main>;
}
