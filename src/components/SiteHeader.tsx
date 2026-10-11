import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Layers3 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogDescription, DialogContent } from "@/components/ui/dialog";

export function Brand() {
  return <Link to="/" className="brand"><Layers3 className="brand-mark" strokeWidth={1.8} /><span>open<span className="brand-dot">source</span>stack<span className="brand-dot">.</span></span></Link>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header site-width">
    <Brand />
    <nav className="nav"><a href="#directory" className="text-foreground">Explore</a><a href="#directory">Categories</a><Link to="/about">Our manifesto <ArrowUpRight className="inline size-3" /></Link></nav>
    <div className="header-actions"><a href="https://github.com/topics/open-source" target="_blank" rel="noreferrer" aria-label="Explore open source on GitHub" className="text-muted-foreground"><Github size={19} /></a><Button variant="glow" size="sm" onClick={() => setOpen(true)}>Submit a tool <span className="text-lg leading-none">+</span></Button></div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Something worth sharing?</DialogTitle>
        <DialogDescription>Help the open source ecosystem grow.</DialogDescription>
        <p className="oss-dialog-text">Tool suggestions are reviewed independently before publication. Send your project through the directory's existing contact form.</p>
        <Button asChild variant="glow" className="mt-5"><Link to="/contact" onClick={() => setOpen(false)}>Suggest a tool <ArrowUpRight /></Link></Button>
      </DialogContent>
    </Dialog>
  </header>;
}
