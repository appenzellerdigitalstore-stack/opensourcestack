import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, Sparkles, Shield, BarChart3, Heart } from "lucide-react";
import { listings, categories, totalListings, totalCategories, getListing } from "@/lib/directory";
import { ListingCard } from "@/components/ListingCard";
import { StackScene } from "@/components/StackScene";
import { SubmitToolButton } from "@/components/SiteDialog";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [
    { title: "OpenSourceStack — Your next stack, not your next subscription" },
    { name: "description", content: "Editorially reviewed open source alternatives to the tools you pay for. 100+ tools across 14 categories." },
  ] }),
});

function Home() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return listings.filter(l => {
      const cat = activeCat === "all" || l.category === activeCat;
      const q = !query || `${l.name} ${l.tagline} ${l.shortDescription}`.toLowerCase().includes(query.toLowerCase());
      return cat && q;
    });
  }, [query, activeCat]);

  return <>
    <section className="hero shell">
      <StackScene />
      <div className="hero-eyebrow"><span className="status-dot" />OPEN SOURCE. ENDLESS POSSIBILITIES. <ArrowUpRight size={10} /></div>
      <h1>Your next stack.<br /><span className="accent">Not your next subscription.</span></h1>
      <p className="hero-copy">Discover remarkable open source alternatives to the tools you pay for.<br />Hand-curated. Independently reviewed. Yours to build with.</p>
      <label className="search-box" aria-label="Search the directory">
        <Search size={13} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find your next tool, category, or alternative…" onKeyDown={e => { if (e.key === "Enter" && filtered[0]) navigate({ to: "/listings/$slug", params: { slug: filtered[0].slug } }); }} />
        <kbd>⏎</kbd>
      </label>
      <div className="hero-cta" style={{ marginTop: 18 }}>
        <SubmitToolButton />
        <a className="btn-outline" href="#directory">Explore tools <ArrowUpRight size={14} /></a>
      </div>
      <div className="hero-stats">
        <span><strong>{totalListings}</strong> open source tools</span>
        <span><strong>{totalCategories}</strong> categories</span>
        <span><strong>100%</strong> independently curated</span>
      </div>
    </section>

    <div className="trust-strip shell">
      <span><Sparkles size={12} /> Editorially reviewed</span>
      <span><Shield size={12} /> Self-hostable software</span>
      <span><BarChart3 size={12} /> Transparent 0–100 scoring</span>
      <span><Heart size={12} /> No affiliate links. Ever.</span>
    </div>

    <section className="section shell" id="directory">
      <div className="section-heading">
        <div>
          <div className="section-kicker">// The directory</div>
          <h2>Every tool, in one place.</h2>
          <p>Browse, search, and filter 100+ open source alternatives. Each entry has its trust signals visible at a glance.</p>
        </div>
      </div>
      <div className="directory-grid">
        <aside className="category-list" aria-label="Filter by category">
          <button type="button" className={`category-button ${activeCat === "all" ? "selected" : ""}`} onClick={() => setActiveCat("all")}>
            <span>All tools</span><span className="count">{totalListings}</span>
          </button>
          {categories.map(c => (
            <button key={c.slug} type="button" className={`category-button ${activeCat === c.slug ? "selected" : ""}`} onClick={() => setActiveCat(c.slug)}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><c.icon size={14} /> {c.name}</span>
              <span className="count">{c.count}</span>
            </button>
          ))}
        </aside>
        <div>
          <p className="result-count" role="status">{filtered.length} {filtered.length === 1 ? "tool" : "tools"}</p>
          <div className="tools-grid">
            {filtered.map((l, i) => <ListingCard key={l.slug} listing={l} toneIndex={i} />)}
          </div>
          {filtered.length === 0 && <div className="empty-state">
            <h3>No matches</h3>
            <p>Try a different search term or clear the category filter.</p>
          </div>}
        </div>
      </div>
    </section>

    <section className="editorial shell">
      <div className="section-kicker">// Our manifesto</div>
      <h2>Good software should be yours.<br />Not rented forever.</h2>
      <p>OpenSourceStack is the directory we kept wishing existed. Finding an open source alternative shouldn't mean digging through outdated listicles, abandoned repositories, or paid recommendations disguised as reviews.</p>
      <p>Every project is selected by an editor using project documentation, repository activity, licensing, maintenance signals, and other public evidence. We distinguish editorial review from direct testing: testing is only claimed when it has been recorded for that listing.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
        <Link className="btn-glow" to="/methodology">Read the methodology<ArrowUpRight size={14} /></Link>
        <Link className="btn-outline" to="/about">About the directory<ArrowUpRight size={14} /></Link>
      </div>
    </section>
  </>;
}
