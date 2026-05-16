import { useState } from "react";
import {
  BookOpen,
  Brain,
  Clock,
  FileQuestion,
  FileText,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32">
      {/* subtle background orbs to tie into hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-float-slow absolute top-20 right-[5%] h-72 w-72 rounded-full bg-emerald-400/20 blur-[100px]" />
        <div className="animate-float-slower absolute bottom-20 left-[5%] h-80 w-80 rounded-full bg-green-500/15 blur-[120px]" />
      </div>

      {/* Section heading */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/60 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-emerald-700 backdrop-blur">
          <Sparkles className="h-3 w-3" />
          The Platform
        </span>
        <h2 className="text-balance mt-4 text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl">
          Everything to{" "}
          <span className="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 bg-clip-text text-transparent">
            ace GCSE RE.
          </span>
          <br />
          <span className="text-muted-foreground">Nothing in the way.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Six tools, one platform. Built deeper than BBC Bitesize — and the
          only one with an AI tutor trained on the GCSE RE spec.
        </p>
      </div>

      {/* Bento grid */}
      <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3">
        <StudyNotesCard />
        <AITutorCard />
        <ExamSimulatorCard />
        <QuestionBankCard />
        <PastPapersCard />
        <HomeworkCard />
      </div>
    </section>
  );
}

