import { Link, useLocation } from "react-router-dom";
import {
  Plus, MessageSquare, Home, FileText, CreditCard, User,
  PanelLeftClose, PanelLeftOpen, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import gayatriPortrait from "@/assets/gayatri-portrait.jpg";

interface ChatHistoryItem { id: string; title: string; }

interface Props {
  open: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  history: ChatHistoryItem[];
  activeId?: string;
  onSelect: (id: string) => void;
  onMobileClose?: () => void;
  tokensRemaining: number;
  tokensTotal: number;
}

const navItems = [
  { icon: MessageSquare, label: "Chat", to: "/dashboard" },
  { icon: FileText, label: "Reports", to: "/reports" },
  { icon: CreditCard, label: "Pricing", to: "/pricing" },
  { icon: User, label: "Profile", to: "/profile" },
  { icon: Home, label: "Home", to: "/" },
];

const DashboardSidebar = ({
  open, onToggle, onNewChat, history, activeId, onSelect, onMobileClose,
  tokensRemaining, tokensTotal,
}: Props) => {
  const { pathname } = useLocation();
  const pct = Math.max(0, Math.min(100, (tokensRemaining / tokensTotal) * 100));

  return (
    <aside
      className={cn(
        "h-full bg-card border-r border-border flex flex-col transition-[width] duration-300 ease-out overflow-hidden",
        open ? "w-64" : "w-0 md:w-16"
      )}
    >
      <div className="min-w-[16rem] md:min-w-0 flex flex-col h-full">
        {/* Brand */}
        <div className="flex items-center justify-between p-3 border-b border-border">
          <Link to="/" className={cn("flex items-center gap-2", !open && "md:justify-center md:w-full")}>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-saffron/40 shadow-md shadow-saffron/30 flex-shrink-0">
              <img src={gayatriPortrait} alt="GayatriAI" className="w-full h-full object-cover" />
            </div>
            {open && <span className="font-heading font-bold text-gradient-saffron">GayatriAI</span>}
          </Link>
          <button
            onClick={onToggle}
            className={cn("p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors", !open && "hidden md:block")}
            aria-label="Toggle sidebar"
          >
            {open ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>
        </div>

        {/* New chat */}
        <div className="p-3">
          <Button
            onClick={() => { onNewChat(); onMobileClose?.(); }}
            className={cn("w-full gradient-saffron text-primary-foreground hover:opacity-90 shadow-md shadow-saffron/20", !open && "md:px-0")}
          >
            <Plus className="w-4 h-4" />
            {open && <span className="ml-2">New Chat</span>}
          </Button>
        </div>

        {/* Nav */}
        <nav className="px-2 space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  !open && "md:justify-center md:px-0"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {open && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* History */}
        {open && (
          <div className="flex-1 overflow-y-auto px-2 mt-4 min-h-0">
            <div className="px-3 mb-2 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Recent Chats
            </div>
            {history.length === 0 ? (
              <p className="px-3 text-xs text-muted-foreground">No chats yet</p>
            ) : (
              <div className="space-y-0.5">
                {history.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => { onSelect(h.id); onMobileClose?.(); }}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left truncate transition-colors",
                      activeId === h.id
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{h.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {!open && <div className="flex-1" />}

        {/* Tokens + upgrade */}
        <div className="p-3 border-t border-border space-y-3">
          {open ? (
            <Link to="/pricing" className="block group">
              <div className="rounded-xl bg-gradient-to-br from-accent to-accent/40 border border-saffron/30 p-3 hover:shadow-md hover:shadow-saffron/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-saffron flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Tokens
                  </span>
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                    {tokensRemaining}/{tokensTotal}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-background/60 overflow-hidden mb-2">
                  <div className="h-full gradient-saffron transition-all" style={{ width: `${pct}%` }} />
                </div>
                <div className="text-[11px] text-foreground font-semibold flex items-center justify-between">
                  Upgrade plan <span className="text-saffron group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/pricing" className="hidden md:flex w-full justify-center p-2 rounded-lg hover:bg-secondary text-saffron" aria-label="Upgrade">
              <Zap className="w-4 h-4" />
            </Link>
          )}

          {/* User row */}
          <Link to="/profile" onClick={onMobileClose} className={cn("flex items-center gap-2 px-1 py-1 rounded-lg hover:bg-secondary transition-colors", !open && "md:justify-center md:px-0")}>
            <div className="w-8 h-8 rounded-full gradient-saffron flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            {open && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-foreground truncate">Seeker</div>
                <div className="text-[10px] text-muted-foreground truncate">Free plan</div>
              </div>
            )}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
