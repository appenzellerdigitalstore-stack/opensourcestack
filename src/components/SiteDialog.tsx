import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function SiteDialog({ open, onClose, children }: DialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return <>
    <div className="dialog-overlay" onClick={onClose} aria-hidden />
    <div className="dialog-content" role="dialog" aria-modal="true">
      {children}
    </div>
  </>;
}

// Trigger button + dialog for "Submit a tool" — opens a message modal
// pointing visitors to the contact form. Used in the home page header.
export function SubmitToolButton() {
  const [open, setOpen] = useState(false);
  return <>
    <button type="button" className="btn-glow" onClick={() => setOpen(true)}>Submit a tool <span aria-hidden>+</span></button>
    <SiteDialog open={open} onClose={() => setOpen(false)}>
      <h2>Something worth sharing?</h2>
      <p>Help the open source ecosystem grow.</p>
      <p>Tool suggestions are reviewed independently before publication. Send your project through the directory's existing contact form.</p>
      <div className="dialog-actions">
        <Link to="/contact" className="btn-glow" onClick={() => setOpen(false)}>Suggest a tool <span aria-hidden>↗</span></Link>
        <button type="button" className="btn-outline" onClick={() => setOpen(false)}>Close</button>
      </div>
    </SiteDialog>
  </>;
}
