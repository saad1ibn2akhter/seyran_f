import { Logo } from "./Logo";

const cols = [
  { title: "Product", links: ["Features", "Students", "Teachers", "Schools", "Pricing"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
  { title: "Resources", links: ["Help center", "Privacy", "Terms", "Security"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-2 space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Calm, AI-powered tools that help every student grow.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">{c.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Seyran Learn. All rights reserved.</p>
          <p>Crafted with care for learners everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
