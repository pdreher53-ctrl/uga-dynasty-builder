import React, { useState, useMemo } from 'react';
import { drills } from '../data/drills';
import { Badge, CodeBlock } from '../components/UIComponents';
import { SKILL_LABELS } from '../types';

export function DailyCombine({
  completedDrillIds,
  onCompleteDrill,
}: {
  completedDrillIds: string[];
  onCompleteDrill: (drillId: string) => void;
}) {
  const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Pick 3 uncompleted drills for today's combine
  const todaysDrills = useMemo(() => {
    const uncompleted = drills.filter(
      (d) => !completedDrillIds.includes(d.id)
    );
    // If all completed, show all drills again
    const pool = uncompleted.length >= 3 ? uncompleted : drills;
    // Deterministic shuffle based on today's date
    const today = new Date().toISOString().split('T')[0];
    const seed = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const shuffled = [...pool].sort(
      (a, b) => ((a.id.charCodeAt(4) + seed) % 100) - ((b.id.charCodeAt(4) + seed) % 100)
    );
    return shuffled.slice(0, 3);
  }, [completedDrillIds]);

  const currentDrill = todaysDrills[currentDrillIndex];
  const allDone = currentDrillIndex >= todaysDrills.length;
  const isCorrect = selectedAnswer === currentDrill?.correctIndex;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === currentDrill.correctIndex) {
      onCompleteDrill(currentDrill.id);
    }
  };

  const handleNext = () => {
    setCurrentDrillIndex((i) => i + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (allDone) {
    return (
      <div className="px-4 py-12 pb-24 lg:pb-6 max-w-lg lg:max-w-4xl mx-auto text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-display font-extrabold text-2xl text-dawg-white mb-2">
          Combine Complete!
        </h2>
        <p className="text-dawg-silver mb-6">
          Great work, Coach. Your skills are improving every day.
        </p>
        <div className="bg-dawg-charcoal rounded-xl p-4 inline-block">
          <div className="text-dawg-gold font-display font-bold text-lg">
            +{todaysDrills.reduce((sum, d) => sum + d.xpReward, 0)} XP earned today
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="flex gap-2 mb-5">
        {todaysDrills.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full ${
              i < currentDrillIndex
                ? 'bg-dawg-gold'
                : i === currentDrillIndex
                ? 'bg-dawg-red'
                : 'bg-dawg-slate'
            }`}
          />
        ))}
      </div>

      {/* Drill card */}
      <div className="bg-dawg-charcoal rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Badge text={SKILL_LABELS[currentDrill.category]} variant="gold" />
          <Badge text={currentDrill.difficulty} />
          <Badge text={`+${currentDrill.xpReward} XP`} variant="green" />
        </div>

        <h2 className="font-display font-bold text-lg text-dawg-white mb-2">
          {currentDrill.title}
        </h2>
        <p className="text-dawg-silver text-sm leading-relaxed">
          {currentDrill.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {currentDrill.options.map((option, i) => {
          let classes =
            'w-full bg-dawg-charcoal border rounded-xl p-4 text-left text-sm transition-all ';

          if (!showResult) {
            classes +=
              selectedAnswer === i
                ? 'border-dawg-red text-dawg-white'
                : 'border-dawg-slate text-dawg-silver hover:border-dawg-silver';
          } else if (i === currentDrill.correctIndex) {
            classes += 'border-green-500 bg-green-900/20 text-green-400';
          } else if (i === selectedAnswer) {
            classes += 'border-red-500 bg-red-900/20 text-red-400';
          } else {
            classes += 'border-dawg-slate text-dawg-silver/50';
          }

          return (
            <button key={i} onClick={() => handleAnswer(i)} className={classes}>
              <span className="font-mono text-xs text-dawg-silver/40 mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Result / explanation */}
      {showResult && (
        <div
          className={`rounded-xl p-4 mb-4 ${
            isCorrect
              ? 'bg-green-900/20 border border-green-500/30'
              : 'bg-red-900/20 border border-red-500/30'
          }`}
        >
          <div className="font-display font-bold text-sm mb-2">
            {isCorrect ? (
              <span className="text-green-400">Touchdown! Correct!</span>
            ) : (
              <span className="text-red-400">Incomplete Pass</span>
            )}
          </div>
          <p className="text-dawg-silver text-xs leading-relaxed mb-3">
            {currentDrill.explanation}
          </p>
          <div className="space-y-2">
            <div className="bg-dawg-black/30 rounded-lg p-2.5">
              <span className="text-[10px] text-dawg-gold uppercase tracking-wider">
                Football Context
              </span>
              <p className="text-dawg-silver text-xs mt-1">
                {currentDrill.footballContext}
              </p>
            </div>
            <div className="bg-dawg-black/30 rounded-lg p-2.5">
              <span className="text-[10px] text-dawg-gold uppercase tracking-wider">
                Work Application
              </span>
              <p className="text-dawg-silver text-xs mt-1">
                {currentDrill.workContext}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full mt-4 bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold py-2.5 rounded-lg transition-colors text-sm"
          >
            {currentDrillIndex < todaysDrills.length - 1
              ? 'Next Drill →'
              : 'Finish Combine 🏆'}
          </button>
        </div>
      )}
    </div>
  );
}
