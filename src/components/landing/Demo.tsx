import { Play } from "lucide-react";

export function Demo() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">See it live</span>
        <h2 className="text-balance mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
          Two minutes. Whole platform.
        </h2>
        <p className="mt-4 text-muted-foreground">
          A short walkthrough of the student, teacher and school experience.
        </p>
      </div>

      <div className="relative mt-14">
        <div className="absolute -inset-10 rounded-[3rem] bg-[var(--gradient-primary)] opacity-15 blur-3xl" aria-hidden />
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-[var(--shadow-elegant)]">
          <div className="absolute inset-0 bg-[var(--gradient-soft)]" />
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "var(--noise)" }} />
          <button className="absolute inset-0 flex flex-col items-center justify-center gap-4 group">
            <span className="flex h-24 w-24 items-center justify-center rounded-full glass shadow-[var(--shadow-glow)] transition-transform group-hover:scale-110">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gradient-primary)]">
                <Play className="h-7 w-7 text-primary-foreground" fill="currentColor" />
              </span>
            </span>
            <span className="rounded-full glass px-3 py-1 text-xs text-foreground">Watch the demo · 2:14</span>
          </button>
        </div>
      </div>
    </section>
  );
}
