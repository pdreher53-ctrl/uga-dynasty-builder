// ═══════════════════════════════════════════════════════════════
// COACH'S OFFICE — Mini-Game 4
// ═══════════════════════════════════════════════════════════════
//
// WHAT YOU DO: Each week, choose 2 actions from 8 options.
// Each action adjusts your team's ratings. Ratings carry forward.
// Your choices this week affect your record for the whole season.
//
// CODING CONCEPT: State Management
// - State = the current values of all your team ratings
// - Each action is like calling setState() — it changes values
// - The UI re-renders to show the new state after each action
// - The week history is an array of past states — a changelog
//
// WHY IT MATTERS: State management is the heart of every app.
// React's useState, Redux, Zustand — all solve the same problem:
// "how do I change a value and make the UI update correctly?"

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDynastyState } from '../hooks/useDynastyState';
import { COACH_ACTIONS, CoachAction, getMoraleLabel, calcOverall } from '../data/dynastyState';
import { BoomMascot } from '../components/BoomMascot';
import { opponents } from '../data/gameData';
import { simulateMatchup } from '../data/secTeams';
import { secTeams } from '../data/secTeams';

// The opponents UGA faces each week (same as Season Simulator schedule)
const WEEK_OPPONENTS: Record<number, string> = {
  1: 'tennessee', 2: 'southcarolina', 3: 'kentucky', 4: 'auburn',
  5: 'vanderbilt', 6: 'olemiss', 7: 'florida', 8: 'missstate',
  9: 'texasam', 10: 'lsu', 11: 'alabama', 12: 'georgiatech',
  13: 'ohiostate', 14: 'michigan',
};

// ── Sub-components ────────────────────────────────────────────────

