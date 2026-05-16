import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Check,
  Star,
  BookOpen,
  Brain,
  Trophy,
  ScrollText,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Flame,
  Cross,
  Compass,
} from "lucide-react";

const subjects = [
  { name: "Christianity", progress: 87 },
  { name: "Islam", progress: 74 },
  { name: "Judaism", progress: 68 },
  { name: "Buddhism", progress: 55 },
  { name: "Ethics & Themes", progress: 81 },
];

const questions = [
  {
    badge: "Christianity · 5 marks",
    counter: "Q 4 of 10",
    text: "Explain two Christian teachings about the nature of God. Refer to sacred writings in your answer.",
    ans:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
    score: 5,
    total: 5,
  },
  {
    badge: "Islam · 4 marks",
    counter: "Q 7 of 12",
    text: "Explain two reasons why the Hajj is important to Muslims today.",
    ans:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
    score: 4,
    total: 4,
  },
  {
    badge: "Judaism · 5 marks",
    counter: "Q 2 of 8",
    text: "Explain two ways in which keeping Shabbat strengthens Jewish identity.",
    ans:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
    score: 4,
    total: 5,
  },
  {
    badge: "Buddhism · 4 marks",
    counter: "Q 1 of 9",
    text: "Explain two Buddhist teachings about the causes of dukkha (suffering).",
    ans:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
    score: 3,
    total: 4,
  },
  {
    badge: "Ethics · 12 marks",
    counter: "Q 9 of 10",
    text: '"Religious teachings are the best guide to ethical decisions." Evaluate this statement.',
    ans:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
    score: 10,
    total: 12,
  },
];

