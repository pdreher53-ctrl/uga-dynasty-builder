import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses, getLessonById, getNextLesson } from '../data/courses';
import { CodeBlock } from '../components/UIComponents';

type Phase = 'reading' | 'quiz' | 'complete';

export function LessonView({
  completedLessonIds,
  onCompleteLesson,
}: {
  completedLessonIds: string[];
  onCompleteLesson: (lessonId: string, xpReward: number) => void;
}) {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();

  const lesson = lessonId ? getLessonById(lessonId) : null;
  const course = courses.find((c) => c.id === courseId);
  const nextLesson = lessonId ? getNextLesson(lessonId) : null;
  const alreadyCompleted = lessonId ? completedLessonIds.includes(lessonId) : false;

  const [phase, setPhase] = useState<Phase>(alreadyCompleted ? 'complete' : 'reading');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!lesson || !course) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-dawg-silver">Lesson not found.</p>
        <button onClick={() => navigate(`/courses/${courseId}`)} className="text-dawg-red text-sm mt-2 underline">
          Back to course
        </button>
      </div>
    );
  }

  const isCorrect = selectedAnswer === lesson.quiz.correctIndex;

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
  };

  const handleQuizContinue = () => {
    if (isCorrect || selectedAnswer !== null) {
      if (!alreadyCompleted) {
        onCompleteLesson(lesson.id, lesson.xpReward);
      }
      setPhase('complete');
    }
  };

  const accentColor = course.accentColor;

  return (
    <div className="pb-24 lg:pb-6 max-w-lg lg:max-w-2xl mx-auto w-full overflow-x-hidden break-words">
      {/* Header bar */}
      <div className="sticky top-0 z-10 bg-dawg-black/95 backdrop-blur border-b border-dawg-slate px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="text-dawg-silver hover:text-dawg-white transition-colors"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-dawg-silver/60 text-[10px] truncate">{course.title}</p>
          <p className="text-dawg-white text-xs font-display font-bold truncate">{lesson.title}</p>
        </div>
        <span className="text-[10px] text-dawg-silver/40">{lesson.duration}</span>
      </div>

      {/* Phase: Reading */}
      {phase === 'reading' && (
        <div className="px-4 py-5 space-y-6">
          {/* Overview */}
          <div>
            <p className="text-dawg-white text-base leading-relaxed">{lesson.overview}</p>
          </div>

          {/* Football analogy */}
          <div className="rounded-xl p-4 bg-dawg-charcoal border border-dawg-slate">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🏈</span>
              <span className="text-dawg-gold text-[10px] uppercase tracking-wider font-bold">Football Analogy</span>
            </div>
            <p className="text-dawg-silver text-sm leading-relaxed">{lesson.footballAnalogy}</p>
          </div>

          {/* Explanation */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💻</span>
              <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: accentColor }}>
                The Real Thing
              </span>
            </div>
            <p className="text-dawg-silver text-sm leading-relaxed">{lesson.explanation}</p>
          </div>

          {/* Key points */}
          <div className="rounded-xl p-4 bg-dawg-charcoal border border-dawg-slate">
            <div className="text-dawg-white text-[10px] uppercase tracking-wider font-bold mb-3">Key Points</div>
            <ul className="space-y-2">
              {lesson.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-xs mt-0.5 shrink-0" style={{ color: accentColor }}>▸</span>
                  <span className="text-dawg-silver text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code example */}
          {lesson.codeExample && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📝</span>
                <span className="text-dawg-gold text-[10px] uppercase tracking-wider font-bold">Code Example</span>
              </div>
              <CodeBlock code={lesson.codeExample} />
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => setPhase('quiz')}
            className="w-full py-3 rounded-xl font-display font-bold text-sm text-dawg-black transition-all hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            Take the Quiz →
          </button>
        </div>
      )}

      {/* Phase: Quiz */}
      {phase === 'quiz' && (
        <div className="px-4 py-5">
          <div className="bg-dawg-charcoal rounded-xl border border-dawg-slate p-5 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm">🏈</span>
              <span className="text-dawg-gold text-[10px] uppercase tracking-wider font-bold">Quick Quiz</span>
            </div>
            <h3 className="text-dawg-white font-display font-bold text-base leading-snug mb-4">
              {lesson.quiz.question}
            </h3>

            <div className="space-y-2">
              {lesson.quiz.options.map((option, idx) => {
                let style = 'bg-dawg-slate/20 border-dawg-slate text-dawg-silver hover:border-dawg-silver/40';
                if (showResult) {
                  if (idx === lesson.quiz.correctIndex) {
                    style = 'border-green-500 bg-green-500/10 text-green-400';
                  } else if (idx === selectedAnswer && !isCorrect) {
                    style = 'border-red-500 bg-red-500/10 text-red-400';
                  } else {
                    style = 'bg-dawg-slate/10 border-dawg-slate/30 text-dawg-silver/40';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={showResult}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${style}`}
                  >
                    <span className="font-mono text-[10px] mr-2 opacity-60">
                      {['A', 'B', 'C', 'D'][idx]}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Result feedback */}
            {showResult && (
              <div
                className={`mt-4 rounded-lg p-3 text-sm ${
                  isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'
                }`}
              >
                <p className={`font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-orange-400'}`}>
                  {isCorrect ? '✓ That\'s correct, Coach!' : '× Not quite — here\'s why:'}
                </p>
                <p className="text-dawg-silver/80 text-xs leading-relaxed">
                  {lesson.quiz.explanation}
                </p>
              </div>
            )}
          </div>

          {showResult && (
            <button
              onClick={handleQuizContinue}
              className="w-full py-3 rounded-xl font-display font-bold text-sm text-dawg-black transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              {isCorrect ? `Claim ${lesson.xpReward} XP →` : 'Continue Anyway →'}
            </button>
          )}
        </div>
      )}

      {/* Phase: Complete */}
      {phase === 'complete' && (
        <div className="px-4 py-10 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="font-display font-extrabold text-xl text-dawg-white mb-2">
            Lesson Complete!
          </h2>
          {!alreadyCompleted && (
            <div
              className="inline-block rounded-full px-4 py-1.5 font-display font-bold text-sm text-dawg-black mb-6"
              style={{ backgroundColor: accentColor }}
            >
              +{lesson.xpReward} XP Earned
            </div>
          )}
          {alreadyCompleted && (
            <p className="text-dawg-silver text-sm mb-6">You already completed this lesson.</p>
          )}

          <div className="space-y-3">
            {nextLesson && (
              <button
                onClick={() => {
                  setPhase('reading');
                  setSelectedAnswer(null);
                  setShowResult(false);
                  navigate(`/courses/${courseId}/lesson/${nextLesson.id}`);
                }}
                className="w-full py-3 rounded-xl font-display font-bold text-sm text-dawg-black transition-all hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                Next Lesson: {nextLesson.title} →
              </button>
            )}
            <button
              onClick={() => navigate(`/courses/${courseId}`)}
              className="w-full py-3 rounded-xl font-display font-bold text-sm bg-dawg-charcoal text-dawg-silver border border-dawg-slate hover:text-dawg-white transition-colors"
            >
              Back to Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
