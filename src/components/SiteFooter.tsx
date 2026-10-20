import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./SiteHeader";

export function SiteFooter() {
  return <footer className="site-footer site-width">
    <div className="footer-top">
      <Brand />
      <span className="footer-note">Less subscription. More possibility.</span>
    </div>
    <nav className="footer-links" aria-label="Footer">
      <Link to="/about">About</Link>
      <Link to="/methodology">Methodology</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/privacy">Privacy</Link>
      <Link to="/terms">Terms</Link>
      <a href="https://agentstack.ink" target="_blank" rel="noreferrer">Sister site<ArrowUpRight className="inline size-3" /></a>
    </nav>
    <div className="footer-bottom">
      <span>Edited by <Link to="/about" style={{ textDecoration: "underline" }}>Edy Appenzeller</Link>.</span>
      <span>Last updated: October 17, 2026.</span>
      <span>© 2026 Edy Appenzeller</span>
    </div>
  </footer>;
}
