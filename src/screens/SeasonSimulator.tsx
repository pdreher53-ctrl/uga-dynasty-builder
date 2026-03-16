import React, { useState, useEffect, useRef } from 'react';
import { BoomMascot, BoomMood } from '../components/BoomMascot';
import { useSeasonGame } from '../hooks/useSeasonGame';
import { strategies, Strategy, PlayEvent, calculateUgaRating } from '../data/gameData';

// ── Sub-components ─────────────────────────────────────────────

function Scoreboard({
  ugaScore,
  oppScore,
  opponent,
  quarter,
}: {
  ugaScore: number;
  oppScore: number;
  opponent: string;
  quarter: number;
}) {
  return (
    <div className="bg-dawg-black border border-dawg-slate rounded-xl p-4 mb-4">
      <div className="text-dawg-silver/50 text-[10px] text-center uppercase tracking-widest mb-2">
        Q{Math.min(quarter, 4)} · Sanford Stadium
      </div>
      <div className="flex items-center justify-around">
        <div className="text-center">
          <div className="text-dawg-red font-display font-extrabold text-xs mb-1">UGA</div>
          <div className="font-display font-extrabold text-4xl text-dawg-white">{ugaScore}</div>
        </div>
        <div className="text-dawg-silver/30 font-display font-bold text-xl">VS</div>
        <div className="text-center">
          <div className="text-dawg-silver font-display font-extrabold text-xs mb-1">{opponent.toUpperCase()}</div>
          <div className="font-display font-extrabold text-4xl text-dawg-white">{oppScore}</div>
        </div>
      </div>
    </div>
  );
}

