// ═══════════════════════════════════════════════════════════════
// BOOM COACH — Floating AI chat widget
// ═══════════════════════════════════════════════════════════════
//
// Floats in the bottom-right corner of every screen.
// When inside a level, passes level context so Boom knows
// exactly what concept the student is working on.

import React, { useState, useRef, useEffect } from 'react';
import { Level } from '../types/engine';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface LevelContext {
  levelNumber: number;
  title: string;
  concept: string;
  track: string;
  footballContext: string;
}

interface Props {
  levelContext?: Level; // pass the current level if inside Academy
}

const CHAT_ENDPOINT = '/.netlify/functions/chat';

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    "What's good Coach! I'm Boom 🐾 — your AI coding tutor. Ask me anything about the concept you're learning, or just say \"explain this\" and I'll break it down with football analogies. Go Dawgs! 🏈",
};

export function BoomCoach({ levelContext }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: 'user', content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const context: LevelContext | undefined = levelContext
        ? {
            levelNumber: levelContext.levelNumber,
            title: levelContext.title,
            concept: levelContext.concept,
            track: levelContext.track,
            footballContext: levelContext.footballContext,
          }
        : undefined;

      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          levelContext: context,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? 'Boom is taking a water break. Try again.');
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      }
    } catch {
      setError('Boom lost his headset. Check your connection.');
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Quick-start prompts based on level context
  const quickPrompts = levelContext
    ? [
        `Explain ${levelContext.concept.replace(/_/g, ' ')} like I'm a freshman`,
        `Give me a football analogy for this`,
        `Show me another code example`,
        `Why does this matter in real apps?`,
      ]
    : [
        'What should I learn first?',
        'Explain variables with a football analogy',
        'How does coding help with recruiting?',
        'What is a function?',
      ];

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-20 right-4 lg:bottom-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 ${
          open
            ? 'bg-dawg-slate text-dawg-white scale-90'
            : 'bg-dawg-red hover:bg-dawg-red/80 text-white scale-100 hover:scale-105'
        }`}
        title="Ask Boom"
      >
        {open ? (
          <span className="text-xl font-bold">✕</span>
        ) : (
          <span className="text-2xl">🐾</span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-36 right-4 lg:bottom-24 z-50 w-80 sm:w-96 flex flex-col bg-dawg-charcoal border border-dawg-slate rounded-2xl shadow-2xl overflow-hidden"
          style={{ maxHeight: '70vh' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-dawg-red border-b border-dawg-red/60 shrink-0">
            <span className="text-2xl">🐾</span>
            <div>
              <div className="text-white font-display font-bold text-sm leading-tight">
                Boom Coach
              </div>
              <div className="text-white/70 text-[10px]">
                {levelContext
                  ? `Level ${levelContext.levelNumber}: ${levelContext.concept.replace(/_/g, ' ')}`
                  : 'AI Coding Tutor'}
              </div>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/60 text-[10px]">online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-dawg-red flex items-center justify-center shrink-0 text-sm">
                    🐾
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-dawg-red text-white rounded-tr-sm'
                      : 'bg-dawg-black text-dawg-silver rounded-tl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-dawg-red flex items-center justify-center shrink-0 text-sm">
                  🐾
                </div>
                <div className="bg-dawg-black px-3 py-2 rounded-xl rounded-tl-sm">
                  <div className="flex gap-1 items-center h-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-dawg-silver/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-dawg-silver/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-dawg-silver/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <p className="text-red-400 text-xs text-center px-2">{error}</p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick prompts (show when only welcome message) */}
          {messages.length === 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(p)}
                  className="text-[11px] bg-dawg-black border border-dawg-slate text-dawg-silver hover:text-dawg-white hover:border-dawg-gold/40 px-2.5 py-1 rounded-full transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-dawg-slate shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask Boom anything..."
              className="flex-1 bg-dawg-black border border-dawg-slate rounded-xl px-3 py-2 text-sm text-dawg-white placeholder-dawg-silver/40 focus:outline-none focus:border-dawg-red transition-colors"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-dawg-red hover:bg-dawg-red/80 disabled:opacity-40 flex items-center justify-center text-white transition-colors shrink-0"
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}
