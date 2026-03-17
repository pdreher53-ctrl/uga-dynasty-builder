// ═══════════════════════════════════════════════════════════════
// PREDICT TEMPLATE — Read code, predict the output
// ═══════════════════════════════════════════════════════════════
//
// Rendered for level.type === 'predict'
// Shows a code snippet prominently, asks "what does this output?"

import React, { useState } from 'react';
import { Level, LevelQuestion } from '../../types/engine';
import { evaluateAnswer } from '../../engine/challengeEvaluator';

interface Props {
  level: Level;
  onComplete: (passed: boolean) => void;
}

export function PredictTemplate({ level, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<ReturnType<typeof evaluateAnswer> | null>(null);

  const question = level.challenge as LevelQuestion;

  function handleAnswer(idx: number) {
    if (result) return;
    setSelected(idx);
    const r = evaluateAnswer(question, idx);
    setResult(r);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="text-xs text-dawg-silver/60 uppercase tracking-widest">
          Level {level.levelNumber} · Predict the Output
        </div>
        <h1 className="font-display font-extrabold text-dawg-white text-2xl">{level.title}</h1>
        <p className="text-dawg-silver text-sm">{level.subtitle}</p>
      </div>

      {/* Football context */}
      <div className="bg-dawg-red/10 border border-dawg-red/30 rounded-lg px-4 py-3">
        <p className="text-dawg-silver text-sm">🏈 {level.footballContext}</p>
      </div>

      {/* Code block — the star of this template */}
      <div className="bg-dawg-black border border-dawg-gold/20 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-dawg-slate bg-dawg-charcoal">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-dawg-silver/40 text-xs ml-2 font-mono">play_call.py</span>
        </div>
        <pre className="px-5 py-4 text-dawg-gold text-sm font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {question.code}
        </pre>
      </div>

      {/* Question */}
      <div className="bg-dawg-charcoal border border-dawg-slate rounded-xl p-5 space-y-4">
        <p className="text-dawg-white font-semibold">{question.prompt}</p>

        {question.hint && !result && (
          <p className="text-dawg-silver/60 text-xs italic">💡 {question.hint}</p>
        )}

        <div className="space-y-2">
          {question.options.map((opt, i) => {
            let cls =
              'w-full text-left px-4 py-3 rounded-lg border text-sm font-mono transition-all ';
            if (result) {
              if (i === question.correctIndex) {
                cls += 'border-green-500 bg-green-500/10 text-green-400 font-semibold';
              } else if (i === selected && i !== question.correctIndex) {
                cls += 'border-red-500 bg-red-500/10 text-red-400';
              } else {
                cls += 'border-dawg-slate text-dawg-silver/40';
              }
            } else {
              cls +=
                selected === i
                  ? 'border-dawg-gold bg-dawg-gold/10 text-dawg-gold'
                  : 'border-dawg-slate text-dawg-silver hover:border-dawg-gold/50 hover:text-dawg-white';
            }
            return (
              <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={!!result}>
                <span className="text-dawg-silver/40 mr-2 font-sans">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>

        {result && (
          <div
            className={`rounded-lg p-4 border ${
              result.correct
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <p className="font-display font-bold text-lg mb-1">
              {result.correct ? '✅ Perfect read!' : '❌ Film doesn\'t lie — check the output.'}
            </p>
            <p className="text-dawg-silver text-sm">{result.explanation}</p>

            <button
              onClick={() => onComplete(result.correct)}
              className="mt-4 w-full bg-dawg-red hover:bg-dawg-red/80 text-white font-display font-bold py-3 rounded-lg transition-colors"
            >
              {result.correct ? 'Next Level →' : 'Try Again →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
