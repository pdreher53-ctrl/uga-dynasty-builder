import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProgress, DEFAULT_SKILL_LEVELS } from '../types';

const STORAGE_KEY = 'uga-dynasty-progress';

function getDefaultProgress(userId: string): UserProgress {
  return {
    userId,
    totalXp: 0,
    streak: 0,
    lastCombineDate: null,
    completedDrillIds: [],
    unlockedLessonIds: [],
    skillLevels: { ...DEFAULT_SKILL_LEVELS },
    recruitPipeline: {},
    updatedAt: new Date().toISOString(),
  };
}

// Convert camelCase JS to snake_case DB
function toDbFormat(progress: UserProgress) {
  return {
    user_id: progress.userId,
    total_xp: progress.totalXp,
    streak: progress.streak,
    last_combine_date: progress.lastCombineDate,
    completed_drill_ids: progress.completedDrillIds,
    unlocked_lesson_ids: progress.unlockedLessonIds,
    skill_levels: progress.skillLevels,
    recruit_pipeline: progress.recruitPipeline,
    updated_at: progress.updatedAt,
  };
}

// Convert snake_case DB to camelCase JS
function fromDbFormat(row: Record<string, unknown>): UserProgress {
  return {
    userId: row.user_id as string,
    totalXp: (row.total_xp as number) || 0,
    streak: (row.streak as number) || 0,
    lastCombineDate: (row.last_combine_date as string) || null,
    completedDrillIds: (row.completed_drill_ids as string[]) || [],
    unlockedLessonIds: (row.unlocked_lesson_ids as string[]) || [],
    skillLevels: (row.skill_levels as Record<string, number>) as UserProgress['skillLevels'] || { ...DEFAULT_SKILL_LEVELS },
    recruitPipeline: (row.recruit_pipeline as Record<string, string>) as UserProgress['recruitPipeline'] || {},
    updatedAt: (row.updated_at as string) || new Date().toISOString(),
  };
}

function saveToLocalStorage(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function loadFromLocalStorage(): UserProgress | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as UserProgress;
  } catch {
    return null;
  }
}

export async function loadProgress(userId: string): Promise<UserProgress> {
  // Try Supabase first
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (data && !error) {
        const progress = fromDbFormat(data);
        saveToLocalStorage(progress);
        return progress;
      }
    } catch {
      // Fall through to localStorage
    }
  }

  // Fallback to localStorage
  const cached = loadFromLocalStorage();
  if (cached && cached.userId === userId) {
    return cached;
  }

  return getDefaultProgress(userId);
}

export async function saveProgress(progress: UserProgress): Promise<void> {
  const updated = { ...progress, updatedAt: new Date().toISOString() };

  // Always save to localStorage (fast)
  saveToLocalStorage(updated);

  // Sync to Supabase in background
  if (isSupabaseConfigured()) {
    try {
      await supabase
        .from('user_progress')
        .upsert(toDbFormat(updated), { onConflict: 'user_id' });
    } catch {
      // Supabase save failed — localStorage has the data
    }
  }
}

export function clearLocalProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
