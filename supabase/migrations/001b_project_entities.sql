-- ============================================================================
-- 001b: Project support entities (run after 001a)
-- ============================================================================

create table project_phases (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  name text not null,
  description text not null default '',
  order_index integer not null default 0,
  status text not null default 'pending',
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table project_services (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  phase_id text references project_phases(id),
  name text not null,
  description text not null default '',
  category text not null default 'other',
  status text not null default 'identified',
  estimated_cost numeric default 0,
  actual_cost numeric default 0,
  currency text default 'MUR',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table project_providers (
  id text primary key,
  name text not null,
  email text,
  phone text,
  category text not null default 'other',
  website text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table service_providers (
  id text primary key default gen_random_uuid()::text,
  service_id text not null references project_services(id) on delete cascade,
  provider_id text not null references project_providers(id) on delete cascade,
  unique(service_id, provider_id)
);

create table project_providers_delegates (
  id text primary key default gen_random_uuid()::text,
  provider_id text not null references project_providers(id) on delete cascade,
  user_id text not null references users(id) on delete cascade,
  project_id text not null references projects(id) on delete cascade,
  service_id text references project_services(id),
  created_at timestamptz not null default now(),
  unique(provider_id, project_id)
);

create table project_members (
  id text primary key default gen_random_uuid()::text,
  project_id text not null references projects(id) on delete cascade,
  user_id text not null references users(id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default now(),
  invited_by text references users(id),
  unique(project_id, user_id)
);

create table stakeholders (
  id text primary key,
  user_id text references users(id),
  project_id text not null references projects(id) on delete cascade,
  name text,
  category text not null default 'external',
  influence text not null default 'medium',
  interest text not null default 'medium',
  role text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table milestones (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  phase_id text references project_phases(id),
  name text not null,
  due_date date not null,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table kpis (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  phase_id text references project_phases(id),
  milestone_id text references milestones(id),
  name text not null,
  description text not null default '',
  value numeric not null default 0,
  target numeric not null default 100,
  unit text not null default '%',
  category text not null default 'project',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);