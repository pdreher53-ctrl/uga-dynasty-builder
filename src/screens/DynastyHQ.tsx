import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SkillCategory, SKILL_LABELS } from '../types';
import { StatCard, SkillBar } from '../components/UIComponents';
import { BoomCompanion, KirbyTip } from '../components/BoomMascot';
import { StreakFire } from '../components/XPAnimation';
import { getXpLevel } from '../utils/helpers';
import { alerts } from '../data/alerts';
import type { BoomMood } from '../components/BoomMascot';

export function DynastyHQ({
  totalXp,
  streak,
  skillLevels,
  completedDrillIds,
}: {
  totalXp: number;
  streak: number;
  skillLevels: Record<SkillCategory, number>;
  completedDrillIds: string[];
}) {
  const navigate = useNavigate();
  const { level, title, xpToNext } = getXpLevel(totalXp);

  // Boom's mood depends on your progress
  const boomMood: BoomMood =
    streak >= 5 ? 'excited' :
    streak >= 1 ? 'happy' :
    completedDrillIds.length === 0 ? 'sleeping' :
    'coaching';

  // Sort skills by XP descending
  const sortedSkills = (Object.keys(skillLevels) as SkillCategory[]).sort(
    (a, b) => skillLevels[b] - skillLevels[a]
  );

  return (
    <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
      {/* Sanford Stadium welcome banner */}
      <div className="bg-gradient-to-r from-dawg-red to-dawg-darkred rounded-xl p-5 mb-5 relative overflow-hidden">
        {/* Yard line pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 39px, white 39px, white 40px)',
        }} />
        {/* Hedge trim at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 animate-hedge-shimmer" />

        <div className="relative">
          <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-1">
            Between the Hedges
          </p>
          <h2 className="font-display font-extrabold text-2xl text-white">
            Level {level}: {title}
          </h2>
          <div className="mt-3 h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-dawg-gold rounded-full transition-all duration-700"
              style={{
                width: `${Math.max(5, ((totalXp % 500) / 500) * 100)}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-white/60 text-xs">
              {xpToNext > 0 ? `${xpToNext} XP to next level` : 'Max level reached!'}
            </p>
            <StreakFire streak={streak} />
          </div>
        </div>
      </div>

      {/* Boom greeting */}
      <div className="mb-5 animate-slide-up">
        <BoomCompanion mood={boomMood} size="sm" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard label="Total XP" value={totalXp} />
        <StatCard
          label="Streak"
          value={`${streak}d`}
          sub={streak > 0 ? 'On fire!' : 'Start today'}
        />
        <StatCard label="Drills" value={completedDrillIds.length} sub="Completed" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => navigate('/training')}
          className="bg-dawg-charcoal hover:bg-dawg-slate rounded-xl p-4 text-left transition-colors group"
        >
          <span className="text-2xl group-hover:animate-bounce-gentle inline-block">🏋️</span>
          <div className="font-display font-bold text-dawg-white mt-2">
            Training Facility
          </div>
          <div className="text-dawg-silver text-xs mt-0.5">
            5 drill types to master
          </div>
        </button>
        <button
          onClick={() => navigate('/recruits')}
          className="bg-dawg-charcoal hover:bg-dawg-slate rounded-xl p-4 text-left transition-colors group"
        >
          <span className="text-2xl group-hover:animate-bounce-gentle inline-block">📋</span>
          <div className="font-display font-bold text-dawg-white mt-2">
            Recruit Board
          </div>
          <div className="text-dawg-silver text-xs mt-0.5">
            24 recruits to scout
          </div>
        </button>
        <button
          onClick={() => navigate('/gameday')}
          className="bg-dawg-charcoal hover:bg-dawg-slate rounded-xl p-4 text-left transition-colors group"
        >
          <span className="text-2xl group-hover:animate-bounce-gentle inline-block">🏈</span>
          <div className="font-display font-bold text-dawg-white mt-2">
            Gameday
          </div>
          <div className="text-dawg-silver text-xs mt-0.5">
            Mini-games & SEC battles
          </div>
        </button>
        <button
          onClick={() => navigate('/filmroom')}
          className="bg-dawg-charcoal hover:bg-dawg-slate rounded-xl p-4 text-left transition-colors group"
        >
          <span className="text-2xl group-hover:animate-bounce-gentle inline-block">🎬</span>
          <div className="font-display font-bold text-dawg-white mt-2">
            Film Room
          </div>
          <div className="text-dawg-silver text-xs mt-0.5">
            Lessons & code examples
          </div>
        </button>
      </div>

      {/* Skill bars */}
      <div className="bg-dawg-charcoal rounded-xl p-4 mb-5">
        <h3 className="font-display font-bold text-dawg-white mb-3">
          Skill Levels
        </h3>
        {sortedSkills.map((skill) => (
          <SkillBar key={skill} skill={skill} level={skillLevels[skill]} />
        ))}
      </div>

      {/* Kirby coaching tip */}
      <div className="mb-5">
        <KirbyTip />
      </div>

      {/* Alerts */}
      <div className="bg-dawg-charcoal rounded-xl p-4">
        <h3 className="font-display font-bold text-dawg-white mb-3">
          Recruiting Alerts
        </h3>
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="border-b border-dawg-slate last:border-0 py-3 first:pt-0 last:pb-0"
          >
            <div className="flex items-start gap-2">
              <span className="text-sm">
                {alert.type === 'recruit' ? '🎯' : alert.type === 'drill' ? '📝' : '🔥'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-dawg-white text-sm font-medium">{alert.title}</div>
                <p className="text-dawg-silver text-xs mt-0.5">{alert.message}</p>
                <span className="text-dawg-silver/50 text-[10px]">{alert.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
