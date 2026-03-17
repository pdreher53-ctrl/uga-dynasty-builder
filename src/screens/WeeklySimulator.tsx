// ═══════════════════════════════════════════════════════════════
// WEEKLY SIMULATOR — Mini-Game 2
// ═══════════════════════════════════════════════════════════════
//
// WHAT YOU DO: See a full week of SEC games. Hit simulate. Watch all
// games resolve in sequence. UGA's game is featured at the top.
//
// CODING CONCEPT: Loops & Functions
// - The simulation runs a LOOP over an array of games
// - Each game calls the same simulateMatchup FUNCTION
// - This is exactly how a real sports simulation engine works:
//   for (const game of weekGames) { simulate(game); }
//
// WHY IT MATTERS: Loops + functions are the backbone of all automation.
// Every time you "batch process" something — emails, reports, API calls —
// you're using the same pattern as this simulator.

import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SecTeam,
  WeekGame,
  buildWeekGames,
  simulateMatchup,
} from '../data/secTeams';
import { opponents } from '../data/gameData'; // UGA's actual schedule opponents

// Map week numbers to their UGA opponent IDs (from the Season Simulator schedule)
const UGA_SCHEDULE: Record<number, string> = {
  1:  'tennessee',
  2:  'southcarolina',
  3:  'kentucky',
  4:  'auburn',
  5:  'vanderbilt',
  6:  'olemiss',
  7:  'florida',
  8:  'missstate',
  9:  'texasam',
  10: 'lsu',
  11: 'alabama',
  12: 'georgiatech',
  13: 'ohiostate',
  14: 'michigan',
};

// ── Sub-components ────────────────────────────────────────────────

