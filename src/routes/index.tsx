import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { DirectoryHome } from "@/components/DirectoryHome";
import { categories } from "@/lib/directory";
import "../category.css";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [
    { title: "OpenSourceStack — Your next stack, not your next subscription" },
    { name: "description", content: "Editorially reviewed open source alternatives to the tools you pay for. 100+ tools across 14 categories." },
    { property: "og:title", content: "OpenSourceStack" },
    { property: "og:description", content: "Editorially reviewed open source alternatives to the tools you pay for." },
    { property: "og:type", content: "website" },
  ] }),
});

function Home() {
  return <>
    <DirectoryHome />
    <section id="category-guides" className="site-width category-guides">
      <div className="section-heading">
        <div>
          <div className="section-kicker"><span>//</span> CATEGORY GUIDES</div>
          <h2>Every category, explained.</h2>
          <p>Editor-written guides to each part of the stack: what the tools do, how we pick them, and where the trade-offs sit.</p>
        </div>
      </div>
      <div className="tools-grid">
        {categories.map(c => {
          const Icon = c.icon as LucideIcon;
          return <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="tool-card">
            <div className="card-top">
              <span className="project-logo" data-tone="violet" aria-hidden><Icon size={22} strokeWidth={1.6} /></span>
              <span className="small-tag">{c.count} tools</span>
            </div>
            <h3>{c.name}</h3>
            <p>{c.description}</p>
            <div className="card-bottom">
              <span>Read the guide</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>Browse <ArrowUpRight size={12} /></span>
            </div>
          </Link>;
        })}
      </div>
    </section>
  </>;
}
