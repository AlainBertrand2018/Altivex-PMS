-- ============================================================================
-- 001c: Tasks, meetings, and remaining entities (run after 001b)
-- ============================================================================

-- Tasks first, meeting_id as plain text (FK added after meetings)
create table tasks (
  id text primary key,
  project_id text references projects(id) on delete cascade,
  phase_id text references project_phases(id),
  meeting_id text,
  assigned_to text references users(id),
  title text not null,
  description text not null default '',
  status text not null default 'todo',
  priority text not null default 'medium',
  due_date date,
  tags text[] default '{}',
  dependencies text[] default '{}',
  created_by text references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table meetings (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  committee_id text references committees(id),
  title text not null,
  description text not null default '',
  status text not null default 'scheduled',
  scheduled_at timestamptz not null,
  duration integer not null default 60,
  location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Now add the FK from tasks to meetings
alter table tasks add constraint fk_tasks_meeting
  foreign key (meeting_id) references meetings(id);

create table meeting_attendees (
  id text primary key default gen_random_uuid()::text,
  meeting_id text not null references meetings(id) on delete cascade,
  user_id text references users(id) on delete cascade,
  consultant_id text references consultants(id) on delete cascade,
  attended boolean not null default false,
  role text,
  check (num_nonnulls(user_id, consultant_id) = 1)
);

create table meeting_reports (
  id text primary key,
  meeting_id text not null references meetings(id) on delete cascade,
  title text not null,
  content text not null default '',
  prepared_by text references users(id),
  status text not null default 'draft',
  file_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table decisions (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  meeting_id text references meetings(id),
  title text not null,
  description text not null default '',
  decided_by text[] default '{}',
  status text not null default 'proposed',
  impact text not null default 'medium',
  rationale text,
  consequences text,
  action_item_ids text[] default '{}',
  decided_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table documents (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  meeting_id text references meetings(id),
  name text not null,
  type text not null default 'other',
  file_url text not null default '',
  file_size integer default 0,
  mime_type text default 'application/pdf',
  uploaded_by text references users(id),
  summary text,
  tags text[] default '{}',
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table risks (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  meeting_id text references meetings(id),
  title text not null,
  description text not null default '',
  category text not null default 'operational',
  severity text not null default 'medium',
  probability text not null default 'identified',
  status text not null default 'identified',
  mitigation text,
  owner text references users(id),
  identified_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table cost_items (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  phase_id text references project_phases(id),
  milestone_id text references milestones(id),
  committee_id text references committees(id),
  service_id text references project_services(id),
  name text not null,
  description text not null default '',
  category text not null default 'other',
  unit_cost numeric not null default 0,
  quantity integer not null default 1,
  total_cost numeric generated always as (unit_cost * quantity) stored,
  currency text default 'MUR',
  status text not null default 'estimated',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table invitations (
  id text primary key default gen_random_uuid()::text,
  email text not null,
  project_id text references projects(id) on delete cascade,
  role text not null default 'member',
  invited_by text not null references users(id),
  status text not null default 'pending',
  token text unique not null default gen_random_uuid()::text,
  created_at timestamptz not null default now(),
  accepted_at timestamptz
);

create table notification_log (
  id text primary key default gen_random_uuid()::text,
  user_id text not null references users(id),
  type text not null default 'in_app',
  category text not null default 'system',
  title text not null,
  body text not null default '',
  entity_type text,
  entity_id text,
  read boolean not null default false,
  sent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);