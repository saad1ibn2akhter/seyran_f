import { Leaf } from "lucide-react";

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2 group">
      <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--gradient-primary)] shadow-[var(--shadow-soft)]">
        <Leaf className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.5} />
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        {/* Seyran<span className="text-muted-foreground"> Learn</span> */}
        <img className="h-[76px] w-[186px]" src="https://i.ibb.co/7JcTg9Pd/Blue-and-Black-Minimalist-Brand-Logo-2.png" alt="" />
      </span>
    </a>
  );
}
