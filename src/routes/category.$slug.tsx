import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { ListingCard } from "@/components/ListingCard";
import { categories, getCategoryIntro, listingsByCategory } from "@/lib/directory";
import "../category.css";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find(c => c.slug === params.slug);
    if (!category) throw notFound();
    // Only plain data crosses the loader boundary: the category record also
    // carries a React icon component, which the SSR serializer cannot encode.
    return {
      category: {
        slug: category.slug,
        name: category.name,
        description: category.description,
        count: category.count,
      },
      intro: getCategoryIntro(params.slug),
      listings: listingsByCategory(params.slug),
    };
  },
  head: ({ loaderData }) => loaderData ? ({
    meta: [
      { title: `${loaderData.category.name} \u2014 OpenSourceStack` },
      { name: "description", content: loaderData.category.description },
      { property: "og:title", content: `${loaderData.category.name} \u2014 OpenSourceStack` },
      { property: "og:description", content: loaderData.category.description },
      { property: "og:type", content: "website" },
    ],
  }) : {},
  component: CategoryPage,
});

function CategoryPage() {
  const { category, intro, listings } = Route.useLoaderData();
  const Icon = iconFor(category.slug);
  const introBlocks = intro ? parseBlocks(intro.intro) : [];
  const noteBlocks = intro ? parseBlocks(intro.selectionNotes) : [];
  const otherCategories = categories.filter(c => c.slug !== category.slug);

  return <main className="listing-page shell">
    <div className="listing-header">
      <span className="project-logo" data-tone="violet" aria-hidden><Icon size={24} strokeWidth={1.6} /></span>
      <div>
        <div className="eyebrow">// Category</div>
        <h1>{category.name}</h1>
        <p className="tagline">{category.description}</p>
      </div>
    </div>

    <div className="meta-row">
      <span className="small-tag">{listings.length} tools</span>
      <span>Category guide</span>
      <Link to="/methodology">How we score tools <ArrowUpRight className="inline size-3" /></Link>
    </div>

    {introBlocks.length > 0 && <article className="category-editorial">
      <EditorialBlocks blocks={introBlocks} />
    </article>}

    {noteBlocks.length > 0 && <section className="category-editorial">
      <h2>How we select these</h2>
      <EditorialBlocks blocks={noteBlocks} />
    </section>}

    <section className="category-section">
      <div className="section-heading">
        <div>
          <h2>{category.name} alternatives</h2>
          <p>{listings.length} tools in this category, editorially reviewed and scored.</p>
        </div>
      </div>
      <div className="tools-grid">
        {listings.map((listing, i) => <ListingCard key={listing.slug} listing={listing} toneIndex={i} />)}
      </div>
    </section>

    <section className="category-section">
      <h2>Browse other categories</h2>
      <div className="category-links">
        {otherCategories.map(c => {
          const OtherIcon = c.icon as LucideIcon;
          return <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="category-link"><OtherIcon size={13} />{c.name}</Link>;
        })}
      </div>
    </section>
  </main>;
}

// The icon component is read from the module-level category list, never from
// loader data, so it never has to be serialized.
function iconFor(slug: string): LucideIcon {
  return categories.find(c => c.slug === slug)?.icon as LucideIcon;
}

type EditorialBlock = { kind: "p"; text: string } | { kind: "ul"; items: string[] };

const BULLET = /^[-*\u2022]\s+/;

// The editorial in data/category_intros.json is plain prose separated by blank
// lines. Bullets are handled too, so a list stays a list if the copy changes.
function parseBlocks(text: string): EditorialBlock[] {
  const blocks: EditorialBlock[] = [];
  for (const raw of text.split(/\n{2,}/)) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const lines = trimmed.split("\n").map(l => l.trim()).filter(Boolean);
    const prose = lines.filter(l => !BULLET.test(l));
    const bullets = lines.filter(l => BULLET.test(l));
    if (prose.length > 0) blocks.push({ kind: "p", text: prose.join(" ") });
    if (bullets.length > 0) blocks.push({ kind: "ul", items: bullets.map(l => l.replace(BULLET, "")) });
  }
  return blocks;
}

function EditorialBlocks({ blocks }: { blocks: EditorialBlock[] }) {
  return <>
    {blocks.map((block, i) => block.kind === "ul"
      ? <ul key={i}>{block.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
      : <p key={i}>{block.text}</p>)}
  </>;
}
