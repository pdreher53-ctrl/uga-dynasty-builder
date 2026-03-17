-- Academy progress table for cross-device sync
-- Run this in your Supabase SQL editor or via CLI

CREATE TABLE IF NOT EXISTS academy_progress (
  user_id TEXT PRIMARY KEY,
  save_data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE academy_progress ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own row
CREATE POLICY "academy_own_data"
  ON academy_progress FOR ALL
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);
