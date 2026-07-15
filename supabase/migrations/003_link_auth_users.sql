-- ============================================================================
-- 003: Link Supabase Auth users to app users table
-- Run AFTER 002_seed_data.sql
-- ============================================================================

-- Add auth_id column to link to Supabase Auth
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_id uuid UNIQUE;

-- Link demo@mymail.com (UID: 9c6e5cd8-7654-446d-bcf0-bc99aa74a383)
UPDATE users SET auth_id = '9c6e5cd8-7654-446d-bcf0-bc99aa74a383' WHERE email = 'demo@mymail.com';

-- Create users table record for aber.finmark@gmail.com (Super Admin)
INSERT INTO users (id, name, email, role, auth_id, created_at, updated_at)
VALUES (
  'usr_020',
  'Aber Finmark',
  'aber.finmark@gmail.com',
  'super_admin',
  '65778aa0-6057-413b-857f-e3c772d4cec2',
  now(),
  now()
)
ON CONFLICT (id) DO UPDATE SET auth_id = EXCLUDED.auth_id;
