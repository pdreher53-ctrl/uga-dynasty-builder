import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses, getCourseProgress, isLessonUnlocked } from '../data/courses';
import { CourseLesson } from '../types';

function LessonRow({
  lesson,
  isCompleted,
  isUnlocked,
  accentColor,
  onPress,
}: {
  lesson: CourseLesson;
  isCompleted: boolean;
  isUnlocked: boolean;
  accentColor: string;
  onPress: () => void;
}) {
  return (
    <button
      onClick={isUnlocked ? onPress : undefined}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        isUnlocked
          ? 'hover:bg-dawg-slate/20 cursor-pointer'
          : 'opacity-50 cursor-not-allowed'
      }`}
    >
      {/* Status circle */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border ${
          isCompleted
            ? 'text-dawg-black'
            : isUnlocked
            ? 'bg-transparent border-current'
            : 'bg-dawg-slate/30 border-dawg-slate/30'
        }`}
        style={
          isCompleted
            ? { backgroundColor: accentColor, borderColor: accentColor }
            : isUnlocked
            ? { borderColor: accentColor, color: accentColor }
            : {}
        }
      >
        {isCompleted ? '✓' : isUnlocked ? '▶' : '🔒'}
      </div>

      <div className="flex-1 min-w-0 text-left">
        <div
          className={`font-display font-bold text-sm ${
            isUnlocked ? 'text-dawg-white' : 'text-dawg-silver/50'
          }`}
        >
          {lesson.title}
        </div>
        <div className="text-dawg-silver/50 text-[10px] mt-0.5">{lesson.duration}</div>
      </div>

      {isUnlocked && !isCompleted && (
        <span className="text-dawg-silver/30 text-sm">›</span>
      )}
      {isCompleted && (
        <span className="text-[10px] font-medium" style={{ color: accentColor }}>
          +{lesson.xpReward} XP
        </span>
      )}
    </button>
  );
}

export function CourseDetail({
  completedLessonIds,
}: {
  completedLessonIds: string[];
}) {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-dawg-silver">Course not found.</p>
        <button onClick={() => navigate('/courses')} className="text-dawg-red text-sm mt-2 underline">
          Back to courses
        </button>
      </div>
    );
  }

  const { completed, total, percent } = getCourseProgress(course.id, completedLessonIds);

  return (
    <div className="px-4 py-4 pb-24 lg:pb-6 max-w-lg lg:max-w-3xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate('/courses')}
        className="text-dawg-silver text-sm mb-4 hover:text-dawg-white transition-colors"
      >
        ← All Courses
      </button>

      {/* Course header */}
      <div className="rounded-xl p-5 mb-6 bg-dawg-charcoal border border-dawg-slate">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{course.icon}</span>
          <div className="flex-1">
            <div
              className="text-[10px] font-display font-bold uppercase tracking-widest mb-1"
              style={{ color: course.accentColor }}
            >
              Season {course.season} — {course.seasonLabel}
            </div>
            <h1 className="font-display font-extrabold text-xl text-dawg-white leading-tight">
              {course.title}
            </h1>
            <p className="text-dawg-silver/70 text-xs mt-1">{course.description}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-dawg-silver/60 text-[10px]">Progress</span>
            <span className="text-[10px] font-medium" style={{ color: course.accentColor }}>
              {completed}/{total} lessons
            </span>
          </div>
          <div className="h-1.5 bg-dawg-slate rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${percent}%`, backgroundColor: course.accentColor }}
            />
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        {course.modules.map((mod, modIdx) => {
          const modLessons = mod.lessons;
          const modCompleted = modLessons.filter(l => completedLessonIds.includes(l.id)).length;

          return (
            <div key={mod.id} className="bg-dawg-charcoal rounded-xl border border-dawg-slate overflow-hidden">
              {/* Module header */}
              <div className="px-4 py-3 border-b border-dawg-slate/50 flex items-center gap-3">
                <span className="text-xl">{mod.icon}</span>
                <div className="flex-1">
                  <div className="font-display font-bold text-dawg-white text-sm">
                    Module {modIdx + 1}: {mod.title}
                  </div>
                  <div className="text-dawg-silver/50 text-[10px] mt-0.5">{mod.description}</div>
                </div>
                <span className="text-dawg-silver/40 text-[10px]">
                  {modCompleted}/{modLessons.length}
                </span>
              </div>

              {/* Lessons */}
              <div className="py-1">
                {modLessons.map((lesson) => (
                  <LessonRow
                    key={lesson.id}
                    lesson={lesson}
                    isCompleted={completedLessonIds.includes(lesson.id)}
                    isUnlocked={isLessonUnlocked(lesson.id, completedLessonIds)}
                    accentColor={course.accentColor}
                    onPress={() => navigate(`/courses/${courseId}/lesson/${lesson.id}`)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
