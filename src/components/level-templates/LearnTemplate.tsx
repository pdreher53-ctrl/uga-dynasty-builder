// ═══════════════════════════════════════════════════════════════
// LEARN TEMPLATE — Concept explanation + single MCQ
// ═══════════════════════════════════════════════════════════════
//
// Rendered for level.type === 'learn'
// Shows a lesson panel, then a multiple-choice question.

import React, { useState } from 'react';
import { Level, LevelQuestion } from '../../types/engine';
import { evaluateAnswer } from '../../engine/challengeEvaluator';

interface Props {
  level: Level;
  onComplete: (passed: boolean) => void;
}

type Phase = 'lesson' | 'question' | 'result';

export function LearnTemplate({ level, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>(level.lesson ? 'lesson' : 'question');
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<ReturnType<typeof evaluateAnswer> | null>(null);

  const question = level.challenge as LevelQuestion;

  function handleAnswer(idx: number) {
    if (result) return;
    setSelected(idx);
    const r = evaluateAnswer(question, idx);
    setResult(r);
    setPhase('result');
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="text-xs text-dawg-silver/60 uppercase tracking-widest">
          Level {level.levelNumber} · {level.concept.replace(/_/g, ' ')}
        </div>
        <h1 className="font-display font-extrabold text-dawg-white text-2xl">{level.title}</h1>
        <p className="text-dawg-silver text-sm">{level.subtitle}</p>
      </div>

      {/* Football context badge */}
      <div className="bg-dawg-red/10 border border-dawg-red/30 rounded-lg px-4 py-3">
        <p className="text-dawg-silver text-sm">🏈 {level.footballContext}</p>
      </div>

      {/* Lesson panel */}
      {level.lesson && phase === 'lesson' && (
        <div className="bg-dawg-charcoal border border-dawg-slate rounded-xl p-5 space-y-4">
          <p className="text-dawg-white font-semibold">{level.lesson.overview}</p>
          <p className="text-dawg-silver text-sm leading-relaxed">{level.lesson.explanation}</p>

          {level.lesson.codeExample && (
            <pre className="bg-dawg-black rounded-lg p-4 text-dawg-gold text-xs overflow-x-auto whitespace-pre-wrap font-mono">
              {level.lesson.codeExample}
            </pre>
          )}

          <ul className="space-y-1">
            {level.lesson.keyPoints.map((pt, i) => (
              <li key={i} className="text-dawg-silver text-sm flex gap-2">
                <span className="text-dawg-gold shrink-0">▸</span>
                {pt}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setPhase('question')}
            className="w-full bg-dawg-red hover:bg-dawg-red/80 text-white font-display font-bold py-3 rounded-lg transition-colors"
          >
            Ready to Play Call →
          </button>
        </div>
      )}

      {/* Question */}
      {(phase === 'question' || phase === 'result') && (
        <div className="bg-dawg-charcoal border border-dawg-slate rounded-xl p-5 space-y-4">
          <p className="text-dawg-white font-semibold">{question.prompt}</p>

          {question.code && (
            <pre className="bg-dawg-black rounded-lg p-4 text-dawg-gold text-xs overflow-x-auto whitespace-pre-wrap font-mono">
              {question.code}
            </pre>
          )}

          {question.hint && phase === 'question' && (
            <p className="text-dawg-silver/60 text-xs italic">💡 {question.hint}</p>
          )}

          <div className="space-y-2">
            {question.options.map((opt, i) => {
              let cls =
                'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ';
              if (phase === 'result') {
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
                <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={phase === 'result'}>
                  <span className="text-dawg-silver/40 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Result feedback */}
          {phase === 'result' && result && (
            <div
              className={`rounded-lg p-4 border ${
                result.correct
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}
            >
              <p className="font-display font-bold text-lg mb-1">
                {result.correct ? '✅ Play called correctly!' : '❌ Wrong read — check film.'}
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
      )}
    </div>
  );
}
