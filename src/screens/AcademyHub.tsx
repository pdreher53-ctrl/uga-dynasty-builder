// ═══════════════════════════════════════════════════════════════
// ACADEMY HUB — World map browser
// ═══════════════════════════════════════════════════════════════
//
// Shows all 10 worlds, progress bars, and level cards.
// Unlocked worlds are fully interactive. Locked worlds preview what's coming.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { worlds } from '../data/worlds';
import { getLevelsForWorld } from '../data/levels';
import { useLearningEngine } from '../hooks/useLearningEngine';
import { isWorldUnlocked, WorldProgress } from '../engine/progressionEngine';
import { Level } from '../types/engine';

interface Props {
  userId?: string;
  onEarnXp?: (id: string, xp: number) => void;
}

// ── Level type badge ──────────────────────────────────────────

const TYPE_COLORS: Record<string, string> = {
  learn: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  predict: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  fix: 'bg-red-500/20 text-red-300 border-red-500/30',
  apply: 'bg-green-500/20 text-green-300 border-green-500/30',
  boss: 'bg-dawg-gold/20 text-dawg-gold border-dawg-gold/30',
};

const TYPE_ICONS: Record<string, string> = {
  learn: '📖',
  predict: '🔮',
  fix: '🔧',
  apply: '🎯',
  boss: '👑',
};

