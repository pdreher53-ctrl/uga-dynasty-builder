import React, { useState, useMemo } from 'react';
import { BoomCompanion, KirbyTip } from '../components/BoomMascot';
import { BoomMood } from '../components/BoomMascot';
import {
  CodeTypingExercise,
  DragDropExercise,
  FillInBlankExercise,
  DebugChallengeExercise,
} from '../components/exercises';
import {
  codeTypingChallenges,
  matchChallenges,
  fillBlankChallenges,
  debugChallenges,
} from '../data/interactiveChallenges';
import { drills } from '../data/drills';
import { Badge } from '../components/UIComponents';
import { SKILL_LABELS } from '../types';

type ExerciseMode = null | 'multiple-choice' | 'code-typing' | 'match' | 'fill-blank' | 'debug';

export function TrainingFacility({
  completedDrillIds,
  onCompleteDrill,
}: {
  completedDrillIds: string[];
  onCompleteDrill: (drillId: string) => void;
}) {
  const [mode, setMode] = useState<ExerciseMode>(null);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [boomMood, setBoomMood] = useState<BoomMood>('coaching');

  // Get exercises for each type
  const mcDrills = useMemo(() => {
    const uncompleted = drills.filter((d) => !completedDrillIds.includes(d.id));
    return (uncompleted.length >= 3 ? uncompleted : drills).slice(0, 5);
  }, [completedDrillIds]);

  const handleExerciseComplete = (correct: boolean, drillId?: string) => {
    setSessionTotal((t) => t + 1);
    if (correct) {
      setSessionCorrect((c) => c + 1);
      setBoomMood('happy');
      if (drillId) onCompleteDrill(drillId);
    } else {
      setBoomMood('sad');
    }
  };

  const handleBack = () => {
    setMode(null);
    setExerciseIdx(0);
    setSessionCorrect(0);
    setSessionTotal(0);
    setBoomMood('coaching');
  };

  // ── Multiple Choice Mode (original Daily Combine) ─────
  if (mode === 'multiple-choice') {
    const drill = mcDrills[exerciseIdx];
    if (!drill || exerciseIdx >= mcDrills.length) {
      return (
        <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
          <button onClick={handleBack} className="text-dawg-silver text-sm mb-4">
            ← Back to Training
          </button>
          <SessionComplete
            correct={sessionCorrect}
            total={sessionTotal}
            onBack={handleBack}
          />
        </div>
      );
    }

    return (
      <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
        <button onClick={handleBack} className="text-dawg-silver text-sm mb-4">
          ← Back to Training
        </button>
        <MCDrill
          drill={drill}
          index={exerciseIdx}
          total={mcDrills.length}
          onAnswer={(correct) => {
            handleExerciseComplete(correct, correct ? drill.id : undefined);
          }}
          onNext={() => setExerciseIdx((i) => i + 1)}
        />
      </div>
    );
  }

  // ── Code Typing Mode ─────
  if (mode === 'code-typing') {
    const challenge = codeTypingChallenges[exerciseIdx % codeTypingChallenges.length];
    if (exerciseIdx >= 3) {
      return (
        <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
          <button onClick={handleBack} className="text-dawg-silver text-sm mb-4">
            ← Back to Training
          </button>
          <SessionComplete correct={sessionCorrect} total={sessionTotal} onBack={handleBack} />
        </div>
      );
    }
    return (
      <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
        <button onClick={handleBack} className="text-dawg-silver text-sm mb-4">
          ← Back to Training
        </button>
        <ProgressDots current={exerciseIdx} total={3} />
        <CodeTypingExercise
          key={challenge.id}
          challenge={challenge}
          onComplete={(correct) => {
            handleExerciseComplete(correct, correct ? challenge.id : undefined);
            setTimeout(() => setExerciseIdx((i) => i + 1), 1500);
          }}
        />
      </div>
    );
  }

  // ── Match Mode ─────
  if (mode === 'match') {
    const challenge = matchChallenges[exerciseIdx % matchChallenges.length];
    if (exerciseIdx >= 3) {
      return (
        <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
          <button onClick={handleBack} className="text-dawg-silver text-sm mb-4">
            ← Back to Training
          </button>
          <SessionComplete correct={sessionCorrect} total={sessionTotal} onBack={handleBack} />
        </div>
      );
    }
    return (
      <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
        <button onClick={handleBack} className="text-dawg-silver text-sm mb-4">
          ← Back to Training
        </button>
        <ProgressDots current={exerciseIdx} total={3} />
        <DragDropExercise
          key={challenge.id}
          challenge={challenge}
          onComplete={(correct) => {
            handleExerciseComplete(correct, correct ? challenge.id : undefined);
            setTimeout(() => setExerciseIdx((i) => i + 1), 1500);
          }}
        />
      </div>
    );
  }

  // ── Fill in Blank Mode ─────
  if (mode === 'fill-blank') {
    const challenge = fillBlankChallenges[exerciseIdx % fillBlankChallenges.length];
    if (exerciseIdx >= 3) {
      return (
        <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
          <button onClick={handleBack} className="text-dawg-silver text-sm mb-4">
            ← Back to Training
          </button>
          <SessionComplete correct={sessionCorrect} total={sessionTotal} onBack={handleBack} />
        </div>
      );
    }
    return (
      <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
        <button onClick={handleBack} className="text-dawg-silver text-sm mb-4">
          ← Back to Training
        </button>
        <ProgressDots current={exerciseIdx} total={3} />
        <FillInBlankExercise
          key={challenge.id}
          challenge={challenge}
          onComplete={(correct) => {
            handleExerciseComplete(correct, correct ? challenge.id : undefined);
            setTimeout(() => setExerciseIdx((i) => i + 1), 1500);
          }}
        />
      </div>
    );
  }

  // ── Debug Mode ─────
  if (mode === 'debug') {
    const challenge = debugChallenges[exerciseIdx % debugChallenges.length];
    if (exerciseIdx >= 3) {
      return (
        <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
          <button onClick={handleBack} className="text-dawg-silver text-sm mb-4">
            ← Back to Training
          </button>
          <SessionComplete correct={sessionCorrect} total={sessionTotal} onBack={handleBack} />
        </div>
      );
    }
    return (
      <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
        <button onClick={handleBack} className="text-dawg-silver text-sm mb-4">
          ← Back to Training
        </button>
        <ProgressDots current={exerciseIdx} total={3} />
        <DebugChallengeExercise
          key={challenge.id}
          challenge={challenge}
          onComplete={(correct) => {
            handleExerciseComplete(correct, correct ? challenge.id : undefined);
            setTimeout(() => setExerciseIdx((i) => i + 1), 1500);
          }}
        />
      </div>
    );
  }

  // ── Training Menu ─────
  return (
    <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
      {/* Boom greeting */}
      <div className="mb-5">
        <BoomCompanion
          mood={boomMood}
          message="Welcome to the Training Facility, Coach! Pick a drill type to sharpen your skills!"
          size="md"
        />
      </div>

      <h3 className="font-display font-bold text-dawg-white mb-3">
        Choose Your Drill Type
      </h3>

      <div className="space-y-3 mb-5">
        <DrillTypeCard
          icon="📝"
          title="Multiple Choice"
          subtitle="Classic quiz-style questions with football & work context"
          tags={['Quick', 'Beginner-Friendly']}
          onClick={() => setMode('multiple-choice')}
        />
        <DrillTypeCard
          icon="⌨️"
          title="Code Typing"
          subtitle="Type real code character by character — build muscle memory"
          tags={['Hands-On', 'Intermediate']}
          onClick={() => setMode('code-typing')}
        />
        <DrillTypeCard
          icon="🔗"
          title="Match the Pairs"
          subtitle="Connect terms to definitions — like matching recruits to positions"
          tags={['Visual', 'Beginner-Friendly']}
          onClick={() => setMode('match')}
        />
        <DrillTypeCard
          icon="📝"
          title="Fill in the Blank"
          subtitle="Complete code snippets by filling in the missing keyword"
          tags={['Quick', 'Intermediate']}
          onClick={() => setMode('fill-blank')}
        />
        <DrillTypeCard
          icon="🐛"
          title="Debug Challenge"
          subtitle="Find the bug in broken code — sharpen your debugging instincts"
          tags={['Advanced', 'Critical Thinking']}
          onClick={() => setMode('debug')}
        />
      </div>

      <KirbyTip />
    </div>
  );
}