// One game row — compact before sim, expanded with result after
function GameRow({
  game,
  isRevealed,
  delay,
}: {
  game: WeekGame;
  isRevealed: boolean;
  delay: number;
}) {
  const ugaWon = game.isUgaGame && game.result?.winner.id === 'uga';
  const ugaLost = game.isUgaGame && game.result && game.result.winner.id !== 'uga';

  return (
    <div
      className={`rounded-xl border p-3 transition-all duration-500 ${
        game.isUgaGame
          ? ugaWon
            ? 'bg-green-900/15 border-green-700/40'
            : ugaLost
            ? 'bg-red-900/15 border-red-900/40'
            : 'bg-dawg-red/10 border-dawg-red/40'
          : 'bg-dawg-charcoal border-dawg-slate'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        {/* UGA indicator */}
        {game.isUgaGame && (
          <span className="text-[9px] font-bold text-dawg-red shrink-0">UGA</span>
        )}

        {/* Home team */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="text-base">{game.home.emoji}</span>
          <span className={`font-display font-bold text-xs truncate ${
            game.result?.winner.id === game.home.id ? 'text-dawg-white' : 'text-dawg-silver/60'
          }`}>
            {game.home.abbreviation}
          </span>
          <span className="text-[10px] text-dawg-silver/30 hidden sm:block">{game.home.rating}</span>
        </div>

        {/* Score or VS */}
        <div className="text-center shrink-0 w-20">
          {isRevealed && game.result ? (
            <div className="font-display font-bold text-xs">
              <span className={game.result.winner.id === game.home.id ? 'text-dawg-white' : 'text-dawg-silver/50'}>
                {game.result.homeScore}
              </span>
              <span className="text-dawg-silver/30 mx-1">–</span>
              <span className={game.result.winner.id === game.away.id ? 'text-dawg-white' : 'text-dawg-silver/50'}>
                {game.result.awayScore}
              </span>
            </div>
          ) : (
            <span className="text-dawg-silver/30 text-xs font-display font-bold">VS</span>
          )}
          {isRevealed && game.result?.dominance === 'blowout' && (
            <div className="text-[9px] text-dawg-gold">💥 Blowout</div>
          )}
        </div>

        {/* Away team */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
          <span className="text-[10px] text-dawg-silver/30 hidden sm:block">{game.away.rating}</span>
          <span className={`font-display font-bold text-xs truncate ${
            game.result?.winner.id === game.away.id ? 'text-dawg-white' : 'text-dawg-silver/60'
          }`}>
            {game.away.abbreviation}
          </span>
          <span className="text-base">{game.away.emoji}</span>
        </div>

        {/* Upset badge */}
        {isRevealed && game.result?.wasUpset === true && (
          <span className="text-[9px] font-bold text-orange-400 bg-orange-900/20 px-1.5 py-0.5 rounded shrink-0">
            UPSET
          </span>
        )}
      </div>
    </div>
  );
}

// Code insight panel — the loop shown in pseudocode
function LoopInsight({ weekGames, simCount }: { weekGames: WeekGame[]; simCount: number }) {
  return (
    <div className="bg-dawg-black border border-dawg-slate rounded-xl p-4">
      <div className="text-[10px] uppercase tracking-wider text-dawg-gold font-bold mb-2">
        🔍 Under the Hood — Loops & Functions
      </div>
      <pre className="text-xs font-mono text-green-400 leading-relaxed overflow-x-auto">
{`// An array of this week's games
const weekGames = [...]; // ${weekGames.length} games

// LOOP: iterate over every game
for (const game of weekGames) {

  // FUNCTION CALL: same logic, different inputs
  const result = simulateMatchup(
    game.home,  // rating: ${weekGames[0]?.home.rating ?? '??'}
    game.away   // rating: ${weekGames[0]?.away.rating ?? '??'}
  );

  // Store the result back on the game object
  game.result = result;
}

// ${simCount} game${simCount !== 1 ? 's' : ''} simulated so far this session`}
      </pre>
    </div>
  );
}

// ── Main Screen ───────────────────────────────────────────────────

export function WeeklySimulator({
  onEarnXp,
}: {
  onEarnXp: (id: string, xp: number) => void;
}) {
  const navigate = useNavigate();

  // Which week are we simulating? Defaults to a random week 1–12
  const [selectedWeek, setSelectedWeek] = useState(
    () => Math.floor(Math.random() * 12) + 1
  );

  // The games for this week — built from the schedule
  const [weekGames, setWeekGames] = useState<WeekGame[]>(() =>
    buildWeekGames(UGA_SCHEDULE[1] ?? 'tennessee', 1)
  );

  const [revealedCount, setRevealedCount] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simCount, setSimCount] = useState(0);  // total games simulated
  const [weekXpEarned, setWeekXpEarned] = useState(0);
  const simRef = useRef(false);

  // Rebuild games when week changes
  const handleWeekChange = useCallback((week: number) => {
    setSelectedWeek(week);
    const ugaOpp = UGA_SCHEDULE[week] ?? 'tennessee';
    setWeekGames(buildWeekGames(ugaOpp, week));
    setRevealedCount(0);
    setIsSimulating(false);
    setWeekXpEarned(0);
    simRef.current = false;
  }, []);

  // Simulate all games — reveal them one by one with a short delay
  // CODING CONCEPT: This is exactly a for-loop running over an array
  const handleSimulate = useCallback(() => {
    if (isSimulating || revealedCount > 0) return;
    setIsSimulating(true);
    simRef.current = true;

    // Run all simulations first (compute the results)
    const simmedGames: WeekGame[] = weekGames.map(game => {
      const result = simulateMatchup(game.home, game.away);
      return {
        ...game,
        result: {
          winner: result.winner,
          loser: result.loser,
          homeScore: result.winner.id === game.home.id ? result.winScore : result.lossScore,
          awayScore: result.winner.id === game.away.id ? result.winScore : result.lossScore,
          dominance: result.dominance,
          wasUpset: result.wasUpset,
        },
      };
    });

    // Then reveal them one at a time for dramatic effect
    // Each reveal is a loop iteration made visible
    simmedGames.forEach((_game, i) => {
      setTimeout(() => {
        // Show the first i+1 simulated games, rest still unresolved
        setWeekGames([
          ...simmedGames.slice(0, i + 1),
          ...weekGames.slice(i + 1),
        ]);
        setRevealedCount(i + 1);
        setSimCount(prev => prev + 1);

        if (i === simmedGames.length - 1) {
          setIsSimulating(false);
          // XP: 25 base + 15 per game (5 games = 100 XP)
          const xp = 25 + simmedGames.length * 15;
          setWeekXpEarned(xp);
          onEarnXp(`weekly-sim-w${selectedWeek}`, xp);
        }
      }, i * 600); // 600ms between each reveal = loop animation
    });
  }, [isSimulating, revealedCount, weekGames, selectedWeek, onEarnXp]);

  const ugaGame = weekGames.find(g => g.isUgaGame);
  const ugaResult = ugaGame?.result;
  const ugaWon = ugaResult?.winner.id === 'uga';
  const allRevealed = revealedCount === weekGames.length;

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
          Mini-Game 2 · Loops & Functions
        </div>
        <h1 className="font-display font-extrabold text-2xl text-dawg-white">
          Weekly Simulator
        </h1>
      </div>

      {/* Week selector */}
      <div className="mb-4">
        <div className="text-dawg-silver/50 text-[10px] uppercase tracking-wider mb-2">
          Select Week
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {Array.from({ length: 14 }, (_, i) => i + 1).map(w => (
            <button
              key={w}
              onClick={() => handleWeekChange(w)}
              className={`shrink-0 w-9 h-9 rounded-lg text-xs font-display font-bold transition-colors ${
                selectedWeek === w
                  ? 'bg-dawg-red text-white'
                  : 'bg-dawg-charcoal text-dawg-silver hover:bg-dawg-slate'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* UGA matchup spotlight */}
      {ugaGame && (
        <div className="bg-dawg-red/10 border border-dawg-red/30 rounded-xl p-3 mb-4">
          <div className="text-[10px] text-dawg-red uppercase tracking-wider font-bold mb-2">
            UGA Spotlight · Week {selectedWeek}
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="text-2xl">🐾</div>
              <div className="font-display font-extrabold text-dawg-white text-base">UGA</div>
              <div className="text-dawg-gold font-bold text-lg">{ugaGame.home.id === 'uga' ? ugaGame.home.rating : ugaGame.away.rating}</div>
            </div>
            <div className="text-dawg-silver/30 font-display font-bold">VS</div>
            <div className="text-center">
              <div className="text-2xl">{ugaGame.home.id === 'uga' ? ugaGame.away.emoji : ugaGame.home.emoji}</div>
              <div className="font-display font-extrabold text-dawg-white text-base">
                {ugaGame.home.id === 'uga' ? ugaGame.away.abbreviation : ugaGame.home.abbreviation}
              </div>
              <div className="text-dawg-silver font-bold text-lg">
                {ugaGame.home.id === 'uga' ? ugaGame.away.rating : ugaGame.home.rating}
              </div>
            </div>
          </div>
          {ugaResult && (
            <div className={`text-center mt-3 font-display font-extrabold text-xl ${ugaWon ? 'text-green-400' : 'text-red-400'}`}>
              {ugaWon ? `W ${ugaResult.homeScore}–${ugaResult.awayScore} 🐾` : `L ${ugaResult.homeScore}–${ugaResult.awayScore} 😓`}
            </div>
          )}
        </div>
      )}

      {/* Simulate button */}
      <button
        onClick={handleSimulate}
        disabled={isSimulating || revealedCount > 0}
        className={`w-full font-display font-bold py-3.5 rounded-xl text-sm transition-all mb-4 ${
          revealedCount > 0
            ? 'bg-dawg-slate text-dawg-silver/40 cursor-default'
            : 'bg-dawg-red hover:bg-dawg-darkred text-white'
        }`}
      >
        {isSimulating
          ? `Simulating... (${revealedCount}/${weekGames.length})`
          : revealedCount > 0
          ? `Week ${selectedWeek} Complete`
          : `▶ Simulate Week ${selectedWeek}`}
      </button>

      {/* XP earned this week */}
      {weekXpEarned > 0 && (
        <div className="bg-dawg-gold/10 border border-dawg-gold/30 rounded-xl p-3 mb-4 text-center">
          <span className="font-display font-bold text-dawg-gold text-xl">+{weekXpEarned} XP</span>
          <span className="text-dawg-silver/60 text-xs ml-2">earned this simulation</span>
        </div>
      )}

      {/* Game list */}
      <div className="space-y-2 mb-5">
        <div className="text-dawg-silver/50 text-[10px] uppercase tracking-wider mb-1">
          Week {selectedWeek} · All Games
        </div>
        {weekGames.map((game, i) => (
          <GameRow
            key={game.id}
            game={game}
            isRevealed={i < revealedCount}
            delay={i * 100}
          />
        ))}
      </div>

      {/* Simulate another week button */}
      {allRevealed && (
        <button
          onClick={() => {
            const next = selectedWeek < 14 ? selectedWeek + 1 : 1;
            handleWeekChange(next);
          }}
          className="w-full bg-dawg-charcoal hover:bg-dawg-slate border border-dawg-slate text-dawg-white font-display font-bold py-3 rounded-xl text-sm transition-colors mb-4"
        >
          Next Week →
        </button>
      )}

      {/* Code insight */}
      <LoopInsight weekGames={weekGames} simCount={simCount} />
    </div>
  );
}
