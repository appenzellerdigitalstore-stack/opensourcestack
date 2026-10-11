import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Blocks, ChartNoAxesCombined,
  Check, Code2, Command, Database, FileText, FolderGit2, Github, HardDrive, KeyRound,
  Layers3, Mail, MessageSquare, Search, ShieldCheck, Sparkles, Terminal, Users, Workflow, X,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { listings, categories, totalListings, totalCategories, type Listing } from "@/lib/directory";
import { StackScene } from "./StackScene";

// Map of Lucide icons keyed by the icon name in categories.json
const ICONS: Record<string, typeof Database> = {
  database: Database,
  chart: BarChart3,
  users: Users,
  message: MessageSquare,
  kanban: Blocks,
  document: FileText,
  mail: Mail,
  key: KeyRound,
  search: Search,
  folder: HardDrive,
  lightning: Workflow,
  activity: Activity,
  "git-branch": FolderGit2,
  "pie-chart": ChartNoAxesCombined,
};

const TONES = ["violet", "coral", "sky", "mint", "gold"] as const;

// Adapter: take a Listing (Astro data shape) and produce a Tool-shaped object
// the directory UI was originally designed around. The fields are mapped
// from the rich Astro data so the carousel and grid use the right copy.
type Tool = { slug: string; name: string; category: string; description: string; pricing: string; tone: typeof TONES[number]; externalUrl: string; repoUrl: string };
function toTool(l: Listing, toneIndex: number): Tool {
  return {
    slug: l.slug,
    name: l.name,
    category: l.category,
    description: l.tagline || l.shortDescription,
    pricing: l.pricing,
    tone: TONES[toneIndex % TONES.length],
    externalUrl: l.externalUrl,
    repoUrl: l.repoUrl,
  };
}

const CATEGORY_NAME: Record<string, string> = {
  databases: "Databases", analytics: "Analytics", crm: "CRM & Sales",
  communication: "Communication", "project-management": "Project Management",
  cms: "CMS & Content", "email-marketing": "Email Marketing", authentication: "Authentication",
  search: "Search", storage: "Storage & File Sync", automation: "Automation",
  monitoring: "Monitoring", "code-hosting": "Code Hosting", "business-intelligence": "Business Intelligence",
};
const categoryName = (id: string) => CATEGORY_NAME[id] ?? id;

function ProjectLogo({ tool }: { tool: Tool }) {
  // Brand-specific decorative shapes for the spotlight, otherwise a single
  // letter on a tone-tinted card. Mirrors the original Lovable design so the
  // identity of each tool reads at a glance.
  if (tool.name === "Appwrite") return <span className="project-logo" data-tone="violet"><Layers3 size={28} strokeWidth={1.6} /></span>;
  if (tool.name === "Activepieces") return <span className="project-logo" data-tone="coral"><Sparkles size={26} strokeWidth={1.6} /></span>;
  if (tool.name === "NocoDB") return <span className="project-logo" data-tone="sky"><span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600 }}>n</span></span>;
  if (tool.name === "Ackee") return <span className="project-logo" data-tone="mint"><span className="bar-icon"><span /><span /><span /></span></span>;
  return <span className="project-logo" data-tone={tool.tone}>{tool.name.charAt(0)}</span>;
}

function BarIcon() { return <span className="bar-icon"><span /><span /><span /></span>; }

