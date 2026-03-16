import React, { useState } from 'react';
import { BoomReaction } from '../BoomMascot';

// Duolingo-style: fill in the blank in a code snippet
export interface FillBlankChallenge {
  type: 'fill-blank';
  id: string;
  prompt: string;
  codeBefore: string;
  codeAfter: string;
  answer: string;
  alternatives?: string[]; // other acceptable answers
  hint: string;
  xpReward: number;
  skill: string;
}

export function FillInBlankExercise({
  challenge,
  onComplete,
}: {
  challenge: FillBlankChallenge;
  onComplete: (correct: boolean) => void;
}) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    const trimmed = input.trim();
    const answers = [
      challenge.answer,
      ...(challenge.alternatives || []),
    ].map((a) => a.trim().toLowerCase());
    const correct = answers.includes(trimmed.toLowerCase());
    setIsCorrect(correct);
    setSubmitted(true);
    onComplete(correct);
  };

  return (
    <div className="space-y-4">
      <div className="bg-dawg-charcoal rounded-xl p-4">
        <div className="text-dawg-gold text-[10px] uppercase tracking-wider mb-2">
          Fill in the Blank
        </div>
        <p className="text-dawg-white text-sm mb-4">{challenge.prompt}</p>

        {/* Code with blank */}
        <div className="bg-dawg-black rounded-lg p-4 font-mono text-sm">
          <span className="text-green-400">{challenge.codeBefore}</span>
          <span className="inline-block mx-1">
            {submitted ? (
              <span
                className={`px-2 py-0.5 rounded ${
                  isCorrect
                    ? 'bg-green-900/50 text-green-400 border border-green-500'
                    : 'bg-red-900/50 text-red-400 border border-red-500'
                }`}
              >
                {input || '___'}
              </span>
            ) : (
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && input.trim()) checkAnswer();
                }}
                placeholder="___"
                className="bg-dawg-charcoal border-b-2 border-dawg-red px-2 py-0.5 text-dawg-white font-mono text-sm w-32 focus:outline-none text-center"
                autoFocus
                spellCheck={false}
              />
            )}
          </span>
          <span className="text-green-400">{challenge.codeAfter}</span>
        </div>

        {!submitted && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-dawg-silver/50 text-xs italic">
              Hint: {challenge.hint}
            </p>
            <button
              onClick={checkAnswer}
              disabled={!input.trim()}
              className="bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold px-6 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              Check
            </button>
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
                ? "That's the right call! You filled that gap like an All-SEC lineman!"
                : `The answer was: ${challenge.answer}. Remember this for next time!`
            }
          />
        </div>
      )}
    </div>
  );
}
