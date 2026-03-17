// ═══════════════════════════════════════════════════════════════
// LEVEL REGISTRY — All levels across all worlds
// ═══════════════════════════════════════════════════════════════
//
// Import new world files here as you add them.
// The rest of the engine reads from this single source of truth.

import { Level } from '../../types/engine';
import { world1Levels } from './world1';
import { world2Levels } from './world2';
import { world3Levels } from './world3';

// ── All levels in order ───────────────────────────────────────

export const ALL_LEVELS: Level[] = [
  ...world1Levels,
  ...world2Levels,
  ...world3Levels,
];

// ── Lookup helpers ────────────────────────────────────────────

export function getAllLevels(): Level[] {
  return ALL_LEVELS;
}

export function getLevelById(id: string): Level | undefined {
  return ALL_LEVELS.find(l => l.id === id);
}

export function getLevelsForWorld(worldId: number): Level[] {
  return ALL_LEVELS.filter(l => l.world === worldId);
}

/** Returns the next level after the given level number, or undefined if at the end. */
export function getNextLevel(currentLevelNumber: number): Level | undefined {
  return ALL_LEVELS.find(l => l.levelNumber === currentLevelNumber + 1);
}

/** First level that has NOT been completed. Falls back to level 1. */
export function getFirstIncompleteLevel(completedIds: string[]): Level {
  const completed = new Set(completedIds);
  return ALL_LEVELS.find(l => !completed.has(l.id)) ?? ALL_LEVELS[0];
}

/** Boss level for a given world (isWorldBoss === true). */
export function getWorldBoss(worldId: number): Level | undefined {
  return ALL_LEVELS.find(l => l.world === worldId && l.isWorldBoss === true);
}
