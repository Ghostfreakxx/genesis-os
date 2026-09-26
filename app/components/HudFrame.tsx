import type { ReactNode } from "react";

interface HudFrameProps {
  children: ReactNode;
  className?: string;
}

export default function HudFrame({ children, className = "" }: HudFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute -top-px -left-px h-3 w-3 rounded-tl-md border-t border-l border-current" />
      <span className="pointer-events-none absolute -top-px -right-px h-3 w-3 rounded-tr-md border-t border-r border-current" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 rounded-bl-md border-b border-l border-current" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 rounded-br-md border-b border-r border-current" />
      {children}
    </div>
  );
}
