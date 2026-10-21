import React from "react";

export type PlaceholderKind =
  | "PHOTO"
  | "STAT"
  | "TESTIMONIAL"
  | "ADDRESS"
  | "DESCRIPTION"
  | "CONFIRM"
  | "COUNTRY"
  | "LOGO — vector needed"
  | "PHONE"
  | "EMAIL";

interface PlaceholderProps {
  kind: PlaceholderKind | string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Placeholder({
  kind,
  label,
  className = "",
  children,
}: PlaceholderProps) {
  const displayLabel = label || `[${kind}]`;

  return (
    <div
      data-placeholder-kind={kind}
      className={`relative inline-flex items-center justify-center border border-dashed border-maroon/25 bg-paper/60 p-3 text-center transition-colors select-none ${className}`}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="font-montserrat text-[11px] font-medium tracking-widest uppercase text-grey/80">
          {displayLabel}
        </span>
        {children && (
          <div className="text-xs text-grey/70 mt-1">{children}</div>
        )}
      </div>
    </div>
  );
}
