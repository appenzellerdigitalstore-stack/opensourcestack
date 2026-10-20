import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, User } from "lucide-react";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [
    { title: "Insights - OpenSourceStack" },
    { name: "description", content: "Original editorial work on open-source alternatives: what 'open source alternative' actually means, what we look for, and where the gaps are." },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: "Insights - OpenSourceStack" },
    { property: "og:description", content: "Original editorial work on open-source alternatives." },
  ] }),
  component: InsightsIndex,
});

const articles = [
  {
    slug: "what-open-source-alternative-actually-means-in-2026",
    title: "What 'open source alternative' actually means in 2026",
    excerpt: "There is a difference between 'this software is open source' and 'this software is a good alternative to the paid thing you are using today.' Most of the directory lives in the second category. The first is a license; the second is an editorial call.",
    date: "2026-10-17",
    readingTime: 7,
  },
];

function InsightsIndex() {
  return <main className="prose-page shell">
    <div className="eyebrow">// Insights</div>
    <h1>Editorial work on the open-source ecosystem.</h1>
    <p className="lead">Original pieces on what 'open source alternative' actually means in 2026, what we look for when we add a listing, and where the gaps are. Not a blog about the future of software - a working log of how the directory is built.</p>

    {articles.map(a => <article key={a.slug} style={{ padding: 24, border: "1px solid var(--border)", borderRadius: 12, marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 12, fontSize: 13, color: "var(--muted-foreground)", marginBottom: 8 }}>
        <span><Calendar size={12} style={{ display: "inline", verticalAlign: -1, marginRight: 4 }} />{a.date}</span>
        <span>{a.readingTime} min read</span>
        <span><User size={12} style={{ display: "inline", verticalAlign: -1, marginRight: 4 }} />Edy Appenzeller</span>
      </div>
      <h2 style={{ margin: "0 0 8px 0", fontSize: 22 }}><Link to="/insights/$slug" params={{ slug: a.slug }} className="hover:underline">{a.title}</Link></h2>
      <p style={{ margin: "0 0 16px 0", color: "var(--muted-foreground)", fontSize: 15, lineHeight: 1.6 }}>{a.excerpt}</p>
      <Link to="/insights/$slug" params={{ slug: a.slug }} className="text-primary inline-flex items-center gap-1 underline-offset-4 hover:underline" style={{ fontSize: 14, fontWeight: 500 }}>Read article<ArrowUpRight size={12} /></Link>
    </article>)}

    <p style={{ color: "var(--muted-foreground)", fontSize: 13, marginTop: 24 }}>More articles land here as the directory grows. Expect one to two pieces per month - long-form, original, and tied to specific changes in the directory or the ecosystem.</p>
  </main>;
}
