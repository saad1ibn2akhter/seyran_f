// import { Button } from "@/components/ui/button";
// import { Logo } from "./Logo";
// import { ArrowRight } from "lucide-react";

// const links = [
//   { label: "Platform", href: "#features" },
//   { label: "Students", href: "#students" },
//   { label: "Teachers", href: "#teachers" },
//   { label: "Schools", href: "#schools" },
// ];

// export function Navbar() {
//   return (
//     <header className="sticky top-4 z-50 w-full px-4">
//       <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full glass border border-border/60 px-3 pl-5 shadow-[var(--shadow-soft)]">
//         <Logo />
//         <nav className="hidden items-center gap-1 md:flex">
//           {links.map((l) => (
//             <a
//               key={l.label}
//               href={l.href}
//               className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary"
//             >
//               {l.label}
//             </a>
//           ))}
//         </nav>
//         <div className="flex items-center gap-1">
//           <Button variant="ghost" size="sm" className="hidden rounded-full text-foreground hover:bg-primary-soft hover:text-primary sm:inline-flex">
//             Login
//           </Button>
//           <Button size="sm" className="group rounded-full bg-foreground text-background shadow-[var(--shadow-soft)] hover:bg-foreground/90">
//             Get started
//             <ArrowRight className="ml-0.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// }

import { useState, useEffect, useRef } from "react";
import {
  Brain, Layers, FileText, ListTodo, ClipboardCheck, Repeat,
  BookOpen, CalendarDays, Smartphone, Target, Users, Trophy,
  GraduationCap, LineChart, Map, Library, MessageSquare, Sparkles,
  Building2, Plug, Palette, LifeBuoy, Tag, BarChart3,
  ArrowRight, ArrowUpRight, Menu as MenuIcon, X, ChevronDown,
} from "lucide-react";

/* ─────────────────────────────── data ─────────────────────────────── */

type MenuKey = "Platform" | "Students" | "Teachers" | "Schools";
type MenuItem = { icon: typeof Brain; title: string; desc: string; badge?: string };
type Menu = {
  eyebrow: string;
  description: string;
  items: MenuItem[];
  featured: { tag: string; title: string; desc: string; cta: string };
  links: string[];
  subjects?: string[];
};

const menus: Record<MenuKey, Menu> = {
  Platform: {
    eyebrow: "The platform",
    description: "AI-powered revision tools built around the GCSE spec.",
    items: [
      { icon: Brain,          title: "AI Tutor",           desc: "24/7 personal tutor for every subject", badge: "New" },
      { icon: Layers,         title: "Smart Flashcards",   desc: "Spaced repetition done properly" },
      { icon: FileText,       title: "Past Papers",        desc: "Every board, every year, marked" },
      { icon: ListTodo,       title: "Practice Questions", desc: "10,000+ exam-style questions" },
      { icon: ClipboardCheck, title: "Mock Exams",         desc: "Timed, auto-marked, analysed" },
      { icon: Repeat,         title: "Adaptive Revision",  desc: "Focuses on what you forget" },
    ],
    featured: { tag: "New", title: "Meet AI Tutor 2.0", desc: "Voice mode, instant marking on written answers, and exam-board aware feedback.", cta: "See it in action" },
    links: ["Changelog", "Roadmap", "System status"],
  },
  Students: {
    eyebrow: "For students",
    description: "Everything you need from Year 9 mocks to results day.",
    items: [
      { icon: BookOpen,     title: "Subject Library",  desc: "All 25+ GCSE subjects covered" },
      { icon: CalendarDays, title: "Study Plans",      desc: "Auto-built around your timetable" },
      { icon: Smartphone,   title: "Mobile App",       desc: "Revise anywhere, even offline" },
      { icon: Target,       title: "Predicted Grades", desc: "Live, based on real performance" },
      { icon: Users,        title: "Study Groups",     desc: "Revise together with friends" },
      { icon: Trophy,       title: "Streaks & Badges", desc: "Make showing up feel rewarding" },
    ],
    featured: { tag: "Free", title: "Always free for students", desc: "Core revision is free forever. No card, no trial, no catch.", cta: "Create your account" },
    links: ["Student stories", "Download the app", "Help centre"],
    subjects: ["Maths", "English Lit", "English Lang", "Biology", "Chemistry", "Physics", "History", "Geography", "Computer Science", "French", "Spanish", "RE", "Business"],
  },
  Teachers: {
    eyebrow: "For teachers",
    description: "Save hours each week and see where your class needs you.",
    items: [
      { icon: GraduationCap, title: "Classroom",        desc: "One hub for every class you teach" },
      { icon: ListTodo,      title: "Assignments",      desc: "Set, auto-mark, return in clicks" },
      { icon: LineChart,     title: "Class Analytics",  desc: "Topic-level gap analysis" },
      { icon: Map,           title: "Curriculum Map",   desc: "Aligned to AQA, Edexcel, OCR, WJEC" },
      { icon: Library,       title: "Resource Library", desc: "Slides, worksheets, quizzes" },
      { icon: MessageSquare, title: "Parent Updates",   desc: "Keep parents in the loop" },
    ],
    featured: { tag: "Walkthrough", title: "Book a teacher demo", desc: "30 minutes with our team to see how it fits your department.", cta: "Pick a time" },
    links: ["Teacher webinars", "Case studies", "CPD library"],
  },
  Schools: {
    eyebrow: "For schools",
    description: "A platform your SLT will actually love rolling out.",
    items: [
      { icon: BarChart3,  title: "Whole-school view",   desc: "Live performance across year groups" },
      { icon: Building2,  title: "Department Hubs",     desc: "Head-of-faculty dashboards" },
      { icon: Plug,       title: "MIS Integration",     desc: "Arbor, Bromcom, SIMS and more" },
      { icon: Palette,    title: "Custom Branding",     desc: "Your colours, your logo" },
      { icon: LifeBuoy,   title: "Training & Support",  desc: "Full onboarding done for you" },
      { icon: Tag,        title: "Transparent Pricing", desc: "Per-pupil, no surprises" },
    ],
    featured: { tag: "Schools", title: "Trusted by 500+ UK schools", desc: "From single academies to multi-academy trusts across England and Wales.", cta: "Talk to sales" },
    links: ["Customer stories", "Compliance & DPA", "Contact sales"],
  },
};