function LevelCard({
  level,
  isCompleted,
  isUnlocked,
  isCurrent,
  onPlay,
}: {
  level: Level;
  isCompleted: boolean;
  isUnlocked: boolean;
  isCurrent: boolean;
  onPlay: () => void;
}) {
  const typeColor = TYPE_COLORS[level.type] ?? TYPE_COLORS.learn;
  const typeIcon = TYPE_ICONS[level.type] ?? '📖';

  return (
    <button
      onClick={isUnlocked ? onPlay : undefined}
      disabled={!isUnlocked}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        isCompleted
          ? 'border-green-500/30 bg-green-500/5 opacity-80'
          : isCurrent
          ? 'border-dawg-gold/60 bg-dawg-gold/5 ring-1 ring-dawg-gold/30'
          : isUnlocked
          ? 'border-dawg-slate bg-dawg-charcoal hover:border-dawg-gold/40 hover:bg-dawg-gold/5'
          : 'border-dawg-slate/30 bg-dawg-charcoal/30 opacity-40 cursor-not-allowed'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Level number + status */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-display font-bold border ${
            isCompleted
              ? 'bg-green-500/20 border-green-500/40 text-green-400'
              : isCurrent
              ? 'bg-dawg-gold/20 border-dawg-gold/50 text-dawg-gold'
              : isUnlocked
              ? 'bg-dawg-slate/30 border-dawg-slate text-dawg-silver'
              : 'bg-dawg-slate/10 border-dawg-slate/20 text-dawg-silver/30'
          }`}
        >
          {isCompleted ? '✓' : isUnlocked ? level.levelNumber : '🔒'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-dawg-white text-sm font-semibold truncate">{level.title}</span>
            {isCurrent && (
              <span className="text-[10px] bg-dawg-gold/20 text-dawg-gold border border-dawg-gold/30 px-1.5 py-0.5 rounded font-bold">
                CURRENT
              </span>
            )}
          </div>
          <p className="text-dawg-silver/60 text-xs mt-0.5 truncate">{level.subtitle}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`text-[10px] border px-1.5 py-0.5 rounded font-mono ${typeColor}`}>
              {typeIcon} {level.type}
            </span>
            <span className="text-[10px] text-dawg-silver/40">+{level.xpReward} XP</span>
            {'⭐'.repeat(level.difficulty) && (
              <span className="text-[10px] text-dawg-silver/40">
                {'⭐'.repeat(level.difficulty)}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

// ── World card (expandable) ───────────────────────────────────

function WorldCard({
  worldId,
  progress,
  currentLevelId,
  isUnlocked,
  isLevelCompleted,
  isLevelUnlocked,
  onPlayLevel,
}: {
  worldId: number;
  progress: WorldProgress;
  currentLevelId: string;
  isUnlocked: boolean;
  isLevelCompleted: (id: string) => boolean;
  isLevelUnlocked: (id: string) => boolean;
  onPlayLevel: (id: string) => void;
}) {
  const world = worlds.find(w => w.id === worldId)!;
  const levels = getLevelsForWorld(worldId);
  const [expanded, setExpanded] = useState(isUnlocked && worldId === 1);

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-all ${
        isUnlocked ? 'border-dawg-slate' : 'border-dawg-slate/30 opacity-60'
      }`}
      style={isUnlocked ? { borderColor: world.color + '40' } : undefined}
    >
      {/* World header */}
      <button
        onClick={() => isUnlocked && setExpanded(!expanded)}
        disabled={!isUnlocked}
        className="w-full flex items-center gap-4 p-4 bg-dawg-charcoal text-left hover:bg-dawg-slate/10 transition-colors disabled:cursor-not-allowed"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ backgroundColor: world.color + '20', border: `1px solid ${world.color}40` }}
        >
          {isUnlocked ? world.icon : '🔒'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-display font-bold uppercase tracking-wider"
              style={{ color: isUnlocked ? world.color : '#6B7280' }}
            >
              World {world.id}
            </span>
            {progress.percent === 100 && (
              <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 rounded border border-green-500/30">
                COMPLETE
              </span>
            )}
          </div>
          <div className="text-dawg-white font-display font-bold text-base leading-tight">
            {world.name}
          </div>
          <div className="text-dawg-silver/60 text-xs">{world.subtitle}</div>
        </div>

        <div className="text-right shrink-0">
          {isUnlocked ? (
            <>
              <div className="text-dawg-white text-sm font-bold">
                {progress.completed}/{progress.total}
              </div>
              <div className="text-dawg-silver/60 text-xs">{progress.percent}%</div>
            </>
          ) : (
            <div className="text-dawg-silver/40 text-xs">Locked</div>
          )}
          <div className="text-dawg-silver/40 text-sm mt-1">{expanded ? '▲' : '▼'}</div>
        </div>
      </button>

      {/* Progress bar */}
      {isUnlocked && (
        <div className="h-1 bg-dawg-slate">
          <div
            className="h-full transition-all duration-700"
            style={{
              width: `${progress.percent}%`,
              backgroundColor: world.color,
            }}
          />
        </div>
      )}

      {/* Level list */}
      {expanded && isUnlocked && (
        <div className="p-4 space-y-2 bg-dawg-black/30">
          {levels.map(level => (
            <LevelCard
              key={level.id}
              level={level}
              isCompleted={isLevelCompleted(level.id)}
              isUnlocked={isLevelUnlocked(level.id)}
              isCurrent={level.id === currentLevelId}
              onPlay={() => onPlayLevel(level.id)}
            />
          ))}
        </div>
      )}

      {/* Locked preview */}
      {!isUnlocked && (
        <div className="px-4 pb-4 bg-dawg-black/20">
          <p className="text-dawg-silver/50 text-xs leading-relaxed">{world.description}</p>
          <p className="text-dawg-silver/30 text-xs mt-2">
            Requires {world.xpRequiredToEnter.toLocaleString()} Academy XP
            {world.unlockRequirement && ` + beat World ${world.id - 1} Boss`}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main Academy Hub ──────────────────────────────────────────

export function AcademyHub({ onEarnXp, userId }: Props) {
  const navigate = useNavigate();
  const engine = useLearningEngine(onEarnXp, userId);
  const { save, worldProgress, currentLevel } = engine;

  function handlePlayLevel(levelId: string) {
    engine.goToLevel(levelId);
    navigate(`/academy/level/${levelId}`);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Academy banner */}
      <div className="text-center space-y-2">
        <div className="text-4xl">🎓</div>
        <h1 className="font-display font-extrabold text-dawg-white text-3xl">
          AI Builder Academy
        </h1>
        <p className="text-dawg-silver text-sm max-w-sm mx-auto">
          Master coding through football. 30 levels across 3 worlds — more coming.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-dawg-charcoal border border-dawg-slate rounded-xl p-3 text-center">
          <div className="text-dawg-gold font-display font-extrabold text-2xl">
            {save.totalAcademyXp.toLocaleString()}
          </div>
          <div className="text-dawg-silver/60 text-[10px] uppercase tracking-wider mt-0.5">
            Academy XP
          </div>
        </div>
        <div className="bg-dawg-charcoal border border-dawg-slate rounded-xl p-3 text-center">
          <div className="text-dawg-white font-display font-extrabold text-2xl">
            {save.completedLevelIds.length}
          </div>
          <div className="text-dawg-silver/60 text-[10px] uppercase tracking-wider mt-0.5">
            Levels Done
          </div>
        </div>
        <div className="bg-dawg-charcoal border border-dawg-slate rounded-xl p-3 text-center">
          <div className="text-dawg-red font-display font-extrabold text-2xl">
            {save.streakCount}
          </div>
          <div className="text-dawg-silver/60 text-[10px] uppercase tracking-wider mt-0.5">
            Day Streak
          </div>
        </div>
      </div>

      {/* Continue CTA */}
      {currentLevel && (
        <button
          onClick={() => handlePlayLevel(currentLevel.id)}
          className="w-full bg-dawg-red hover:bg-dawg-red/80 text-white rounded-xl p-4 flex items-center gap-4 transition-colors text-left"
        >
          <div className="text-3xl">▶️</div>
          <div>
            <div className="font-display font-bold text-lg">Continue</div>
            <div className="text-white/70 text-sm">
              Level {currentLevel.levelNumber}: {currentLevel.title}
            </div>
          </div>
        </button>
      )}

      {/* World cards */}
      <div className="space-y-3">
        {worlds.map(world => (
          <WorldCard
            key={world.id}
            worldId={world.id}
            progress={worldProgress[world.id] ?? { completed: 0, total: 0, percent: 0 }}
            currentLevelId={save.currentLevelId}
            isUnlocked={isWorldUnlocked(world.id, save)}
            isLevelCompleted={engine.isLevelCompleted}
            isLevelUnlocked={engine.isLevelUnlocked}
            onPlayLevel={handlePlayLevel}
          />
        ))}
      </div>

      {/* Reset (dev convenience) */}
      <div className="pt-4 border-t border-dawg-slate">
        <button
          onClick={() => {
            if (confirm('Reset all Academy progress? This cannot be undone.')) {
              engine.resetAcademy();
            }
          }}
          className="text-dawg-silver/40 hover:text-dawg-silver text-xs transition-colors"
        >
          Reset Academy Progress
        </button>
      </div>
    </div>
  );
}
