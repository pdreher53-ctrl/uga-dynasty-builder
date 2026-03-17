// ═══════════════════════════════════════════════════════════════
// useDynastyState — Coach's Office persistent state hook
// ═══════════════════════════════════════════════════════════════
//
// CODING CONCEPT: Custom Hooks
// A custom hook is a reusable function that manages state and side effects.
// Any component can call useDynastyState() to get the same shared state.
// This pattern is how React apps avoid passing data through 10 layers of props.

import { useState, useCallback } from 'react';
import {
  DynastyGameState,
  INITIAL_DYNASTY_STATE,
  CoachAction,
  WeekRecord,
  clampRating,
  clampMorale,
} from '../data/dynastyState';

const STORAGE_KEY = 'uga-dynasty-coach-state';

// Load state from localStorage — returns default if nothing saved yet
function loadState(): DynastyGameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...INITIAL_DYNASTY_STATE, season: new Date().getFullYear() };
    const parsed = JSON.parse(raw) as DynastyGameState;
    // If saved state is from a different year, start fresh
    if (parsed.season !== new Date().getFullYear()) {
      return { ...INITIAL_DYNASTY_STATE, season: new Date().getFullYear() };
    }
    return parsed;
  } catch {
    return { ...INITIAL_DYNASTY_STATE, season: new Date().getFullYear() };
  }
}

// Persist state to localStorage
function saveState(state: DynastyGameState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ── The hook ─────────────────────────────────────────────────────

export function useDynastyState(onEarnXp: (id: string, xp: number) => void) {
  const [state, setStateRaw] = useState<DynastyGameState>(loadState);

  // Wrapper: every state update also saves to localStorage
  const update = useCallback((updater: (prev: DynastyGameState) => DynastyGameState) => {
    setStateRaw(prev => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  }, []);

  // Take a coach action this week
  // Rules: max 2 actions per week, can't use the same action twice in a week
  const takeAction = useCallback((action: CoachAction) => {
    update(s => {
      if (s.actionsUsedThisWeek.includes(action.id)) return s; // already used
      if (s.actionsUsedThisWeek.length >= 2) return s;          // at action limit

      return {
        ...s,
        offenseRating:    clampRating(s.offenseRating + action.offenseBonus),
        defenseRating:    clampRating(s.defenseRating + action.defenseBonus),
        recruitingRating: clampRating(s.recruitingRating + action.recruitingBonus),
        morale:           clampMorale(s.morale + action.moraleBonus),
        actionsUsedThisWeek: [...s.actionsUsedThisWeek, action.id],
      };
    });

    // Award XP — unique ID per action+week so it doesn't re-award on re-renders
    onEarnXp(`dynasty-${action.id}-w${state.currentWeek}`, action.xpReward);
  }, [update, onEarnXp, state.currentWeek]);

  // Advance to next week — optionally record a game result
  const advanceWeek = useCallback((
    gameResult?: { won: boolean; ugaScore: number; oppScore: number; opponent: string }
  ) => {
    update(s => {
      // Snapshot this week into history
      const weekRecord: WeekRecord = {
        week: s.currentWeek,
        actionIds: s.actionsUsedThisWeek,
        gameResult: gameResult?.won ? 'win' : gameResult ? 'loss' : undefined,
        ugaScore: gameResult?.ugaScore,
        oppScore: gameResult?.oppScore,
        opponent: gameResult?.opponent,
        offenseRating: s.offenseRating,
        defenseRating: s.defenseRating,
        recruitingRating: s.recruitingRating,
        morale: s.morale,
      };

      return {
        ...s,
        currentWeek: s.currentWeek + 1,
        wins: gameResult?.won ? s.wins + 1 : s.wins,
        losses: gameResult && !gameResult.won ? s.losses + 1 : s.losses,
        weekHistory: [...s.weekHistory, weekRecord],
        actionsUsedThisWeek: [],
        // Morale naturally drifts back toward 75 between weeks (natural baseline)
        morale: clampMorale(s.morale + (s.morale < 70 ? 4 : s.morale > 88 ? -2 : 0)),
      };
    });
  }, [update]);

  // Reset to a fresh dynasty (new season)
  const resetDynasty = useCallback(() => {
    const fresh = { ...INITIAL_DYNASTY_STATE, season: new Date().getFullYear() };
    saveState(fresh);
    setStateRaw(fresh);
  }, []);

  return { state, takeAction, advanceWeek, resetDynasty };
}
