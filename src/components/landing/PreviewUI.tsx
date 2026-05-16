import { Check, Sparkles, FileText } from "lucide-react";

export function PreviewUI() {
  return (
    <section className="bg-[var(--gradient-soft)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A glimpse inside the platform
          </h2>
          <p className="mt-3 text-muted-foreground">
            Thoughtful interfaces designed for focus and flow.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Question card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
                <FileText className="h-3 w-3" /> Question
              </span>
              <span className="text-xs text-muted-foreground">Biology · 6 marks</span>
            </div>
            <p className="mt-4 text-sm font-medium leading-relaxed text-foreground">
              Explain how the structure of the alveoli is adapted for efficient gas exchange.
            </p>
            <div className="mt-4 rounded-xl border border-border bg-muted p-3 text-sm text-muted-foreground">
              The alveoli have a large surface area and thin walls one cell thick, allowing oxygen to diffuse rapidly into the blood…
            </div>
            <button className="mt-4 w-full rounded-xl bg-[var(--gradient-primary)] py-2 text-sm font-medium text-primary-foreground">
              Submit answer
            </button>
          </div>

          {/* AI feedback */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--gradient-primary)] text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">AI feedback</p>
                <p className="text-xs text-muted-foreground">Marked in 1.2s</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {["Strong opening — surface area mentioned", "Good link to diffusion gradient", "Missing: moist surface for dissolution"].map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${i < 2 ? "bg-primary-soft text-primary" : "bg-accent text-accent-foreground"}`}>
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mark breakdown */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold text-foreground">Mark breakdown</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="text-5xl font-semibold text-foreground">5</span>
              <span className="pb-2 text-muted-foreground">/ 6 marks</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[83%] rounded-full bg-[var(--gradient-primary)]" />
            </div>
            <div className="mt-6 space-y-3 text-sm">
              {[
                ["Knowledge", 90],
                ["Application", 80],
                ["Analysis", 70],
              ].map(([label, val]) => (
                <div key={label as string}>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{label}</span><span>{val}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary-glow" style={{ width: `${val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
