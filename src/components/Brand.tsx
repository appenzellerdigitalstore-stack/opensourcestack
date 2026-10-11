import { Layers } from "lucide-react";

export function Brand() {
  return <a href="/" className="brand" aria-label="opensourcestack home">
    <span className="brand-mark" aria-hidden><Layers /></span>
    <span className="brand-letters">open<span className="accent">source</span>stack<span className="brand-dot">.</span></span>
  </a>;
}
