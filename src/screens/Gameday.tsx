import React, { useState } from 'react';
import { QBChallenge } from '../components/games/QBChallenge';
import { RouteRunner } from '../components/games/RouteRunner';
import { PlaybookDecoder } from '../components/games/PlaybookDecoder';
import { BoomCompanion, KirbyTip } from '../components/BoomMascot';
import { secSchools, getRandomRival } from '../data/secSchools';

type GameMode = null | 'qb-challenge' | 'route-runner' | 'playbook-decoder';

export function Gameday({
  totalXp,
  onEarnXp,
}: {
  totalXp: number;
  onEarnXp: (xp: number) => void;
}) {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [rival] = useState(getRandomRival);
  const uga = secSchools.find((s) => s.id === 'uga')!;

  const handleGameComplete = (score: number) => {
    setLastScore(score);
    onEarnXp(score);
  };

  if (gameMode === 'qb-challenge') {
    return (
      <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
        <button
          onClick={() => { setGameMode(null); setLastScore(null); }}
          className="text-dawg-silver text-sm mb-4"
        >
          ← Back to Gameday
        </button>
        <QBChallenge onComplete={handleGameComplete} />
      </div>
    );
  }

  if (gameMode === 'route-runner') {
    return (
      <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
        <button
          onClick={() => { setGameMode(null); setLastScore(null); }}
          className="text-dawg-silver text-sm mb-4"
        >
          ← Back to Gameday
        </button>
        <RouteRunner onComplete={handleGameComplete} />
      </div>
    );
  }

  if (gameMode === 'playbook-decoder') {
    return (
      <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
        <button
          onClick={() => { setGameMode(null); setLastScore(null); }}
          className="text-dawg-silver text-sm mb-4"
        >
          ← Back to Gameday
        </button>
        <PlaybookDecoder onComplete={handleGameComplete} />
      </div>
    );
  }

  return (
    <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
      {/* Sanford Stadium banner */}
      <div className="bg-gradient-to-b from-dawg-red to-dawg-darkred rounded-xl p-5 mb-5 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.3) 39px, rgba(255,255,255,0.3) 40px)',
        }} />
        <div className="relative">
          <p className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-1">
            Between the Hedges at
          </p>
          <h2 className="font-display font-extrabold text-2xl text-white">
            SANFORD STADIUM
          </h2>
          <p className="text-white/60 text-xs mt-1">
            Capacity: 92,746 • Athens, GA
          </p>

          {/* Matchup */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="text-center">
              <div className="text-3xl">{uga.emoji}</div>
              <div className="text-white font-display font-bold text-sm mt-1">
                UGA
              </div>
            </div>
            <div className="text-white/40 font-display font-bold text-lg">
              VS
            </div>
            <div className="text-center">
              <div className="text-3xl">{rival.emoji}</div>
              <div className="text-white font-display font-bold text-sm mt-1">
                {rival.name}
              </div>
            </div>
          </div>
          <p className="text-dawg-gold text-xs mt-2">
            Today's recruiting battle vs the {rival.mascot}!
          </p>
        </div>
      </div>

      {/* Boom greeting */}
      <div className="mb-5">
        <BoomCompanion
          mood="excited"
          message="It's GAMEDAY, Coach! Pick a challenge and earn XP for the Dawgs!"
          size="md"
        />
      </div>

      {/* Mini-games */}
      <h3 className="font-display font-bold text-dawg-white mb-3">
        Choose Your Game
      </h3>

      <div className="space-y-3 mb-5">
        {/* QB Challenge */}
        <button
          onClick={() => setGameMode('qb-challenge')}
          className="w-full bg-dawg-charcoal rounded-xl p-4 text-left hover:bg-dawg-slate transition-colors"
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl">🏈</span>
            <div className="flex-1">
              <h4 className="font-display font-bold text-dawg-white">
                QB Challenge
              </h4>
              <p className="text-dawg-silver text-xs mt-0.5">
                Throw passes to the right receiver by answering code questions
                before time runs out!
              </p>
              <div className="flex gap-2 mt-2">
                <span className="bg-dawg-red/20 text-dawg-red px-2 py-0.5 rounded text-[10px] font-medium">
                  Timed
                </span>
                <span className="bg-dawg-gold/20 text-dawg-gold px-2 py-0.5 rounded text-[10px] font-medium">
                  Canvas Game
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Route Runner */}
        <button
          onClick={() => setGameMode('route-runner')}
          className="w-full bg-dawg-charcoal rounded-xl p-4 text-left hover:bg-dawg-slate transition-colors"
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl">🏃</span>
            <div className="flex-1">
              <h4 className="font-display font-bold text-dawg-white">
                Route Runner
              </h4>
              <p className="text-dawg-silver text-xs mt-0.5">
                Run routes on the field! Each correct answer advances your route
                toward the end zone.
              </p>
              <div className="flex gap-2 mt-2">
                <span className="bg-green-900/30 text-green-400 px-2 py-0.5 rounded text-[10px] font-medium">
                  Visual
                </span>
                <span className="bg-dawg-gold/20 text-dawg-gold px-2 py-0.5 rounded text-[10px] font-medium">
                  Canvas Game
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Playbook Decoder */}
        <button
          onClick={() => setGameMode('playbook-decoder')}
          className="w-full bg-dawg-charcoal rounded-xl p-4 text-left hover:bg-dawg-slate transition-colors"
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl">📖</span>
            <div className="flex-1">
              <h4 className="font-display font-bold text-dawg-white">
                Playbook Decoder
              </h4>
              <p className="text-dawg-silver text-xs mt-0.5">
                Read code snippets and predict the output — decode the playbook
                like a coordinator!
              </p>
              <div className="flex gap-2 mt-2">
                <span className="bg-purple-900/30 text-purple-400 px-2 py-0.5 rounded text-[10px] font-medium">
                  Code Reading
                </span>
                <span className="bg-dawg-gold/20 text-dawg-gold px-2 py-0.5 rounded text-[10px] font-medium">
                  Streak Bonus
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* SEC Scoreboard */}
      <div className="bg-dawg-charcoal rounded-xl p-4 mb-5">
        <h3 className="font-display font-bold text-dawg-white mb-3">
          SEC Recruiting Scoreboard
        </h3>
        <div className="space-y-2">
          {secSchools
            .sort((a, b) => b.recruitingPower - a.recruitingPower)
            .slice(0, 8)
            .map((school, i) => (
              <div
                key={school.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                  school.id === 'uga' ? 'bg-dawg-red/10 border border-dawg-red/30' : ''
                }`}
              >
                <span className="text-dawg-silver/50 text-xs w-4 font-mono">
                  {i + 1}.
                </span>
                <span className="text-lg">{school.emoji}</span>
                <span
                  className={`text-sm font-medium flex-1 ${
                    school.id === 'uga' ? 'text-dawg-white font-bold' : 'text-dawg-silver'
                  }`}
                >
                  {school.name} {school.mascot}
                </span>
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${school.recruitingPower * 0.6}px`,
                    backgroundColor: school.primaryColor,
                  }}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Kirby coaching tip */}
      <KirbyTip />
    </div>
  );
}
