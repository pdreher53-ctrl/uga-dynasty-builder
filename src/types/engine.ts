// ═══════════════════════════════════════════════════════════════
// ENGINE TYPES — The data blueprints for the Learning Engine
// ═══════════════════════════════════════════════════════════════
//
// THE MOST IMPORTANT RULE:
// Levels are DATA. Systems are CODE.
//
// These TypeScript interfaces define the shape of every level.
// A level is just a plain object. No React. No components.
// The templates read these objects and know how to render them.
//
// This means you can add level 847 by writing one data object —
// not by creating a new component or screen.

// ── Skill Tracks ─────────────────────────────────────────────────

export type TrackId =
  | 'python_logic'
  | 'sql_data'
  | 'javascript'
  | 'react_ui'
  | 'apis_systems'
  | 'ai_prompting'
  | 'product_architecture'
  | 'debugging'
  | 'data_visualization'
  | 'deployment_cloud';

export interface Track {
  id: TrackId;
  name: string;
  description: string;
  icon: string;
  color: string;   // hex color for UI
}

// ── Level Types ───────────────────────────────────────────────────
//
// These are the reusable TEMPLATES. There are only 5.
// Every level of every type is rendered by one of these 5 templates.

export type LevelType =
  | 'learn'    // Concept explanation + quiz
  | 'predict'  // Read code, predict the output
  | 'fix'      // Debug broken code
  | 'apply'    // Use the concept in a dynasty scenario
  | 'boss';    // Multi-part challenge (5 questions, need 4/5)

// ── Challenge (the interactive part of every level) ───────────────

// A single question inside a level
export interface LevelQuestion {
  prompt: string;        // The question or instruction
  code?: string;         // Code snippet to display (optional)
  options: string[];     // 4 answer choices (always 4 for consistency)
  correctIndex: number;  // 0-based index of the correct answer
  explanation: string;   // Why that answer is correct
  hint?: string;         // Optional hint for the player
}

// Boss levels have multiple questions (exactly 5)
export interface BossChallenge {
  parts: LevelQuestion[]; // exactly 5 questions
  passingScore: number;   // how many correct to pass (default: 4)
}

// ── The Level Object ──────────────────────────────────────────────
//
// THIS is the core unit of the entire learning engine.
// Every single level — from level 1 to level 1000 — is one of these.
// The templates never need to change. You only add new level data.

export interface Level {
  // Identity
  id: string;          // e.g. "level_001" — unique across all levels
  levelNumber: number; // 1, 2, 3... 1000
  world: number;       // which world this level belongs to (1-10)
  track: TrackId;      // which skill track this teaches

  // Content
  title: string;       // "Variables: Team Ratings"
  subtitle: string;    // "Store a value. Change it. Use it."
  type: LevelType;     // determines which template renders this level

  // Context — the football framing that makes this fun
  footballContext: string; // how this concept maps to football/dynasty

  // Lesson content (used by learn/apply/fix templates for the explanation section)
  lesson?: {
    overview: string;       // 1-2 sentence intro
    explanation: string;    // the actual concept explanation
    codeExample?: string;   // a code sample to illustrate
    keyPoints: string[];    // 3-5 bullet points to remember
  };

  // The challenge section
  // For non-boss levels: one LevelQuestion
  // For boss levels: a BossChallenge with 5 parts
  challenge: LevelQuestion | BossChallenge;

  // Rewards
  xpReward: number;          // XP earned for completing
  streakBonus: number;       // extra XP if on a streak
  unlockFeature?: string;    // feature ID to unlock on completion (optional)

  // Metadata
  concept: string;           // the core concept (e.g. "for_loops")
  difficulty: 1 | 2 | 3;    // 1=easy, 2=medium, 3=hard
  tags: string[];            // searchable tags
  isWorldBoss?: boolean;     // true for the 10th level of each world
}

// Type guard: is this a BossChallenge or a single LevelQuestion?
export function isBossChallenge(
  challenge: LevelQuestion | BossChallenge
): challenge is BossChallenge {
  return 'parts' in challenge;
}

// ── World ─────────────────────────────────────────────────────────

export interface World {
  id: number;
  name: string;           // "Walk-On Developer"
  subtitle: string;       // "Learn the fundamentals"
  description: string;    // What this world teaches
  icon: string;           // emoji
  color: string;          // accent color hex
  levelRange: [number, number]; // [firstLevel, lastLevel] e.g. [1, 10]
  xpRequiredToEnter: number;    // total academy XP needed (0 for world 1)
  unlockRequirement?: string;   // "complete_boss_N" if gated by boss
  tracks: TrackId[];      // which tracks this world covers
}

// ── Academy Save Data ─────────────────────────────────────────────
//
// This is what gets saved to localStorage.
// Everything the engine needs to resume a session exactly.

export interface AcademySaveData {
  version: number;                // schema version, increment on breaking changes
  completedLevelIds: string[];    // e.g. ["level_001", "level_002"]
  currentLevelId: string;         // the level the player is on right now
  totalAcademyXp: number;         // XP earned through the academy (separate from main)
  unlockedWorldIds: number[];     // which worlds are open [1, 2, ...]
  unlockedFeatureIds: string[];   // features unlocked via levels
  streakCount: number;            // current daily streak
  lastPlayedDate: string | null;  // ISO date string
  worldBossesBeaten: number[];    // which boss levels have been beaten
}

// ── Progression state (computed, not saved) ───────────────────────
// What the useLearningEngine hook returns (computed from save data)

export interface AcademyProgressState {
  save: AcademySaveData;
  currentWorld: World | null;
  currentLevel: Level | null;
  nextLevel: Level | null;
  worldProgress: Record<number, { completed: number; total: number; percent: number }>;
  isLevelUnlocked: (levelId: string) => boolean;
  isLevelCompleted: (levelId: string) => boolean;
}
