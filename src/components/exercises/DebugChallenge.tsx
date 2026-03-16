import React, { useState } from 'react';
import { BoomReaction } from '../BoomMascot';

// Find and fix the bug in the code
export interface DebugChallengeData {
  type: 'debug';
  id: string;
  prompt: string;
  buggyCode: string;
  fixedCode: string;
  bugLine: number; // 1-indexed line number with the bug
  explanation: string;
  xpReward: number;
  skill: string;
}

export function DebugChallengeExercise({
  challenge,
  onComplete,
}: {
  challenge: DebugChallengeData;
  onComplete: (correct: boolean) => void;
}) {
  const lines = challenge.buggyCode.split('\n');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFix, setShowFix] = useState(false);

  const handleLineClick = (lineNum: number) => {
    if (submitted) return;
    setSelectedLine(lineNum);
  };

  const handleSubmit = () => {
    const correct = selectedLine === challenge.bugLine;
    setIsCorrect(correct);
    setSubmitted(true);
    onComplete(correct);
  };

  return (
    <div className="space-y-4">
      <div className="bg-dawg-charcoal rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🐛</span>
          <div className="text-dawg-gold text-[10px] uppercase tracking-wider">
            Find the Bug
          </div>
        </div>
        <p className="text-dawg-white text-sm mb-4">{challenge.prompt}</p>

        {/* Buggy code with clickable lines */}
        <div className="bg-dawg-black rounded-lg overflow-hidden">
          {lines.map((line, i) => {
            const lineNum = i + 1;
            const isSelected = selectedLine === lineNum;
            const isBug = submitted && lineNum === challenge.bugLine;

            return (
              <button
                key={i}
                onClick={() => handleLineClick(lineNum)}
                className={`w-full text-left flex items-center hover:bg-dawg-slate/30 transition-colors ${
                  isBug
                    ? isCorrect
                      ? 'bg-green-900/30'
                      : 'bg-red-900/30'
                    : isSelected
                    ? 'bg-dawg-red/20'
                    : ''
                }`}
              >
                <span className="w-8 text-right pr-2 text-[10px] text-dawg-silver/40 select-none border-r border-dawg-slate/30 py-1">
                  {lineNum}
                </span>
                <span className="flex-1 px-3 py-1 font-mono text-xs text-green-400 whitespace-pre">
                  {line}
                </span>
                {isSelected && !submitted && (
                  <span className="text-dawg-red text-xs pr-3">◄ Bug here?</span>
                )}
                {isBug && submitted && (
                  <span className={`text-xs pr-3 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    ◄ {isCorrect ? 'Found it!' : 'Bug is here'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {!submitted && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-dawg-silver/50 text-xs">
              Tap the line with the bug
            </p>
            <button
              onClick={handleSubmit}
              disabled={selectedLine === null}
              className="bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold px-6 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              Submit
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
            mood={isCorrect ? 'excited' : 'coaching'}
            message={
              isCorrect
                ? "WOOF! You found the bug like a defensive back reading the QB's eyes!"
                : `The bug was on line ${challenge.bugLine}. Let's see why...`
            }
          />
          <p className="text-dawg-silver text-xs mt-3">
            {challenge.explanation}
          </p>
          <button
            onClick={() => setShowFix(!showFix)}
            className="text-dawg-gold text-xs mt-2 underline"
          >
            {showFix ? 'Hide' : 'Show'} the fix
          </button>
          {showFix && (
            <pre className="mt-2 bg-dawg-black rounded-lg p-3 font-mono text-xs text-green-400 whitespace-pre overflow-x-auto">
              {challenge.fixedCode}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
