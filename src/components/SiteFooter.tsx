import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return <footer className="site-footer shell">
    <div className="footer-note">© {new Date().getFullYear()} OpenSourceStack · MIT licensed</div>
    <nav className="nav-links" aria-label="Footer" style={{ marginLeft: 0 }}>
      <Link to="/about">About</Link>
      <Link to="/methodology">Methodology</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  </footer>;
}