/* ─────────── 1. Study Notes (span 2) — real image ─────────── */
function StudyNotesCard() {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-emerald-300/60 hover:shadow-[var(--shadow-elegant)] md:col-span-2">
      <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />

      {/* Real image with topic chip overlays */}
      <div className="relative h-44 overflow-hidden sm:h-52">
        <img
          src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=900&q=80"
          alt="Study notes and open books"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* floating topic chips */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 shadow-sm backdrop-blur transition-transform group-hover:-translate-y-0.5">
            Christianity
          </span>
          <span
            className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 shadow-sm backdrop-blur transition-transform group-hover:-translate-y-0.5"
            style={{ transitionDelay: "60ms" }}
          >
            Islam
          </span>
          <span
            className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 shadow-sm backdrop-blur transition-transform group-hover:-translate-y-0.5"
            style={{ transitionDelay: "120ms" }}
          >
            Ethics
          </span>
          <span
            className="rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm backdrop-blur transition-transform group-hover:-translate-y-0.5"
            style={{ transitionDelay: "180ms" }}
          >
            +12 topics
          </span>
        </div>
      </div>

      {/* text */}
      <div className="relative flex-1 p-6 sm:p-7">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-all group-hover:rotate-3 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-green-600 group-hover:text-white">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Deeper than Bitesize
          </span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          Detailed study notes
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Spec‑mapped notes for every topic — Christianity, Islam, Judaism,
          ethics and philosophy. With examiner commentary, key terms and sacred
          text quotes built in.
        </p>
        <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 transition-all hover:gap-2">
          Read a sample note <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ─────────── 2. AI Tutor (span 1) — interactive chat ─────────── */
function AITutorCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-emerald-300/60 hover:shadow-[var(--shadow-elegant)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />

      {/* Mini chat */}
      <div className="relative mb-5 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white p-3">
        <div className="mb-2 flex gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
            S
          </div>
          <div className="rounded-lg border border-border/60 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-foreground">
            How do I get full marks on a 12‑mark RE question?
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white">
            <Sparkles className="h-3 w-3" />
          </div>
          <div className="flex-1 overflow-hidden">
            {!hovered ? (
              <div className="inline-flex items-center gap-1 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500" />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            ) : (
              <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-[11px] leading-snug text-foreground">
                Use <b>PEEL</b>: <b>Point</b>, <b>Evidence</b> (quote
                scripture), <b>Explain</b>, then <b>Link</b> back. For 12
                markers, include a contrasting religious view.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-all group-hover:rotate-3 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-green-600 group-hover:text-white">
        <Brain className="h-5 w-5" />
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
        Fine‑tuned AI tutor
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        Not ChatGPT. Trained on every GCSE RE spec and examiner report —
        teaches what markers actually want.
      </p>
    </div>
  );
}

/* ─────────── 3. Exam Simulator (span 1) — countdown timer ─────────── */
function ExamSimulatorCard() {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-emerald-300/60 hover:shadow-[var(--shadow-elegant)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />

      {/* Circular timer */}
      <div className="relative mb-5 flex items-center justify-center rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white p-4">
        <div className="relative h-24 w-24">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgb(229 231 235)"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#timer-grad)"
              strokeWidth="6"
              strokeDasharray="264"
              strokeDashoffset="79"
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out group-hover:[stroke-dashoffset:185]"
            />
            <defs>
              <linearGradient id="timer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">42:18</div>
              <div className="-mt-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                remaining
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-700">
          Paper 1 · Q5 of 12
        </div>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-all group-hover:rotate-3 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-green-600 group-hover:text-white">
        <Clock className="h-5 w-5" />
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
        Exam simulator
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        Sit full mock papers under timed conditions. AI marks every answer
        against real mark schemes.
      </p>
    </div>
  );
}

/* ─────────── 4. Question Bank (span 2) — fanned cards ─────────── */
function QuestionBankCard() {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-emerald-300/60 hover:shadow-[var(--shadow-elegant)] md:col-span-2">
      <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />

      {/* Fanned cards */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-emerald-50/40 via-white to-green-50/40 sm:h-52">
        {/* back card */}
        <div className="absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 -rotate-[10deg] rounded-xl border border-border/60 bg-card/80 p-3 shadow-md transition-all duration-500 ease-out group-hover:-translate-x-[110%] group-hover:-rotate-[18deg] sm:w-60">
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-medium text-blue-700">
            Buddhism · 4 marks
          </span>
          <p className="mt-2 line-clamp-2 text-[11px] text-foreground">
            Explain two Buddhist teachings about dukkha (suffering).
          </p>
        </div>
        {/* mid card */}
        <div className="absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 rotate-[6deg] rounded-xl border border-border/60 bg-card p-3 shadow-md transition-all duration-500 ease-out group-hover:translate-x-[10%] group-hover:rotate-[12deg] sm:w-60">
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-medium text-amber-700">
            Islam · 5 marks
          </span>
          <p className="mt-2 line-clamp-2 text-[11px] text-foreground">
            Explain two reasons why Hajj is important to Muslims today.
          </p>
        </div>
        {/* front card */}
        <div className="absolute left-1/2 top-1/2 w-56 -translate-x-1/2 -translate-y-1/2 -rotate-3 rounded-xl border border-emerald-200 bg-card p-3 shadow-lg transition-all duration-500 ease-out group-hover:rotate-0 group-hover:scale-105 sm:w-60">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
              Christianity · 12 marks
            </span>
            <span className="text-[9px] text-muted-foreground">AQA</span>
          </div>
          <p className="mt-2 line-clamp-2 text-[11px] font-medium text-foreground">
            "God is love." Evaluate this statement with reference to Christian
            teaching.
          </p>
          <div className="mt-2 flex items-center gap-1">
            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
            <span className="text-[9px] text-muted-foreground">Answered · 10/12</span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 p-6 sm:p-7">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-all group-hover:rotate-3 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-green-600 group-hover:text-white">
            <FileQuestion className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            9,217 questions
          </span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          Adaptive question bank
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Filter by topic, exam board, marks or difficulty. We track your weak
          spots and surface them again before exam day.
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["AQA", "Edexcel", "OCR", "Eduqas", "WJEC"].map((b) => (
            <span
              key={b}
              className="cursor-default rounded-full border border-border/60 px-2.5 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:border-emerald-200 hover:bg-emerald-50/60 hover:text-emerald-700"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────── 5. Past Papers (span 1) — real image + year stack ─────────── */
function PastPapersCard() {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-emerald-300/60 hover:shadow-[var(--shadow-elegant)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />

      {/* Image with year overlay */}
      <div className="relative h-36 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80"
          alt="Past exam papers"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-card/40" />

        {/* paper stack overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {[2022, 2023, 2024, 2025].map((year, i) => (
              <div
                key={year}
                className="absolute left-1/2 top-1/2 h-20 w-16 rounded-md border border-border/60 bg-white shadow-md transition-all duration-500"
                style={{
                  transform: `translate(calc(-50% + ${i * 5 - 7}px), calc(-50% + ${i * 3 - 4}px)) rotate(${(i - 1.5) * 5}deg)`,
                  zIndex: i,
                }}
              >
                <div className="p-1.5">
                  <div className="mb-0.5 h-0.5 w-8 rounded-full bg-emerald-300" />
                  <div className="mb-0.5 h-0.5 w-10 rounded-full bg-gray-200" />
                  <div className="mb-1 h-0.5 w-7 rounded-full bg-gray-200" />
                  <div className="text-[8px] font-bold text-emerald-600">
                    {year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 shadow-sm backdrop-blur">
          2014 → 2026
        </span>
      </div>

      <div className="relative flex-1 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-all group-hover:rotate-3 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-green-600 group-hover:text-white">
          <FileText className="h-5 w-5" />
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
          Every past paper
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          AQA, Edexcel, OCR and Eduqas — going back a decade, with mark schemes
          and our own model answers.
        </p>
      </div>
    </div>
  );
}

/* ─────────── 6. Homework for Teachers (span 2) — class dashboard ─────────── */
function HomeworkCard() {
  const students = [
    { name: "Emma B.", progress: 92, tone: "emerald" },
    { name: "James K.", progress: 78, tone: "emerald" },
    { name: "Sophie L.", progress: 65, tone: "amber" },
    { name: "Mohammed A.", progress: 88, tone: "emerald" },
    { name: "Rachel T.", progress: 45, tone: "rose" },
  ];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-emerald-300/60 hover:shadow-[var(--shadow-elegant)] md:col-span-2">
      <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />

      {/* Dashboard mockup */}
      <div className="relative bg-gradient-to-br from-emerald-50/40 via-white to-green-50/40 p-5 sm:p-6">
        <div className="rounded-2xl border border-border/60 bg-card/90 p-4 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-foreground">
                Year 10 · Religious Studies
              </div>
              <div className="text-[10px] text-muted-foreground">
                Homework · "Trinity 12‑marker" · Due Friday
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              28/32 submitted
            </span>
          </div>
          <div className="space-y-2">
            {students.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <div className="w-20 truncate text-[11px] text-foreground">
                  {s.name}
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      s.tone === "emerald"
                        ? "bg-gradient-to-r from-emerald-400 to-green-500"
                        : s.tone === "amber"
                          ? "bg-gradient-to-r from-amber-400 to-orange-500"
                          : "bg-gradient-to-r from-rose-400 to-red-500"
                    } w-0 group-hover:[width:var(--w)]`}
                    style={
                      {
                        ["--w" as never]: `${s.progress}%`,
                        transitionDelay: `${i * 90}ms`,
                      } as React.CSSProperties
                    }
                  />
                </div>
                <div className="w-8 text-right text-[10px] font-bold text-foreground">
                  {s.progress}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex-1 p-6 pt-2 sm:p-7 sm:pt-2">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-all group-hover:rotate-3 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-green-600 group-hover:text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            For schools
          </span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          Homework for teachers
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Set, track and auto‑mark RE homework across whole classes. Live
          per‑pupil performance, per‑AO breakdowns, and one‑click export to
          your school's reporting system.
        </p>
      </div>
    </div>
  );
}