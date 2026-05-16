import { Star } from "lucide-react";

const items = [
  { quote: "I went from a 5 to a 7 in three months. The instant feedback made every practice session count.", name: "Maya R.", role: "Year 11 Student" },
  { quote: "Marking used to consume my weekends. Seyran Learn gives me back hours every single week.", name: "Mr. Patel", role: "Head of Science" },
  { quote: "We finally have a clear picture of where each cohort needs support. It's transformed our planning.", name: "Dr. Chen", role: "Deputy Head" },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Loved by educators</span>
        <h2 className="text-balance mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
          Quietly changing classrooms.
        </h2>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-3xl border border-border/70 bg-card p-8 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]"
          >
            <div className="flex gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3 border-t border-border/60 pt-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gradient-primary)] text-sm font-semibold text-primary-foreground">
                {t.name[0]}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
