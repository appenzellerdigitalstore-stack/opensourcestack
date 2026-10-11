// Small utilities for the directory UI.
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(n: number): string {
  return `${n}/100`;
}
export function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}
export function formatLatency(ms: number): string {
  return `${ms}ms`;
}
export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
