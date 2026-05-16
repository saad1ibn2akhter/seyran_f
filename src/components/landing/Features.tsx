import { Brain, MessageSquareHeart, FileQuestion, LineChart, Sparkles, ShieldCheck } from "lucide-react";

const features = [
  { icon: Brain, title: "AI marking", desc: "Long-form answers graded instantly with examiner-grade accuracy.", span: "md:col-span-2" },
  { icon: MessageSquareHeart, title: "Instant feedback", desc: "Personalised guidance the moment students hit submit." },
  { icon: FileQuestion, title: "Exam-style practice", desc: "Thousands of past-paper questions across every subject." },
  { icon: LineChart, title: "Progress tracking", desc: "Live insights into strengths, gaps and growth over time.", span: "md:col-span-2" },
  { icon: Sparkles, title: "Smart revision", desc: "Adaptive plans built around what each student needs next." },
  { icon: ShieldCheck, title: "Safe & private", desc: "Built for schools with privacy-first data handling." },
];

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Platform</span>
        <h2 className="text-balance mt-3 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
          Everything to learn deeply.
          <br />
          <span className="text-muted-foreground">Nothing in the way.</span>
        </h2>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className={`group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-7 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)] ${f.span ?? ""}`}
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--gradient-primary)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-all group-hover:bg-[var(--gradient-primary)] group-hover:text-primary-foreground group-hover:shadow-[var(--shadow-glow)]">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="relative mt-6 text-lg font-semibold tracking-tight text-foreground">{f.title}</h3>
            <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