// ── Sub-components ─────

function DrillTypeCard({
  icon,
  title,
  subtitle,
  tags,
  onClick,
}: {
  icon: string;
  title: string;
  subtitle: string;
  tags: string[];
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-dawg-charcoal rounded-xl p-4 text-left hover:bg-dawg-slate transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h4 className="font-display font-bold text-dawg-white text-sm">
            {title}
          </h4>
          <p className="text-dawg-silver text-xs mt-0.5">{subtitle}</p>
          <div className="flex gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-dawg-slate text-dawg-silver px-2 py-0.5 rounded text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-2 mb-4">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`flex-1 h-1.5 rounded-full ${
            i < current
              ? 'bg-dawg-gold'
              : i === current
              ? 'bg-dawg-red'
              : 'bg-dawg-slate'
          }`}
        />
      ))}
    </div>
  );
}

function MCDrill({
  drill,
  index,
  total,
  onAnswer,
  onNext,
}: {
  drill: (typeof drills)[number];
  index: number;
  total: number;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const isCorrect = selected === drill.correctIndex;

  const handleSelect = (i: number) => {
    if (showResult) return;
    setSelected(i);
    setShowResult(true);
    onAnswer(i === drill.correctIndex);
  };

  return (
    <div>
      <ProgressDots current={index} total={total} />

      <div className="bg-dawg-charcoal rounded-xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Badge text={SKILL_LABELS[drill.category]} variant="gold" />
          <Badge text={drill.difficulty} />
          <Badge text={`+${drill.xpReward} XP`} variant="green" />
        </div>
        <h2 className="font-display font-bold text-lg text-dawg-white mb-2">
          {drill.title}
        </h2>
        <p className="text-dawg-silver text-sm">{drill.question}</p>
      </div>

      <div className="space-y-2 mb-4">
        {drill.options.map((option, i) => {
          let cls =
            'w-full bg-dawg-charcoal border rounded-xl p-4 text-left text-sm transition-all ';
          if (!showResult) {
            cls += 'border-dawg-slate text-dawg-silver hover:border-dawg-silver';
          } else if (i === drill.correctIndex) {
            cls += 'border-green-500 bg-green-900/20 text-green-400';
          } else if (i === selected) {
            cls += 'border-red-500 bg-red-900/20 text-red-400';
          } else {
            cls += 'border-dawg-slate text-dawg-silver/50';
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} className={cls}>
              <span className="font-mono text-xs text-dawg-silver/40 mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

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
          <p className="text-dawg-silver text-xs mb-3">{drill.explanation}</p>
          <div className="space-y-2">
            <div className="bg-dawg-black/30 rounded-lg p-2.5">
              <span className="text-[10px] text-dawg-gold uppercase tracking-wider">
                Football Context
              </span>
              <p className="text-dawg-silver text-xs mt-1">
                {drill.footballContext}
              </p>
            </div>
            <div className="bg-dawg-black/30 rounded-lg p-2.5">
              <span className="text-[10px] text-dawg-gold uppercase tracking-wider">
                Work Application
              </span>
              <p className="text-dawg-silver text-xs mt-1">
                {drill.workContext}
              </p>
            </div>
          </div>
          <button
            onClick={onNext}
            className="w-full mt-4 bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold py-2.5 rounded-lg text-sm"
          >
            {index < total - 1 ? 'Next Drill →' : 'Finish 🏆'}
          </button>
        </div>
      )}
    </div>
  );
}

function SessionComplete({
  correct,
  total,
  onBack,
}: {
  correct: number;
  total: number;
  onBack: () => void;
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="text-center py-8">
      <BoomCompanion
        mood={pct >= 80 ? 'celebrating' : pct >= 50 ? 'happy' : 'coaching'}
        message={
          pct >= 80
            ? 'CHAMPIONSHIP performance! Kirby is proud!'
            : pct >= 50
            ? 'Solid session! Keep building that dynasty!'
            : 'Every rep makes you better. Come back tomorrow!'
        }
        size="lg"
      />
      <div className="mt-6">
        <div className="text-dawg-gold font-display font-extrabold text-4xl">
          {pct}%
        </div>
        <p className="text-dawg-silver text-sm mt-1">
          {correct} of {total} correct
        </p>
      </div>
      <button
        onClick={onBack}
        className="mt-6 bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold px-8 py-2.5 rounded-lg text-sm"
      >
        Back to Training
      </button>
    </div>
  );
}
