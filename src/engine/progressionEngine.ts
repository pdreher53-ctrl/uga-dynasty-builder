// ═══════════════════════════════════════════════════════════════
// PROGRESSION ENGINE — Pure functions, no side effects
// ═══════════════════════════════════════════════════════════════
//
// All logic for determining what the player can access.
// These functions are pure: same inputs → same outputs, no state.

import { AcademySaveData, World } from '../types/engine';
import { ALL_LEVELS, getLevelsForWorld } from '../data/levels';
import { worlds } from '../data/worlds';

// ── World unlock check ────────────────────────────────────────

/**
 * Returns true if the player can enter the given world.
 * World 1 is always open. Others require XP + boss completion.
 */
export function isWorldUnlocked(
  worldId: number,
  save: AcademySaveData
): boolean {
  if (worldId === 1) return true;
  return save.unlockedWorldIds.includes(worldId);
}

/**
 * Given a completed level ID, return which world ID it unlocks (if any).
 * A level unlocks a world when its unlockFeature is "world_N".
 */
export function getWorldUnlockedByLevel(levelId: string): number | null {
  const level = ALL_LEVELS.find(l => l.id === levelId);
  if (!level?.unlockFeature) return null;
  const match = level.unlockFeature.match(/^world_(\d+)$/);
  if (!match) return null;
  return parseInt(match[1], 10);
}

// ── Level unlock check ────────────────────────────────────────

/**
 * A level is unlocked if:
 * 1. The previous level has been completed (sequential unlocking), OR
 * 2. It's level 1 (always open)
 */
export function isLevelUnlocked(
  levelNumber: number,
  save: AcademySaveData
): boolean {
  if (levelNumber === 1) return true;
  const prevLevel = ALL_LEVELS.find(l => l.levelNumber === levelNumber - 1);
  if (!prevLevel) return false;
  return save.completedLevelIds.includes(prevLevel.id);
}

// ── Progress per world ────────────────────────────────────────

export interface WorldProgress {
  completed: number;
  total: number;
  percent: number;
}

export function getWorldProgress(
  worldId: number,
  save: AcademySaveData
): WorldProgress {
  const levels = getLevelsForWorld(worldId);
  const completed = levels.filter(l => save.completedLevelIds.includes(l.id)).length;
  const total = levels.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, percent };
}

export function getAllWorldProgress(
  save: AcademySaveData
): Record<number, WorldProgress> {
  return Object.fromEntries(
    worlds.map(w => [w.id, getWorldProgress(w.id, save)])
  );
}

// ── Streak bonus ──────────────────────────────────────────────

/**
 * Returns the streak XP bonus for the current level.
 * Applied on top of base xpReward when on a streak of 3+.
 */
export function calculateStreakBonus(streakCount: number, baseBonus: number): number {
  if (streakCount < 3) return 0;
  if (streakCount >= 7) return baseBonus * 2;
  if (streakCount >= 5) return Math.round(baseBonus * 1.5);
  return baseBonus;
}

// ── Daily streak update ───────────────────────────────────────

/**
 * Given the last played date and today's date, returns updated streak count.
 * - Same day: streak unchanged
 * - Consecutive day: streak + 1
 * - Gap > 1 day: streak resets to 1
 */
export function updateDailyStreak(
  currentStreak: number,
  lastPlayedDate: string | null,
  todayStr: string // ISO date "2026-03-16"
): number {
  if (!lastPlayedDate) return 1;
  if (lastPlayedDate === todayStr) return currentStreak;

  const last = new Date(lastPlayedDate);
  const today = new Date(todayStr);
  const diffDays = Math.round(
    (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 1) return currentStreak + 1;
  return 1; // streak broken
}

// ── XP for completing a level ─────────────────────────────────

export function calculateLevelXp(
  baseXp: number,
  streakBonus: number,
  currentStreak: number,
  firstTimeComplete: boolean
): number {
  if (!firstTimeComplete) return 0; // no XP for replay
  const bonus = calculateStreakBonus(currentStreak, streakBonus);
  return baseXp + bonus;
}

// ── Next world preview ────────────────────────────────────────

export function getNextLockedWorld(save: AcademySaveData): World | undefined {
  return worlds.find(w => !isWorldUnlocked(w.id, save));
}
