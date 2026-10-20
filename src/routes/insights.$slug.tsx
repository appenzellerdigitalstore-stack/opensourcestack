import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";

const articles: Record<string, { title: string; date: string; readingTime: number; body: string }> = {
  "what-open-source-alternative-actually-means-in-2026": {
    title: "What 'open source alternative' actually means in 2026",
    date: "2026-10-17",
    readingTime: 7,
    body: `There is a difference between "this software is open source" and "this software is a good alternative to the paid thing you are using today." Most of the directory lives in the second category. The first is a license; the second is an editorial call.

## The license is the floor, not the ceiling

An OSI-approved license is a useful signal. It tells you the source is available, that you can read the code, and that you can run the project without paying a vendor for the privilege. It does not tell you whether the project is maintained, whether the documentation is any good, whether the maintainer is reachable, or whether the project will be alive in two years.

A directory that lists projects purely by license is doing the reader a disservice. It is also a directory that any aggregator can build in an afternoon. The work - and the part that matters for you - is everything else.

## What we look for instead

Five signals, in roughly this order:

1. **Documentation** - real install instructions, an architecture overview, a FAQ for the common failure modes. Not a one-paragraph README that says "clone, install, run."
2. **Maintenance** - is anyone still answering issues? Is there a release cadence? A quiet repo is not always a dead repo, but the entry says so when I cannot verify.
3. **Self-hosting cost** - what does it actually take to run this on a small VPS, on a Raspberry Pi, on a home server? "Free as in beer" papers over a lot of operational complexity.
4. **License compatibility** - is the license compatible with the way you intend to use it? AGPL, for instance, is a non-starter for many SaaS use cases regardless of price.
5. **Trust** - is the maintainer a person you can reach? Has the project had security disclosures? Is there a CVE history? These matter more than the license ever will.

## The "alternative" is doing a lot of work

When this directory calls something an "alternative" to a paid tool, the implication is that the open source project is in the same conversation as the paid one. That is a real claim, and it deserves a real basis.

Sometimes the alternative is a head-for-head replacement: it has the same feature set, costs less (or nothing), and you can migrate without rewriting your workflow. Self-hosted GitLab vs GitHub is roughly this conversation for teams that want full control.

Sometimes the alternative is a different shape entirely: it solves the same problem with a different model, and the migration is more like a re-implementation. Supabase vs Firebase is roughly this conversation - the underlying primitives are different, even if the user-facing capability overlaps.

The honest move is to tell the reader which kind of alternative each entry is. A directory that flattens both kinds into "alternatives" is selling the reader a false sense of parity.

## What this directory is not

This is not the most complete list of open source projects. It is not a vendor endorsement. It is not a substitute for reading the project's own documentation. It is a working selection that I have looked at, written up, and tried to be honest about.

If an entry is wrong, the contact page routes straight to me. Corrections are usually applied within a few days.

## Closing

The "open source alternative" framing has been done to death. The work is in the writing - the long-form entries, the when-to-use and when-not-to-use sections, the trust notes. That is what the directory is for.`,
  },
};

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = articles[params.slug];
    if (!article) throw notFound();
    return { article, slug: params.slug };
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${loaderData.article.title} - OpenSourceStack Insights` },
      { name: "description", content: loaderData.article.body.split("\n\n")[0]?.slice(0, 160) ?? "" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: loaderData.article.title },
      { property: "og:description", content: loaderData.article.body.split("\n\n")[0]?.slice(0, 160) ?? "" },
      { property: "og:type", content: "article" },
    ],
  }) : {},
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const blocks = parseBody(article.body);
  return <main className="prose-page shell">
    <Link to="/insights" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", fontSize: 13, marginBottom: 16 }}>
      <ArrowLeft size={14} /> Back to Insights
    </Link>
    <div className="eyebrow">// Insights</div>
    <h1>{article.title}</h1>
    <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--muted-foreground)", marginBottom: 24 }}>
      <span>{article.date}</span>
      <span>{article.readingTime} min read</span>
      <span>Edy Appenzeller</span>
    </div>
    {blocks.map((b, i) => {
      if (b.kind === "h2") return <h2 key={i}>{b.text}</h2>;
      return <p key={i}>{b.text}</p>;
    })}
    <p style={{ marginTop: 40, color: "var(--muted-foreground)", fontSize: 13 }}>
      Reviewed and published by Edy Appenzeller. <Link to="/about" style={{ textDecoration: "underline" }}>About the editor</Link>.
    </p>
    <p style={{ marginTop: 16 }}>
      <Link to="/insights" className="text-primary inline-flex items-center gap-1 underline-offset-4 hover:underline">More insights<ExternalLink size={11} style={{ display: "inline", verticalAlign: -1, marginLeft: 4 }} /></Link>
    </p>
  </main>;
}

function parseBody(body: string) {
  const out: { kind: "h2" | "p"; text: string }[] = [];
  const blocks = body.split(/\n{2,}/);
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("## ")) out.push({ kind: "h2", text: trimmed.slice(3).trim() });
    else out.push({ kind: "p", text: trimmed });
  }
  return out;
}
