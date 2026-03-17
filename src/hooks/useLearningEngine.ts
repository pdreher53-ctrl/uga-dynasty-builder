// ═══════════════════════════════════════════════════════════════
// USE LEARNING ENGINE — Academy save data + progression actions
// ═══════════════════════════════════════════════════════════════
//
// localStorage key: 'uga-academy-progress'
// This hook is the single source of truth for academy state.
// All templates call this hook — they never write to localStorage directly.

import { useState, useCallback, useMemo, useEffect } from 'react';
import { AcademySaveData, AcademyProgressState } from '../types/engine';
import { getAllLevels, getLevelById, getFirstIncompleteLevel } from '../data/levels';
import { getWorld } from '../data/worlds';
import {
  isWorldUnlocked,
  isLevelUnlocked,
  getAllWorldProgress,
  calculateLevelXp,
  updateDailyStreak,
  getWorldUnlockedByLevel,
} from '../engine/progressionEngine';
import { computeUnlockedFeatures, getFeatureUnlockForLevel } from '../engine/unlockSystem';
import {
  loadAcademyProgress,
  saveAcademyProgress,
  makeDefaultAcademySave,
} from '../services/academyProgressService';

// ── Local helpers (used before userId is known) ───────────────

function loadLocalFallback(): AcademySaveData {
  try {
    const raw = localStorage.getItem('uga-academy-progress-local');
    if (!raw) return makeDefaultAcademySave();
    const parsed = JSON.parse(raw) as AcademySaveData;
    parsed.unlockedFeatureIds = computeUnlockedFeatures(parsed.completedLevelIds);
    return parsed;
  } catch {
    return makeDefaultAcademySave();
  }
}

function persistSave(userId: string | undefined, save: AcademySaveData): void {
  if (userId) {
    saveAcademyProgress(userId, save); // handles both localStorage + Supabase
  } else {
    try {
      localStorage.setItem('uga-academy-progress-local', JSON.stringify(save));
    } catch { /* full */ }
  }
}

// ── Hook ──────────────────────────────────────────────────────

export interface LearningEngineActions {
  /** Call when player correctly answers a level. Returns XP earned (0 if replay). */
  completeLevel: (levelId: string) => {
    xpEarned: number;
    featureUnlocked: string | undefined;
    worldUnlocked: number | null;
    isNewCompletion: boolean;
  };
  /** Navigate the player to a specific level by ID. */
  goToLevel: (levelId: string) => void;
  /** Wipe all academy progress (confirmation should happen in the UI). */
  resetAcademy: () => void;
}

export function useLearningEngine(
  onEarnXp?: (id: string, xp: number) => void,
  userId?: string
): AcademyProgressState & LearningEngineActions {
  const [save, setSave] = useState<AcademySaveData>(loadLocalFallback);

  // When userId is known, load from cloud (may overwrite local state)
  useEffect(() => {
    if (!userId) return;
    loadAcademyProgress(userId).then(cloudSave => {
      const reconciled = {
        ...cloudSave,
        unlockedFeatureIds: computeUnlockedFeatures(cloudSave.completedLevelIds),
      };
      setSave(reconciled);
    });
  }, [userId]);

  // ── Derived state ───────────────────────────────────────────

  const allLevels = useMemo(() => getAllLevels(), []);

  const currentLevel = useMemo(
    () => getLevelById(save.currentLevelId) ?? getFirstIncompleteLevel(save.completedLevelIds),
    [save.currentLevelId, save.completedLevelIds]
  );

  const currentWorld = useMemo(
    () => (currentLevel ? getWorld(currentLevel.world) ?? null : null),
    [currentLevel]
  );

  const nextLevelObj = useMemo(() => {
    if (!currentLevel) return null;
    return allLevels.find(l => l.levelNumber === currentLevel.levelNumber + 1) ?? null;
  }, [currentLevel, allLevels]);

  const worldProgress = useMemo(() => getAllWorldProgress(save), [save]);

  const isLevelUnlockedFn = useCallback(
    (levelId: string) => {
      const level = getLevelById(levelId);
      if (!level) return false;
      return isLevelUnlocked(level.levelNumber, save);
    },
    [save]
  );

  const isLevelCompletedFn = useCallback(
    (levelId: string) => save.completedLevelIds.includes(levelId),
    [save]
  );

  // ── Actions ─────────────────────────────────────────────────

  const completeLevel = useCallback(
    (levelId: string) => {
      const level = getLevelById(levelId);
      if (!level) {
        return { xpEarned: 0, featureUnlocked: undefined, worldUnlocked: null, isNewCompletion: false };
      }

      const isNewCompletion = !save.completedLevelIds.includes(levelId);
      const today = new Date().toISOString().split('T')[0];

      // Update streak
      const newStreak = updateDailyStreak(save.streakCount, save.lastPlayedDate, today);

      // Calculate XP
      const xpEarned = calculateLevelXp(
        level.xpReward,
        level.streakBonus,
        newStreak,
        isNewCompletion
      );

      // Determine unlocks
      const featureUnlock = getFeatureUnlockForLevel(levelId);
      const worldUnlocked = getWorldUnlockedByLevel(levelId);

      // Build new save
      const newCompletedIds = isNewCompletion
        ? [...save.completedLevelIds, levelId]
        : save.completedLevelIds;

      const newUnlockedFeatures = featureUnlock
        ? [...new Set([...save.unlockedFeatureIds, featureUnlock.id])]
        : save.unlockedFeatureIds;

      const newUnlockedWorlds = worldUnlocked
        ? [...new Set([...save.unlockedWorldIds, worldUnlocked])]
        : save.unlockedWorldIds;

      const newBossesBeaten = level.isWorldBoss && isNewCompletion
        ? [...new Set([...save.worldBossesBeaten, level.world])]
        : save.worldBossesBeaten;

      // Advance to next level
      const nextLevel = allLevels.find(l => l.levelNumber === level.levelNumber + 1);
      const newCurrentLevelId = nextLevel ? nextLevel.id : levelId;

      const newSave: AcademySaveData = {
        ...save,
        completedLevelIds: newCompletedIds,
        currentLevelId: newCurrentLevelId,
        totalAcademyXp: save.totalAcademyXp + xpEarned,
        unlockedWorldIds: newUnlockedWorlds,
        unlockedFeatureIds: newUnlockedFeatures,
        streakCount: newStreak,
        lastPlayedDate: today,
        worldBossesBeaten: newBossesBeaten,
      };

      setSave(newSave);
      persistSave(userId, newSave);

      if (xpEarned > 0 && onEarnXp) {
        onEarnXp(levelId, xpEarned);
      }

      return {
        xpEarned,
        featureUnlocked: featureUnlock?.id,
        worldUnlocked,
        isNewCompletion,
      };
    },
    [save, allLevels, onEarnXp, userId]
  );

  const goToLevel = useCallback(
    (levelId: string) => {
      const newSave = { ...save, currentLevelId: levelId };
      setSave(newSave);
      persistSave(userId, newSave);
    },
    [save, userId]
  );

  const resetAcademy = useCallback(() => {
    const fresh = makeDefaultAcademySave();
    setSave(fresh);
    persistSave(userId, fresh);
  }, [userId]);

  return {
    save,
    currentWorld,
    currentLevel,
    nextLevel: nextLevelObj,
    worldProgress,
    isLevelUnlocked: isLevelUnlockedFn,
    isLevelCompleted: isLevelCompletedFn,
    completeLevel,
    goToLevel,
    resetAcademy,
  };
}
