import { useState, useEffect, useCallback } from 'react';
import { UserProgress, SkillCategory, PipelineStage, DEFAULT_SKILL_LEVELS } from '../types';
import { loadProgress, saveProgress } from '../services/progressService';
import { drills } from '../data/drills';

export function useProgress(userId: string | undefined) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    loadProgress(userId).then((p) => {
      setProgress(p);
      setLoading(false);
    });
  }, [userId]);

  const updateAndSave = useCallback(
    async (updater: (prev: UserProgress) => UserProgress) => {
      setProgress((prev) => {
        if (!prev) return prev;
        const next = updater(prev);
        saveProgress(next);
        return next;
      });
    },
    []
  );

  const completeDrill = useCallback(
    (drillId: string) => {
      updateAndSave((prev) => {
        if (prev.completedDrillIds.includes(drillId)) return prev;

        const drill = drills.find((d) => d.id === drillId);
        if (!drill) return prev;

        const newSkillLevels = { ...prev.skillLevels };
        newSkillLevels[drill.category] =
          (newSkillLevels[drill.category] || 0) + drill.xpReward;

        // Streak logic
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split('T')[0];
        let newStreak = prev.streak;
        if (prev.lastCombineDate === yesterday) {
          newStreak = prev.streak + 1;
        } else if (prev.lastCombineDate !== today) {
          newStreak = 1;
        }

        return {
          ...prev,
          totalXp: prev.totalXp + drill.xpReward,
          completedDrillIds: [...prev.completedDrillIds, drillId],
          skillLevels: newSkillLevels,
          streak: newStreak,
          lastCombineDate: today,
        };
      });
    },
    [updateAndSave]
  );

  const unlockLesson = useCallback(
    (lessonId: string) => {
      updateAndSave((prev) => {
        if (prev.unlockedLessonIds.includes(lessonId)) return prev;
        return {
          ...prev,
          unlockedLessonIds: [...prev.unlockedLessonIds, lessonId],
        };
      });
    },
    [updateAndSave]
  );

  const completeLesson = useCallback(
    (lessonId: string, xpReward: number) => {
      updateAndSave((prev) => {
        if (prev.unlockedLessonIds.includes(lessonId)) return prev;
        return {
          ...prev,
          totalXp: prev.totalXp + xpReward,
          unlockedLessonIds: [...prev.unlockedLessonIds, lessonId],
        };
      });
    },
    [updateAndSave]
  );

  const updateRecruitPipeline = useCallback(
    (recruitId: string, stage: PipelineStage) => {
      updateAndSave((prev) => ({
        ...prev,
        recruitPipeline: { ...prev.recruitPipeline, [recruitId]: stage },
      }));
    },
    [updateAndSave]
  );

  const totalXp = progress?.totalXp ?? 0;
  const streak = progress?.streak ?? 0;
  const skillLevels = progress?.skillLevels ?? { ...DEFAULT_SKILL_LEVELS };
  const completedDrillIds = progress?.completedDrillIds ?? [];
  const unlockedLessonIds = progress?.unlockedLessonIds ?? [];
  const recruitPipeline = progress?.recruitPipeline ?? {};

  const getSkillLevel = (skill: SkillCategory): number =>
    skillLevels[skill] || 0;

  return {
    progress,
    loading,
    totalXp,
    streak,
    skillLevels,
    completedDrillIds,
    unlockedLessonIds,
    recruitPipeline,
    getSkillLevel,
    completeDrill,
    unlockLesson,
    completeLesson,
    updateRecruitPipeline,
  };
}
