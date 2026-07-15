-- ============================================================================
-- 001a: Core identity tables (run first)
-- ============================================================================

drop table if exists notification_log cascade;
drop table if exists invitations cascade;
drop table if exists cost_items cascade;
drop table if exists risks cascade;
drop table if exists documents cascade;
drop table if exists meeting_reports cascade;
drop table if exists decisions cascade;
drop table if exists meeting_attendees cascade;
drop table if exists meetings cascade;
drop table if exists tasks cascade;
drop table if exists kpis cascade;
drop table if exists milestones cascade;
drop table if exists stakeholders cascade;
drop table if exists project_providers_delegates cascade;
drop table if exists service_providers cascade;
drop table if exists project_services cascade;
drop table if exists project_providers cascade;
drop table if exists project_members cascade;
drop table if exists project_phases cascade;
drop table if exists projects cascade;
drop table if exists committee_members cascade;
drop table if exists committees cascade;
drop table if exists consultants cascade;
drop table if exists users cascade;

create table users (
  id text primary key,
  name text not null,
  email text unique not null,
  avatar text,
  role text not null default 'viewer',
  department text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table consultants (
  id text primary key,
  user_id text references users(id),
  name text not null,
  email text not null,
  specialization text[] default '{}',
  bio text,
  daily_rate numeric default 0,
  currency text default 'MUR',
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Projects first, committee_id as plain text (FK added after committees)
create table projects (
  id text primary key,
  name text not null,
  description text not null default '',
  status text not null default 'envision',
  priority text not null default 'medium',
  committee_id text,
  owner_id text references users(id),
  budget_estimated numeric default 0,
  budget_approved numeric default 0,
  budget_spent numeric default 0,
  budget_currency text default 'MUR',
  timeline_start_date date,
  timeline_end_date date,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Committees now (project_id references projects which exists above)
create table committees (
  id text primary key,
  name text not null,
  description text not null default '',
  type text not null default 'steering',
  parent_committee_id text references committees(id),
  project_id text references projects(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Now add the FK from projects to committees
alter table projects add constraint fk_projects_committee
  foreign key (committee_id) references committees(id);

create table committee_members (
  id text primary key default gen_random_uuid()::text,
  committee_id text not null references committees(id) on delete cascade,
  user_id text references users(id) on delete cascade,
  consultant_id text references consultants(id) on delete cascade,
  member_role text not null default 'member',
  joined_at timestamptz not null default now(),
  check (num_nonnulls(user_id, consultant_id) = 1)
);