function StrategyCard({
  strategy,
  onSelect,
  disabled,
}: {
  strategy: Strategy;
  onSelect: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className="w-full text-left bg-dawg-charcoal hover:bg-dawg-slate/40 border border-dawg-slate hover:border-dawg-silver/30 rounded-xl p-4 transition-all disabled:opacity-50"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{strategy.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-dawg-white text-sm">{strategy.name}</span>
            <span className="text-[9px] font-mono bg-dawg-black px-2 py-0.5 rounded text-green-400">
              {strategy.codingConcept}
            </span>
          </div>
          <p className="text-dawg-silver/70 text-xs mt-1 leading-relaxed">{strategy.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] text-dawg-gold">+{strategy.bonus} Rating</span>
            <span className="text-[10px] text-dawg-silver/50">
              Variance: {'█'.repeat(Math.round(strategy.variance * 5))}{'░'.repeat(5 - Math.round(strategy.variance * 5))}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ── Main Screen ─────────────────────────────────────────────────

export function SeasonSimulator({
  totalXp,
  onEarnXp,
}: {
  totalXp: number;
  onEarnXp: (id: string, xp: number) => void;
}) {
  const { season, ugaRating, record, startPregame, playGame, advanceWeek, resetSeason } =
    useSeasonGame(totalXp, onEarnXp);

  const [boomMood, setBoomMood] = useState<BoomMood>('idle');
  const [visiblePlays, setVisiblePlays] = useState<PlayEvent[]>([]);
  const [simRunning, setSimRunning] = useState(false);
  const [currentUgaScore, setCurrentUgaScore] = useState(0);
  const [currentOppScore, setCurrentOppScore] = useState(0);
  const [currentQuarter, setCurrentQuarter] = useState(1);
  const playsRef = useRef<HTMLDivElement>(null);

  const { phase, schedule, currentWeek, lastResult } = season;
  const currentMatchup = schedule[currentWeek - 1];

  // Run the play-by-play simulation animation
  useEffect(() => {
    if (phase !== 'simulating' || !lastResult) return;
    setVisiblePlays([]);
    setCurrentUgaScore(0);
    setCurrentOppScore(0);
    setCurrentQuarter(1);
    setSimRunning(true);
    setBoomMood('thinking');

    let runningUga = 0;
    let runningOpp = 0;

    lastResult.plays.forEach((play, i) => {
      setTimeout(() => {
        runningUga += play.ugaPoints;
        runningOpp += play.oppPoints;
        setCurrentUgaScore(runningUga);
        setCurrentOppScore(runningOpp);
        setCurrentQuarter(play.quarter);
        setVisiblePlays((prev) => [...prev, play]);

        // Mood updates
        if (play.mood === 'big') setBoomMood('celebrate');
        else if (play.mood === 'positive') setBoomMood('happy');
        else if (play.mood === 'negative') setBoomMood('sad');
        else setBoomMood('thinking');

        // Scroll plays into view
        if (playsRef.current) {
          playsRef.current.scrollTop = playsRef.current.scrollHeight;
        }

        // Final play
        if (i === lastResult.plays.length - 1) {
          setTimeout(() => {
            setSimRunning(false);
            setBoomMood(lastResult.won ? 'celebrate' : 'sad');
          }, 800);
        }
      }, i * 900);
    });
  }, [phase, lastResult]);

  // ── SCHEDULE VIEW ──────────────────────────────────────────
  if (phase === 'schedule') {
    const isSeasonComplete = currentWeek > 14;
    return (
      <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <BoomMascot mood={record.l === 0 && record.w > 0 ? 'celebrate' : 'idle'} size={80} />
          <div className="flex-1">
            <div className="text-dawg-silver/60 text-[10px] uppercase tracking-widest">UGA Dynasty — {season.year}</div>
            <div className="font-display font-extrabold text-2xl text-dawg-white leading-tight">
              Season Record
            </div>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-display font-bold text-green-400 text-xl">{record.w}W</span>
              <span className="text-dawg-silver/40">–</span>
              <span className="font-display font-bold text-red-400 text-xl">{record.l}L</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-dawg-silver/50 text-[10px]">Your Rating</div>
            <div className="font-display font-extrabold text-dawg-gold text-3xl">{ugaRating}</div>
            <div className="text-[9px] text-dawg-silver/40">↑ from XP</div>
          </div>
        </div>

        {/* XP bonus callout */}
        <div className="bg-dawg-charcoal/60 border border-dawg-gold/20 rounded-lg p-3 mb-4 flex items-center gap-2">
          <span className="text-dawg-gold text-lg">💡</span>
          <p className="text-dawg-silver/80 text-xs">
            Your rating (<strong className="text-dawg-gold">{ugaRating}</strong>) scales with learning XP.
            Complete courses and drills to level up your team!
          </p>
        </div>

        {/* Schedule */}
        <div className="space-y-2">
          {schedule.map((matchup, i) => {
            const weekNum = i + 1;
            const isCurrent = weekNum === currentWeek;
            const isPast = weekNum < currentWeek;
            const isFuture = weekNum > currentWeek;
            const won = matchup.result?.won;

            return (
              <div
                key={weekNum}
                className={`rounded-xl p-3 border transition-all ${
                  isCurrent
                    ? 'bg-dawg-red/10 border-dawg-red'
                    : isPast && won
                    ? 'bg-green-900/15 border-green-800/30'
                    : isPast && !won
                    ? 'bg-red-900/15 border-red-900/30'
                    : 'bg-dawg-charcoal border-dawg-slate'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 text-center text-[10px] text-dawg-silver/50 font-mono">W{weekNum}</div>
                  <span className="text-xl">{matchup.opponent.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-display font-bold text-sm ${isCurrent ? 'text-dawg-white' : isPast ? 'text-dawg-silver/70' : 'text-dawg-silver/50'}`}>
                        {matchup.opponent.name}
                      </span>
                      {matchup.opponent.isRival && (
                        <span className="text-[9px] bg-dawg-red/20 text-dawg-red px-1.5 py-0.5 rounded font-bold">RIVAL</span>
                      )}
                    </div>
                    <div className="text-[10px] text-dawg-silver/40 capitalize">
                      {matchup.venue} · Opp rating: {matchup.opponent.rating}
                    </div>
                  </div>
                  <div className="text-right">
                    {isPast && matchup.result && (
                      <div>
                        <div className={`font-display font-bold text-sm ${won ? 'text-green-400' : 'text-red-400'}`}>
                          {won ? 'W' : 'L'} {matchup.result.ugaScore}–{matchup.result.oppScore}
                        </div>
                      </div>
                    )}
                    {isCurrent && (
                      <button
                        onClick={startPregame}
                        className="bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Play ▶
                      </button>
                    )}
                    {isFuture && (
                      <span className="text-dawg-silver/30 text-xs">Upcoming</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset button */}
        <button
          onClick={resetSeason}
          className="w-full mt-5 py-2.5 text-dawg-silver/40 hover:text-dawg-silver text-xs transition-colors border border-dawg-slate/30 rounded-lg"
        >
          Reset Season
        </button>
      </div>
    );
  }

  // ── PREGAME VIEW ───────────────────────────────────────────
  if (phase === 'pregame' && currentMatchup) {
    const advantageText =
      ugaRating > currentMatchup.opponent.rating + 5
        ? '🟢 Favorable Matchup'
        : ugaRating < currentMatchup.opponent.rating - 5
        ? '🔴 Tough Matchup'
        : '🟡 Even Game';

    return (
      <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-2xl mx-auto">
        {/* Matchup header */}
        <div className="text-center mb-6">
          <div className="text-dawg-silver/50 text-[10px] uppercase tracking-widest mb-2">
            Week {currentWeek} · {currentMatchup.venue === 'home' ? '🏟️ Home' : currentMatchup.venue === 'away' ? '✈️ Away' : '🏟️ Neutral Site'}
          </div>
          <div className="flex items-center justify-center gap-6 mb-3">
            <div className="text-center">
              <div className="text-4xl mb-1">🐾</div>
              <div className="font-display font-extrabold text-dawg-red text-lg">UGA</div>
              <div className="text-dawg-gold font-bold text-xl">{ugaRating}</div>
            </div>
            <div className="font-display text-dawg-silver/40 text-2xl font-bold">VS</div>
            <div className="text-center">
              <div className="text-4xl mb-1">{currentMatchup.opponent.emoji}</div>
              <div className="font-display font-extrabold text-dawg-white text-lg">{currentMatchup.opponent.abbreviation}</div>
              <div className="text-dawg-silver font-bold text-xl">{currentMatchup.opponent.rating}</div>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-dawg-charcoal text-dawg-silver border border-dawg-slate">
            {advantageText}
          </span>
        </div>

        {/* Boom in pregame mode */}
        <div className="flex justify-center mb-6">
          <BoomMascot mood="thinking" size={120} showSpeech />
        </div>

        {/* Strategy selection */}
        <div className="mb-3">
          <p className="text-dawg-white font-display font-bold text-sm mb-1">Choose Your Game Plan</p>
          <p className="text-dawg-silver/60 text-xs mb-4">
            Each strategy is a coding concept — master the code, win the game.
          </p>
        </div>
        <div className="space-y-3">
          {strategies.map((s) => (
            <StrategyCard
              key={s.id}
              strategy={s}
              onSelect={() => playGame(s)}
              disabled={false}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── SIMULATION VIEW ────────────────────────────────────────
  if ((phase === 'simulating' || (phase === 'result' && simRunning)) && currentMatchup) {
    return (
      <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-2xl mx-auto">
        <Scoreboard
          ugaScore={currentUgaScore}
          oppScore={currentOppScore}
          opponent={currentMatchup.opponent.abbreviation}
          quarter={currentQuarter}
        />

        {/* Boom reacting */}
        <div className="flex justify-center mb-4">
          <BoomMascot mood={boomMood} size={110} showSpeech />
        </div>

        {/* Play-by-play */}
        <div
          ref={playsRef}
          className="bg-dawg-charcoal rounded-xl p-4 space-y-2 max-h-64 overflow-y-auto"
        >
          {visiblePlays.length === 0 && (
            <p className="text-dawg-silver/50 text-sm text-center py-4">Kickoff incoming...</p>
          )}
          {visiblePlays.map((play) => (
            <div
              key={play.id}
              className={`play-entry flex items-start gap-2 text-sm ${
                play.mood === 'big'
                  ? 'text-dawg-gold font-bold'
                  : play.mood === 'positive'
                  ? 'text-green-400'
                  : play.mood === 'negative'
                  ? 'text-red-400'
                  : 'text-dawg-silver/70'
              }`}
            >
              <span className="text-[10px] text-dawg-silver/30 mt-0.5 shrink-0 font-mono">Q{play.quarter}</span>
              <span className="leading-snug">{play.description}</span>
              {play.ugaPoints > 0 && (
                <span className="shrink-0 text-green-400 font-bold">+{play.ugaPoints}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── RESULT VIEW ────────────────────────────────────────────
  if (phase === 'result' && lastResult && currentMatchup && !simRunning) {
    const { ugaScore, oppScore, won, mvpPlay, xpEarned, strategyUsed } = lastResult;
    return (
      <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-2xl mx-auto text-center">
        <BoomMascot mood={won ? 'celebrate' : 'sad'} size={140} showSpeech className="mx-auto mb-4" />

        {/* Final score */}
        <div className="bg-dawg-charcoal rounded-2xl p-6 mb-5">
          <div className="text-dawg-silver/50 text-[10px] uppercase tracking-widest mb-3">Final Score</div>
          <div className={`font-display font-extrabold text-5xl mb-1 ${won ? 'text-green-400' : 'text-red-400'}`}>
            {won ? 'WIN! 🎉' : 'LOSS 😓'}
          </div>
          <div className="font-display font-bold text-dawg-white text-2xl mb-3">
            UGA {ugaScore} – {currentMatchup.opponent.abbreviation} {oppScore}
          </div>
          <div className="text-dawg-silver/70 text-sm italic mb-4">{mvpPlay}</div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-dawg-silver/50 text-xs">Strategy:</span>
            <span className="bg-dawg-black px-2 py-0.5 rounded text-dawg-gold text-xs font-mono">{strategyUsed}</span>
          </div>
        </div>

        {/* XP earned */}
        <div className={`rounded-xl p-4 mb-5 ${won ? 'bg-green-900/20 border border-green-700/30' : 'bg-dawg-charcoal border border-dawg-slate'}`}>
          <div className="font-display font-extrabold text-dawg-gold text-2xl">+{xpEarned} XP</div>
          <div className="text-dawg-silver/60 text-xs mt-1">
            {won ? 'Victory bonus! Keep learning to dominate all season.' : 'Study more courses to level up your team rating.'}
          </div>
        </div>

        <button
          onClick={advanceWeek}
          className="w-full bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold py-3.5 rounded-xl text-sm transition-colors"
        >
          {currentWeek < 14 ? `Next: Week ${currentWeek + 1} →` : 'See Season Results →'}
        </button>
      </div>
    );
  }

  // ── SEASON COMPLETE ────────────────────────────────────────
  if (phase === 'complete' && lastResult) {
    const { won, ugaScore, oppScore } = lastResult;
    const isChamp = won && record.w >= 13;
    return (
      <div className="px-4 py-8 pb-24 lg:pb-6 max-w-lg lg:max-w-2xl mx-auto text-center">
        <BoomMascot mood={isChamp ? 'celebrate' : 'happy'} size={160} showSpeech className="mx-auto mb-5" />
        <div className="font-display font-extrabold text-4xl text-dawg-white mb-2">
          {isChamp ? '🏆 NATIONAL CHAMPIONS!' : 'Season Complete'}
        </div>
        <div className="text-2xl text-dawg-gold font-display font-bold mb-1">
          {record.w}W – {record.l}L
        </div>
        <div className="text-dawg-silver text-sm mb-6">
          Championship: UGA {ugaScore} – {schedule[13]?.opponent.abbreviation} {oppScore}
        </div>
        <p className="text-dawg-silver/70 text-sm mb-8 max-w-sm mx-auto">
          {isChamp
            ? 'Unbelievable! You built a dynasty. Keep learning to defend the title next year!'
            : 'Great season. More XP from courses = higher team rating = more wins next year!'}
        </p>
        <button
          onClick={resetSeason}
          className="w-full bg-dawg-red hover:bg-dawg-darkred text-white font-display font-bold py-3.5 rounded-xl text-sm transition-colors mb-3"
        >
          Start New Season
        </button>
      </div>
    );
  }

  return null;
}
