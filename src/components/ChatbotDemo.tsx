import { useState } from "react";
import { Send, Sparkles, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import gayatriPortrait from "@/assets/gayatri-portrait.jpg";
import { sendChat, type ChatMessage } from "@/lib/chat";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const sampleConversation: Message[] = [
  { role: "user", content: "Meri birth date 15 March 1995, time 10:30 AM, place Jaipur. Kya mera career change successful hoga?" },
  { role: "assistant", content: "🕉️ Namaste! Aapki kundali ke anusaar, aapka 10th house (karma bhava) mein Shani ka prabhav hai jo discipline aur patience mangta hai.\n\n✨ **Career Change Prediction:**\n- 2025 mein Jupiter ka transit aapke dasham bhav ko activate karega\n- March-June 2025 best time hai career change ke liye\n- IT, Finance ya Education field mein acche results milenge\n\n🙏 **Remedy:** Har Saturday ko Hanuman Chalisa padhein aur neele sapphire ka vichar karein." },
];

const ChatbotDemo = () => {
  const [messages, setMessages] = useState<Message[]>(sampleConversation);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forceUpdate, setForceUpdate] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setError(null);

    try {
      const chatMessages: ChatMessage[] = [
        { role: "user", content: input }
      ];
      
      // Add empty assistant message that will be filled by streaming
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      
      let currentFullText = "";
      const response = await sendChat(chatMessages, null, (delta, full) => {
        console.log("Delta callback received:", delta, "Full:", full);
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          if (newMessages[lastIndex] && newMessages[lastIndex].role === "assistant") {
            console.log("Updating message content to:", full);
            newMessages[lastIndex] = {
              role: "assistant",
              content: full
            };
          }
          return newMessages;
        });
        // Force re-render
        setForceUpdate(prev => prev + 1);
      });
      console.log("Final response from sendChat:", response);
      
      // Force final update
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        if (newMessages[lastIndex] && newMessages[lastIndex].role === "assistant") {
          newMessages[lastIndex] = {
            role: "assistant",
            content: response
          };
        }
        return newMessages;
      });
      setForceUpdate(prev => prev + 1);
    } catch (err) {
      console.error("Chat error:", err);
      setError("Failed to get response. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "🕉️ Kshama karein, abhi technical issue hai. Phir se prayas karein thodi der baad.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="chatbot" className="py-24 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
            Try It Now
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3">Live Chatbot Demo</h2>
          <p className="text-muted-foreground">Try it yourself — no signup needed</p>
        </div>

        <div className={`max-w-2xl mx-auto rounded-2xl border border-border bg-card shadow-xl overflow-hidden transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Header */}
          <div className="gradient-saffron p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-primary-foreground">GayatriAI</h3>
              <span className="text-xs text-primary-foreground/70">Online • Vedic Astrology Expert</span>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={`${i}-${forceUpdate}`} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${msg.role === "user" ? "bg-muted" : "border-2 border-saffron/40 shadow-md shadow-saffron/30"}`}>
                  {msg.role === "user"
                    ? <User className="w-4 h-4 text-muted-foreground" />
                    : <img src={gayatriPortrait} alt="GayatriAI" className="w-full h-full object-cover" />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-line ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-secondary-foreground rounded-bl-md"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-saffron/40 flex-shrink-0 shadow-md shadow-saffron/30">
                  <img src={gayatriPortrait} alt="GayatriAI" className="w-full h-full object-cover" />
                </div>
                <div className="bg-secondary p-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mx-4 mb-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-destructive">{error}</span>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your question in Hindi or English..."
                className="flex-1 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground placeholder:text-muted-foreground text-sm border border-border focus:outline-none focus:border-saffron transition-colors"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" className="gradient-saffron text-primary-foreground rounded-xl w-12 h-12 hover:opacity-90" disabled={isTyping}>
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotDemo;
