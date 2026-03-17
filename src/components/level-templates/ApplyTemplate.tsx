// ═══════════════════════════════════════════════════════════════
// APPLY TEMPLATE — Use the concept in a dynasty scenario
// ═══════════════════════════════════════════════════════════════
//
// Rendered for level.type === 'apply'
// Dynasty scenario framing + MCQ decision.

import React, { useState } from 'react';
import { Level, LevelQuestion } from '../../types/engine';
import { evaluateAnswer } from '../../engine/challengeEvaluator';

interface Props {
  level: Level;
  onComplete: (passed: boolean) => void;
}

export function ApplyTemplate({ level, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<ReturnType<typeof evaluateAnswer> | null>(null);

  const question = level.challenge as LevelQuestion;

  function handleAnswer(idx: number) {
    if (result) return;
    setSelected(idx);
    setResult(evaluateAnswer(question, idx));
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="text-xs text-dawg-gold uppercase tracking-widest">
          Level {level.levelNumber} · Apply It 🏆
        </div>
        <h1 className="font-display font-extrabold text-dawg-white text-2xl">{level.title}</h1>
        <p className="text-dawg-silver text-sm">{level.subtitle}</p>
      </div>

      {/* Scenario panel */}
      <div className="bg-dawg-charcoal border border-dawg-gold/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🏈</span>
          <span className="text-dawg-gold font-display font-bold text-sm uppercase tracking-wider">
            Dynasty Scenario
          </span>
        </div>
        <p className="text-dawg-white leading-relaxed">{level.footballContext}</p>
      </div>

      {/* Lesson recap (if available) */}
      {level.lesson && (
        <details className="bg-dawg-charcoal border border-dawg-slate rounded-xl overflow-hidden">
          <summary className="px-5 py-3 text-dawg-silver text-sm cursor-pointer hover:text-dawg-white transition-colors select-none">
            📖 Review the concept
          </summary>
          <div className="px-5 pb-4 space-y-3 border-t border-dawg-slate">
            <p className="text-dawg-silver text-sm leading-relaxed pt-3">{level.lesson.explanation}</p>
            {level.lesson.codeExample && (
              <pre className="bg-dawg-black rounded-lg p-4 text-dawg-gold text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                {level.lesson.codeExample}
              </pre>
            )}
          </div>
        </details>
      )}

      {/* Question */}
      <div className="bg-dawg-charcoal border border-dawg-slate rounded-xl p-5 space-y-4">
        <p className="text-dawg-white font-semibold">{question.prompt}</p>

        {question.code && (
          <pre className="bg-dawg-black rounded-lg p-4 text-dawg-gold text-xs font-mono overflow-x-auto whitespace-pre-wrap">
            {question.code}
          </pre>
        )}

        {question.hint && !result && (
          <p className="text-dawg-silver/60 text-xs italic">💡 {question.hint}</p>
        )}

        <div className="space-y-2">
          {question.options.map((opt, i) => {
            let cls =
              'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ';
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
                <span className="text-dawg-silver/40 mr-2">{String.fromCharCode(65 + i)}.</span>
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
              {result.correct ? '✅ Correct play call!' : '❌ Wrong call, Coach.'}
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
