import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-subtle hover:bg-accent-hover hover:shadow-card",
  secondary:
    "bg-surface-muted text-text-primary border border-border hover:bg-surface hover:shadow-subtle",
  outline:
    "bg-transparent text-text-primary border border-border hover:border-text-muted hover:bg-surface-muted",
  ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-muted",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.83rem]",
  md: "h-11 px-5",
  lg: "h-12 px-6 text-[0.95rem]",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  loading?: boolean;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    loading = false,
    className,
    children,
    ...rest
  } = props as ButtonProps & { href?: string };

  const styles = cn(
    "type-button inline-flex cursor-pointer items-center justify-center gap-2 rounded-md",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        icon
      )}
      <span>{children}</span>
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={styles} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={styles}
      disabled={loading || (rest as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
