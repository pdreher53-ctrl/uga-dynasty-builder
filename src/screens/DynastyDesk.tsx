// ═══════════════════════════════════════════════════════════════
// DYNASTY DESK — Mini-Game 5
// ═══════════════════════════════════════════════════════════════
//
// WHAT YOU DO: See your full dynasty at a glance. Track how your
// ratings have evolved. View your win/loss history. See trends.
// Understand what the data is telling you.
//
// CODING CONCEPT: Data Visualization
// Raw numbers don't tell stories — charts do. This screen transforms
// arrays of numbers into visual bars, trend lines, and insight panels.
// Every chart library (D3, Recharts, Chart.js) does this at its core:
// it takes a data array and maps each item to pixels on screen.
//
// WHY IT MATTERS: Data visualization is the bridge between data
// engineers and decision-makers. If you can build a dashboard,
// you can communicate insights that actually drive action.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDynastyState } from '../hooks/useDynastyState';
import { COACH_ACTIONS, getMoraleLabel, calcOverall, WeekRecord } from '../data/dynastyState';
import { calculateUgaRating } from '../data/gameData';
import { BoomMascot } from '../components/BoomMascot';

// ── Chart primitives (pure CSS — no library needed) ───────────────

// A single bar in a bar chart
function ChartBar({
  value, max, color, label, sublabel,
}: {
  value: number; max: number; color: string; label: string; sublabel?: string;
}) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-[10px] text-dawg-white font-bold">{value > 0 ? value : ''}</div>
      <div className="h-20 w-7 bg-dawg-black rounded-t flex items-end overflow-hidden">
        <div
          className="w-full rounded-t transition-all duration-700"
          style={{ height: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <div className="text-[9px] text-dawg-silver/50 text-center leading-tight">{label}</div>
      {sublabel && <div className="text-[8px] text-dawg-silver/30">{sublabel}</div>}
    </div>
  );
}

// Horizontal gauge bar (60–99 range)
function StatGauge({
  label, value, color, icon,
}: {
  label: string; value: number; color: string; icon: string;
}) {
  const pct = ((value - 60) / 39) * 100;
  const tier =
    value >= 90 ? 'Elite' :
    value >= 82 ? 'Great' :
    value >= 74 ? 'Good' :
    value >= 66 ? 'Average' : 'Weak';

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-base">{icon}</span>
          <span className="text-xs text-dawg-silver/80">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px]" style={{ color }}>{tier}</span>
          <span className="font-display font-bold text-dawg-white text-sm">{value}</span>
        </div>
      </div>
      <div className="h-2.5 bg-dawg-black rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// Win/loss timeline — each week is a colored circle