export function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const q = questions[activeIdx];
  const scorePct = Math.round((q.score / q.total) * 100);

  const selectSubject = (i: number) => {
    setActiveIdx(i);
    setSubmitted(false);
  };

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-12 font-monts">
      {/* gradient orbs — now emerald/green tinted */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="animate-float-slow absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-emerald-400/30 blur-[120px]" />
        <div className="animate-float-slower absolute top-40 left-[-15%] h-[520px] w-[520px] rounded-full bg-green-500/20 blur-[140px]" />
        <div className="animate-float-slow absolute bottom-0 right-[20%] h-[300px] w-[300px] rounded-full bg-teal-400/20 blur-[100px]" />
      </div>

      {/* Floating background study icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <BookOpen
          className="animate-float-slow absolute top-20 left-[5%] h-8 w-8 text-emerald-500/30 sm:top-24 sm:h-12 sm:w-12"
        />
        <ScrollText
          className="animate-float-slower absolute top-28 right-[8%] h-7 w-7 text-green-500/30 sm:top-32 sm:h-11 sm:w-11"
          style={{ animationDelay: "1.2s" }}
        />
        <Lightbulb
          className="animate-float-slow absolute top-[42%] left-[3%] h-7 w-7 text-emerald-500/25 sm:left-[4%] sm:h-10 sm:w-10"
          style={{ animationDelay: "0.7s" }}
        />
        <Brain
          className="animate-float-slower absolute top-[46%] right-[4%] h-7 w-7 text-teal-500/25 sm:h-11 sm:w-11"
          style={{ animationDelay: "1.6s" }}
        />
        <GraduationCap
          className="animate-float-slow absolute bottom-[26%] left-[6%] h-8 w-8 text-emerald-500/25 sm:h-12 sm:w-12"
          style={{ animationDelay: "0.4s" }}
        />
        <Trophy
          className="animate-float-slower absolute bottom-[34%] right-[5%] h-7 w-7 text-green-500/25 sm:h-10 sm:w-10"
          style={{ animationDelay: "2s" }}
        />
        <Compass
          className="animate-float-slow hidden sm:block absolute top-[15%] right-[22%] h-9 w-9 text-emerald-500/20"
          style={{ animationDelay: "2.4s" }}
        />
        <Cross
          className="animate-float-slower hidden sm:block absolute bottom-[12%] left-[22%] h-8 w-8 text-teal-500/20"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-20 text-center sm:px-6 sm:pt-12 sm:pb-24">
        {/* Badge */}
        <a
          href="#features"
          className="group inline-flex items-center gap-2 rounded-full border border-emerald-200/70 glass px-3.5 py-1.5 text-xs font-medium text-foreground shadow-[var(--shadow-soft)] transition-all hover:scale-105 hover:border-emerald-300/90"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600">
            <Sparkles className="h-2.5 w-2.5 text-white" />
          </span>
          New · AI marking trained on GCSE RE specs
          <ArrowRight className="h-3 w-3 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </a>

        {/* Headline */}
        <h1 className="text-balance mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:mt-7 sm:text-6xl lg:text-7xl lg:leading-[1.02]">
          Learn deeper.{" "}
          <span className="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 bg-clip-text text-transparent">
            Practise smarter.
          </span>
          <br className="hidden sm:block" />
          Ace GCSE RE.
        </h1>

        {/* Sub */}
        <p className="text-balance mx-auto mt-5 max-w-xl px-2 text-base text-muted-foreground sm:mt-6 sm:text-lg font-monts">
          Spec-mapped notes that go deeper than BBC Bitesize, 9,000+ exam
          questions, a fine-tuned AI tutor, every past paper and a full exam
          simulator. Teachers can set and auto-mark homework too.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-col flex-wrap items-stretch justify-center gap-3 px-4 sm:mt-9 sm:flex-row sm:items-center sm:px-0">
          <Button
            size="lg"
            className="group h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-6 text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] hover:shadow-emerald-500/50"
          >
            Start learning free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-emerald-200/80 glass px-6 text-foreground transition-all hover:scale-[1.02] hover:border-emerald-300/90 hover:bg-emerald-50/60"
          >
            Watch 90-sec demo
          </Button>
        </div>

        {/* Trust bullets */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground sm:mt-7">
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" /> Free for students
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" /> AQA · Edexcel ·
            OCR · Eduqas
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" /> 1,200+ schools
          </span>
        </div>

        {/* Product Mockup */}
        <div className="relative mx-auto mt-14 max-w-5xl sm:mt-20">
          <div className="absolute -inset-x-12 -top-10 bottom-0 -z-10 rounded-[3rem] bg-gradient-to-br from-emerald-500/15 via-green-500/15 to-teal-500/15 blur-3xl" />

          <div className="relative rounded-[1.5rem] border border-emerald-200/40 glass p-1.5 shadow-[var(--shadow-elegant)] sm:rounded-[2rem] sm:p-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-card sm:aspect-[16/10] sm:rounded-[1.5rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white to-green-50/40" />

              {/* app chrome */}
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-border/60 bg-card/70 px-3 py-2 backdrop-blur sm:px-4 sm:py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-destructive/50 sm:h-2.5 sm:w-2.5" />
                  <span className="h-2 w-2 rounded-full bg-amber-400/70 sm:h-2.5 sm:w-2.5" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/70 sm:h-2.5 sm:w-2.5" />
                </div>
                <span className="max-w-[60%] truncate rounded-md bg-muted px-2 py-0.5 text-[9px] text-muted-foreground sm:px-3 sm:text-[10px]">
                  seyran.co.uk/re/practice
                </span>
                <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-600 sm:text-[10px]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              {/* content: flex-col on mobile, 12-col grid on sm+ */}
              <div className="absolute inset-0 flex flex-col gap-2 p-2 pt-10 sm:grid sm:grid-cols-12 sm:gap-3 sm:p-4 sm:pt-12">
                {/* Subjects */}
                <div className="rounded-xl border border-border/60 bg-card/80 p-2 sm:col-span-3 sm:p-3">
                  <div className="mb-1.5 hidden text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:block sm:mb-2">
                    Subjects
                  </div>
                  <div className="-mx-1 flex gap-1 overflow-x-auto px-1 sm:mx-0 sm:flex-col sm:gap-1.5 sm:overflow-visible sm:px-0">
                    {subjects.map((s, i) => (
                      <button
                        key={s.name}
                        onClick={() => selectSubject(i)}
                        className={`flex shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-md px-2 py-1.5 text-[10px] transition-all sm:shrink sm:whitespace-normal sm:text-[11px] ${
                          i === activeIdx
                            ? "bg-gradient-to-r from-emerald-100 to-green-100 font-medium text-emerald-700 shadow-sm"
                            : "text-muted-foreground hover:bg-emerald-50/60 hover:text-foreground"
                        }`}
                      >
                        {s.name}
                        <span className="text-[9px] opacity-60 sm:text-[10px]">
                          {s.progress}%
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question */}
                <div className="flex flex-1 flex-col rounded-xl border border-border/60 bg-card/80 p-3 sm:col-span-6 sm:p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-gradient-to-r from-emerald-100 to-green-100 px-2 py-0.5 text-[9px] font-medium text-emerald-700 sm:text-[10px]">
                      {q.badge}
                    </span>
                    <span className="text-[9px] text-muted-foreground sm:text-[10px]">
                      {q.counter}
                    </span>
                  </div>
                  <p className="mt-2 text-left text-[14px] font-medium leading-snug text-foreground sm:mt-3 sm:text-[18px]">
                    {q.text}
                  </p>
                  <p className="mt-2 text-left text-[11px] font-medium leading-snug text-foreground sm:mt-8 sm:text-[14px]">
                    {q.ans}
                  </p>
                  <div className="mt-2 space-y-1 sm:mt-3 sm:space-y-1.5">
                    <div className="h-1.5 w-full rounded bg-muted sm:h-2" />
                    <div className="h-1.5 w-[92%] rounded bg-muted sm:h-2" />
                    <div className="h-1.5 w-[78%] rounded bg-muted sm:h-2" />
                    <div className="h-1.5 w-[65%] rounded bg-muted sm:h-2" />
                  </div>
                  <div className="mt-auto flex justify-end pt-2 sm:pt-3">
                    <button
                      onClick={() => setSubmitted((s) => !s)}
                      className="rounded-md bg-gradient-to-r from-emerald-600 to-green-600 px-2.5 py-1 text-[9px] font-medium text-white shadow-sm transition-all hover:scale-105 hover:shadow-md hover:shadow-emerald-500/30 sm:px-3 sm:text-[10px]"
                    >
                      {submitted ? "✓ Marked" : "Submit for AI marking"}
                    </button>
                  </div>
                </div>

                {/* Stats: 2-col on mobile, stacked on sm+ */}
                <div className="grid grid-cols-2 gap-2 sm:col-span-3 sm:grid-cols-1 sm:gap-3">
                  <div className="rounded-xl border border-border/60 bg-card/80 p-2 transition-all hover:border-emerald-300/60 sm:p-3">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <Sparkles className="h-3 w-3 text-emerald-500" />
                      <span className="text-[9px] font-semibold text-foreground sm:text-[10px]">
                        AI feedback
                      </span>
                    </div>
                    <div className="mt-1 flex items-end gap-1 sm:mt-2">
                      <span className="text-xl font-semibold text-foreground sm:text-2xl">
                        {q.score}
                      </span>
                      <span className="pb-0.5 text-[9px] text-muted-foreground sm:pb-1 sm:text-[10px]">
                        /{q.total}
                      </span>
                    </div>
                    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-700 ease-out"
                        style={{ width: `${scorePct}%` }}
                      />
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-card/80 p-2 transition-all hover:border-emerald-300/60 sm:p-3">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <Flame className="h-3 w-3 text-emerald-500" />
                      <span className="text-[9px] font-semibold text-foreground sm:text-[10px]">
                        Streak
                      </span>
                    </div>
                    <div className="mt-1 text-xl font-semibold text-foreground sm:text-2xl">
                      12 days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating sticker cards — now visible on mobile too */}
          {/* <div className="animate-float-slow absolute -left-2 top-10 cursor-default rounded-2xl border border-emerald-200/60 glass p-2 shadow-[var(--shadow-elegant)] transition-transform hover:scale-105 sm:-left-6 sm:top-24 sm:p-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 sm:h-9 sm:w-9">
                <Sparkles className="h-3 w-3 text-white sm:h-4 sm:w-4" />
              </span>
              <div className="text-left">
                <div className="text-[10px] font-semibold text-foreground sm:text-xs">
                  Marked in 1.2s
                </div>
                <div className="text-[9px] text-muted-foreground sm:text-[10px]">
                  Examiner-grade
                </div>
              </div>
            </div>
          </div> */}

          <div className="animate-float-slower absolute -right-2 bottom-8 cursor-default rounded-2xl border border-emerald-200/60 glass p-2 shadow-[var(--shadow-elegant)] transition-transform hover:scale-105 sm:-right-4 sm:bottom-16 sm:p-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Star className="h-3 w-3 fill-emerald-500 text-emerald-500 sm:h-4 sm:w-4" />
              <div className="text-left">
                <div className="text-[10px] font-semibold text-foreground sm:text-xs">
                  +1.5 grade avg
                </div>
                <div className="text-[9px] text-muted-foreground sm:text-[10px]">
                  in 3 months
                </div>
              </div>
            </div>
          </div>

          {/* Extra desktop-only floating card */}
          <div className="animate-float-slow absolute -right-10 top-1/2 hidden cursor-default rounded-2xl border border-emerald-200/60 glass p-3 shadow-[var(--shadow-elegant)] transition-transform hover:scale-105 lg:flex">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-emerald-500" />
              <div className="text-left">
                <div className="text-xs font-semibold text-foreground">
                  AI Tutor online
                </div>
                <div className="text-[10px] text-muted-foreground">
                  12,847 students
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust marquee */}
        <div className="mt-16 sm:mt-20">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
            Trusted by leading UK schools
          </p>
          <div className="relative mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)] sm:mt-6">
            <div className="animate-marquee flex w-max gap-10 whitespace-nowrap text-lg font-semibold tracking-tight text-muted-foreground/70 sm:gap-14 sm:text-xl">
              {[...Array(2)].flatMap((_, k) =>
                [
                  "Northgate Academy",
                  "Westwood College",
                  "Linden Hall",
                  "Brookside School",
                  "Avalon Prep",
                  "Maple Grove",
                  "Riverstone",
                ].map((n) => (
                  <span
                    key={`${k}-${n}`}
                    className="cursor-default opacity-70 transition-colors hover:text-emerald-600 hover:opacity-100"
                  >
                    {n}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}