// Rating gauge — visual bar showing a stat from 60 to 99
function RatingGauge({
  label, value, color, prevValue,
}: {
  label: string; value: number; color: string; prevValue?: number;
}) {
  const pct = ((value - 60) / 39) * 100;
  const delta = prevValue !== undefined ? value - prevValue : 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-dawg-silver/70">{label}</span>
        <div className="flex items-center gap-1">
          {delta !== 0 && (
            <span className={`text-[10px] font-bold ${delta > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
          <span className="font-display font-bold text-dawg-white text-sm">{value}</span>
        </div>
      </div>
      <div className="h-2 bg-dawg-black rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// One action card
function ActionCard({
  action, onSelect, used, atLimit, showConcept,
}: {
  action: CoachAction;
  onSelect: () => void;
  used: boolean;
  atLimit: boolean;
  showConcept: boolean;
}) {
  const categoryColors: Record<string, string> = {
    offense: '#22C55E',
    defense: '#3B82F6',
    recruiting: '#F59E0B',
    morale: '#EC4899',
    analysis: '#9B59B6',
  };
  const color = categoryColors[action.category];

  return (
    <button
      onClick={onSelect}
      disabled={used || atLimit}
      className={`w-full text-left rounded-xl p-3.5 border transition-all ${
        used
          ? 'bg-dawg-black/40 border-dawg-slate/30 opacity-60'
          : atLimit
          ? 'bg-dawg-charcoal border-dawg-slate/30 opacity-40 cursor-not-allowed'
          : 'bg-dawg-charcoal border-dawg-slate hover:border-dawg-silver/30 hover:bg-dawg-slate/20'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{action.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-display font-bold text-dawg-white text-sm">{action.name}</span>
            {used && <span className="text-[9px] text-green-400 font-bold">✓ DONE</span>}
          </div>
          <p className="text-dawg-silver/60 text-xs leading-snug mb-1.5">{action.description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-dawg-gold">+{action.xpReward} XP</span>
            <span
              className="text-[9px] font-mono px-1.5 py-0.5 rounded"
              style={{ color, backgroundColor: `${color}18` }}
            >
              {action.effect}
            </span>
          </div>
          {showConcept && (
            <div className="mt-1.5 bg-dawg-black/60 rounded-lg p-2">
              <div className="text-[9px] text-dawg-silver/40 uppercase tracking-wider mb-0.5">
                Coding Concept
              </div>
              <div className="text-[10px] text-dawg-gold">{action.codingConcept}</div>
              <div className="text-[10px] text-dawg-silver/50 mt-0.5">{action.codingExplanation}</div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// Week history row
function HistoryRow({ week, wins, losses }: { week: number; wins: string; losses: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-dawg-slate/30 last:border-0">
      <span className="text-dawg-silver/40 text-[10px] font-mono w-8">W{week}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-green-400 font-bold text-xs">{wins}</span>
        <span className="text-dawg-silver/30">–</span>
        <span className="text-red-400 font-bold text-xs">{losses}</span>
      </div>
    </div>
  );
}

// ── Main Screen ───────────────────────────────────────────────────

export function CoachOffice({
  onEarnXp,
}: {
  onEarnXp: (id: string, xp: number) => void;
}) {
  const navigate = useNavigate();
  const { state, takeAction, advanceWeek, resetDynasty } = useDynastyState(onEarnXp);
  const [showConcepts, setShowConcepts] = useState(false);
  const [advancePhase, setAdvancePhase] = useState<'idle' | 'confirm' | 'result'>('idle');
  const [weekResult, setWeekResult] = useState<{
    won: boolean; ugaScore: number; oppScore: number; oppName: string;
  } | null>(null);

  const actionsUsed = state.actionsUsedThisWeek.length;
  const atLimit = actionsUsed >= 2;
  const moraleInfo = getMoraleLabel(state.morale);
  const overall = calcOverall(state.offenseRating, state.defenseRating, state.morale);

  // Find opponent for current week
  const oppId = WEEK_OPPONENTS[state.currentWeek];
  const oppTeam = secTeams.find(t => t.id === oppId);

  // Simulate this week's game and advance
  const handlePlayWeek = () => {
    if (!oppTeam) {
      advanceWeek();
      setAdvancePhase('idle');
      return;
    }

    // Build a temporary "UGA" team from current ratings
    const ugaTeam = secTeams.find(t => t.id === 'uga')!;
    const ugaWithRatings = { ...ugaTeam, rating: overall, offenseRating: state.offenseRating, defenseRating: state.defenseRating };

    const result = simulateMatchup(ugaWithRatings, oppTeam);
    const won = result.winner.id === 'uga';

    setWeekResult({
      won,
      ugaScore: won ? result.winScore : result.lossScore,
      oppScore: won ? result.lossScore : result.winScore,
      oppName: oppTeam.name,
    });
    setAdvancePhase('result');

    advanceWeek({ won, ugaScore: won ? result.winScore : result.lossScore, oppScore: won ? result.lossScore : result.winScore, opponent: oppTeam.name });
  };

  const isSeasonOver = state.currentWeek > 14;

  return (
    <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-3xl mx-auto">

      {/* Back nav */}
      <button
        onClick={() => navigate('/games')}
        className="text-dawg-silver text-sm mb-4 hover:text-dawg-white transition-colors"
      >
        ← Back to Games
      </button>

      {/* Season complete */}
      {isSeasonOver && (
        <div className="bg-dawg-charcoal rounded-2xl p-6 mb-5 text-center">
          <BoomMascot
            mood={state.wins >= 11 ? 'celebrate' : 'happy'}
            size={120}
            showSpeech
            className="mx-auto mb-4"
          />
          <div className="font-display font-extrabold text-3xl text-dawg-white mb-1">
            {state.wins >= 11 ? '🏆 Dynasty Built!' : 'Season Complete'}
          </div>
          <div className="text-dawg-gold font-display font-bold text-2xl mb-4">
            {state.wins}W – {state.losses}L
          </div>
          <button
            onClick={resetDynasty}
            className="bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold py-3 px-6 rounded-xl text-sm"
          >
            Start New Season
          </button>
        </div>
      )}

      {!isSeasonOver && (
        <>
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <BoomMascot
              mood={state.morale >= 80 ? 'happy' : state.morale < 50 ? 'sad' : 'idle'}
              size={72}
            />
            <div className="flex-1">
              <div className="text-dawg-silver/50 text-[10px] uppercase tracking-widest">
                Coach's Office · {state.season} Season
              </div>
              <div className="font-display font-extrabold text-xl text-dawg-white">
                Week {state.currentWeek} of 14
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-green-400 font-bold text-sm">{state.wins}W</span>
                <span className="text-dawg-silver/30">–</span>
                <span className="text-red-400 font-bold text-sm">{state.losses}L</span>
                {state.nationalRanking <= 25 && (
                  <span className="text-dawg-gold text-xs">#{state.nationalRanking} AP</span>
                )}
              </div>
            </div>
          </div>

          {/* Team ratings */}
          <div className="bg-dawg-charcoal rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-dawg-white text-sm">Team Ratings</h3>
              <div className="text-center">
                <div className="font-display font-extrabold text-dawg-gold text-xl">{overall}</div>
                <div className="text-[9px] text-dawg-silver/40">Overall</div>
              </div>
            </div>
            <div className="space-y-2.5">
              <RatingGauge label="Offense" value={state.offenseRating} color="#22C55E" />
              <RatingGauge label="Defense" value={state.defenseRating} color="#3B82F6" />
              <RatingGauge label="Recruiting" value={state.recruitingRating} color="#F59E0B" />
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] text-dawg-silver/70">Morale</span>
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: moraleInfo.color }}
                  >
                    {moraleInfo.label}
                  </span>
                </div>
                <div className="h-2 bg-dawg-black rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${state.morale}%`, backgroundColor: moraleInfo.color }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Game result (after advancing week) */}
          {advancePhase === 'result' && weekResult && (
            <div className={`rounded-xl p-4 mb-4 border ${
              weekResult.won
                ? 'bg-green-900/20 border-green-700/40'
                : 'bg-red-900/20 border-red-900/40'
            }`}>
              <div className={`font-display font-extrabold text-2xl mb-1 ${weekResult.won ? 'text-green-400' : 'text-red-400'}`}>
                {weekResult.won ? `✅ W ${weekResult.ugaScore}–${weekResult.oppScore}` : `❌ L ${weekResult.ugaScore}–${weekResult.oppScore}`}
              </div>
              <div className="text-dawg-silver/60 text-xs">
                vs {weekResult.oppName} · Week {state.currentWeek - 1}
              </div>
              <button
                onClick={() => setAdvancePhase('idle')}
                className="text-dawg-silver/50 text-xs mt-2 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Action selection */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-bold text-dawg-white text-sm">
                This Week's Actions
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${atLimit ? 'text-dawg-gold' : 'text-dawg-silver/50'}`}>
                  {actionsUsed}/2 used
                </span>
                <button
                  onClick={() => setShowConcepts(!showConcepts)}
                  className="text-[10px] text-dawg-silver/40 underline hover:text-dawg-silver transition-colors"
                >
                  {showConcepts ? 'Hide concepts' : 'Show coding concepts'}
                </button>
              </div>
            </div>
            <p className="text-dawg-silver/50 text-xs mb-3">
              Choose 2 actions. Each shapes your team's ratings for game day.
            </p>
          </div>

          {/* Coach actions grid */}
          <div className="space-y-2 mb-5">
            {COACH_ACTIONS.map(action => (
              <ActionCard
                key={action.id}
                action={action}
                onSelect={() => takeAction(action)}
                used={state.actionsUsedThisWeek.includes(action.id)}
                atLimit={atLimit && !state.actionsUsedThisWeek.includes(action.id)}
                showConcept={showConcepts}
              />
            ))}
          </div>

          {/* Upcoming opponent preview */}
          {oppTeam && (
            <div className="bg-dawg-charcoal rounded-xl p-3 mb-4">
              <div className="text-[10px] text-dawg-silver/40 uppercase tracking-wider mb-2">
                This Week's Opponent
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{oppTeam.emoji}</span>
                <div className="flex-1">
                  <div className="font-display font-bold text-dawg-white text-sm">{oppTeam.name}</div>
                  <div className="text-dawg-silver/50 text-xs">Rating: {oppTeam.rating} · {oppTeam.tendency}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold ${
                    overall > oppTeam.rating + 5 ? 'text-green-400' :
                    overall < oppTeam.rating - 5 ? 'text-red-400' : 'text-dawg-gold'
                  }`}>
                    {overall > oppTeam.rating + 5 ? '🟢 Favored' :
                     overall < oppTeam.rating - 5 ? '🔴 Underdog' : '🟡 Even'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advance week / Play game */}
          <button
            onClick={() => setAdvancePhase('confirm')}
            className="w-full bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold py-3.5 rounded-xl text-sm transition-colors mb-2"
          >
            {actionsUsed === 0 ? 'Skip to Game Day →' : `Play Week ${state.currentWeek} →`}
          </button>

          {advancePhase === 'confirm' && (
            <div className="bg-dawg-charcoal border border-dawg-slate rounded-xl p-4 mb-4">
              <p className="text-dawg-white text-sm mb-3">
                {actionsUsed < 2
                  ? `You've only used ${actionsUsed}/2 actions. Play anyway?`
                  : 'Ready to simulate this week\'s game?'}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handlePlayWeek}
                  className="flex-1 bg-dawg-red text-white font-bold py-2 rounded-lg text-sm"
                >
                  Simulate Game
                </button>
                <button
                  onClick={() => setAdvancePhase('idle')}
                  className="flex-1 bg-dawg-slate text-dawg-silver font-bold py-2 rounded-lg text-sm"
                >
                  Go Back
                </button>
              </div>
            </div>
          )}

          {/* State concept panel */}
          <div className="bg-dawg-black border border-dawg-slate rounded-xl p-4 mt-2">
            <div className="text-[10px] uppercase tracking-wider text-dawg-gold font-bold mb-2">
              🔍 Under the Hood — State Management
            </div>
            <pre className="text-xs font-mono text-green-400 leading-relaxed overflow-x-auto">
{`// Your dynasty state object
const dynastyState = {
  offenseRating:    ${state.offenseRating},
  defenseRating:    ${state.defenseRating},
  recruitingRating: ${state.recruitingRating},
  morale:           ${state.morale},
  wins: ${state.wins}, losses: ${state.losses},
  week: ${state.currentWeek}
};

// When you pick an action, setState() is called:
// takeAction("film-study") →
//   offenseRating += 3   // ${state.offenseRating + 3}
//   defenseRating += 3   // ${state.defenseRating + 3}
//   → UI re-renders with new values`}
            </pre>
          </div>

          {/* Reset */}
          <button
            onClick={resetDynasty}
            className="w-full mt-4 py-2 text-dawg-silver/30 hover:text-dawg-silver text-xs transition-colors border border-dawg-slate/20 rounded-lg"
          >
            Reset Dynasty
          </button>
        </>
      )}
    </div>
  );
}