export function DirectoryHome() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("curated");
  const [limit, setLimit] = useState(9);
  const [active, setActive] = useState(0);
  const [submitOpen, setSubmitOpen] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);

  // 12 spotlight tools for the carousel, each with a tone
  const tools: Tool[] = useMemo(() => listings.slice(0, 12).map((l, i) => toTool(l, i)), []);
  const featured = tools.slice(0, 5);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); input.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Per-category icon lookup for the sidebar (slug -> icon key from categories.json)
  // is not used by ProjectLogo anymore; the sidebar still uses c.icon directly.

  const filtered = useMemo(() => {
    const allTools: Tool[] = listings.map((l, i) => toTool(l, i));
    const result = allTools.filter(t =>
      (category === "all" || t.category === category) &&
      `${t.name} ${t.description} ${categoryName(t.category)}`.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "name") return result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "free") return result.sort((a, b) => (a.pricing === "free" ? 0 : 1) - (b.pricing === "free" ? 0 : 1));
    return result;
  }, [category, query, sort]);

  const chooseCategory = (id: string) => { setCategory(id); setLimit(9); };

  return <>
    <section className="hero">
      <div className="hero-scene" aria-hidden="true"><StackScene /></div>
      <div className="hero-content">
        <div className="eyebrow"><span className="status-dot" />OPEN SOURCE. ENDLESS POSSIBILITIES.<ArrowUpRight size={11} /></div>
        <h1>Your next stack.<br /><span>Not your next subscription.</span></h1>
        <p className="hero-copy">Discover remarkable open source alternatives to the tools you pay for.<br />Hand-curated. Independently reviewed. Yours to build with.</p>
        <div className="search-box"><Search /><input ref={input} aria-label="Search tools" placeholder="Find your next tool, category, or alternative..." value={query} onChange={e => { setQuery(e.target.value); setLimit(9); }} />{query ? <Button size="icon" variant="ghost" aria-label="Clear search" onClick={() => setQuery("")}><X /></Button> : <span className="keycap"><Command size={10} className="inline" /> K</span>}</div>
        <div className="popular-searches"><span>Popular searches:</span>{["Analytics", "Databases", "Automation"].map(name => <Button key={name} variant="link" onClick={() => { chooseCategory(name.toLowerCase()); document.getElementById("directory")?.scrollIntoView(); }}>{name}<ArrowUpRight className="size-2.5" /></Button>)}</div>
        <div className="hero-stats"><span><strong>{totalListings}</strong> open source tools</span><span><strong>{totalCategories}</strong> categories</span><span><strong>100%</strong> independently curated</span></div>
      </div>
    </section>

    <section className="featured site-width" aria-label="Featured tools">
      <div className="section-heading">
        <div>
          <div className="section-kicker"><Sparkles size={12} /> THE SPOTLIGHT</div>
          <h2>Great tools. Zero lock-in.</h2>
          <p>A few standouts to start building something good.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" aria-label="Previous featured tool" onClick={() => setActive((active + featured.length - 1) % featured.length)}><ArrowLeft /></Button>
          <Button variant="outline" size="icon" aria-label="Next featured tool" onClick={() => setActive((active + 1) % featured.length)}><ArrowRight /></Button>
        </div>
      </div>
      <div className="carousel-stage">
        {featured.map((tool, i) => {
          let offset = (i - active + featured.length) % featured.length;
          if (offset > 2) offset -= featured.length;
          return <article key={tool.slug} className="carousel-card" data-offset={offset}>
            <div className="card-top"><ProjectLogo tool={tool} /><span className="small-tag">{categoryName(tool.category)}</span></div>
            <Link to="/listings/$slug" params={{ slug: tool.slug }}><h3>{tool.name} <ArrowUpRight size={14} className="inline text-muted-foreground" /></h3></Link>
            <p>{tool.description}</p>
            <div className="card-bottom"><span className="flex items-center gap-1.5"><Code2 size={12} /> {tool.pricing === "free" ? "Open source" : tool.pricing === "freemium" ? "Freemium" : "Open source"}</span><span className="text-mint flex items-center gap-1"><Check size={11} /> Curated</span></div>
          </article>;
        })}
      </div>
      <div className="carousel-meta" aria-hidden="true">{featured.map((t, i) => <span key={t.slug} className={`carousel-dot ${i === active ? "active" : ""}`} />)}</div>
    </section>

    <div className="trust-strip site-width"><span><ShieldCheck /> Editorially reviewed</span><span><Terminal /> Self-hostable software</span><span><Code2 /> No affiliate links. Ever.</span><span><Layers3 /> Built for builders</span></div>

    <section id="directory" className="directory site-width">
      <div className="section-heading">
        <div>
          <div className="section-kicker"><span>//</span> EXPLORE THE ECOSYSTEM</div>
          <h2>Find your unfair advantage.</h2>
          <p>The right tools for your next big thing.</p>
        </div>
        <span className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-muted-foreground"><span className="status-dot" /> OPEN BY DEFAULT</span>
      </div>
      <div className="directory-layout">
        <aside id="categories">
          <h3 className="category-heading">CATEGORIES</h3>
          <div className="category-list">
            <Button variant="ghost" className={`category-button ${category === "all" ? "selected" : ""}`} onClick={() => chooseCategory("all")}><span><Layers3 size={14} /> All tools</span><span className="category-count">{totalListings}</span></Button>
            {categories.map(c => {
              const I = ICONS[c.icon] ?? Layers3;
              return <Button key={c.slug} variant="ghost" className={`category-button ${category === c.slug ? "selected" : ""}`} onClick={() => chooseCategory(c.slug)}><span><I size={14} />{c.name}</span><span className="category-count">{c.count}</span></Button>;
            })}
          </div>
        </aside>
        <div>
          <div className="result-toolbar">
            <span>{query ? `Results for “${query}”` : categoryName(category)} <span className="text-foreground">/ {filtered.length} tools</span></span>
            <label className="flex items-center gap-2"><span className="hidden sm:inline">Sort by</span>
              <select aria-label="Sort tools" className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="curated">Curated order</option>
                <option value="name">Name: A–Z</option>
                <option value="free">Free first</option>
              </select>
            </label>
          </div>
          <div className="tools-grid">
            {filtered.slice(0, limit).map(tool => <article className="tool-card" key={tool.slug}>
              <div className="card-top"><ProjectLogo tool={tool} /><span className="small-tag">{tool.pricing === "free" ? "Free" : tool.pricing === "freemium" ? "Freemium" : "Open source"}</span></div>
              <Link to="/listings/$slug" params={{ slug: tool.slug }}><h3>{tool.name} <ArrowUpRight size={13} className="inline text-muted-foreground" /></h3></Link>
              <p>{tool.description}</p>
              <div className="card-bottom"><span>{categoryName(tool.category)}</span><Link to="/listings/$slug" params={{ slug: tool.slug }} aria-label={`View ${tool.name}`}><ArrowUpRight size={13} /></Link></div>
            </article>)}
            {filtered.length === 0 && <div className="empty-state"><Search size={25} className="mx-auto mb-4" /><h3>No tools found.</h3><p className="text-xs mt-2 mb-5">Try another name or a different category.</p><Button variant="outline" onClick={() => { setQuery(""); chooseCategory("all"); }}>Reset filters</Button></div>}
          </div>
          {limit < filtered.length && <div className="load-more"><Button variant="outline" onClick={() => setLimit(limit + 9)}>Discover more tools <ArrowDown size={14} /><span className="text-muted-foreground text-xs">{filtered.length - limit} more</span></Button></div>}
        </div>
      </div>
    </section>

    <section className="editorial site-width">
      <div>
        <div className="section-kicker">BUILT DIFFERENT. BY DESIGN.</div>
        <h2>Good software should be yours.</h2>
        <p>No abandoned repositories. No paid rankings. Just independent editorial reviews of documentation, licensing, maintenance, and security. Direct testing is only claimed when recorded.</p>
      </div>
      <div className="flex items-center">
        <Button asChild variant="outline"><Link to="/about">Read our manifesto <ArrowUpRight /></Link></Button>
      </div>
    </section>

    <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
      <DialogContent>
        <DialogTitle>Something worth sharing?</DialogTitle>
        <DialogDescription>Help the open source ecosystem grow.</DialogDescription>
        <div className="detail-content">
          <p>Tool suggestions are reviewed independently before publication. Send your project through the directory's existing contact form.</p>
          <Button asChild variant="glow" className="mt-5"><Link to="/contact">Suggest a tool <ArrowUpRight /></Link></Button>
        </div>
      </DialogContent>
    </Dialog>
  </>;
}
