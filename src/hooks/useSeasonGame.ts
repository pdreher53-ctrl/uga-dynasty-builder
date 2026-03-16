import { useState, useCallback, useEffect } from 'react';
import { Matchup, GameResult, Strategy, buildSchedule, simulateGame, calculateUgaRating } from '../data/gameData';

const STORAGE_KEY = 'uga-dynasty-season';

interface SeasonState {
  year: number;
  currentWeek: number;  // 1-14 (which game is up next)
  schedule: Matchup[];
  totalXpAtSeasonStart: number;
  phase: 'schedule' | 'pregame' | 'simulating' | 'result' | 'complete';
  lastResult?: GameResult;
}

function freshSeason(totalXp: number): SeasonState {
  return {
    year: new Date().getFullYear(),
    currentWeek: 1,
    schedule: buildSchedule(),
    totalXpAtSeasonStart: totalXp,
    phase: 'schedule',
    lastResult: undefined,
  };
}

function loadSeason(): SeasonState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SeasonState;
  } catch {
    return null;
  }
}

function saveSeason(state: SeasonState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useSeasonGame(totalXp: number, onEarnXp: (lessonId: string, xp: number) => void) {
  const [season, setSeason] = useState<SeasonState>(() => {
    const saved = loadSeason();
    // Start fresh if no saved state or it's a different year
    if (!saved || saved.year !== new Date().getFullYear()) {
      return freshSeason(totalXp);
    }
    return saved;
  });

  // Keep schedule objects in sync (they're rebuilt from static data)
  const schedule = season.schedule.map((m, i) => ({
    ...buildSchedule()[i],
    result: m.result,
  }));

  const ugaRating = calculateUgaRating(totalXp);
  const record = schedule.reduce(
    (acc, m) => {
      if (!m.result) return acc;
      return m.result.won
        ? { ...acc, w: acc.w + 1 }
        : { ...acc, l: acc.l + 1 };
    },
    { w: 0, l: 0 }
  );

  const update = useCallback((updater: (prev: SeasonState) => SeasonState) => {
    setSeason((prev) => {
      const next = updater(prev);
      saveSeason(next);
      return next;
    });
  }, []);

  const startPregame = useCallback(() => {
    update((s) => ({ ...s, phase: 'pregame' }));
  }, [update]);

  const playGame = useCallback(
    (strategy: Strategy) => {
      const currentMatchup = schedule[season.currentWeek - 1];
      if (!currentMatchup) return;

      update((s) => ({ ...s, phase: 'simulating' }));

      // Simulate after a short delay (let the UI update first)
      setTimeout(() => {
        const result = simulateGame(
          ugaRating,
          currentMatchup.opponent,
          strategy,
          season.currentWeek * 137
        );

        // Save result and earn XP
        update((s) => {
          const newSchedule = s.schedule.map((m, i) =>
            i === s.currentWeek - 1 ? { ...m, result } : m
          );
          const allDone = s.currentWeek >= 14;
          return {
            ...s,
            schedule: newSchedule,
            lastResult: result,
            phase: allDone ? 'complete' : 'result',
          };
        });

        // Award XP for game result (use a unique lesson-style ID)
        onEarnXp(`game-week-${season.currentWeek}`, result.xpEarned);
      }, 100);
    },
    [schedule, season.currentWeek, ugaRating, update, onEarnXp]
  );

  const advanceWeek = useCallback(() => {
    update((s) => ({
      ...s,
      currentWeek: s.currentWeek + 1,
      phase: 'schedule',
      lastResult: undefined,
    }));
  }, [update]);

  const resetSeason = useCallback(() => {
    const fresh = freshSeason(totalXp);
    saveSeason(fresh);
    setSeason(fresh);
  }, [totalXp]);

  return {
    season: { ...season, schedule },
    ugaRating,
    record,
    startPregame,
    playGame,
    advanceWeek,
    resetSeason,
  };
}
