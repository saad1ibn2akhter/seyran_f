import { useEffect, useMemo, useState } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  BookOpen,
  FileText,
  AlertCircle,
  Flag,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

// export const Route = createFileRoute("/exam")({
//   component: Exam,
// });

type Question = {
  id: number;
  board: "AQA" | "OCR" | "WJEC";
  paper: string;
  topic: string;
  question: string;
  marks: number;
  type: "long" | "mcq";
  options?: string[];
  extract?: string;
};

const examMeta = {
  board: "OCR",
  title: "Computer Science Paper 1",
  subtitle: "Computer Systems · June 2022",
  duration: 0.5, // minutes
  totalMarks: 0, // computed below
};

const questions: Question[] = [
  {
    id: 1,
    board: "OCR",
    paper: "Paper 1",
    topic: "Processor Architecture",
    question:
      "Explain the differences between RISC and CISC processor architectures. Give one advantage of each.",
    marks: 8,
    type: "long",
  },
  {
    id: 2,
    board: "OCR",
    paper: "Paper 1",
    topic: "Processor Architecture",
    question: "Which one is a feature of RISC architecture?",
    marks: 1,
    type: "mcq",
    options: [
      "Complex instructions",
      "Few instructions",
      "Microcode heavy",
      "Slow execution",
    ],
  },
  {
    id: 3,
    board: "OCR",
    paper: "Paper 1",
    topic: "CPU Performance",
    question:
      "Explain pipelining in CPU design. In your answer, refer to the fetch, decode and execute stages and describe one situation in which pipelining may not improve performance.",
    marks: 6,
    type: "long",
  },
];

