// ═══════════════════════════════════════════════════════════════
// LEVEL SCREEN — Routes level.type to the correct template
// ═══════════════════════════════════════════════════════════════
//
// This is the ONLY component that needs to exist for all levels.
// It reads the level ID from the URL, loads the level data,
// and delegates rendering to the correct template.
//
// Adding 970 more levels = adding 970 data objects.
// This file never changes.

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLevelById } from '../data/levels';
import { LearnTemplate } from '../components/level-templates/LearnTemplate';
import { PredictTemplate } from '../components/level-templates/PredictTemplate';
import { FixTemplate } from '../components/level-templates/FixTemplate';
import { ApplyTemplate } from '../components/level-templates/ApplyTemplate';
import { BossTemplate } from '../components/level-templates/BossTemplate';
import { BoomCoach } from '../components/BoomCoach';
import { useLearningEngine } from '../hooks/useLearningEngine';

interface Props {
  userId?: string;
  onEarnXp?: (id: string, xp: number) => void;
}

type CompletionPhase = 'playing' | 'celebrating' | 'failed';

export function LevelScreen({ onEarnXp, userId }: Props) {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const engine = useLearningEngine(onEarnXp, userId);
  const [completionPhase, setCompletionPhase] = useState<CompletionPhase>('playing');
  const [completionData, setCompletionData] = useState<{
    xpEarned: number;
    featureUnlocked: string | undefined;
    worldUnlocked: number | null;
  } | null>(null);

  const level = levelId ? getLevelById(levelId) : null;

  // ── Not found ─────────────────────────────────────────────

  if (!level) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4">
        <div className="text-4xl">🤷</div>
        <p className="text-dawg-silver">Level not found.</p>
        <button
          onClick={() => navigate('/academy')}
          className="text-dawg-gold hover:text-dawg-white text-sm transition-colors"
        >
          ← Back to Academy
        </button>
      </div>
    );
  }

  // ── Level locked check ────────────────────────────────────

  if (!engine.isLevelUnlocked(level.id)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4 px-4">
        <div className="text-4xl">🔒</div>
        <p className="text-dawg-white font-display font-bold text-xl">Level Locked</p>
        <p className="text-dawg-silver text-sm text-center">
          Complete the previous level to unlock this one.
        </p>
        <button
          onClick={() => navigate('/academy')}
          className="text-dawg-gold hover:text-dawg-white text-sm transition-colors"
        >
          ← Back to Academy
        </button>
      </div>
    );
  }

  // ── Completion handler ────────────────────────────────────

  function handleComplete(passed: boolean) {
    if (!level) return;
    if (!passed) {
      setCompletionPhase('failed');
      return;
    }
    const result = engine.completeLevel(level.id);
    setCompletionData(result);
    setCompletionPhase('celebrating');
  }

  // ── Failed state (try again) ──────────────────────────────

  if (completionPhase === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-6 px-4">
        <div className="text-5xl">📉</div>
        <div className="text-center space-y-2">
          <h2 className="font-display font-extrabold text-dawg-white text-2xl">Back to Film Room</h2>
          <p className="text-dawg-silver text-sm">Review the concept and try again, Coach.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setCompletionPhase('playing')}
            className="bg-dawg-red hover:bg-dawg-red/80 text-white font-display font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/academy')}
            className="bg-dawg-charcoal border border-dawg-slate text-dawg-silver hover:text-dawg-white font-display font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Academy
          </button>
        </div>
      </div>
    );
  }

  // ── Celebration state ─────────────────────────────────────

  if (completionPhase === 'celebrating' && completionData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-6 px-4 text-center">
        <div className="text-6xl animate-bounce">🏆</div>
        <div className="space-y-2">
          <h2 className="font-display font-extrabold text-dawg-white text-3xl">
            LEVEL {level.levelNumber} COMPLETE!
          </h2>
          <p className="text-dawg-silver">{level.title}</p>
        </div>

        {/* XP earned */}
        {completionData.xpEarned > 0 && (
          <div className="bg-dawg-gold/10 border border-dawg-gold/30 rounded-xl px-8 py-4">
            <div className="text-dawg-gold font-display font-extrabold text-4xl">
              +{completionData.xpEarned} XP
            </div>
          </div>
        )}

        {/* Feature unlock toast */}
        {completionData.featureUnlocked && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg px-5 py-3 space-y-1">
            <p className="text-green-400 font-bold text-sm">🔓 UNLOCKED</p>
            <p className="text-dawg-white text-sm">
              {completionData.featureUnlocked.replace(/_/g, ' ')}
            </p>
          </div>
        )}

        {/* World unlock toast */}
        {completionData.worldUnlocked && (
          <div className="bg-dawg-red/10 border border-dawg-red/30 rounded-lg px-5 py-3 space-y-1">
            <p className="text-dawg-red font-bold text-sm">🌍 NEW WORLD UNLOCKED</p>
            <p className="text-dawg-white text-sm">World {completionData.worldUnlocked} is now open!</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 flex-wrap justify-center">
          {engine.nextLevel && (
            <button
              onClick={() => navigate(`/academy/level/${engine.nextLevel!.id}`)}
              className="bg-dawg-red hover:bg-dawg-red/80 text-white font-display font-bold px-6 py-3 rounded-lg transition-colors"
            >
              Next Level →
            </button>
          )}
          <button
            onClick={() => navigate('/academy')}
            className="bg-dawg-charcoal border border-dawg-slate text-dawg-silver hover:text-dawg-white font-display font-bold px-6 py-3 rounded-lg transition-colors"
          >
            Academy Map
          </button>
        </div>
      </div>
    );
  }

  // ── Render the correct template ───────────────────────────

  const templateProps = { level, onComplete: handleComplete };

  // Render the correct template with a level-aware BoomCoach overlay
  const renderTemplate = () => {
    switch (level.type) {
      case 'learn':   return <LearnTemplate {...templateProps} />;
      case 'predict': return <PredictTemplate {...templateProps} />;
      case 'fix':     return <FixTemplate {...templateProps} />;
      case 'apply':   return <ApplyTemplate {...templateProps} />;
      case 'boss':    return <BossTemplate {...templateProps} />;
      default:        return <LearnTemplate {...templateProps} />;
    }
  };

  return (
    <>
      {renderTemplate()}
      <BoomCoach levelContext={level} />
    </>
  );
}
