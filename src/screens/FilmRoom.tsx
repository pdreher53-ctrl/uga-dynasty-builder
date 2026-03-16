import React, { useState } from 'react';
import { lessons } from '../data/lessons';
import { SKILL_LABELS } from '../types';
import { getSkillColor } from '../utils/helpers';
import { Badge, CodeBlock } from '../components/UIComponents';

export function FilmRoom({
  unlockedLessonIds,
  onUnlockLesson,
}: {
  unlockedLessonIds: string[];
  onUnlockLesson: (lessonId: string) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleLesson = (lessonId: string) => {
    if (expandedId === lessonId) {
      setExpandedId(null);
    } else {
      setExpandedId(lessonId);
      onUnlockLesson(lessonId);
    }
  };

  return (
    <div className="px-4 py-4 pb-24 max-w-lg mx-auto">
      <p className="text-dawg-silver text-sm mb-4">
        Each lesson explains a concept three ways: football, tech, and work.
      </p>

      <div className="space-y-3">
        {lessons.map((lesson) => {
          const isExpanded = expandedId === lesson.id;
          const isUnlocked = unlockedLessonIds.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              className="bg-dawg-charcoal rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full p-4 text-left flex items-start justify-between"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: getSkillColor(lesson.skill),
                      }}
                    />
                    <Badge text={SKILL_LABELS[lesson.skill]} />
                    {isUnlocked && (
                      <span className="text-green-400 text-[10px]">
                        Viewed
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-sm text-dawg-white mt-1">
                    {lesson.title}
                  </h3>
                </div>
                <span
                  className={`text-dawg-silver ml-2 transition-transform ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                >
                  ›
                </span>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-4">
                  {/* Football analogy */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-sm">🏈</span>
                      <span className="text-dawg-gold text-[10px] uppercase tracking-wider font-medium">
                        Football Analogy
                      </span>
                    </div>
                    <p className="text-dawg-silver text-xs leading-relaxed">
                      {lesson.footballAnalogy}
                    </p>
                  </div>

                  {/* Tech explanation */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-sm">💻</span>
                      <span className="text-dawg-gold text-[10px] uppercase tracking-wider font-medium">
                        Tech Explanation
                      </span>
                    </div>
                    <p className="text-dawg-silver text-xs leading-relaxed">
                      {lesson.techExplanation}
                    </p>
                  </div>

                  {/* Work application */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-sm">🏢</span>
                      <span className="text-dawg-gold text-[10px] uppercase tracking-wider font-medium">
                        Work Application
                      </span>
                    </div>
                    <p className="text-dawg-silver text-xs leading-relaxed">
                      {lesson.workApplication}
                    </p>
                  </div>

                  {/* Code example */}
                  {lesson.codeExample && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-sm">📝</span>
                        <span className="text-dawg-gold text-[10px] uppercase tracking-wider font-medium">
                          Code Example
                        </span>
                      </div>
                      <CodeBlock code={lesson.codeExample} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
