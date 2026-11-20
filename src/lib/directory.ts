// Data layer for the opensourcestack.ink directory.
//
// Loads the per-tool JSON files from data/listings/ and exposes them
// in a shape the routes and components can use. Categories, intros,
// and the sitemap seed live in the same `data/` folder.

import { Activity, BarChart3, Blocks, ChartNoAxesCombined, Database, FileText, FolderGit2, HardDrive, KeyRound, Layers, Mail, MessageSquare, Search, Users, Workflow, type LucideIcon } from "lucide-react";
import categoriesData from "../../data/categories.json" assert { type: "json" };
import introsData from "../../data/category_intros.json" assert { type: "json" };
import publishersData from "../../data/publishers.json" assert { type: "json" };

// Vite glob import all 101 listing JSONs at build time
const listingModules = import.meta.glob<{ default: Listing }>("../../data/listings/*.json", { eager: true });

export interface Trust {
  securityScore: number;
  qualityScore: number;
  isVerified: boolean;
  isOfficial: boolean;
  lastVerifiedAt: string;
}
export interface Status {
  up: boolean;
  uptimePct30d: number;
  avgLatencyMs: number;
  lastCheck: string;
}
export interface Listing {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  kind: string;
  runtime: string;
  category: string;
  publisher: string;
  externalUrl: string;
  repoUrl: string;
  installCommand?: string;
  installInstructions?: string;
  logoUrl?: string;
  trust: Trust;
  status: Status;
  tags: string[];
  useCases: string[];
  integrations: string[];
  pricing: "free" | "freemium" | string;
  pricingDetails: string;
  seo: { metaTitle: string; metaDescription: string };
  sponsorTier: string;
  dateAdded: string;
}

const allListings: Listing[] = Object.values(listingModules)
  .map(m => m.default)
  .sort((a, b) => a.name.localeCompare(b.name));

export const listings: Listing[] = allListings;
export function getListing(slug: string): Listing | undefined {
  return allListings.find(l => l.slug === slug);
}
export function listingsByCategory(categorySlug: string): Listing[] {
  return allListings.filter(l => l.category === categorySlug);
}
export function relatedListings(slug: string, category: string, limit = 3): Listing[] {
  const pool = allListings.filter(l => l.category === category && l.slug !== slug);
  if (pool.length <= limit) return pool;
  // Rotate the window so every page in a category surfaces a different set of
  // neighbours instead of the same three on every page of that category.
  const offset = allListings.findIndex(l => l.slug === slug);
  const start = offset % pool.length;
  return Array.from({ length: limit }, (_, i) => pool[(start + i) % pool.length]);
}

export interface CategoryInfo {
  slug: string;
  name: string;
  description: string;
  icon: string;
  displayOrder: number;
}
const ICON_MAP: Record<string, LucideIcon> = {
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
export const categories: (CategoryInfo & { icon: LucideIcon; count: number })[] = (categoriesData as CategoryInfo[])
  .sort((a, b) => a.displayOrder - b.displayOrder)
  .map(c => ({ ...c, icon: ICON_MAP[c.icon] ?? Layers, count: allListings.filter(l => l.category === c.slug).length }));

export const totalCategories = categories.length;
export const totalListings = allListings.length;

export function getCategory(slug: string): CategoryInfo | undefined {
  return (categoriesData as CategoryInfo[]).find(c => c.slug === slug);
}
export function getCategoryIntro(slug: string): { intro: string; selectionNotes: string } | undefined {
  return (introsData as { slug: string; intro: string; selectionNotes: string }[]).find(c => c.slug === slug);
}

export interface Publisher {
  slug: string;
  name: string;
  websiteUrl: string;
  githubHandle: string;
  isVerified: boolean;
}
const publisherMap = new Map((publishersData as Publisher[]).map(p => [p.slug, p]));
export function getPublisher(slug?: string): Publisher | undefined {
  return slug ? publisherMap.get(slug) : undefined;
}

// Spotlight = the 12 most-notable listings used in the home carousel
const SPOTLIGHT_SLUGS = [
  "appwrite", "plausible", "nocodb", "activepieces", "baserow", "matomo",
  "openproject", "appsmith", "leantime", "supabase", "directus", "n8n",
];
export const spotlight: Listing[] = SPOTLIGHT_SLUGS
  .map(s => allListings.find(l => l.slug === s))
  .filter((l): l is Listing => !!l);
