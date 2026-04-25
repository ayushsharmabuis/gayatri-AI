import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  ArrowUp, Sparkles, User, Wallet, Briefcase, Heart, Activity,
  Menu, Plus, Star, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import VedicProfilePopover from "@/components/VedicProfilePopover";
import { loadChart, type VedicChart } from "@/lib/astrology";
import { sendChat, type ChatMessage } from "@/lib/chat";
import { cn } from "@/lib/utils";
import gayatriPortrait from "@/assets/gayatri-portrait.jpg";

const suggestions = [
  { icon: Wallet, label: "Money", prompt: "Mere chart ke hisaab se mera dhan yog kaisa hai?" },
  { icon: Briefcase, label: "Career", prompt: "What does my chart say about career growth in 2026?" },
  { icon: Activity, label: "Health", prompt: "Mere swaasthya ke baare mein chart kya kehta hai?" },
  { icon: Heart, label: "Love", prompt: "When will I find my life partner?" },
];

const TOKENS_TOTAL = 20;
const TOKENS_KEY = "gayatriai_tokens_v1";
const CHATS_KEY = "gayatriai_chats_v1";
const ACTIVE_KEY = "gayatriai_active_chat_v1";

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
}

const newId = () =>
  (typeof crypto !== "undefined" && "randomUUID" in crypto)
    ? crypto.randomUUID()
    : `c_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const loadChats = (): ChatSession[] => {
  try {
    const raw = localStorage.getItem(CHATS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
};

const Dashboard = () => {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chart, setChart] = useState<VedicChart | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [tokensRemaining, setTokensRemaining] = useState(TOKENS_TOTAL);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setChart(loadChart());
    if (typeof window !== "undefined" && window.innerWidth >= 768) setSidebarOpen(true);
    const stored = Number(localStorage.getItem(TOKENS_KEY));
    setTokensRemaining(Number.isFinite(stored) && stored > 0 ? stored : TOKENS_TOTAL);

    const loaded = loadChats();
    setChats(loaded);
    const savedActive = localStorage.getItem(ACTIVE_KEY) ?? "";
    if (savedActive && loaded.some((c) => c.id === savedActive)) {
      setActiveId(savedActive);
    }
  }, []);

  useEffect(() => {
    if (chats.length === 0) localStorage.removeItem(CHATS_KEY);
    else localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
    else localStorage.removeItem(ACTIVE_KEY);
  }, [activeId]);

  const activeChat = chats.find((c) => c.id === activeId) ?? null;
  const messages: ChatMessage[] = activeChat?.messages ?? [];
  const isEmpty = messages.length === 0;

  useEffect(() => {
    if (!isEmpty) bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping, isEmpty]);

  useEffect(() => {
    const ta = inputRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [input]);

  const handleNewChat = () => setActiveId("");
  const handleSelectChat = (id: string) => setActiveId(id);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    if (tokensRemaining <= 0) return;

    let chatId = activeId;
    let baseMessages: ChatMessage[] = messages;

    if (!chatId) {
      chatId = newId();
      baseMessages = [];
      const fresh: ChatSession = {
        id: chatId,
        title: text.slice(0, 48),
        messages: [],
        updatedAt: Date.now(),
      };
      setChats((prev) => [fresh, ...prev]);
      setActiveId(chatId);
    }

    const next: ChatMessage[] = [...baseMessages, { role: "user", content: text }];
    const cid = chatId;

    setChats((prev) =>
      prev.map((c) =>
        c.id === cid
          ? {
              ...c,
              messages: next,
              title: c.messages.length === 0 ? text.slice(0, 48) : c.title,
              updatedAt: Date.now(),
            }
          : c
      )
    );
    setInput("");
    setIsTyping(true);
    const newTokens = tokensRemaining - 1;
    setTokensRemaining(newTokens);
    localStorage.setItem(TOKENS_KEY, String(newTokens));

    try {
      // Pre-insert empty assistant bubble so the callback only ever updates, never appends
      const withPlaceholder = [...next, { role: "assistant" as const, content: "" }];
      setChats((prev) =>
        prev.map((c) =>
          c.id === cid ? { ...c, messages: withPlaceholder, updatedAt: Date.now() } : c
        )
      );

      await sendChat(next, chart, (_chunk, full) => {
        setChats((prev) =>
          prev.map((c) => {
            if (c.id !== cid) return c;
            const msgs = c.messages.map((m, i) =>
              i === c.messages.length - 1 && m.role === "assistant"
                ? { ...m, content: full }
                : m
            );
            return { ...c, messages: msgs, updatedAt: Date.now() };
          })
        );
      });

      // If sendChat returned but bubble is still empty, fill with fallback
      setChats((prev) =>
        prev.map((c) => {
          if (c.id !== cid) return c;
          const last = c.messages[c.messages.length - 1];
          if (last?.role === "assistant" && !last.content) {
            return {
              ...c,
              messages: [
                ...c.messages.slice(0, -1),
                { role: "assistant" as const, content: "Kshama karein, koi reply nahi aayi. Phir se prayas karein." },
              ],
              updatedAt: Date.now(),
            };
          }
          return c;
        })
      );
    } catch {
      setChats((prev) =>
        prev.map((c) =>
          c.id === cid
            ? {
                ...c,
                messages: [...next, { role: "assistant", content: "Kshama karein, kuch tehnical samasya hui. Phir se prayas karein." }],
                updatedAt: Date.now(),
              }
            : c
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input); };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  // Capsule input with profile-button inside
  const InputBox = (
    <form onSubmit={handleSubmit} className="w-full relative">
      <VedicProfilePopover chart={chart} open={profileOpen} onClose={() => setProfileOpen(false)} />

      <div className="relative flex items-end gap-1.5 pl-2 pr-2 py-2 rounded-3xl bg-card border border-border shadow-lg shadow-saffron/5 focus-within:border-saffron/60 focus-within:ring-4 focus-within:ring-saffron/10 transition-all">
        <button
          type="button"
          onClick={() => setProfileOpen((v) => !v)}
          className={cn(
            "flex-shrink-0 inline-flex items-center gap-1.5 px-3 h-9 rounded-full text-xs font-semibold transition-all",
            profileOpen
              ? "bg-accent text-accent-foreground border border-saffron/40"
              : "bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground border border-transparent"
          )}
          aria-label="Toggle Vedic profile"
          title="Your Vedic Profile"
        >
          <Star className="w-3.5 h-3.5 text-saffron" />
          <span className="hidden sm:inline">Profile</span>
        </button>

        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder={tokensRemaining > 0 ? "Ask GayatriAI anything…" : "No tokens left — upgrade to continue"}
          disabled={tokensRemaining <= 0}
          className="flex-1 min-w-0 bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none resize-none py-2 px-1 max-h-40 leading-6 disabled:opacity-50"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || isTyping || tokensRemaining <= 0}
          className="gradient-saffron text-primary-foreground rounded-full w-9 h-9 flex-shrink-0 hover:opacity-90 hover:scale-105 transition-all shadow-md shadow-saffron/30 disabled:opacity-40"
          aria-label="Send"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between mt-2 px-2 gap-2">
        <p className="text-[10px] text-muted-foreground truncate">
          GayatriAI — for reflection, not absolute predictions.
        </p>
        <Link to="/pricing" className="text-[10px] text-saffron font-semibold inline-flex items-center gap-1 flex-shrink-0">
          <Zap className="w-3 h-3" /> {tokensRemaining}/{TOKENS_TOTAL} tokens
        </Link>
      </div>
    </form>
  );

  const history = chats.map((c) => ({ id: c.id, title: c.title || "New chat" }));

  return (
    <div className="h-[100dvh] flex bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:block h-full">
        <DashboardSidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((v) => !v)}
          onNewChat={handleNewChat}
          history={history}
          activeId={activeId}
          onSelect={handleSelectChat}
          tokensRemaining={tokensRemaining}
          tokensTotal={TOKENS_TOTAL}
        />
      </div>

      {/* Mobile sidebar */}
      {mobileSidebar && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebar(false)} />
          <div className="relative h-full">
            <DashboardSidebar
              open
              onToggle={() => setMobileSidebar(false)}
              onNewChat={handleNewChat}
              history={history}
              activeId={activeId}
              onSelect={handleSelectChat}
              onMobileClose={() => setMobileSidebar(false)}
              tokensRemaining={tokensRemaining}
              tokensTotal={TOKENS_TOTAL}
            />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <header className="h-14 flex items-center justify-between px-3 md:px-4 border-b border-border bg-card/60 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileSidebar(true)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary text-foreground"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-saffron/40 shadow-md shadow-saffron/30">
                <img src={gayatriPortrait} alt="GayatriAI" className="w-full h-full object-cover" />
              </div>
              <span className="font-heading font-bold text-gradient-saffron text-sm">GayatriAI</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/pricing">
              <Button size="sm" className="gradient-saffron text-primary-foreground shadow-md shadow-saffron/20 hover:opacity-90 h-9">
                <Zap className="w-3.5 h-3.5 mr-1" />
                <span className="hidden sm:inline">Upgrade</span>
                <span className="sm:hidden">Pro</span>
              </Button>
            </Link>
            <Button
              onClick={handleNewChat}
              variant="ghost"
              size="sm"
              className="md:hidden text-muted-foreground hover:text-foreground"
              aria-label="New chat"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 flex flex-col min-h-0">
          {isEmpty ? (
            <>
              <div className="flex-1 overflow-y-auto px-4">
                <div className="w-full max-w-2xl mx-auto text-center animate-fade-in-up py-8 md:py-12">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full gradient-saffron blur-2xl opacity-50 animate-pulse-glow" />
                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-saffron/40 shadow-xl shadow-saffron/40">
                      <img src={gayatriPortrait} alt="GayatriAI" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                    Namaste 🙏 What shall <span className="text-gradient-saffron">GayatriAI</span> reveal today?
                  </h1>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    Ask about money, career, health or love — in Hindi or English.
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mb-2">
                    {suggestions.map((s, i) => (
                      <button
                        key={s.label}
                        onClick={() => sendMessage(s.prompt)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border hover:border-saffron/40 hover:shadow-md hover:-translate-y-0.5 text-sm font-medium text-foreground transition-all animate-fade-in-up"
                        style={{ animationDelay: `${i * 70 + 150}ms` }}
                      >
                        <s.icon className="w-4 h-4 text-saffron" />
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-border bg-card/70 backdrop-blur-md flex-shrink-0">
                <div className="container mx-auto px-3 py-3 max-w-2xl">{InputBox}</div>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-3 md:px-4 py-5 max-w-3xl">
                  <div className="space-y-5">
                    {messages.map((msg, i) => (
                      <div key={i} className={cn("flex gap-2.5 animate-fade-in-up", msg.role === "user" && "flex-row-reverse")}>
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden",
                            msg.role === "user" ? "bg-secondary" : "border-2 border-saffron/40 shadow-md shadow-saffron/30"
                          )}
                        >
                          {msg.role === "user"
                            ? <User className="w-4 h-4 text-muted-foreground" />
                            : <img src={gayatriPortrait} alt="GayatriAI" className="w-full h-full object-cover" />}
                        </div>
                        <div
                          className={cn(
                            "max-w-[82%] p-3.5 rounded-2xl text-sm leading-relaxed",
                            msg.role === "user"
                              ? "gradient-saffron text-primary-foreground rounded-br-md shadow-md shadow-saffron/20 whitespace-pre-line"
                              : "bg-card border border-border text-foreground rounded-bl-md shadow-sm prose prose-sm max-w-none prose-p:my-2 prose-headings:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-strong:text-foreground prose-strong:font-semibold prose-em:text-muted-foreground"
                          )}
                        >
                          {msg.role === "assistant" ? (
                              msg.content === "" ? (
                                <div className="flex gap-1">
                                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                                  <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                              ) : (
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                              )
                            ) : (
                              msg.content
                            )}
                        </div>
                      </div>
                    ))}
                    {isTyping && messages[messages.length - 1]?.role === "user" && (
                      <div className="flex gap-2.5 animate-fade-in-up">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-saffron/40 flex-shrink-0 shadow-md shadow-saffron/30">
                          <img src={gayatriPortrait} alt="GayatriAI" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-card border border-border p-3.5 rounded-2xl rounded-bl-md">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-saffron animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 rounded-full bg-saffron animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 rounded-full bg-saffron animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>
                </div>
              </div>
              <div className="border-t border-border bg-card/70 backdrop-blur-md flex-shrink-0">
                <div className="container mx-auto px-3 md:px-4 py-3 max-w-3xl">{InputBox}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
