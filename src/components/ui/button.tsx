import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "glow" | "outline" | "ghost" | "link" | "default";
type Size = "default" | "sm" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  children?: ReactNode;
}

const variantClass: Record<Variant, string> = {
  glow: "btn-glow",
  outline: "btn-outline",
  ghost: "btn-ghost",
  link: "btn-link",
  default: "btn-default",
};

const sizeClass: Record<Size, string> = {
  default: "btn-md",
  sm: "btn-sm",
  icon: "btn-icon",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "default", size = "default", children, ...rest }, ref
) {
  return <button ref={ref} className={cn("ui-btn", variantClass[variant], sizeClass[size], className)} {...rest}>{children}</button>;
});
