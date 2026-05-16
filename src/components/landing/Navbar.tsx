import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { ArrowRight } from "lucide-react";

const links = [
  { label: "Platform", href: "#features" },
  { label: "Students", href: "#students" },
  { label: "Teachers", href: "#teachers" },
  { label: "Schools", href: "#schools" },
];

export function Navbar() {
  return (
    <header className="sticky top-4 z-50 w-full px-4">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full glass border border-border/60 px-3 pl-5 shadow-[var(--shadow-soft)]">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="hidden rounded-full text-foreground hover:bg-primary-soft hover:text-primary sm:inline-flex">
            Login
          </Button>
          <Button size="sm" className="group rounded-full bg-foreground text-background shadow-[var(--shadow-soft)] hover:bg-foreground/90">
            Get started
            <ArrowRight className="ml-0.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
