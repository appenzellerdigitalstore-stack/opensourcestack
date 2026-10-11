import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./SiteHeader";

export function SiteFooter() {
  return <footer className="site-footer site-width">
    <Brand />
    <span className="footer-note">Less subscription. More possibility.</span>
    <div className="flex gap-5">
      <a href="https://paypal.me/edyappenzeller" target="_blank" rel="noreferrer">Support the directory <ArrowUpRight className="inline size-3" /></a>
      <span>© 2026 OpenSourceStack</span>
    </div>
  </footer>;
}
