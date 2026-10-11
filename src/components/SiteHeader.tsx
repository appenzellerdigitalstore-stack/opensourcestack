import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Brand } from "./Brand";

export function SiteHeader() {
  const [now, setNow] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      const ss = d.getSeconds().toString().padStart(2, "0");
      setNow(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <header className="site-header">
    <div className="header-inner shell">
      <Brand />
      <nav className="nav-links" aria-label="Primary">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/methodology">Methodology</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="nav-clock" aria-live="polite"><span>{now}</span><span>UTC</span></div>
    </div>
  </header>;
}
