"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { chatSuggestions, getResponse } from "@/lib/chat";
import type { ChatMessage } from "@/lib/chat";
import { useDialog } from "@/lib/use-dialog";
import { DURATION, EASE_OUT } from "@/lib/animations";

const PANEL_ID = "jaja-chat";
const REPLY_DELAY_MS = 600;

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Non-modal: the page stays usable; Escape closes and focus returns to the button.
  useDialog({
    open: isOpen,
    onClose: () => setIsOpen(false),
    containerRef: panelRef,
    modal: false,
    initialFocusRef: inputRef,
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsTyping(true);
    replyTimer.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: getResponse(trimmed) },
      ]);
      setIsTyping(false);
    }, REPLY_DELAY_MS);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(input);
    setInput("");
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-(--card-radius) shadow-lg border border-(--theme-border) bg-(--theme-surface-elevated) text-(--theme-text) transition-colors hover:border-(--theme-text-muted)"
        aria-label={isOpen ? "Close chat with Jaja" : "Chat with Jaja"}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
      >
        {isOpen ? (
          <X size={18} aria-hidden="true" />
        ) : (
          <MessageCircle size={18} aria-hidden="true" />
        )}
        <span className="text-sm font-medium hidden sm:inline">
          Chat with Jaja
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            id={PANEL_ID}
            role="dialog"
            aria-label="Chat with Jaja"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT }}
            style={{ transformOrigin: "bottom right" }}
            className="panel fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="panel-header px-4! sm:px-4!">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-(--theme-text-muted)"
                />
                <span className="text-label font-semibold text-(--theme-text)">
                  <span
                    aria-hidden="true"
                    className="text-(--theme-text-muted)"
                  >
                    ~/{" "}
                  </span>
                  jaja
                </span>
                <span className="text-label text-(--theme-text-muted) truncate">
                  · quick answers
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-(--btn-radius) text-(--theme-text-secondary) transition-colors hover:text-(--theme-text) hover:bg-(--theme-fill)"
                aria-label="Close chat"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ maxHeight: "min(28rem, calc(100dvh - 14rem))" }}
            >
              {messages.length === 0 && (
                <div className="space-y-3">
                  <div className="p-3 rounded-(--btn-radius) text-sm bg-(--theme-fill) text-(--theme-text)">
                    <p className="font-medium">Hi! I&apos;m Jaja.</p>
                    <p className="mt-1 text-(--theme-text-secondary)">
                      Pick a topic or type a question.
                    </p>
                  </div>
                  <ul className="space-y-2" aria-label="Suggested questions">
                    {chatSuggestions.map((suggestion) => (
                      <li key={suggestion.label}>
                        <button
                          type="button"
                          onClick={() => ask(suggestion.query)}
                          className="w-full text-left px-3 py-2 rounded-(--btn-radius) text-sm border border-(--theme-border) text-(--theme-text) transition-colors hover:bg-(--theme-fill)"
                        >
                          {suggestion.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Announces new replies to screen readers. */}
              <div role="log" aria-live="polite" className="space-y-3">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p
                      className={`max-w-[85%] px-4 py-3 rounded-(--btn-radius) text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-(--theme-accent) text-(--theme-bg)"
                          : "bg-(--theme-fill) text-(--theme-text)"
                      }`}
                    >
                      <span className="sr-only">
                        {msg.role === "user" ? "You: " : "Jaja: "}
                      </span>
                      {msg.content}
                    </p>
                  </motion.div>
                ))}
              </div>

              {isTyping && (
                <div className="flex justify-start" aria-hidden="true">
                  <div className="px-4 py-3 rounded-(--btn-radius) bg-(--theme-fill) flex items-center gap-1">
                    {[0, 200, 400].map((delay) => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full animate-pulse bg-(--theme-text-muted)"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 flex gap-2 border-t border-(--theme-border)"
            >
              <label htmlFor="jaja-input" className="sr-only">
                Ask Jaja a question
              </label>
              <input
                id="jaja-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about..."
                autoComplete="off"
                className="flex-1 min-w-0 px-3 py-2.5 rounded-(--btn-radius) text-sm border border-(--theme-input-border) bg-(--theme-input-bg) text-(--theme-input-text) placeholder:text-(--theme-input-placeholder)"
              />
              <button
                type="submit"
                className="px-3 rounded-(--btn-radius) bg-(--theme-accent) text-(--theme-bg) transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={14} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
