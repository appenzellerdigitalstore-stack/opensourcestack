import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (v: boolean) => void; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);
  if (!open) return null;
  return <div className="oss-dialog-root" role="dialog" aria-modal="true">
    <div className="oss-dialog-overlay" onClick={() => onOpenChange(false)} aria-hidden />
    <div className="oss-dialog-content">{children}</div>
  </div>;
}

export function DialogTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("oss-dialog-title", className)}>{children}</h2>;
}
export function DialogDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("oss-dialog-desc", className)}>{children}</p>;
}
export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("oss-dialog-body", className)}>{children}</div>;
}
