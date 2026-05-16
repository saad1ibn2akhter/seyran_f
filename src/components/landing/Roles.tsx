import { Button } from "@/components/ui/button";
import { ArrowUpRight, GraduationCap, BookOpen, Building2 } from "lucide-react";

const roles = [
  { id: "students", icon: GraduationCap, title: "Students", headline: "Practice. Improve. Repeat.", desc: "Answer real exam questions, get AI feedback, and watch your grades climb.", cta: "Start learning" },
  { id: "teachers", icon: BookOpen, title: "Teachers", headline: "Mark in minutes, not weekends.", desc: "Save hours every week with intelligent marking and ready-made resources.", cta: "Try for teachers" },
  { id: "schools", icon: Building2, title: "Schools", headline: "See progress across every cohort.", desc: "Get a school-wide view of attainment and learning gaps in real time.", cta: "Book a demo" },
];

export function Roles() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-soft)]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Built for everyone</span>
          <h2 className="text-balance mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
            One platform. Three tailored experiences.
          </h2>
        </div>
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {roles.map((r, i) => (
            <article
              key={r.id}
              id={r.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card p-8 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="absolute right-6 top-6 text-xs font-mono text-muted-foreground/60">0{i + 1}</div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]">
                <r.icon className="h-6 w-6" />
              </div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{r.title}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-foreground">{r.headline}</h3>
              <p className="mt-3 flex-1 text-muted-foreground">{r.desc}</p>
              <Button variant="ghost" className="mt-6 w-fit -ml-3 rounded-full text-primary hover:bg-primary-soft hover:text-primary">
                {r.cta} <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
