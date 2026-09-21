import type { ReactNode } from "react";

interface HudFrameProps {
  children: ReactNode;
  className?: string;
}

export default function HudFrame({ children, className = "" }: HudFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-current" />
      <span className="pointer-events-none absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-current" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-current" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-current" />
      {children}
    </div>
  );
}