const menuKeys = Object.keys(menus) as MenuKey[];
const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/* ─────────────────────────────── shared bits ─────────────────────────────── */

function Logo() {
  return (
    <a href="#" className="flex shrink-0 items-center">
      <img
        src="https://i.ibb.co/7JcTg9Pd/Blue-and-Black-Minimalist-Brand-Logo-2.png"
        alt="Seyran Learn"
        className="block h-8 w-auto sm:h-9 md:h-11"
      />
    </a>
  );
}

/* A subtle pulsing dot — used to flag "fresh content" on the Platform link */
function PulseDot() {
  return (
    <span className="relative ml-1.5 inline-flex h-1.5 w-1.5">
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60" />
      <span className="relative block h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </span>
  );
}

function FeaturedCard({ featured }: { featured: Menu["featured"] }) {
  return (
    <a
      href="#"
      className="group/feat relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 p-4 text-white sm:p-5"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-lime-300/20 blur-3xl" />

      <div className="relative flex flex-col">
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/95 ring-1 ring-inset ring-white/20 backdrop-blur-sm">
          <Sparkles className="h-2.5 w-2.5" />
          {featured.tag}
        </span>
        <h3 className="mt-3 text-[15px] font-semibold leading-tight tracking-tight sm:text-[17px]">
          {featured.title}
        </h3>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-emerald-50/90 sm:text-[13px]">
          {featured.desc}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold">
          {featured.cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/feat:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

/* ─────────────────────────────── mobile sheet ─────────────────────────────── */

function MobileSheet({
  open,
  onClose,
  expanded,
  onToggleExpanded,
}: {
  open: boolean;
  onClose: () => void;
  expanded: MenuKey | null;
  onToggleExpanded: (k: MenuKey) => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={cx(
          "fixed inset-0 z-40 bg-stone-900/20 backdrop-blur-sm transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={cx(
          "fixed inset-x-3 top-[4.75rem] z-40 max-h-[calc(100dvh-5.5rem)] overflow-hidden rounded-3xl border border-stone-200/70 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.25)] transition-all duration-300 ease-out md:hidden",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(16,185,129,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(ellipse at 50% 0%, black 35%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black 35%, transparent 80%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_70%)]" />
        </div>

        <div className="relative flex max-h-[calc(100dvh-5.5rem)] flex-col">
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-2 pb-4">
            {menuKeys.map((key) => (
              <Accordion
                key={key}
                keyName={key}
                menu={menus[key]}
                isOpen={expanded === key}
                onToggle={() => onToggleExpanded(key)}
                onItemClick={onClose}
              />
            ))}
          </div>

          <div className="relative border-t border-stone-200/70 bg-white/90 px-5 py-4 backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              <button
                onClick={onClose}
                className="group inline-flex h-11 w-full items-center justify-center gap-1 rounded-full bg-stone-900 text-[14px] font-semibold text-white shadow-[0_4px_14px_-2px_rgba(15,23,42,0.25)] active:bg-stone-800"
              >
                Get started — free
                <ArrowRight className="h-4 w-4 transition-transform group-active:translate-x-0.5" />
              </button>
              <button
                onClick={onClose}
                className="inline-flex h-11 w-full items-center justify-center rounded-full border border-stone-200 bg-white text-[14px] font-semibold text-stone-800 active:bg-stone-50"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Accordion({
  keyName,
  menu,
  isOpen,
  onToggle,
  onItemClick,
}: {
  keyName: MenuKey;
  menu: Menu;
  isOpen: boolean;
  onToggle: () => void;
  onItemClick: () => void;
}) {
  return (
    <div className="border-b border-stone-200/60 last:border-b-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 py-4 text-left"
      >
        <span className="min-w-0">
          <span className="block text-[15.5px] font-semibold tracking-tight text-stone-900">
            {keyName}
          </span>
          <span className="mt-0.5 block text-[12.5px] leading-relaxed text-stone-500">
            {menu.description}
          </span>
        </span>
        <span
          className={cx(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-all duration-200",
            isOpen && "rotate-180 bg-emerald-50 text-emerald-700"
          )}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={2.25} />
        </span>
      </button>

      <div
        className={cx(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-4">
            <ul className="space-y-0.5">
              {menu.items.map((item) => (
                <li key={item.title}>
                  <a
                    href="#"
                    onClick={onItemClick}
                    className="group/item -mx-2 flex items-center gap-3 rounded-xl p-2 active:bg-emerald-50/80"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 ring-1 ring-emerald-100">
                      <item.icon className="h-[16px] w-[16px]" strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 text-[14px] font-semibold text-stone-900">
                        {item.title}
                        {item.badge && (
                          <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block truncate text-[12.5px] text-stone-500">
                        {item.desc}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-stone-300" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-3">
              <FeaturedCard featured={menu.featured} />
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 px-1">
              {menu.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={onItemClick}
                  className="text-[12px] font-medium text-stone-500 active:text-emerald-700"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── desktop mega menu ─────────────────────────────── */

function DesktopMegaPanel({ menu, keyName }: { menu: Menu; keyName: MenuKey }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-stone-200/70 bg-white/95 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(16,185,129,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.07) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse at 30% 0%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 30% 0%, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.06),transparent_55%)]" />
      </div>

      <div className="relative grid grid-cols-5 gap-7 p-7">
        <div className="col-span-3">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                {menu.eyebrow}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-stone-500">
                {menu.description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            {menu.items.map((item) => (
              <a
                key={item.title}
                href="#"
                className="group/item flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-emerald-50/60"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 ring-1 ring-emerald-100 transition-all group-hover/item:bg-emerald-50 group-hover/item:ring-emerald-200">
                  <item.icon className="h-[15px] w-[15px]" strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-stone-900">
                    {item.title}
                    {item.badge && (
                      <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700">
                        {item.badge}
                      </span>
                    )}
                    <ArrowUpRight className="h-3 w-3 -translate-x-0.5 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-60" />
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-relaxed text-stone-500">
                    {item.desc}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <FeaturedCard featured={menu.featured} />
        </div>
      </div>

      {/* Subject chips — Students menu only */}
      {menu.subjects && (
        <div className="relative border-t border-stone-200/60 px-7 py-4">
          <div className="mb-2.5 flex items-center justify-between">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-stone-400">
              Jump in by subject
            </p>
            <a href="#" className="group/all text-[11px] font-medium text-stone-500 hover:text-emerald-800">
              See all 25+ subjects
              <ArrowRight className="ml-0.5 inline h-3 w-3 transition-transform group-hover/all:translate-x-0.5" />
            </a>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {menu.subjects.map((s) => (
              <a
                key={s}
                href="#"
                className="rounded-full border border-stone-200/80 bg-white px-2.5 py-1 text-[11.5px] font-medium text-stone-700 transition-all hover:border-emerald-200 hover:bg-emerald-50/60 hover:text-emerald-800"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="relative flex items-center justify-between gap-4 border-t border-stone-200/70 bg-stone-50/60 px-7 py-3">
        <div className="flex items-center gap-5">
          {menu.links.map((link) => (
            <a key={link} href="#" className="text-[12px] font-medium text-stone-600 transition-colors hover:text-emerald-800">
              {link}
            </a>
          ))}
        </div>
        <a href="#" className="group/all inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-800">
          Explore all {keyName.toLowerCase()} features
          <ArrowRight className="h-3 w-3 transition-transform group-hover/all:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────── navbar ─────────────────────────────── */

export function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [expanded, setExpanded] = useState<MenuKey | null>("Platform");
  const [active, setActive] = useState<MenuKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDesktop = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(key);
  };
  const scheduleCloseDesktop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 120);
  };
  const cancelCloseDesktop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSheetOpen(false); setActive(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => e.matches && setSheetOpen(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <header className="sticky top-3 z-50 w-full px-3 sm:top-4 sm:px-4">
      <div className="relative mx-auto max-w-6xl" onMouseLeave={scheduleCloseDesktop}>
        {/* Pill bar — taller on desktop to accommodate the logo */}
        <div className="flex h-14 items-center justify-between rounded-full border border-stone-200/70 bg-white/80 pl-3 pr-1.5 shadow-[0_4px_28px_-8px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:h-16 sm:pl-4 sm:pr-2 md:h-[4.5rem] md:pl-5 md:pr-2.5">
          <Logo />

          {/* Desktop inline nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {menuKeys.map((key) => (
              <button
                key={key}
                onMouseEnter={() => openDesktop(key)}
                onFocus={() => openDesktop(key)}
                className={cx(
                  "group/nav relative inline-flex items-center rounded-full px-4 py-2 text-[13.5px] font-medium transition-all",
                  active === key
                    ? "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-100"
                    : "text-stone-600 hover:bg-emerald-50/60 hover:text-emerald-800"
                )}
              >
                {key}
                {key === "Platform" && <PulseDot />}
              </button>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1.5">
            <button
              onMouseEnter={scheduleCloseDesktop}
              className="hidden rounded-full px-4 py-2 text-[13.5px] font-medium text-stone-700 transition-colors hover:bg-emerald-50/60 hover:text-emerald-800 md:inline-flex"
            >
              Login
            </button>

            {/* Modernized CTA: gradient + emerald inner glow on hover */}
            <button
              onMouseEnter={scheduleCloseDesktop}
              className="group/cta relative inline-flex h-9 items-center gap-1 overflow-hidden rounded-full bg-gradient-to-b from-stone-800 to-stone-950 px-4 text-[13px] font-semibold text-white shadow-[0_6px_20px_-6px_rgba(15,23,42,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-inset ring-white/10 transition-all hover:shadow-[0_8px_24px_-6px_rgba(15,23,42,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] sm:h-10 md:h-11 md:px-5 md:text-sm"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
              />
              <span className="relative">Get started</span>
              <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5 md:h-4 md:w-4" />
            </button>

            <button
              onClick={() => setSheetOpen((s) => !s)}
              aria-label={sheetOpen ? "Close menu" : "Open menu"}
              aria-expanded={sheetOpen}
              className="ml-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-100 active:bg-stone-200 md:hidden"
            >
              <span className="relative block h-4 w-4">
                <MenuIcon className={cx("absolute inset-0 h-4 w-4 transition-all duration-200", sheetOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100")} />
                <X className={cx("absolute inset-0 h-4 w-4 transition-all duration-200", sheetOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0")} />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop mega menu */}
        <div
          onMouseEnter={cancelCloseDesktop}
          onMouseLeave={scheduleCloseDesktop}
          className={cx(
            "absolute left-1/2 top-[calc(100%+0.5rem)] hidden w-[min(960px,calc(100vw-2rem))] -translate-x-1/2 transition-all duration-200 ease-out md:block",
            active ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
          )}
        >
          {active && <DesktopMegaPanel menu={menus[active]} keyName={active} />}
        </div>
      </div>

      <MobileSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        expanded={expanded}
        onToggleExpanded={(k) => setExpanded((cur) => (cur === k ? null : k))}
      />
    </header>
  );
}

/* ─────────────────────────────── demo page ─────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 antialiased">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at top, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black 20%, transparent 70%)",
        }}
      />

      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-20 pb-20 text-center sm:pt-24">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-3 py-1 text-[11.5px] font-medium text-emerald-800">
          <Sparkles className="h-3 w-3" />
          Hover the desktop nav — tap the menu icon on mobile
        </span>
        <h1 className="mt-6 text-balance text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] text-stone-900 sm:text-5xl md:text-6xl">
          Revision that <em className="not-italic text-emerald-700">actually</em> sticks for GCSE.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-balance text-[14.5px] leading-relaxed text-stone-500 sm:text-[15px]">
          A focused, adaptive revision platform built around the GCSE specification. Loved by students, designed for teachers, trusted by schools.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
          <button className="group inline-flex h-11 items-center justify-center gap-1 rounded-full bg-stone-900 px-5 text-sm font-semibold text-white shadow-[0_4px_14px_-2px_rgba(15,23,42,0.25)] hover:bg-stone-800">
            Start revising free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button className="inline-flex h-11 items-center justify-center rounded-full border border-stone-200 bg-white px-5 text-sm font-semibold text-stone-800 hover:bg-stone-50">
            Book a school demo
          </button>
        </div>
      </main>
    </div>
  );
}
