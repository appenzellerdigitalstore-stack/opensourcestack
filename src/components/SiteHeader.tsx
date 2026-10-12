import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Layers3 } from "lucide-react";

export function Brand() {
  return <Link to="/" className="brand"><Layers3 className="brand-mark" strokeWidth={1.8} /><span>open<span className="brand-dot">source</span>stack<span className="brand-dot">.</span></span></Link>;
}

export function SiteHeader() {
  return <header className="site-header site-width">
    <Brand />
    <nav className="nav"><a href="#directory" className="text-foreground">Explore</a><a href="#directory">Categories</a><Link to="/about">Our manifesto <ArrowUpRight className="inline size-3" /></Link></nav>
    <div className="header-actions"><a href="https://github.com/topics/open-source" target="_blank" rel="noreferrer" aria-label="Explore open source on GitHub" className="text-muted-foreground"><Github size={19} /></a></div>
  </header>;
}
