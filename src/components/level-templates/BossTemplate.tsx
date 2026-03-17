// ═══════════════════════════════════════════════════════════════
// BOSS TEMPLATE — Multi-part challenge (5 questions, need 4/5)
// ═══════════════════════════════════════════════════════════════
//
// Rendered for level.type === 'boss'
// Steps through 5 questions sequentially, then shows final score.

import React, { useState } from 'react';
import { Level, BossChallenge, LevelQuestion } from '../../types/engine';
import { evaluateAnswer, evaluateBossChallenge, BossResult } from '../../engine/challengeEvaluator';

interface Props {
  level: Level;
  onComplete: (passed: boolean) => void;
}

type Phase = 'intro' | 'question' | 'between' | 'result';

export function BossTemplate({ level, onComplete }: Props) {
  const boss = level.challenge as BossChallenge;
  const [phase, setPhase] = useState<Phase>('intro');
  const [partIndex, setPartIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [lastResult, setLastResult] = useState<ReturnType<typeof evaluateAnswer> | null>(null);
  const [finalResult, setFinalResult] = useState<BossResult | null>(null);

  const currentQuestion: LevelQuestion | undefined = boss.parts[partIndex];

  function handleAnswer(idx: number) {
    if (lastResult || !currentQuestion) return;
    const r = evaluateAnswer(currentQuestion, idx);
    setLastResult(r);
    setAnswers(prev => [...prev, idx]);
    setPhase('between');
  }

  function handleNext() {
    const next = partIndex + 1;
    if (next >= boss.parts.length) {
      const allAnswers = [...answers];
      const res = evaluateBossChallenge(boss, allAnswers);
      setFinalResult(res);
      setPhase('result');
    } else {
      setPartIndex(next);
      setLastResult(null);
      setPhase('question');
    }
  }

  const correctSoFar = answers.filter(
    (ans, i) => boss.parts[i] && ans === boss.parts[i].correctIndex
  ).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Boss header */}
      <div className="text-center space-y-2">
        <div className="text-3xl">👑</div>
        <div className="text-xs text-dawg-red uppercase tracking-widest font-bold">
          World {level.world} Boss Battle
        </div>
        <h1 className="font-display font-extrabold text-dawg-white text-2xl">{level.title}</h1>
        <p className="text-dawg-silver text-sm">{level.subtitle}</p>
      </div>

      {/* Intro */}
      {phase === 'intro' && (
        <div className="bg-dawg-charcoal border border-dawg-red/40 rounded-xl p-6 space-y-4">
          <p className="text-dawg-white leading-relaxed">{level.footballContext}</p>
          <div className="flex items-center gap-3 text-sm text-dawg-silver bg-dawg-black rounded-lg p-3">
            <span>📋</span>
            <span>5 questions · Need {boss.passingScore}/5 to pass · XP reward: {level.xpReward}</span>
          </div>
          <button
            onClick={() => setPhase('question')}
            className="w-full bg-dawg-red hover:bg-dawg-red/80 text-white font-display font-bold py-3 rounded-lg transition-colors text-lg"
          >
            Start Boss Battle →
          </button>
        </div>
      )}

      {/* Progress bar */}
      {(phase === 'question' || phase === 'between') && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-dawg-silver/60">
            <span>Question {partIndex + 1} of {boss.parts.length}</span>
            <span className="text-dawg-gold">{correctSoFar} correct so far</span>
          </div>
          <div className="h-2 bg-dawg-slate rounded-full overflow-hidden">
            <div
              className="h-full bg-dawg-red transition-all duration-500"
              style={{ width: `${((partIndex + (phase === 'between' ? 1 : 0)) / boss.parts.length) * 100}%` }}
            />
          </div>
          <div className="flex gap-1">
            {boss.parts.map((_, i) => {
              let color = 'bg-dawg-slate';
              if (i < answers.length) {
                color = answers[i] === boss.parts[i].correctIndex ? 'bg-green-500' : 'bg-red-500';
              } else if (i === partIndex) {
                color = 'bg-dawg-gold animate-pulse';
              }
              return <div key={i} className={`flex-1 h-2 rounded-full transition-all ${color}`} />;
            })}
          </div>
        </div>
      )}

      {/* Question */}
      {(phase === 'question' || phase === 'between') && currentQuestion && (
        <div className="bg-dawg-charcoal border border-dawg-slate rounded-xl p-5 space-y-4">
          <p className="text-dawg-white font-semibold">{currentQuestion.prompt}</p>

          {currentQuestion.code && (
            <pre className="bg-dawg-black rounded-lg p-4 text-dawg-gold text-xs font-mono overflow-x-auto whitespace-pre-wrap">
              {currentQuestion.code}
            </pre>
          )}

          {currentQuestion.hint && phase === 'question' && (
            <p className="text-dawg-silver/60 text-xs italic">💡 {currentQuestion.hint}</p>
          )}

          <div className="space-y-2">
            {currentQuestion.options.map((opt, i) => {
              let cls =
                'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ';
              if (phase === 'between' && lastResult) {
                if (i === currentQuestion.correctIndex) {
                  cls += 'border-green-500 bg-green-500/10 text-green-400 font-semibold';
                } else if (i === answers[partIndex] && i !== currentQuestion.correctIndex) {
                  cls += 'border-red-500 bg-red-500/10 text-red-400';
                } else {
                  cls += 'border-dawg-slate text-dawg-silver/40';
                }
              } else {
                cls += 'border-dawg-slate text-dawg-silver hover:border-dawg-gold/50 hover:text-dawg-white';
              }
              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => handleAnswer(i)}
                  disabled={phase === 'between'}
                >
                  <span className="text-dawg-silver/40 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {phase === 'between' && lastResult && (
            <div
              className={`rounded-lg p-3 border text-sm ${
                lastResult.correct
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              <span className="font-bold">{lastResult.correct ? '✅' : '❌'} </span>
              {lastResult.explanation}
            </div>
          )}

          {phase === 'between' && (
            <button
              onClick={handleNext}
              className="w-full bg-dawg-charcoal border border-dawg-gold text-dawg-gold hover:bg-dawg-gold hover:text-dawg-black font-display font-bold py-3 rounded-lg transition-all"
            >
              {partIndex + 1 < boss.parts.length ? 'Next Question →' : 'See Final Score →'}
            </button>
          )}
        </div>
      )}

      {/* Final result */}
      {phase === 'result' && finalResult && (
        <div
          className={`bg-dawg-charcoal border rounded-xl p-6 space-y-4 text-center ${
            finalResult.passed ? 'border-green-500/40' : 'border-red-500/40'
          }`}
        >
          <div className="text-5xl">{finalResult.passed ? '🏆' : '📉'}</div>
          <h2 className="font-display font-extrabold text-2xl text-dawg-white">
            {finalResult.passed ? 'BOSS BEATEN!' : 'NOT ENOUGH — KEEP GRINDING'}
          </h2>
          <div className="text-dawg-silver">
            You scored{' '}
            <span className={`font-bold text-xl ${finalResult.passed ? 'text-green-400' : 'text-red-400'}`}>
              {finalResult.score}/{boss.parts.length}
            </span>
            {' '}(needed {boss.passingScore})
          </div>

          {/* Per-question review */}
          <div className="space-y-2 text-left">
            {finalResult.partResults.map((r, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg text-sm ${
                  r.correct ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}
              >
                <span>{r.correct ? '✅' : '❌'}</span>
                <span className="text-dawg-silver">{boss.parts[i].prompt}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onComplete(finalResult.passed)}
            className={`w-full font-display font-bold py-3 rounded-lg transition-colors text-white ${
              finalResult.passed
                ? 'bg-dawg-red hover:bg-dawg-red/80'
                : 'bg-dawg-slate hover:bg-dawg-slate/80'
            }`}
          >
            {finalResult.passed ? 'Claim Your XP & Continue →' : 'Try Again →'}
          </button>
        </div>
      )}
    </div>
  );
}
