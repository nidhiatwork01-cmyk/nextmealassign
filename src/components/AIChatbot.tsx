import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const suggestions = [
  "What's my food cost this month?",
  "Categorize recent transactions",
  "Generate a P&L summary",
  "Predict next week's expenses",
];

const aiResponses: Record<string, string> = {
  "What's my food cost this month?":
    "📊 Your food cost for February is **29.8%** of revenue — that's down from 30.4% last month. You're trending in the right direction! Target is 28-32%, so you're right on track. Top spend: Sysco Foods ($4,850) and Fresh Farms ($1,420).",
  "Categorize recent transactions":
    "🏷️ I've analyzed your recent transactions and auto-categorized 3 items:\n\n• Sysco delivery → **Food & Ingredients** ✅\n• Electric bill → **Rent & Utilities** ✅\n• Paper goods → **Supplies** ✅\n\nAll flagged with AI badges. Review them in the Transactions tab.",
  "Generate a P&L summary":
    "📋 **February P&L Summary:**\n\n💰 Revenue: $82,000\n📉 COGS: $24,440 (29.8%)\n👥 Labor: $22,960 (28%)\n🏢 Overhead: $12,300 (15%)\n\n**Net Profit: $22,300 (27.2%)**\n\nUp 3.1% from January. Great month!",
  "Predict next week's expenses":
    "🔮 Based on 6 months of data, I predict next week's expenses:\n\n• Food & Ingredients: ~$4,200\n• Labor: ~$6,250\n• Utilities: ~$220\n• Supplies: ~$350\n\n**Total: ~$11,020**\n\nNote: Weekend bookings are up 15%, so food costs may run 5-8% higher.",
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "👋 Hi! I'm your AI accounting assistant. Ask me about food costs, transaction categories, P&L reports, or expense predictions.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response =
        aiResponses[text] ||
        "🤔 Let me look into that. Based on your current data, I'd recommend checking the Reports tab for detailed breakdowns. Want me to generate a specific report?";
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", text: response },
      ]);
      setTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="floating-btn fixed bottom-6 right-6 z-50"
          >
            <Sparkles className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[560px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">AI Assistant</p>
                  <p className="text-[11px] text-success flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`ai-bubble ${msg.role}`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="ai-bubble assistant flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-soft" />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-soft" style={{ animationDelay: "0.2s" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse-soft" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-1.5">
                <input
                  type="text"
                  placeholder="Ask about your finances..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground py-2"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;

