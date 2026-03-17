// ═══════════════════════════════════════════════════════════════
// UNLOCK SYSTEM — Feature unlocks tied to level completion
// ═══════════════════════════════════════════════════════════════
//
// Some levels unlock app features (mini-games, worlds, etc.)
// when the player beats them for the first time.
// The UI reads from AcademySaveData.unlockedFeatureIds.

import { ALL_LEVELS } from '../data/levels';

// ── Feature registry ──────────────────────────────────────────
// Maps feature IDs to human-readable display info.

export interface FeatureUnlock {
  id: string;
  label: string;
  description: string;
  icon: string;
  route?: string; // if it's a navigable screen
}

export const FEATURES: Record<string, FeatureUnlock> = {
  pick_the_winner: {
    id: 'pick_the_winner',
    label: 'Pick the Winner',
    description: 'Predict matchup outcomes using conditionals.',
    icon: '🎯',
    route: '/pick-winner',
  },
  world_2: {
    id: 'world_2',
    label: 'World 2: Redshirt',
    description: 'Loops, arrays, and functions unlocked.',
    icon: '🔄',
  },
  weekly_simulator: {
    id: 'weekly_simulator',
    label: 'Weekly Simulator',
    description: 'Simulate your full schedule week by week.',
    icon: '🗓️',
    route: '/weekly-sim',
  },
  world_3: {
    id: 'world_3',
    label: 'World 3: Starter',
    description: 'Objects, SQL, and data structures unlocked.',
    icon: '🏈',
  },
  coach_office: {
    id: 'coach_office',
    label: "Coach's Office",
    description: 'Make weekly decisions that shape your dynasty.',
    icon: '🏆',
    route: '/coach-office',
  },
  dynasty_desk: {
    id: 'dynasty_desk',
    label: 'Dynasty Desk',
    description: 'Visualize your dynasty data across the season.',
    icon: '📊',
    route: '/dynasty-desk',
  },
};

// ── Lookup helpers ────────────────────────────────────────────

export function getFeatureUnlock(featureId: string): FeatureUnlock | undefined {
  return FEATURES[featureId];
}

export function isFeatureUnlocked(
  featureId: string,
  unlockedFeatureIds: string[]
): boolean {
  return unlockedFeatureIds.includes(featureId);
}

/**
 * Returns the feature unlock (if any) that completing this level triggers.
 */
export function getFeatureUnlockForLevel(levelId: string): FeatureUnlock | undefined {
  const level = ALL_LEVELS.find(l => l.id === levelId);
  if (!level?.unlockFeature) return undefined;
  return FEATURES[level.unlockFeature];
}

/**
 * Given a set of completed level IDs, compute which feature IDs should be unlocked.
 * Use this to reconcile save data on load.
 */
export function computeUnlockedFeatures(completedLevelIds: string[]): string[] {
  const completed = new Set(completedLevelIds);
  return ALL_LEVELS
    .filter(l => l.unlockFeature && completed.has(l.id))
    .map(l => l.unlockFeature as string);
}
