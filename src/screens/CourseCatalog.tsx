import React from 'react';
import { useNavigate } from 'react-router-dom';
import { courses, getCourseProgress } from '../data/courses';

const SEASON_BG: Record<number, string> = {
  1: 'from-green-900/40 to-green-950/20',
  2: 'from-yellow-900/40 to-yellow-950/20',
  3: 'from-blue-900/40 to-blue-950/20',
  4: 'from-orange-900/40 to-orange-950/20',
  5: 'from-purple-900/40 to-purple-950/20',
};

export function CourseCatalog({
  completedLessonIds,
}: {
  completedLessonIds: string[];
}) {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-4xl mx-auto">
      <p className="text-dawg-silver text-sm mb-5">
        Your path from beginner to world-class AI builder — guided, sequential, and football-themed.
      </p>

      <div className="space-y-4">
        {courses.map((course) => {
          const { completed, total, percent } = getCourseProgress(course.id, completedLessonIds);
          const isStarted = completed > 0;
          const isComplete = completed === total;

          return (
            <button
              key={course.id}
              onClick={() => navigate(`/courses/${course.id}`)}
              className={`w-full text-left bg-gradient-to-br ${SEASON_BG[course.season]} bg-dawg-charcoal rounded-xl border border-dawg-slate hover:border-dawg-silver/30 transition-all overflow-hidden`}
            >
              {/* Season tag */}
              <div
                className="px-4 pt-3 pb-0 flex items-center gap-2"
              >
                <span className="text-[10px] font-display font-bold uppercase tracking-widest"
                  style={{ color: course.accentColor }}>
                  Season {course.season} — {course.seasonLabel}
                </span>
                {isComplete && (
                  <span className="text-[10px] text-green-400 font-medium">✓ Complete</span>
                )}
              </div>

              {/* Main content */}
              <div className="px-4 py-3 flex items-center gap-4">
                <span className="text-3xl">{course.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-extrabold text-dawg-white text-base leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-dawg-silver/70 text-xs mt-0.5">{course.subtitle}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-dawg-silver/50 text-[10px]">
                      {course.modules.length} modules · {total} lessons
                    </span>
                    {isStarted && !isComplete && (
                      <span className="text-[10px]" style={{ color: course.accentColor }}>
                        {completed}/{total} done
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-dawg-silver/40 text-lg">›</span>
              </div>

              {/* Progress bar */}
              {(isStarted || isComplete) && (
                <div className="mx-4 mb-3 h-1 bg-dawg-slate rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%`, backgroundColor: course.accentColor }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
