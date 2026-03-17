import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SkillCategory } from '../types';
import { StatCard } from '../components/UIComponents';
import { getXpLevel } from '../utils/helpers';
import { courses, getCourseProgress, getAllLessons, isLessonUnlocked } from '../data/courses';
import { BoomMascot } from '../components/BoomMascot';
import { calculateUgaRating } from '../data/gameData';

export function DynastyHQ({
  totalXp,
  streak,
  skillLevels,
  completedDrillIds,
  completedLessonIds,
}: {
  totalXp: number;
  streak: number;
  skillLevels: Record<SkillCategory, number>;
  completedDrillIds: string[];
  completedLessonIds: string[];
}) {
  const navigate = useNavigate();
  const { level, title, xpToNext } = getXpLevel(totalXp);

  // Find the next unlocked-but-not-completed lesson
  const allLessons = getAllLessons();
  const nextLesson = allLessons.find(
    (l) => !completedLessonIds.includes(l.id) && isLessonUnlocked(l.id, completedLessonIds)
  );
  const nextLessonCourse = nextLesson
    ? courses.find((c) => c.modules.some((m) => m.lessons.some((l) => l.id === nextLesson.id)))
    : null;

  const totalLessonsCompleted = completedLessonIds.length;
  const ugaRating = calculateUgaRating(totalXp);

  return (
    <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-4xl mx-auto">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-dawg-red to-dawg-darkred rounded-xl p-5 mb-5">
        <p className="text-white/70 text-xs uppercase tracking-wider mb-1">
          Welcome back, Coach
        </p>
        <h2 className="font-display font-extrabold text-2xl text-white">
          Level {level}: {title}
        </h2>
        <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-dawg-gold rounded-full transition-all duration-700"
            style={{ width: `${Math.max(5, ((totalXp % 500) / 500) * 100)}%` }}
          />
        </div>
        <p className="text-white/60 text-xs mt-2">
          {xpToNext > 0 ? `${xpToNext} XP to next level` : 'Max level reached!'}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard label="Total XP" value={totalXp.toLocaleString()} />
        <StatCard label="Streak" value={`${streak}d`} sub={streak > 0 ? 'On fire! 🔥' : 'Start today'} />
        <StatCard label="Lessons" value={totalLessonsCompleted} sub="Completed" />
      </div>

      {/* Next lesson CTA */}
      {nextLesson && nextLessonCourse && (
        <button
          onClick={() =>
            navigate(`/courses/${nextLessonCourse.id}/lesson/${nextLesson.id}`)
          }
          className="w-full text-left rounded-xl p-4 mb-5 border border-dawg-slate hover:border-dawg-silver/30 transition-all overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${nextLessonCourse.accentColor}18 0%, #1A1A1A 60%)` }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-70" style={{ color: nextLessonCourse.accentColor }}>
              Up Next — {nextLessonCourse.seasonLabel}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{nextLessonCourse.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-display font-extrabold text-dawg-white text-base leading-tight">
                {nextLesson.title}
              </div>
              <div className="text-dawg-silver/60 text-xs mt-0.5">{nextLesson.duration} · +{nextLesson.xpReward} XP</div>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-dawg-black font-bold text-sm shrink-0"
              style={{ backgroundColor: nextLessonCourse.accentColor }}
            >
              ▶
            </div>
          </div>
        </button>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => navigate('/courses')}
          className="bg-dawg-charcoal hover:bg-dawg-slate rounded-xl p-4 text-left transition-colors"
        >
          <span className="text-2xl">📚</span>
          <div className="font-display font-bold text-dawg-white mt-2">Courses</div>
          <div className="text-dawg-silver text-xs mt-0.5">Your learning path</div>
        </button>
        <button
          onClick={() => navigate('/combine')}
          className="bg-dawg-charcoal hover:bg-dawg-slate rounded-xl p-4 text-left transition-colors"
        >
          <span className="text-2xl">🏋️</span>
          <div className="font-display font-bold text-dawg-white mt-2">Daily Combine</div>
          <div className="text-dawg-silver text-xs mt-0.5">{completedDrillIds.length} drills done</div>
        </button>
      </div>

      {/* Season Simulator CTA */}
      <button
        onClick={() => navigate('/game')}
        className="w-full text-left rounded-xl p-4 mb-5 border border-dawg-red/30 hover:border-dawg-red/60 transition-all overflow-hidden relative bg-gradient-to-r from-dawg-red/15 to-dawg-charcoal"
      >
        <div className="flex items-center gap-4">
          <BoomMascot mood={totalLessonsCompleted > 0 ? 'happy' : 'idle'} size={72} />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-dawg-red font-bold mb-1">Season Simulator</div>
            <div className="font-display font-extrabold text-dawg-white text-lg leading-tight">Play the Season</div>
            <div className="text-dawg-silver/60 text-xs mt-1">
              Your team rating: <span className="text-dawg-gold font-bold">{ugaRating}</span> · More XP = higher rating
            </div>
          </div>
          <div className="bg-dawg-red text-white font-display font-bold text-xs px-3 py-2 rounded-lg shrink-0">
            Play ▶
          </div>
        </div>
      </button>

      {/* Season progress */}
      <div className="bg-dawg-charcoal rounded-xl p-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-dawg-white">Season Progress</h3>
          <button
            onClick={() => navigate('/courses')}
            className="text-dawg-red text-xs underline"
          >
            View all
          </button>
        </div>
        <div className="space-y-3">
          {courses.map((course) => {
            const { completed, total, percent } = getCourseProgress(course.id, completedLessonIds);
            return (
              <div key={course.id}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{course.icon}</span>
                    <span className="text-dawg-white text-xs font-medium">{course.title}</span>
                  </div>
                  <span className="text-[10px] text-dawg-silver/50">{completed}/{total}</span>
                </div>
                <div className="h-1.5 bg-dawg-slate rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%`, backgroundColor: course.accentColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mini-game grid */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-dawg-white">Mini-Games</h3>
          <button onClick={() => navigate('/games')} className="text-dawg-red text-xs underline">
            All games
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { path: '/pick-winner', icon: '🎯', label: 'Pick the Winner', sub: 'Variables & Conditionals', color: '#22C55E' },
            { path: '/weekly-sim', icon: '🔄', label: 'Weekly Sim', sub: 'Loops & Functions', color: '#3B82F6' },
            { path: '/coach-office', icon: '🏆', label: "Coach's Office", sub: 'State Management', color: '#BA0C2F' },
            { path: '/dynasty-desk', icon: '📊', label: 'Dynasty Desk', sub: 'Data Visualization', color: '#9B59B6' },
          ].map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="bg-dawg-charcoal hover:bg-dawg-slate/50 rounded-xl p-3 text-left transition-colors border border-dawg-slate/30"
            >
              <span className="text-xl">{item.icon}</span>
              <div className="font-display font-bold text-dawg-white text-xs mt-1.5 leading-tight">{item.label}</div>
              <div className="text-[9px] mt-0.5" style={{ color: item.color }}>{item.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recruit board CTA */}
      <button
        onClick={() => navigate('/recruits')}
        className="w-full bg-dawg-charcoal hover:bg-dawg-slate rounded-xl p-4 text-left transition-colors flex items-center gap-3"
      >
        <span className="text-2xl">📋</span>
        <div>
          <div className="font-display font-bold text-dawg-white">Recruit Board</div>
          <div className="text-dawg-silver text-xs mt-0.5">Scout and manage your pipeline</div>
        </div>
        <span className="text-dawg-silver/30 ml-auto text-lg">›</span>
      </button>
    </div>
  );
}
