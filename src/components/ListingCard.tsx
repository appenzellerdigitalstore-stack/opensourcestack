import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { type Listing } from "@/lib/directory";

const TONES = ["violet", "coral", "sky", "mint", "gold"] as const;

export function ListingCard({ listing, toneIndex }: { listing: Listing; toneIndex: number }) {
  const tone = TONES[toneIndex % TONES.length];
  const initial = listing.name.charAt(0).toUpperCase();
  return <Link to="/listings/$slug" params={{ slug: listing.slug }} className="tool-card">
    <div className="card-top">
      <span className="project-logo" data-tone={tone} aria-hidden>{initial}</span>
      <span className="small-tag">{listing.category}</span>
    </div>
    <h3>{listing.name}</h3>
    <p>{listing.tagline}</p>
    <div className="card-bottom">
      <span>{listing.pricing === "free" ? "Open source" : listing.pricing}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>View <ArrowUpRight size={12} /></span>
    </div>
  </Link>;
}
