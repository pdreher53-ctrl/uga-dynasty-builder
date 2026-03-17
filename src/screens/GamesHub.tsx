// ═══════════════════════════════════════════════════════════════
// GAMES HUB — Gateway to all Dynasty Builder game modes
// ═══════════════════════════════════════════════════════════════
//
// This screen is the central command for all mini-games.
// Each card links to a game mode that also teaches a coding concept.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoomMascot } from '../components/BoomMascot';
import { calculateUgaRating } from '../data/gameData';

interface GameCard {
  path: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  tag: string;           // coding concept label
  accentColor: string;
  badge?: string;        // optional status badge
}

// All available game modes — add more here as we build them
const GAME_MODES: GameCard[] = [
  {
    path: '/pick-winner',
    title: 'Pick the Winner',
    subtitle: 'Mini-Game 1',
    description: 'Two teams. You pick who wins. The engine runs the numbers. Who\'s right?',
    icon: '🎯',
    tag: 'Variables & Conditionals',
    accentColor: '#22C55E',
  },
  {
    path: '/weekly-sim',
    title: 'Weekly Simulator',
    subtitle: 'Mini-Game 2',
    description: 'Simulate an entire week of SEC action. Watch all the games play out at once.',
    icon: '🔄',
    tag: 'Loops & Functions',
    accentColor: '#3B82F6',
  },
  {
    path: '/recruits',
    title: 'Recruiting Board',
    subtitle: 'Mini-Game 3',
    description: 'Filter, sort, and manage your prospect pipeline. Build the dynasty roster.',
    icon: '📋',
    tag: 'Data Structures',
    accentColor: '#F59E0B',
  },
  {
    path: '/coach-office',
    title: 'Coach\'s Office',
    subtitle: 'Mini-Game 4',
    description: 'Make two decisions each week that shape your team\'s ratings all season.',
    icon: '🏆',
    tag: 'State Management',
    accentColor: '#BA0C2F',
    badge: 'WEEKLY',
  },
  {
    path: '/dynasty-desk',
    title: 'Dynasty Desk',
    subtitle: 'Mini-Game 5',
    description: 'Your command center. Track ratings, win trends, and season momentum.',
    icon: '📊',
    tag: 'Data Visualization',
    accentColor: '#9B59B6',
  },
  {
    path: '/game',
    title: 'Season Simulator',
    subtitle: 'Full Season Mode',
    description: 'Play a full 14-game season. Pick your strategy. Earn XP. Win the title.',
    icon: '🏈',
    tag: 'Algorithms & Strategy',
    accentColor: '#BA0C2F',
  },
];

export function GamesHub({ totalXp }: { totalXp: number }) {
  const navigate = useNavigate();
  const ugaRating = calculateUgaRating(totalXp);

  return (
    <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-4xl mx-auto">

      {/* Header with Boom */}
      <div className="flex items-center gap-4 mb-5">
        <BoomMascot mood="happy" size={80} />
        <div className="flex-1">
          <div className="text-dawg-silver/50 text-[10px] uppercase tracking-widest mb-1">
            Dynasty Game Center
          </div>
          <h1 className="font-display font-extrabold text-2xl text-dawg-white leading-tight">
            Pick Your Game
          </h1>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-[10px] text-dawg-silver/50">Your Team Rating:</span>
            <span className="font-display font-bold text-dawg-gold text-base">{ugaRating}</span>
            <span className="text-[10px] text-dawg-silver/30">↑ earn XP to improve</span>
          </div>
        </div>
      </div>

      {/* Intro banner */}
      <div className="bg-dawg-charcoal border border-dawg-gold/20 rounded-xl p-3 mb-5 flex items-start gap-2">
        <span className="text-dawg-gold text-base shrink-0">💡</span>
        <p className="text-dawg-silver/80 text-xs leading-relaxed">
          Every game here is also secretly a <strong className="text-dawg-white">coding lesson</strong>.
          The more you play, the more programming patterns become second nature.
        </p>
      </div>

      {/* Game cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {GAME_MODES.map((game) => (
          <button
            key={game.path}
            onClick={() => navigate(game.path)}
            className="w-full text-left bg-dawg-charcoal hover:bg-dawg-slate/40 border border-dawg-slate hover:border-dawg-silver/20 rounded-xl p-4 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: `${game.accentColor}18`, border: `1px solid ${game.accentColor}30` }}
              >
                {game.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-display font-extrabold text-dawg-white text-sm">
                    {game.title}
                  </span>
                  {game.badge && (
                    <span className="text-[9px] font-bold bg-dawg-red/20 text-dawg-red px-1.5 py-0.5 rounded">
                      {game.badge}
                    </span>
                  )}
                </div>
                <p className="text-dawg-silver/60 text-xs leading-relaxed mb-2">
                  {game.description}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[9px] font-mono font-bold px-2 py-0.5 rounded"
                    style={{ color: game.accentColor, backgroundColor: `${game.accentColor}18` }}
                  >
                    {game.tag}
                  </span>
                  <span className="text-[10px] text-dawg-silver/30">{game.subtitle}</span>
                </div>
              </div>
              <span className="text-dawg-silver/20 group-hover:text-dawg-silver/50 text-xl transition-colors ml-1">›</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