function WinLossTimeline({ history }: { history: Array<{ week: number; gameResult?: 'win' | 'loss'; opponent?: string }> }) {
  if (history.length === 0) {
    return (
      <div className="text-dawg-silver/40 text-xs text-center py-3">
        No games played yet — go to Coach's Office to advance weeks
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {history.map((wk) => (
        <div key={wk.week} className="relative group">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold cursor-default transition-transform hover:scale-110 ${
              wk.gameResult === 'win'
                ? 'bg-green-500 text-white'
                : wk.gameResult === 'loss'
                ? 'bg-red-500 text-white'
                : 'bg-dawg-slate text-dawg-silver/50'
            }`}
          >
            {wk.gameResult === 'win' ? 'W' : wk.gameResult === 'loss' ? 'L' : `${wk.week}`}
          </div>
          {/* Tooltip */}
          {wk.opponent && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-dawg-black border border-dawg-slate rounded px-2 py-1 text-[9px] text-dawg-silver whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              W{wk.week} vs {wk.opponent}
            </div>
          )}
        </div>
      ))}
      {/* Future weeks */}
      {Array.from({ length: Math.max(0, 14 - history.length) }, (_, i) => (
        <div
          key={`future-${i}`}
          className="w-7 h-7 rounded-full border border-dawg-slate/30 flex items-center justify-center text-[9px] text-dawg-silver/20"
        >
          {history.length + i + 1}
        </div>
      ))}
    </div>
  );
}

// Rating trend chart — shows how a rating changed over weeks
function RatingTrendChart({
  history,
  statKey,
  color,
  label,
}: {
  history: WeekRecord[];
  statKey: 'offenseRating' | 'defenseRating' | 'recruitingRating' | 'morale';
  color: string;
  label: string;
}) {
  if (history.length < 2) {
    return (
      <div className="text-dawg-silver/30 text-[10px] text-center py-2">
        Not enough data yet
      </div>
    );
  }

  const values = history.map(h => h[statKey]);
  const min = Math.min(...values) - 2;
  const max = Math.max(...values) + 2;
  const range = max - min || 1;

  return (
    <div>
      <div className="text-[10px] text-dawg-silver/50 mb-1.5">{label} over season</div>
      <div className="flex items-end gap-0.5 h-10">
        {values.map((v, i) => {
          const pct = ((v - min) / range) * 100;
          return (
            <div
              key={i}
              className="flex-1 rounded-t transition-all duration-500"
              style={{ height: `${Math.max(10, pct)}%`, backgroundColor: color, opacity: 0.7 }}
              title={`Week ${i + 1}: ${v}`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-[9px] text-dawg-silver/30 mt-1">
        <span>W1</span>
        <span>W{values.length}</span>
      </div>
    </div>
  );
}

// Action frequency chart — which actions were used most
function ActionFrequencyChart({ history }: { history: Array<{ actionIds: string[] }> }) {
  // Count how many times each action was used
  const counts: Record<string, number> = {};
  history.forEach(wk => {
    wk.actionIds.forEach(id => {
      counts[id] = (counts[id] || 0) + 1;
    });
  });

  const sorted = COACH_ACTIONS
    .map(a => ({ ...a, count: counts[a.id] || 0 }))
    .filter(a => a.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  if (sorted.length === 0) {
    return (
      <div className="text-dawg-silver/30 text-[10px] text-center py-2">
        No actions taken yet
      </div>
    );
  }

  const maxCount = sorted[0].count;

  return (
    <div className="space-y-2">
      {sorted.map(a => (
        <div key={a.id} className="flex items-center gap-2">
          <span className="text-base w-6">{a.icon}</span>
          <div className="flex-1">
            <div className="flex justify-between text-[10px] mb-0.5">
              <span className="text-dawg-silver/70">{a.name}</span>
              <span className="text-dawg-silver/40">{a.count}x</span>
            </div>
            <div className="h-1.5 bg-dawg-black rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(a.count / maxCount) * 100}%`,
                  backgroundColor: a.category === 'offense' ? '#22C55E' :
                    a.category === 'defense' ? '#3B82F6' :
                    a.category === 'recruiting' ? '#F59E0B' :
                    a.category === 'morale' ? '#EC4899' : '#9B59B6'
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Screen ───────────────────────────────────────────────────

export function DynastyDesk({
  totalXp,
  onEarnXp,
}: {
  totalXp: number;
  onEarnXp: (id: string, xp: number) => void;
}) {
  const navigate = useNavigate();
  const { state, resetDynasty } = useDynastyState(onEarnXp);
  const [activeTab, setActiveTab] = useState<'overview' | 'ratings' | 'history' | 'insight'>('overview');

  const overall = calcOverall(state.offenseRating, state.defenseRating, state.morale);
  const moraleInfo = getMoraleLabel(state.morale);
  const xpRating = calculateUgaRating(totalXp);
  const winPct = (state.wins + state.losses) > 0
    ? Math.round((state.wins / (state.wins + state.losses)) * 100)
    : 0;

  // Derived metrics
  const projectedWins = state.weekHistory.length > 3
    ? Math.round((state.wins / state.weekHistory.length) * 14)
    : null;
  const isOnTrackForTitle = state.wins >= state.losses * 2 && state.losses <= 2;

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: '🏟️' },
    { id: 'ratings' as const, label: 'Ratings', icon: '📈' },
    { id: 'history' as const, label: 'History', icon: '📋' },
    { id: 'insight' as const, label: 'Code Insight', icon: '💡' },
  ];

  return (
    <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-3xl mx-auto">

      {/* Back nav */}
      <button
        onClick={() => navigate('/games')}
        className="text-dawg-silver text-sm mb-4 hover:text-dawg-white transition-colors"
      >
        ← Back to Games
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <BoomMascot
          mood={isOnTrackForTitle ? 'celebrate' : overall >= 85 ? 'happy' : 'idle'}
          size={72}
        />
        <div className="flex-1">
          <div className="text-dawg-silver/50 text-[10px] uppercase tracking-widest">
            Mini-Game 5 · Data Visualization
          </div>
          <h1 className="font-display font-extrabold text-xl text-dawg-white">
            Dynasty Desk
          </h1>
          <div className="text-[10px] text-dawg-silver/40 mt-0.5">
            {state.season} Season · Week {Math.min(state.currentWeek, 14)} of 14
          </div>
        </div>
        <div className="text-right">
          <div className="font-display font-extrabold text-dawg-gold text-3xl">{overall}</div>
          <div className="text-[9px] text-dawg-silver/40 uppercase tracking-wider">Overall</div>
        </div>
      </div>

      {/* Record banner */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: 'Wins', value: state.wins, color: 'text-green-400' },
          { label: 'Losses', value: state.losses, color: 'text-red-400' },
          { label: 'Win %', value: `${winPct}%`, color: 'text-dawg-gold' },
          { label: 'Rank', value: state.nationalRanking <= 25 ? `#${state.nationalRanking}` : 'NR', color: 'text-dawg-silver' },
        ].map(s => (
          <div key={s.label} className="bg-dawg-charcoal rounded-xl p-3 text-center">
            <div className={`font-display font-extrabold text-xl ${s.color}`}>{s.value}</div>
            <div className="text-dawg-silver/40 text-[10px]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-dawg-charcoal rounded-xl p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-colors ${
              activeTab === tab.id
                ? 'bg-dawg-red text-white'
                : 'text-dawg-silver/60 hover:text-dawg-white'
            }`}
          >
            <span className="hidden sm:inline">{tab.icon} </span>{tab.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ─────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Season projections */}
          {projectedWins !== null && (
            <div className="bg-dawg-charcoal rounded-xl p-4">
              <h3 className="font-display font-bold text-dawg-white text-sm mb-3">Season Projection</h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className={`font-display font-extrabold text-4xl ${projectedWins >= 10 ? 'text-dawg-gold' : projectedWins >= 7 ? 'text-dawg-white' : 'text-red-400'}`}>
                    {projectedWins}
                  </div>
                  <div className="text-dawg-silver/40 text-[10px]">Proj. Wins</div>
                </div>
                <div className="flex-1">
                  <div className={`font-bold text-sm mb-1 ${isOnTrackForTitle ? 'text-dawg-gold' : 'text-dawg-silver'}`}>
                    {isOnTrackForTitle ? '🏆 On track for a title run' :
                     projectedWins >= 8 ? '📈 Strong season pace' :
                     '⚠️ Need more Coach\'s Office actions'}
                  </div>
                  <p className="text-dawg-silver/50 text-xs">
                    Based on {state.wins}W in {state.weekHistory.length} games played
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Win/Loss timeline */}
          <div className="bg-dawg-charcoal rounded-xl p-4">
            <h3 className="font-display font-bold text-dawg-white text-sm mb-3">Season Timeline</h3>
            <WinLossTimeline history={state.weekHistory} />
          </div>

          {/* Quick ratings */}
          <div className="bg-dawg-charcoal rounded-xl p-4">
            <h3 className="font-display font-bold text-dawg-white text-sm mb-3">Team Snapshot</h3>
            <StatGauge label="Offense" value={state.offenseRating} color="#22C55E" icon="⚡" />
            <StatGauge label="Defense" value={state.defenseRating} color="#3B82F6" icon="🛡️" />
            <StatGauge label="Recruiting" value={state.recruitingRating} color="#F59E0B" icon="📲" />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-dawg-slate">
              <span className="text-xs text-dawg-silver/60">Morale</span>
              <span className="text-sm font-bold" style={{ color: moraleInfo.color }}>
                {moraleInfo.label} ({state.morale}/100)
              </span>
            </div>
          </div>

          {/* XP link */}
          <div className="bg-dawg-charcoal/60 border border-dawg-gold/20 rounded-xl p-3 flex items-center gap-2">
            <span className="text-dawg-gold">💡</span>
            <p className="text-dawg-silver/70 text-xs">
              Your XP-based team rating: <strong className="text-dawg-gold">{xpRating}</strong>.
              Go to Courses and Drills to grow it.
            </p>
          </div>
        </div>
      )}

      {/* ── RATINGS TAB ──────────────────────────────── */}
      {activeTab === 'ratings' && (
        <div className="space-y-4">
          <div className="bg-dawg-charcoal rounded-xl p-4">
            <h3 className="font-display font-bold text-dawg-white text-sm mb-3">Rating Trends</h3>
            {state.weekHistory.length >= 2 ? (
              <div className="space-y-4">
                <RatingTrendChart
                  history={state.weekHistory}
                  statKey={'offenseRating' as const}
                  color="#22C55E"
                  label="Offense"
                />
                <RatingTrendChart
                  history={state.weekHistory}
                  statKey={'defenseRating' as const}
                  color="#3B82F6"
                  label="Defense"
                />
                <RatingTrendChart
                  history={state.weekHistory}
                  statKey={'recruitingRating' as const}
                  color="#F59E0B"
                  label="Recruiting"
                />
                <RatingTrendChart
                  history={state.weekHistory}
                  statKey={'morale' as const}
                  color="#EC4899"
                  label="Morale"
                />
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-3xl mb-2">📊</div>
                <p className="text-dawg-silver/50 text-sm">
                  Play at least 2 weeks in Coach's Office to see trends
                </p>
                <button
                  onClick={() => navigate('/coach-office')}
                  className="mt-3 text-dawg-red text-xs underline"
                >
                  Open Coach's Office →
                </button>
              </div>
            )}
          </div>

          {/* Action frequency */}
          <div className="bg-dawg-charcoal rounded-xl p-4">
            <h3 className="font-display font-bold text-dawg-white text-sm mb-3">
              Most Used Actions
            </h3>
            <ActionFrequencyChart history={state.weekHistory} />
          </div>
        </div>
      )}

      {/* ── HISTORY TAB ──────────────────────────────── */}
      {activeTab === 'history' && (
        <div className="bg-dawg-charcoal rounded-xl p-4">
          <h3 className="font-display font-bold text-dawg-white text-sm mb-3">Week-by-Week Log</h3>
          {state.weekHistory.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-dawg-silver/50 text-sm">No weeks played yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {[...state.weekHistory].reverse().map(wk => {
                const actions = wk.actionIds.map(
                  id => COACH_ACTIONS.find(a => a.id === id)
                ).filter(Boolean);
                return (
                  <div key={wk.week} className="border-b border-dawg-slate/30 pb-3 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-dawg-white text-xs">Week {wk.week}</span>
                      <span className={`font-bold text-xs ${
                        wk.gameResult === 'win' ? 'text-green-400' :
                        wk.gameResult === 'loss' ? 'text-red-400' : 'text-dawg-silver/40'
                      }`}>
                        {wk.gameResult === 'win' ? `W ${wk.ugaScore}–${wk.oppScore}` :
                         wk.gameResult === 'loss' ? `L ${wk.ugaScore}–${wk.oppScore}` :
                         'No game played'}
                        {wk.opponent && ` vs ${wk.opponent}`}
                      </span>
                    </div>
                    {actions.length > 0 && (
                      <div className="flex gap-1.5 flex-wrap">
                        {actions.map(a => a && (
                          <span key={a.id} className="text-[10px] bg-dawg-black px-2 py-0.5 rounded text-dawg-silver/60">
                            {a.icon} {a.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3 mt-1.5 text-[10px] text-dawg-silver/30">
                      <span>OFF {wk.offenseRating}</span>
                      <span>DEF {wk.defenseRating}</span>
                      <span>REC {wk.recruitingRating}</span>
                      <span>MOR {wk.morale}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── CODE INSIGHT TAB ─────────────────────────── */}
      {activeTab === 'insight' && (
        <div className="space-y-4">
          <div className="bg-dawg-black border border-dawg-slate rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-wider text-dawg-gold font-bold mb-3">
              🔍 Under the Hood — Data Visualization
            </div>
            <p className="text-dawg-silver/70 text-xs leading-relaxed mb-3">
              Every chart on this screen is a <strong className="text-dawg-white">data transformation</strong>.
              An array of numbers gets mapped to visual properties like height, color, and position.
            </p>
            <pre className="text-xs font-mono text-green-400 leading-relaxed overflow-x-auto">
{`// Raw data: your week history array
const weekHistory = [
  { week: 1, offenseRating: ${state.weekHistory[0]?.offenseRating ?? 82}, ... },
  { week: 2, offenseRating: ${state.weekHistory[1]?.offenseRating ?? 85}, ... },
  // ... ${state.weekHistory.length} total entries
];

// Transformation: numbers → bar heights
const offenseBars = weekHistory.map(wk => ({
  week: wk.week,
  heightPct: ((wk.offenseRating - 60) / 39) * 100
  // → ${state.weekHistory[0] ? Math.round(((state.weekHistory[0].offenseRating - 60) / 39) * 100) : 56}% tall
}));

// This is all chart libraries do under the hood:
// data → visual properties → DOM elements`}
            </pre>
          </div>

          <div className="bg-dawg-charcoal rounded-xl p-4">
            <h3 className="font-display font-bold text-dawg-white text-sm mb-2">
              Why Data Viz Matters
            </h3>
            <div className="space-y-2">
              {[
                { icon: '📊', text: 'Executives can\'t read raw SQL results — they need charts' },
                { icon: '🔍', text: 'Patterns invisible in numbers become obvious in graphs' },
                { icon: '💼', text: 'Every business intelligence tool (Tableau, Looker) is built on this' },
                { icon: '🤖', text: 'ML model outputs become useful only when visualized clearly' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-base shrink-0">{item.icon}</span>
                  <span className="text-dawg-silver/70 text-xs">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dawg-charcoal rounded-xl p-4">
            <h3 className="font-display font-bold text-dawg-white text-sm mb-2">
              Your Dynasty State (Live JSON)
            </h3>
            <p className="text-dawg-silver/50 text-xs mb-2">
              This is the actual object being saved to localStorage right now:
            </p>
            <pre className="text-xs font-mono text-green-400 leading-relaxed overflow-x-auto bg-dawg-black rounded-lg p-3 max-h-48">
{JSON.stringify({
  season: state.season,
  week: state.currentWeek,
  offenseRating: state.offenseRating,
  defenseRating: state.defenseRating,
  recruitingRating: state.recruitingRating,
  morale: state.morale,
  wins: state.wins,
  losses: state.losses,
  weeksPlayed: state.weekHistory.length,
}, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Reset */}
      <button
        onClick={resetDynasty}
        className="w-full mt-5 py-2 text-dawg-silver/30 hover:text-dawg-silver text-xs transition-colors border border-dawg-slate/20 rounded-lg"
      >
        Reset Dynasty
      </button>
    </div>
  );
}
