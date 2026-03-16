-- ═══════════════════════════════════════════════════════════════════
-- UGA DYNASTY BUILDER — SUPABASE DATABASE SCHEMA
-- ═══════════════════════════════════════════════════════════════════
--
-- Learning Note: This SQL file creates the database table(s) needed
-- for the app to save user progress across devices.
--
-- HOW TO RUN THIS:
-- 1. Go to your Supabase project dashboard
-- 2. Click "SQL Editor" in the left sidebar
-- 3. Paste this entire file into the editor
-- 4. Click "Run"
--
-- WHAT THIS DOES:
-- Creates a "user_progress" table that stores each user's:
--   - XP, streak, completed drills, unlocked lessons, skill levels, etc.
--
-- WHY ONE TABLE?
-- For an MVP with a single user, one table is simpler and faster.
-- In a real production app, you might normalize this into multiple tables
-- (e.g., a separate "completed_drills" table with one row per drill).
-- But for learning, one table keeps things easy to understand.
--
-- Football analogy: This is the master roster spreadsheet.
-- PE Copilot analogy: This is the user profile table in a SaaS database.
-- Carvana analogy: This is like a single employee record with all their safety data.
-- ═══════════════════════════════════════════════════════════════════

-- ─── USER PROGRESS TABLE ────────────────────────────────────────
-- This table stores one row per user. Each row contains ALL of that
-- user's progress data as a mix of simple values and JSON columns.

CREATE TABLE IF NOT EXISTS user_progress (
  -- Primary key: links to the Supabase auth.users table.
  -- "uuid" is a universally unique identifier — a long random string
  -- that ensures no two users ever have the same ID.
  -- "REFERENCES auth.users(id)" means this must match a real user.
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Total experience points earned across all categories.
  -- "DEFAULT 0" means new rows start with 0 XP.
  total_xp INTEGER DEFAULT 0 NOT NULL,

  -- Consecutive days of completing the Daily Combine.
  streak INTEGER DEFAULT 0 NOT NULL,

  -- The last date the user completed their Daily Combine.
  -- NULL means they haven't completed one yet.
  -- "DATE" type stores just the date (no time), like "2026-03-15".
  last_combine_date DATE,

  -- Array of drill IDs the user has completed.
  -- Learning Note: PostgreSQL supports array columns!
  -- This stores values like: ["drill-sql-001", "drill-json-002"]
  -- In SQL terms, this is a "text array" (text[]).
  completed_drill_ids TEXT[] DEFAULT '{}' NOT NULL,

  -- Array of lesson IDs the user has opened/viewed.
  unlocked_lesson_ids TEXT[] DEFAULT '{}' NOT NULL,

  -- Skill levels stored as a JSON object.
  -- Learning Note: JSONB is PostgreSQL's binary JSON type.
  -- It stores structured data like: {"sql": 50, "json": 30, ...}
  -- JSONB is preferred over JSON because it's faster to query.
  skill_levels JSONB DEFAULT '{"python": 0, "sql": 0, "javascript": 0, "react": 0, "apis": 0, "machineLearning": 0, "dataViz": 0, "promptEngineering": 0, "git": 0, "cloud": 0}' NOT NULL,

  -- Recruit pipeline progress stored as a JSON object.
  -- Maps recruit IDs to their pipeline stage.
  -- Example: {"rec-001": "Offered", "rec-004": "Committed"}
  recruit_pipeline JSONB DEFAULT '{}' NOT NULL,

  -- Timestamp of the last update.
  -- "TIMESTAMPTZ" includes timezone info (important for streak calculations).
  -- "DEFAULT NOW()" auto-sets to the current time when a row is created.
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─── ROW LEVEL SECURITY (RLS) ───────────────────────────────────
-- Learning Note: RLS is Supabase's way of ensuring users can only
-- access their OWN data. Without RLS, any authenticated user could
-- read/modify any other user's progress.
--
-- Think of it like this:
--   Without RLS: Anyone with a building key can enter any office.
--   With RLS: Your key only opens YOUR office.
--
-- Football analogy: Each coach can only see their own team's playbook.
-- Carvana analogy: Site leaders can only see their own site's data.

-- Enable RLS on the table
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own progress
CREATE POLICY "Users can view own progress"
  ON user_progress
  FOR SELECT
  USING (auth.uid() = user_id);
  -- auth.uid() returns the ID of the currently logged-in user.
  -- This policy says: "You can only SELECT rows where user_id matches YOUR id."

-- Policy: Users can insert their own progress (first-time setup)
CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
  -- WITH CHECK ensures you can only insert rows with YOUR user_id.

-- Policy: Users can update their own progress
CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
  -- USING checks which rows you can see.
  -- WITH CHECK ensures the updated row still belongs to you.

-- ─── HELPFUL COMMENTS ───────────────────────────────────────────
-- 
-- To view your table after creation:
--   SELECT * FROM user_progress;
--
-- To check a specific user's progress:
--   SELECT * FROM user_progress WHERE user_id = 'some-uuid-here';
--
-- To see all completed drills for a user:
--   SELECT completed_drill_ids FROM user_progress WHERE user_id = 'some-uuid-here';
--
-- To count total drills completed:
--   SELECT array_length(completed_drill_ids, 1) as drill_count
--   FROM user_progress WHERE user_id = 'some-uuid-here';
--
-- To check a specific skill level from the JSONB column:
--   SELECT skill_levels->>'sql' as sql_xp
--   FROM user_progress WHERE user_id = 'some-uuid-here';