examMeta.totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export default function ExamSimulator() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(examMeta.duration * 60);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const q = questions[index];
  const answeredCount = useMemo(
    () =>
      questions.filter((qq) => {
        const a = answers[qq.id];
        return typeof a === "string" && a.trim().length > 0;
      }).length,
    [answers]
  );

  const wordCount = useMemo(() => {
    const text = answers[q.id] || "";
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [answers, q.id]);

  const timerColor =
    secondsLeft < 5 * 60
      ? "text-rose-600"
      : secondsLeft < 20 * 60
      ? "text-amber-600"
      : "text-emerald-600";

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-zinc-900">
      {/* HERO / INSTRUCTIONS BANNER */}
      {showInstructions && (
        <section className="border-b bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 text-white">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                  <BookOpen className="h-3.5 w-3.5" />
                  {examMeta.board} · Exam Simulator
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  {examMeta.title}
                </h1>
                <p className="mt-1 text-sm text-violet-100">
                  {examMeta.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center md:gap-4">
                <div className="rounded-lg bg-white/10 px-4 py-3 backdrop-blur">
                  <div className="text-[11px] uppercase tracking-wide text-violet-100">
                    Duration
                  </div>
                  <div className="mt-0.5 text-lg font-semibold">
                    {examMeta.duration} min
                  </div>
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-3 backdrop-blur">
                  <div className="text-[11px] uppercase tracking-wide text-violet-100">
                    Questions
                  </div>
                  <div className="mt-0.5 text-lg font-semibold">
                    {questions.length}
                  </div>
                </div>
                <div className="rounded-lg bg-white/10 px-4 py-3 backdrop-blur">
                  <div className="text-[11px] uppercase tracking-wide text-violet-100">
                    Total marks
                  </div>
                  <div className="mt-0.5 text-lg font-semibold">
                    {examMeta.totalMarks}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <AlertCircle className="h-4 w-4" />
                Instructions
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-violet-50 md:grid-cols-2">
                <li className="flex gap-2">
                  <span className="text-violet-200">·</span>
                  Answer all questions in the spaces provided.
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-200">·</span>
                  Marks for each question are shown in brackets.
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-200">·</span>
                  Use technical terms and clear examples where relevant.
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-200">·</span>
                  You may flag questions to revisit before submitting.
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-200">·</span>
                  The timer runs continuously and cannot be paused.
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-200">·</span>
                  Click Submit once you have finished the paper.
                </li>
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="rounded-md bg-white px-5 py-2 text-sm font-medium text-violet-700 hover:bg-violet-50"
                >
                  Start exam
                </button>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="rounded-md border border-white/30 px-5 py-2 text-sm font-medium text-white hover:bg-white/10"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STICKY TOP BAR */}
      <div className="sticky top-0 z-30 border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <div className="text-sm font-semibold">
              {examMeta.board} {examMeta.title}
            </div>
            <div className="text-[11px] text-zinc-500">{examMeta.subtitle}</div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-zinc-600">
            <span className="rounded-full bg-zinc-100 px-3 py-1">
              {answeredCount}/{questions.length} answered
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1">
              {Object.values(flagged).filter(Boolean).length} flagged
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1 text-sm font-medium ${timerColor}`}
            >
              <Clock className="h-4 w-4" />
              {formatTime(secondsLeft)}
            </div>
            <button
              onClick={() => setShowInstructions(true)}
              className="hidden sm:inline-flex rounded-md border bg-white px-3 py-2 text-sm hover:bg-zinc-50"
            >
              Instructions
            </button>
            <button className="flex items-center gap-1 rounded-md bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700">
              <Send className="h-4 w-4" />
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-4 py-6">
        {/* LEFT QUESTION NAV */}
        <aside className="col-span-12 md:col-span-2">
          <div className="sticky top-20 rounded-lg border bg-white p-3">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              Questions
            </div>
            <div className="grid grid-cols-5 gap-2 md:grid-cols-1">
              {questions.map((qq, i) => {
                const answered =
                  typeof answers[qq.id] === "string" &&
                  answers[qq.id].trim().length > 0;
                const isFlagged = flagged[qq.id];
                return (
                  <button
                    key={qq.id}
                    onClick={() => setIndex(i)}
                    className={`relative flex h-10 w-full items-center justify-center rounded-md text-sm font-medium transition ${
                      i === index
                        ? "bg-violet-600 text-white"
                        : answered
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "bg-zinc-50 hover:bg-zinc-100"
                    }`}
                  >
                    {i + 1}
                    {isFlagged && (
                      <Flag className="absolute -top-1 -right-1 h-3 w-3 fill-amber-400 text-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 space-y-1.5 text-[11px] text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-violet-600" /> Current
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-emerald-100" /> Answered
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-zinc-50 border" /> Unanswered
              </div>
            </div>
          </div>
        </aside>

        {/* QUESTION AREA */}
        <main className="col-span-12 md:col-span-10">
          <div className="rounded-lg border bg-white p-6 shadow-sm md:p-8">
            {/* QUESTION META */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                  Question {index + 1} of {questions.length}
                </span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  {q.topic}
                </span>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  {q.type === "mcq" ? "Multiple choice" : "Extended answer"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-zinc-700">
                  [{q.marks} {q.marks === 1 ? "mark" : "marks"}]
                </span>
                <button
                  onClick={() =>
                    setFlagged({ ...flagged, [q.id]: !flagged[q.id] })
                  }
                  className={`flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                    flagged[q.id]
                      ? "border-amber-300 bg-amber-50 text-amber-700"
                      : "hover:bg-zinc-50"
                  }`}
                >
                  {flagged[q.id] ? (
                    <BookmarkCheck className="h-3.5 w-3.5" />
                  ) : (
                    <Bookmark className="h-3.5 w-3.5" />
                  )}
                  {flagged[q.id] ? "Flagged" : "Flag"}
                </button>
              </div>
            </div>

            {/* OPTIONAL EXTRACT / SOURCE */}
            {q.extract && (
              <div className="mt-5 rounded-md border-l-4 border-violet-400 bg-violet-50/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-violet-700">
                  <FileText className="h-3.5 w-3.5" />
                  Source material
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                  {q.extract}
                </p>
              </div>
            )}

            {/* QUESTION TEXT */}
            <div className="mt-6">
              <p className="text-[16px] leading-relaxed font-medium text-zinc-900">
                {q.question}
              </p>
            </div>

            {/* ANSWER AREA */}
            <div className="mt-6">
              {q.type === "mcq" ? (
                <div className="space-y-2">
                  {q.options?.map((opt, i) => {
                    const letter = String.fromCharCode(65 + i);
                    const selected = answers[q.id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() =>
                          setAnswers({ ...answers, [q.id]: opt })
                        }
                        className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition ${
                          selected
                            ? "border-violet-500 bg-violet-50"
                            : "hover:bg-zinc-50"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                            selected
                              ? "bg-violet-600 text-white"
                              : "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {letter}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs text-zinc-500">
                    <label
                      htmlFor="answer"
                      className="font-medium text-zinc-600"
                    >
                      Your answer
                    </label>
                    <span>
                      {wordCount} {wordCount === 1 ? "word" : "words"}
                    </span>
                  </div>
                  <textarea
                    id="answer"
                    value={answers[q.id] || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, [q.id]: e.target.value })
                    }
                    className="h-80 w-full resize-y rounded-md border bg-white p-4 text-sm leading-relaxed outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                    placeholder="Write your answer here. Use clear paragraphs and refer to relevant terminology where appropriate..."
                  />
                  <p className="mt-2 text-[11px] text-zinc-400">
                    Tip: aim for roughly {q.marks * 25}–{q.marks * 40} words for
                    a {q.marks}-mark response.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setIndex((i) => Math.max(i - 1, 0))}
              disabled={index === 0}
              className="flex items-center gap-1 rounded-md border bg-white px-4 py-2 text-sm hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <span className="text-xs text-zinc-500">
              {index + 1} / {questions.length}
            </span>

            <button
              onClick={() =>
                setIndex((i) => Math.min(i + 1, questions.length - 1))
              }
              disabled={index === questions.length - 1}
              className="flex items-center gap-1 rounded-md bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next question
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}