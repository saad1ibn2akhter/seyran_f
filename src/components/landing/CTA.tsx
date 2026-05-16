import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-foreground px-6 py-24 text-center shadow-[var(--shadow-elegant)]">
        <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 0%, oklch(0.78 0.16 145 / 0.5), transparent 60%), radial-gradient(ellipse at 20% 100%, oklch(0.55 0.16 152 / 0.45), transparent 60%)" }} aria-hidden />
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "var(--noise)" }} aria-hidden />
        <div className="relative mx-auto max-w-2xl space-y-7">
          <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] text-background sm:text-6xl">
            Start improving outcomes today.
          </h2>
          <p className="text-background/70">
            Join the schools, teachers, and students already learning smarter with Seyran Learn.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="group h-12 rounded-full bg-background px-6 text-foreground hover:bg-background/90">
              Get started free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-full border-background/30 bg-transparent px-6 text-background hover:bg-background/10 hover:text-background">
              Book a demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
