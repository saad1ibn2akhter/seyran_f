
import { useEffect, useMemo, useRef, useState } from "react";
// import { createFileRoute } from "@tanstack/react-router";
import Groq from "groq-sdk";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

import {
    PanelLeftClose,
    PanelLeftOpen,
    Plus,
    Search,
    Send,
    Pencil,
    Trash2,
    MoreHorizontal,
    Square,
    User,
    Settings,
    MessageSquare,
} from "lucide-react";

// export const Route = createFileRoute("/chat")({
//     component: Chat,
// });

/* ───────────────────────── types ───────────────────────── */

type Role = "user" | "assistant";

type Message = {
    id: string;
    role: Role;
    content: string;
    createdAt: number;
};

type Conversation = {
    id: string;
    title: string;
    messages: Message[];
    createdAt: number;
    updatedAt: number;
};

/* ───────────────────────── persistence ───────────────────────── */

const STORAGE_KEY = "chats:v1";

function loadConversations(): Conversation[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as Conversation[]) : [];
    } catch {
        return [];
    }
}

function saveConversations(list: Conversation[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/* ───────────────────────── ai request ───────────────────────── */

async function sendToModel(
    messages: Message[],
    onToken: (text: string) => void,
    signal: AbortSignal
): Promise<string> {

    const apiKey = import.meta.env.GROQ_API!;


    const client = new Groq({
        apiKey,
        dangerouslyAllowBrowser: true,
    });

    const stream = await client.chat.completions.create({
        messages: messages.map(({ role, content }) => ({
            role,
            content,
        })),
        model: "openai/gpt-oss-20b",
        stream: true,
    });

    let full = "";

    for await (const chunk of stream) {
        if (signal.aborted) break;

        const token = chunk.choices[0]?.delta?.content ?? "";

        if (token) {
            full += token;
            onToken(token);
        }
    }

    return full;
}

/* ───────────────────────── helpers ───────────────────────── */

const uid = () =>
    Math.random().toString(36).slice(2) +
    Date.now().toString(36);

function bucketByDate(list: Conversation[]) {
    const now = Date.now();
    const day = 86400000;

    const buckets: Record<string, Conversation[]> = {
        Today: [],
        Yesterday: [],
        "Previous 7 days": [],
        "Previous 30 days": [],
        Older: [],
    };

    for (const c of list) {
        const age = now - c.updatedAt;

        if (age < day) buckets["Today"].push(c);
        else if (age < 2 * day) buckets["Yesterday"].push(c);
        else if (age < 7 * day) buckets["Previous 7 days"].push(c);
        else if (age < 30 * day)
            buckets["Previous 30 days"].push(c);
        else buckets["Older"].push(c);
    }

    return buckets;
}

function titleFromFirstMessage(text: string) {
    const cleaned = text.trim().replace(/\s+/g, " ");

    return cleaned.length > 40
        ? cleaned.slice(0, 40) + "…"
        : cleaned || "New chat";
}

/* ───────────────────────── page ───────────────────────── */

export default function Chat() {
    const [collapsed, setCollapsed] = useState(false);
    const [conversations, setConversations] = useState<
        Conversation[]
    >([]);
    const [activeId, setActiveId] = useState<string | null>(
        null
    );
    const [search, setSearch] = useState("");
    const [streaming, setStreaming] = useState(false);

    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const list = loadConversations();

        setConversations(list);

        if (list.length > 0) {
            setActiveId(list[0].id);
        }
    }, []);

    useEffect(() => {
        saveConversations(conversations);
    }, [conversations]);

    const active = useMemo(
        () =>
            conversations.find((c) => c.id === activeId) ??
            null,
        [conversations, activeId]
    );

    const filtered = useMemo(() => {
        if (!search.trim()) return conversations;

        const q = search.toLowerCase();

        return conversations.filter(
            (c) =>
                c.title.toLowerCase().includes(q) ||
                c.messages.some((m) =>
                    m.content.toLowerCase().includes(q)
                )
        );
    }, [conversations, search]);

    const newChat = () => {
        const c: Conversation = {
            id: uid(),
            title: "New chat",
            messages: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        setConversations((cs) => [c, ...cs]);
        setActiveId(c.id);
    };

    const deleteChat = (id: string) => {
        setConversations((cs) => {
            const next = cs.filter((c) => c.id !== id);

            if (activeId === id) {
                setActiveId(next[0]?.id ?? null);
            }

            return next;
        });
    };

    const renameChat = (id: string, title: string) => {
        setConversations((cs) =>
            cs.map((c) =>
                c.id === id
                    ? {
                        ...c,
                        title: title || "Untitled",
                    }
                    : c
            )
        );
    };

    const send = async (text: string) => {
        if (!text.trim() || streaming) return;

        let convId = activeId;
        let conv = active;

        if (!conv) {
            conv = {
                id: uid(),
                title: titleFromFirstMessage(text),
                messages: [],
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };

            convId = conv.id;

            setConversations((cs) => [conv!, ...cs]);
            setActiveId(conv.id);
        }

        const userMsg: Message = {
            id: uid(),
            role: "user",
            content: text.trim(),
            createdAt: Date.now(),
        };

        const assistantMsg: Message = {
            id: uid(),
            role: "assistant",
            content: "",
            createdAt: Date.now(),
        };

        setConversations((cs) =>
            cs.map((c) =>
                c.id === convId
                    ? {
                        ...c,
                        title:
                            c.messages.length === 0
                                ? titleFromFirstMessage(text)
                                : c.title,
                        messages: [
                            ...c.messages,
                            userMsg,
                            assistantMsg,
                        ],
                        updatedAt: Date.now(),
                    }
                    : c
            )
        );

        const controller = new AbortController();

        abortRef.current = controller;
        setStreaming(true);

        try {
            await sendToModel(
                [...(conv?.messages ?? []), userMsg],
                (token) => {
                    setConversations((cs) =>
                        cs.map((c) =>
                            c.id === convId
                                ? {
                                    ...c,
                                    messages: c.messages.map(
                                        (m) =>
                                            m.id ===
                                                assistantMsg.id
                                                ? {
                                                    ...m,
                                                    content:
                                                        m.content +
                                                        token,
                                                }
                                                : m
                                    ),
                                }
                                : c
                        )
                    );
                },
                controller.signal
            );
        } catch (err) {
            console.error(err);
        } finally {
            setStreaming(false);
            abortRef.current = null;
        }
    };

    const stop = () => {
        abortRef.current?.abort();
        setStreaming(false);
    };

    const buckets = useMemo(
        () => bucketByDate(filtered),
        [filtered]
    );

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-stone-50  font-[var(--font-monts)]">
            {/* sidebar */}

            <aside
                className={`border-r bg-white transition-all duration-200 ${collapsed ? "w-14" : "w-72"
                    }`}
            >
                <div className="flex items-center justify-between p-3">
                    {!collapsed && (
                        <div className="text-sm font-semibold">
                            My AI
                        </div>
                    )}

                    <button
                        onClick={() =>
                            setCollapsed((v) => !v)
                        }
                        className="rounded-md p-1.5 hover:bg-stone-100"
                    >
                        {collapsed ? (
                            <PanelLeftOpen className="h-4 w-4" />
                        ) : (
                            <PanelLeftClose className="h-4 w-4" />
                        )}
                    </button>
                </div>

                <div className="px-2">
                    <button
                        onClick={newChat}
                        className="flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-stone-50"
                    >
                        <Plus className="h-4 w-4" />
                        {!collapsed && "New chat"}
                    </button>
                </div>

                {!collapsed && (
                    <div className="p-2">
                        <div className="flex items-center gap-2 rounded-lg border px-2 py-2">
                            <Search className="h-4 w-4 text-stone-400" />

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search..."
                                className="w-full bg-transparent text-sm outline-none"
                            />
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto p-2">
                    {Object.entries(buckets).map(
                        ([label, items]) =>
                            items.length > 0 && (
                                <div
                                    key={label}
                                    className="mb-4"
                                >
                                    {!collapsed && (
                                        <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                                            {label}
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        {items.map((c) => (
                                            <ChatListItem
                                                key={c.id}
                                                conv={c}
                                                active={
                                                    c.id ===
                                                    activeId
                                                }
                                                onSelect={() =>
                                                    setActiveId(
                                                        c.id
                                                    )
                                                }
                                                onRename={(t) =>
                                                    renameChat(
                                                        c.id,
                                                        t
                                                    )
                                                }
                                                onDelete={() =>
                                                    deleteChat(
                                                        c.id
                                                    )
                                                }
                                                collapsed={
                                                    collapsed
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                    )}
                </div>

                <div className="border-t p-2">
                    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-stone-100">
                        <Settings className="h-4 w-4" />

                        {!collapsed && "Settings"}
                    </button>
                </div>
            </aside>

            {/* main */}

            <main className="flex flex-1 flex-col overflow-hidden">
                <div className="border-b bg-white px-4 py-3">
                    <div className="text-sm font-medium">
                        {active?.title ?? "New chat"}
                    </div>

                    <div className="text-xs text-stone-500">
                        Custom AI model
                    </div>
                </div>

                <ChatThread
                    conv={active}
                    streaming={streaming}
                />

                <Composer
                    disabled={false}
                    streaming={streaming}
                    onSend={send}
                    onStop={stop}
                />
            </main>
        </div>
    );
}

/* ───────────────────────── chat list item ───────────────────────── */

function ChatListItem({
    conv,
    active,
    onSelect,
    onRename,
    onDelete,
    collapsed,
}: any) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(conv.title);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div
            className={`group flex items-center gap-1 rounded-lg px-2 py-1.5 ${active
                ? "bg-violet-50 text-violet-700"
                : "hover:bg-stone-100"
                }`}
        >
            {editing ? (
                <input
                    autoFocus
                    value={draft}
                    onChange={(e) =>
                        setDraft(e.target.value)
                    }
                    onBlur={() => {
                        onRename(draft);
                        setEditing(false);
                    }}
                    className="w-full bg-transparent text-sm outline-none"
                />
            ) : (
                <button
                    onClick={onSelect}
                    className="min-w-0 flex-1 truncate text-left text-sm"
                >
                    {collapsed ? (
                        <MessageSquare className="h-4 w-4" />
                    ) : (
                        conv.title
                    )}
                </button>
            )}

            {!collapsed && (
                <div className="relative">
                    <button
                        onClick={() =>
                            setMenuOpen((v) => !v)
                        }
                        className="rounded p-1 opacity-0 transition group-hover:opacity-100 hover:bg-stone-200"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 top-8 z-50 w-32 rounded-lg border bg-white shadow-lg">
                            <button
                                onClick={() => {
                                    setEditing(true);
                                    setMenuOpen(false);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-stone-50"
                            >
                                <Pencil className="h-3.5 w-3.5" />
                                Rename
                            </button>

                            <button
                                onClick={() => {
                                    onDelete();
                                    setMenuOpen(false);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ───────────────────────── thread ───────────────────────── */

function ChatThread({
    conv,
    streaming,
}: {
    conv: Conversation | null;
    streaming: boolean;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [conv?.messages]);

    if (!conv || conv.messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">
                        How can I help today?
                    </h2>

                    <p className="mt-2 text-sm text-stone-500">
                        Ask anything.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-stone-50"
        >

            <div className="mx-auto max-w-3xl px-4 py-6">
                <div className="space-y-6">
                    {conv.messages.map((m, i) => (
                        <MessageBubble
                            key={m.id}
                            role={m.role}
                            content={m.content}
                            loading={
                                streaming &&
                                m.role ===
                                "assistant" &&
                                i ===
                                conv.messages.length -
                                1 &&
                                m.content === ""
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ───────────────────────── message bubble ───────────────────────── */

function MessageBubble({
    role,
    content,
    loading,
}: {
    role: Role;
    content: string;
    loading: boolean;
}) {
    if (role === "user") {
        return (
            <div className="flex justify-end">
                <div className="max-w-[80%] whitespace-pre-wrap rounded-2xl bg-violet-600 px-4 py-3 text-sm text-white">
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100">
                <User className="h-4 w-4 text-violet-700" />
            </div>

            <div className="min-w-0 flex-1">
                {loading ? (
                    <div className="flex gap-1 pt-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-stone-400" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-stone-400 [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-stone-400 [animation-delay:300ms]" />
                    </div>
                ) : (
                    <div
                        className="
                            prose prose-stone

                            max-w-none
                            prose-pre:overflow-x-auto
                            prose-pre:rounded-2xl
                            prose-pre:bg-stone-950
                            prose-pre:p-4
                            prose-code:before:hidden
                            prose-code:after:hidden
                        "
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[
                                rehypeHighlight,
                            ]}
                            components={{
                                code(props: any) {
                                    const {
                                        inline,
                                        className,
                                        children,
                                    } = props;

                                    if (inline) {
                                        return (
                                            <code className="rounded bg-stone-200 px-1.5 py-0.5 text-sm">
                                                {
                                                    children
                                                }
                                            </code>
                                        );
                                    }

                                    return (
                                        <code
                                            className={
                                                className
                                            }
                                        >
                                            {children}
                                        </code>
                                    );
                                },

                                table({
                                    children,
                                }) {
                                    return (
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse border border-stone-300">
                                                {
                                                    children
                                                }
                                            </table>
                                        </div>
                                    );
                                },

                                th({ children }) {
                                    return (
                                        <th className="border border-stone-300 bg-stone-100 px-3 py-2 text-left">
                                            {
                                                children
                                            }
                                        </th>
                                    );
                                },

                                td({ children }) {
                                    return (
                                        <td className="border border-stone-300 px-3 py-2">
                                            {
                                                children
                                            }
                                        </td>
                                    );
                                },
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ───────────────────────── composer ───────────────────────── */

function Composer({
    disabled,
    streaming,
    onSend,
    onStop,
}: {
    disabled: boolean;
    streaming: boolean;
    onSend: (text: string) => void;
    onStop: () => void;
}) {
    const [text, setText] = useState("");

    const taRef =
        useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const ta = taRef.current;

        if (!ta) return;

        ta.style.height = "auto";
        ta.style.height =
            Math.min(ta.scrollHeight, 220) + "px";
    }, [text]);

    const submit = () => {
        if (streaming) return;

        const t = text.trim();

        if (!t) return;

        onSend(t);

        setText("");
    };

    return (
        <div className="border-t bg-white px-4 py-3">
            <div className="mx-auto max-w-3xl">
                <div className="flex items-end gap-2 rounded-2xl border bg-white px-3 py-2 shadow-sm focus-within:border-violet-500">
                    <textarea
                        ref={taRef}
                        value={text}
                        onChange={(e) =>
                            setText(e.target.value)
                        }
                        rows={1}
                        disabled={disabled}
                        placeholder="Message AI..."
                        className="max-h-[220px] flex-1 resize-none bg-transparent py-2 text-sm outline-none"
                        onKeyDown={(e) => {
                            if (
                                e.key === "Enter" &&
                                !e.shiftKey
                            ) {
                                e.preventDefault();
                                submit();
                            }
                        }}
                    />

                    {streaming ? (
                        <button
                            onClick={onStop}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-white"
                        >
                            <Square className="h-4 w-4" />
                        </button>
                    ) : (
                        <button
                            onClick={submit}
                            disabled={!text.trim()}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-40"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <p className="mt-2 text-center text-[11px] text-stone-400">
                    Enter to send · Shift + Enter for newline
                </p>
            </div>
        </div>
    );
}