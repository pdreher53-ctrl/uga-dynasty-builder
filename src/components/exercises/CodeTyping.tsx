import React, { useState, useRef, useEffect } from 'react';
import { BoomReaction } from '../BoomMascot';

// Duolingo-style: type the code character by character
export interface CodeTypingChallenge {
  type: 'code-typing';
  id: string;
  prompt: string;
  expectedCode: string;
  hint: string;
  xpReward: number;
  skill: string;
}

export function CodeTypingExercise({
  challenge,
  onComplete,
}: {
  challenge: CodeTypingChallenge;
  onComplete: (correct: boolean) => void;
}) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const normalized = input.trim().replace(/\s+/g, ' ');
    const expected = challenge.expectedCode.trim().replace(/\s+/g, ' ');
    const correct = normalized === expected;
    setIsCorrect(correct);
    setSubmitted(true);
    onComplete(correct);
  };

  const matchCount = () => {
    let count = 0;
    const target = challenge.expectedCode;
    for (let i = 0; i < Math.min(input.length, target.length); i++) {
      if (input[i] === target[i]) count++;
      else break;
    }
    return count;
  };

  const progress = Math.round(
    (matchCount() / challenge.expectedCode.length) * 100
  );

  return (
    <div className="space-y-4">
      <div className="bg-dawg-charcoal rounded-xl p-4">
        <div className="text-dawg-gold text-[10px] uppercase tracking-wider mb-2">
          Type the Code
        </div>
        <p className="text-dawg-white text-sm mb-3">{challenge.prompt}</p>

        {/* Progress bar */}
        <div className="h-1.5 bg-dawg-slate rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Expected code (faded reference) */}
        <div className="bg-dawg-black/50 rounded-lg p-3 mb-3 font-mono text-xs text-dawg-silver/30 whitespace-pre select-none">
          {challenge.expectedCode}
        </div>

        {/* User input */}
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={submitted}
          placeholder="Type the code here..."
          className="w-full bg-dawg-black border border-dawg-slate rounded-lg p-3 font-mono text-sm text-green-400 placeholder-dawg-silver/30 focus:outline-none focus:border-dawg-red resize-none"
          rows={3}
          spellCheck={false}
        />

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-dawg-gold text-xs underline"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={input.trim().length === 0}
              className="bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold px-6 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              Check Code
            </button>
          )}
        </div>

        {showHint && (
          <div className="mt-2 bg-dawg-gold/10 border border-dawg-gold/20 rounded-lg p-2.5">
            <p className="text-dawg-gold text-xs">{challenge.hint}</p>
          </div>
        )}
      </div>

      {submitted && (
        <div
          className={`rounded-xl p-4 ${
            isCorrect
              ? 'bg-green-900/20 border border-green-500/30'
              : 'bg-red-900/20 border border-red-500/30'
          }`}
        >
          <BoomReaction
            mood={isCorrect ? 'happy' : 'sad'}
            message={
              isCorrect
                ? "Perfect code! That's championship-level typing!"
                : "Close! Check the expected code above and try to match it exactly."
            }
          />
        </div>
      )}
    </div>
  );
}
