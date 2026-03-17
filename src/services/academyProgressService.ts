// ═══════════════════════════════════════════════════════════════
// ACADEMY PROGRESS SERVICE — localStorage + Supabase sync
// ═══════════════════════════════════════════════════════════════
//
// Pattern mirrors progressService.ts.
// - Always writes to localStorage (instant, offline-safe)
// - When Supabase is configured, also upserts to `academy_progress` table
// - On load, Supabase wins over localStorage (cloud is source of truth)
//
// Supabase table (run migration SQL to create it):
//   CREATE TABLE academy_progress (
//     user_id TEXT PRIMARY KEY,
//     save_data JSONB NOT NULL DEFAULT '{}',
//     updated_at TIMESTAMPTZ DEFAULT NOW()
//   );
//   ALTER TABLE academy_progress ENABLE ROW LEVEL SECURITY;
//   CREATE POLICY "own_data" ON academy_progress FOR ALL
//     USING (auth.uid()::text = user_id);

import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AcademySaveData } from '../types/engine';

const LOCAL_KEY = 'uga-academy-progress';
const SCHEMA_VERSION = 1;

// ── Default ───────────────────────────────────────────────────

export function makeDefaultAcademySave(): AcademySaveData {
  return {
    version: SCHEMA_VERSION,
    completedLevelIds: [],
    currentLevelId: 'level_001',
    totalAcademyXp: 0,
    unlockedWorldIds: [1],
    unlockedFeatureIds: [],
    streakCount: 0,
    lastPlayedDate: null,
    worldBossesBeaten: [],
  };
}

// ── Local storage ─────────────────────────────────────────────

function saveLocal(userId: string, data: AcademySaveData): void {
  try {
    localStorage.setItem(`${LOCAL_KEY}-${userId}`, JSON.stringify(data));
  } catch {
    // Storage full
  }
}

function loadLocal(userId: string): AcademySaveData | null {
  try {
    const raw = localStorage.getItem(`${LOCAL_KEY}-${userId}`);
    return raw ? (JSON.parse(raw) as AcademySaveData) : null;
  } catch {
    return null;
  }
}

// ── Supabase ──────────────────────────────────────────────────

async function loadFromSupabase(userId: string): Promise<AcademySaveData | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('academy_progress')
      .select('save_data')
      .eq('user_id', userId)
      .single();
    if (data && !error) {
      return data.save_data as AcademySaveData;
    }
  } catch {
    // Network error — fall through
  }
  return null;
}

async function saveToSupabase(userId: string, data: AcademySaveData): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    await supabase.from('academy_progress').upsert(
      { user_id: userId, save_data: data, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    );
  } catch {
    // Supabase unavailable — localStorage has it
  }
}

// ── Public API ────────────────────────────────────────────────

export async function loadAcademyProgress(userId: string): Promise<AcademySaveData> {
  // Cloud wins (cross-device sync)
  const cloudSave = await loadFromSupabase(userId);
  if (cloudSave) {
    saveLocal(userId, cloudSave); // cache locally
    return cloudSave;
  }
  // Fall back to local
  return loadLocal(userId) ?? makeDefaultAcademySave();
}

export async function saveAcademyProgress(
  userId: string,
  data: AcademySaveData
): Promise<void> {
  saveLocal(userId, data);           // sync, always fast
  saveToSupabase(userId, data);      // async, fire-and-forget
}
