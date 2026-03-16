import React, { useState } from 'react';
import { BoomReaction } from '../BoomMascot';

// Duolingo-style: match terms to definitions by tapping
export interface MatchPair {
  term: string;
  definition: string;
}

export interface DragDropChallenge {
  type: 'match';
  id: string;
  prompt: string;
  pairs: MatchPair[];
  xpReward: number;
  skill: string;
}

export function DragDropExercise({
  challenge,
  onComplete,
}: {
  challenge: DragDropChallenge;
  onComplete: (correct: boolean) => void;
}) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrongPair, setWrongPair] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Shuffle definitions for display
  const [shuffledDefs] = useState(() =>
    [...challenge.pairs.map((p) => p.definition)].sort(() => Math.random() - 0.5)
  );

  const handleTermClick = (term: string) => {
    if (submitted || matches[term]) return;
    setSelectedTerm(term);
    setWrongPair(null);
  };

  const handleDefClick = (def: string) => {
    if (submitted || !selectedTerm) return;
    // Check if this definition is already matched
    if (Object.values(matches).includes(def)) return;

    const pair = challenge.pairs.find((p) => p.term === selectedTerm);
    if (pair && pair.definition === def) {
      // Correct match!
      setMatches((prev) => ({ ...prev, [selectedTerm]: def }));
      setSelectedTerm(null);

      // Check if all matched
      if (Object.keys(matches).length + 1 === challenge.pairs.length) {
        setSubmitted(true);
        onComplete(true);
      }
    } else {
      // Wrong match
      setWrongPair(def);
      setTimeout(() => setWrongPair(null), 800);
    }
  };

  const matchedDefs = Object.values(matches);
  const allCorrect = Object.keys(matches).length === challenge.pairs.length;

  return (
    <div className="space-y-4">
      <div className="bg-dawg-charcoal rounded-xl p-4">
        <div className="text-dawg-gold text-[10px] uppercase tracking-wider mb-2">
          Match the Pairs
        </div>
        <p className="text-dawg-white text-sm mb-4">{challenge.prompt}</p>

        {/* Progress dots */}
        <div className="flex gap-1.5 mb-4">
          {challenge.pairs.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i < Object.keys(matches).length
                  ? 'bg-green-500'
                  : 'bg-dawg-slate'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Terms column */}
          <div className="space-y-2">
            <div className="text-[10px] text-dawg-silver uppercase tracking-wider mb-1">
              Terms
            </div>
            {challenge.pairs.map((pair) => {
              const isMatched = matches[pair.term];
              const isSelected = selectedTerm === pair.term;
              return (
                <button
                  key={pair.term}
                  onClick={() => handleTermClick(pair.term)}
                  disabled={!!isMatched}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono transition-all ${
                    isMatched
                      ? 'bg-green-900/30 border border-green-500/40 text-green-400 line-through'
                      : isSelected
                      ? 'bg-dawg-red/20 border-2 border-dawg-red text-dawg-white'
                      : 'bg-dawg-black border border-dawg-slate text-dawg-silver hover:border-dawg-red/50'
                  }`}
                >
                  {pair.term}
                </button>
              );
            })}
          </div>

          {/* Definitions column */}
          <div className="space-y-2">
            <div className="text-[10px] text-dawg-silver uppercase tracking-wider mb-1">
              Definitions
            </div>
            {shuffledDefs.map((def) => {
              const isMatched = matchedDefs.includes(def);
              const isWrong = wrongPair === def;
              return (
                <button
                  key={def}
                  onClick={() => handleDefClick(def)}
                  disabled={isMatched}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all ${
                    isMatched
                      ? 'bg-green-900/30 border border-green-500/40 text-green-400 line-through'
                      : isWrong
                      ? 'bg-red-900/30 border border-red-500 text-red-400 animate-shake'
                      : selectedTerm
                      ? 'bg-dawg-black border border-dawg-gold/50 text-dawg-silver hover:border-dawg-gold cursor-pointer'
                      : 'bg-dawg-black border border-dawg-slate text-dawg-silver'
                  }`}
                >
                  {def}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {submitted && allCorrect && (
        <div className="rounded-xl p-4 bg-green-900/20 border border-green-500/30">
          <BoomReaction
            mood="celebrating"
            message="All matched! You connected every concept like a true coordinator!"
          />
        </div>
      )}
    </div>
  );
}
