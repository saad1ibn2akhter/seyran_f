import { useAuthFonts, fontSerif, fontMono, fontSans } from "@/lib/fonts";

/**
 * Shared auth shell.
 *
 * Props:
 *  - stepLabel:   small label above heading (e.g. "01 / Sign in")
 *  - heading:     main heading text
 *  - headingTail: italic tail of the heading (e.g. " back.")
 *  - subtitle:    paragraph under the heading
 *  - topRight:    { prompt, linkText, href } for the cross-page link
 *  - rightFooter: { label } for the small label in the dark panel (e.g. "→ Returning")
 *  - children:    the form
 */
export default function AuthLayout({
    stepLabel,
    heading,
    headingTail,
    subtitle,
    topRight,
    rightFooter,
    children,
}) {
    useAuthFonts();

    return (
        <div
            className="min-h-screen w-full bg-stone-50 text-stone-900 flex"
            style={fontSans}
        >
            {/* LEFT PANEL */}
            <div className="hidden md:flex relative w-1/2 bg-stone-900 text-stone-100 p-12 flex-col justify-between overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                        backgroundSize: "3px 3px",
                    }}
                />

                <div className="relative flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-amber-300" />
                    <span style={fontMono} className="text-xs tracking-widest uppercase">
                        Atelier / 001
                    </span>
                </div>

                <div className="relative">
                    <h1
                        style={fontSerif}
                        className="text-6xl lg:text-7xl leading-[0.95] tracking-tight"
                    >
                        A quiet place
                        <br />
                        for <span className="italic text-amber-200">careful</span>
                        <br />
                        work.
                    </h1>

                    <p className="mt-8 max-w-sm text-stone-400 text-sm leading-relaxed">
                        Sign in to continue, or make an account to begin.
                    </p>
                </div>

                <div
                    style={fontMono}
                    className="relative flex justify-between text-[10px] tracking-widest uppercase text-stone-500"
                >
                    <span>Est. MMXXVI</span>
                    <span>{rightFooter}</span>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between p-6 md:p-8">
                    <div className="md:hidden flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                        <span
                            style={fontMono}
                            className="text-[10px] tracking-widest uppercase"
                        >
                            Atelier
                        </span>
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                        <span
                            style={fontMono}
                            className="text-[10px] tracking-widest uppercase text-stone-400"
                        >
                            {topRight.prompt}
                        </span>

                        <a
                            href={topRight.href}
                            style={fontMono}
                            className="text-[10px] tracking-widest uppercase border-b border-stone-900 pb-0.5"
                        >
                            {topRight.linkText}
                        </a>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center px-6 md:px-12 pb-12">
                    <div className="w-full max-w-sm">
                        <div className="flex items-baseline gap-3 mb-10">
                            <span
                                style={fontMono}
                                className="text-[10px] tracking-[0.25em] uppercase text-stone-400"
                            >
                                {stepLabel}
                            </span>
                            <div className="flex-1 h-px bg-stone-200" />
                        </div>

                        <h2 style={fontSerif} className="text-5xl mb-2">
                            {heading}
                            {headingTail && (
                                <span className="italic text-stone-400">{headingTail}</span>
                            )}
                        </h2>

                        <p className="text-sm text-stone-500 mb-10">{subtitle}</p>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}