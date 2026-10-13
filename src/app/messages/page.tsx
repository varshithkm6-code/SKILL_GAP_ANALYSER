// src/app/messages/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/layout/Navbar";
import { Chip } from "@/components/ui/Chip";
import {
  MessageSquare,
  Send,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Loader2,
  Lock,
  RefreshCw,
  HelpCircle
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "candidate" | "counselor";
  senderName: string;
  createdAt: string;
}

const QUICK_PROMPTS = [
  "How can I boost my readiness score past 75%?",
  "Which critical gaps should I prioritize in my first 30 days?",
  "Can you review my resume bullet points for ATS optimization?",
  "What projects demonstrate enterprise-level competency?",
];

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    async function loadMessages() {
      try {
        const res = await fetch("/api/messages");
        if (res.ok) {
          const data = await res.json();
          if (data.messages) {
            setMessages(data.messages);
          }
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      loadMessages();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || sending) return;

    if (!session) {
      alert("Please sign in to send guidance messages.");
      return;
    }

    setSending(true);
    setInputText("");

    // Optimistic user message addition
    const tempId = `temp-${Date.now()}`;
    const optimisticMsg: Message = {
      id: tempId,
      text,
      sender: "candidate",
      senderName: session.user?.name || "You",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (res.ok && data.messages) {
        // Replace optimistic and append advisor reply
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== tempId),
          ...data.messages,
        ]);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-canvas text-ink">
        <Navbar />
        <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-12 flex items-center justify-center">
          <div className="text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-xs text-muted">Loading academic advisor conversation...</p>
          </div>
        </main>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col bg-canvas text-ink">
        <Navbar />
        <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-12 flex items-center justify-center">
          <div className="card p-12 text-center max-w-md w-full space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto text-primary">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-ink">Sign In Required</h2>
            <p className="text-xs text-muted leading-relaxed">
              Sign in to send and receive direct career counseling messages, roadmap advice, and resume evaluations.
            </p>
            <Link href="/login?callbackUrl=/messages" className="btn-primary text-xs px-5 py-2.5 inline-flex items-center gap-1.5 justify-center w-full">
              <span>Sign In to Messages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Navbar />

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Messages Header Card */}
        <div className="card p-6 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20 shadow-sm">
                SM
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-surface" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-ink leading-tight">Dr. Sarah Mehta</h1>
                <Chip variant="strong" className="text-[10px] uppercase font-mono">
                  Academic Counselor
                </Chip>
              </div>
              <p className="text-xs text-muted mt-0.5">
                Online · Career Readiness &amp; Cohort Advising Support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="btn-secondary text-xs px-3.5 h-9">
              Check Readiness Score
            </Link>
            <Link href="/tools/resume-builder" className="btn-secondary text-xs px-3.5 h-9">
              Resume Builder
            </Link>
          </div>
        </div>

        {/* Chat Thread Container */}
        <div className="card bg-surface flex flex-col h-[600px] overflow-hidden border border-border">
          {/* Messages Scroll Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-canvas/30">
            {messages.map((m) => {
              const isCandidate = m.sender === "candidate";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isCandidate ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-muted font-medium">
                    <span>{m.senderName}</span>
                    <span>·</span>
                    <span>
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div
                    className={`max-w-lg p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isCandidate
                        ? "bg-primary text-white rounded-tr-xs"
                        : "bg-surface border border-border text-ink rounded-tl-xs"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-3 border-t border-border/80 bg-surface flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-semibold text-muted uppercase tracking-wider shrink-0 pl-1">
              Suggestions:
            </span>
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                disabled={sending}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-canvas border border-border hover:border-primary/50 text-muted hover:text-ink transition shrink-0 cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Bar */}
          <div className="p-4 border-t border-border bg-surface">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message to Academic Advisor Dr. Sarah Mehta..."
                className="control-input text-xs sm:text-sm flex-1 h-11"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !inputText.trim()}
                className="btn-primary text-xs font-bold px-5 h-11 shrink-0 gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {sending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
