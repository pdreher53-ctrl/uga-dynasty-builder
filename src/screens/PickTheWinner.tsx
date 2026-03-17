// ═══════════════════════════════════════════════════════════════
// PICK THE WINNER — Mini-Game 1
// ═══════════════════════════════════════════════════════════════
//
// WHAT YOU DO: See two SEC teams. Pick who wins. Engine runs the math.
//
// CODING CONCEPT: Variables & Conditionals
// - Variables: every team's rating, offense, defense are stored values
// - Conditionals: "if ratingDiff > 0, teamA wins" is an if/else statement
// - Comparison operators: >, <, >=, === decide outcomes
//
// WHY IT MATTERS: Every prediction system — from sports to machine learning —
// starts with: "if X > Y, predict A; else predict B."

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SecTeam, getRandomMatchup, simulateMatchup, SimResult } from '../data/secTeams';

// ── Types ─────────────────────────────────────────────────────────

type Phase = 'pick' | 'reveal';

interface RoundState {
  teamA: SecTeam;
  teamB: SecTeam;
  userPick: SecTeam | null;
  result: SimResult | null;
}

// ── Sub-components ────────────────────────────────────────────────

// Displays one team's card with rating bars
function TeamCard({
  team,
  selected,
  onClick,
  disabled,
  showRatings,
}: {
  team: SecTeam;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
  showRatings: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 rounded-2xl p-5 border-2 transition-all text-center ${
        selected
          ? 'border-dawg-gold bg-dawg-gold/10 scale-[1.02]'
          : 'border-dawg-slate bg-dawg-charcoal hover:border-dawg-silver/30'
      } disabled:cursor-default`}
    >
      {/* Emoji + name */}
      <div className="text-4xl mb-2">{team.emoji}</div>
      <div className="font-display font-extrabold text-dawg-white text-lg leading-tight">
        {team.abbreviation}
      </div>
      <div className="text-dawg-silver/60 text-xs mb-3">{team.name}</div>

      {/* Overall rating — always shown */}
      <div className="font-display font-bold text-dawg-gold text-3xl mb-1">
        {team.rating}
      </div>
      <div className="text-dawg-silver/40 text-[10px] uppercase tracking-wider mb-3">
        Overall
      </div>

      {/* Offense / Defense bars — revealed after pick */}
      {showRatings && (
        <div className="space-y-2 text-left">
          <RatingBar label="OFF" value={team.offenseRating} color="#22C55E" />
          <RatingBar label="DEF" value={team.defenseRating} color="#3B82F6" />
          <div className="text-[10px] text-dawg-silver/40 text-center mt-1 capitalize">
            Tendency: {team.tendency}
          </div>
        </div>
      )}

      {selected && (
        <div className="mt-3 text-dawg-gold text-[10px] font-bold uppercase tracking-wider">
          ← Your Pick
        </div>
      )}
    </button>
  );
}

function RatingBar({ label, value, color }: { label: string; value: number; color: string }) {
  const pct = ((value - 60) / 39) * 100; // normalize 60–99 to 0–100%
  return (
    <div>
      <div className="flex justify-between text-[10px] mb-0.5">
        <span className="text-dawg-silver/50">{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div className="h-1.5 bg-dawg-black rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ── Code Insight Panel ────────────────────────────────────────────

// Shows the actual "code" running under the hood — beginner education embedded
function CodeInsight({
  teamA,
  teamB,
  result,
}: {
  teamA: SecTeam;
  teamB: SecTeam;
  result: SimResult | null;
}) {
  const diff = teamA.rating - teamB.rating;
  return (
    <div className="bg-dawg-black border border-dawg-slate rounded-xl p-4 text-left">
      <div className="text-[10px] uppercase tracking-wider text-dawg-gold font-bold mb-2">
        🔍 Under the Hood — Variables & Conditionals
      </div>
      <pre className="text-xs font-mono text-green-400 leading-relaxed overflow-x-auto">
{`// Variables store the ratings
let teamA_rating = ${teamA.rating};
let teamB_rating = ${teamB.rating};

// Calculate the advantage
let ratingDiff = teamA_rating - teamB_rating;
// ratingDiff = ${diff}

// Add variance (the "upset factor")
let variance = (Math.random() - 0.45) * 20;

// Conditional: who wins?
if ((ratingDiff + variance) >= 0) {
  winner = "${teamA.abbreviation}"; // ${teamA.rating} is stronger
} else {
  winner = "${teamB.abbreviation}"; // upset!
}${result ? `\n\n// Result: ${result.winner.abbreviation} wins ${result.winScore}–${result.lossScore}` : ''}`}
      </pre>
    </div>
  );
}

// ── Score display ─────────────────────────────────────────────────

function ResultBanner({
  result,
  userPick,
  teamA,
  teamB,
  xpEarned,
}: {
  result: SimResult;
  userPick: SecTeam;
  teamA: SecTeam;
  teamB: SecTeam;
  xpEarned: number;
}) {
  const correct = userPick.id === result.winner.id;
  return (
    <div
      className={`rounded-2xl p-5 mb-4 border text-center ${
        correct
          ? 'bg-green-900/20 border-green-700/40'
          : 'bg-red-900/20 border-red-700/40'
      }`}
    >
      <div className={`font-display font-extrabold text-3xl mb-1 ${correct ? 'text-green-400' : 'text-red-400'}`}>
        {correct ? '✅ CORRECT!' : '❌ WRONG'}
      </div>
      <div className="text-dawg-white font-display font-bold text-xl mb-2">
        {result.winner.abbreviation} {result.winScore} – {result.loser.abbreviation} {result.lossScore}
      </div>
      <div className={`text-[10px] uppercase tracking-wider mb-2 ${
        result.dominance === 'blowout' ? 'text-dawg-gold' :
        result.dominance === 'comfortable' ? 'text-dawg-silver' : 'text-blue-400'
      }`}>
        {result.dominance === 'blowout' ? '💥 Blowout' :
         result.dominance === 'comfortable' ? '📈 Comfortable Win' : '😰 Close Game'}
        {result.wasUpset ? ' · 🚨 UPSET!' : ''}
      </div>
      <p className="text-dawg-silver/70 text-xs leading-relaxed mb-3">{result.explanation}</p>
      <div className="font-display font-bold text-dawg-gold text-lg">+{xpEarned} XP</div>
    </div>
  );
}

// ── Streak display ────────────────────────────────────────────────

function StreakBadge({ streak }: { streak: number }) {
  if (streak < 2) return null;
  return (
    <div className="text-center mb-3">
      <span className="bg-dawg-gold/20 text-dawg-gold font-bold text-xs px-3 py-1 rounded-full border border-dawg-gold/30">
        🔥 {streak} pick streak!
      </span>
    </div>
  );
}

// ── Main Screen ───────────────────────────────────────────────────

export function PickTheWinner({
  totalXp,
  onEarnXp,
}: {
  totalXp: number;
  onEarnXp: (id: string, xp: number) => void;
}) {
  const navigate = useNavigate();

  // Generate the first matchup on mount
  const [round, setRound] = useState<RoundState>(() => {
    const [a, b] = getRandomMatchup();
    return { teamA: a, teamB: b, userPick: null, result: null };
  });

  const [phase, setPhase] = useState<Phase>('pick');
  const [streak, setStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [lastXp, setLastXp] = useState(0);

  // User picks a team
  const handlePick = useCallback((picked: SecTeam) => {
    if (phase !== 'pick') return;

    // Run the simulation immediately
    const result = simulateMatchup(round.teamA, round.teamB);
    const correct = picked.id === result.winner.id;

    // XP: 30 base, +20 for correct, +10 bonus for upset prediction
    const xp = 30 + (correct ? 20 : 0) + (result.wasUpset && correct ? 10 : 0);

    setRound(prev => ({ ...prev, userPick: picked, result }));
    setPhase('reveal');
    setLastXp(xp);
    setTotalRounds(n => n + 1);

    if (correct) {
      setTotalCorrect(n => n + 1);
      setStreak(n => n + 1);
    } else {
      setStreak(0);
    }

    onEarnXp(`pick-winner-r${totalRounds + 1}`, xp);
  }, [phase, round, totalRounds, onEarnXp]);

  // New matchup
  const handleNext = useCallback(() => {
    const [a, b] = getRandomMatchup();
    setRound({ teamA: a, teamB: b, userPick: null, result: null });
    setPhase('pick');
  }, []);

  const accuracy = totalRounds > 0
    ? Math.round((totalCorrect / totalRounds) * 100)
    : 0;

  return (
    <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-2xl mx-auto">

      {/* Back nav */}
      <button
        onClick={() => navigate('/games')}
        className="text-dawg-silver text-sm mb-4 hover:text-dawg-white transition-colors"
      >
        ← Back to Games
      </button>

      {/* Header */}
      <div className="mb-4">
        <div className="text-dawg-silver/50 text-[10px] uppercase tracking-widest mb-1">
          Mini-Game 1 · Variables & Conditionals
        </div>
        <h1 className="font-display font-extrabold text-2xl text-dawg-white">
          Pick the Winner
        </h1>
        {totalRounds > 0 && (
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-[10px] text-dawg-silver/50">{totalRounds} picks</span>
            <span className="text-[10px] text-dawg-gold">{accuracy}% accurate</span>
          </div>
        )}
      </div>

      {/* Streak */}
      <StreakBadge streak={streak} />

      {/* Result banner (shown after pick) */}
      {phase === 'reveal' && round.result && round.userPick && (
        <ResultBanner
          result={round.result}
          userPick={round.userPick}
          teamA={round.teamA}
          teamB={round.teamB}
          xpEarned={lastXp}
        />
      )}

      {/* Matchup header */}
      <div className="text-center text-dawg-silver/50 text-xs mb-3 uppercase tracking-widest">
        {phase === 'pick' ? 'Who wins this game?' : 'Final Result'}
      </div>

      {/* Team cards */}
      <div className="flex gap-3 mb-4">
        <TeamCard
          team={round.teamA}
          selected={round.userPick?.id === round.teamA.id}
          onClick={() => handlePick(round.teamA)}
          disabled={phase === 'reveal'}
          showRatings={phase === 'reveal'}
        />

        <div className="flex items-center justify-center">
          <span className="font-display font-bold text-dawg-silver/30 text-xl">VS</span>
        </div>

        <TeamCard
          team={round.teamB}
          selected={round.userPick?.id === round.teamB.id}
          onClick={() => handlePick(round.teamB)}
          disabled={phase === 'reveal'}
          showRatings={phase === 'reveal'}
        />
      </div>

      {/* Next round button */}
      {phase === 'reveal' && (
        <button
          onClick={handleNext}
          className="w-full bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold py-3.5 rounded-xl text-sm transition-colors mb-4"
        >
          Next Matchup →
        </button>
      )}

      {/* Code insight */}
      <CodeInsight
        teamA={round.teamA}
        teamB={round.teamB}
        result={round.result}
      />
    </div>
  );
}
