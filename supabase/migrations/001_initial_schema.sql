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

create table committee_members (
  id text primary key default gen_random_uuid()::text,
  committee_id text not null references committees(id) on delete cascade,
  user_id text references users(id) on delete cascade,
  consultant_id text references consultants(id) on delete cascade,
  member_role text not null default 'member',
  joined_at timestamptz not null default now(),
  check (num_nonnulls(user_id, consultant_id) = 1)
);

create table projects (
  id text primary key,
  name text not null,
  description text not null default '',
  status text not null default 'envision',
  priority text not null default 'medium',
  committee_id text references committees(id),
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

create table tasks (
  id text primary key,
  project_id text references projects(id) on delete cascade,
  phase_id text references project_phases(id),
  meeting_id text references meetings(id),
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

create index idx_projects_owner on projects(owner_id);
create index idx_projects_status on projects(status);
create index idx_projects_committee on projects(committee_id);
create index idx_project_phases_project on project_phases(project_id);
create index idx_project_services_project on project_services(project_id);
create index idx_project_services_phase on project_services(phase_id);
create index idx_project_members_project on project_members(project_id);
create index idx_project_members_user on project_members(user_id);
create index idx_project_providers_category on project_providers(category);
create index idx_service_providers_service on service_providers(service_id);
create index idx_service_providers_provider on service_providers(provider_id);
create index idx_project_providers_delegates_project on project_providers_delegates(project_id);
create index idx_stakeholders_project on stakeholders(project_id);
create index idx_milestones_project on milestones(project_id);
create index idx_milestones_phase on milestones(phase_id);
create index idx_kpis_project on kpis(project_id);
create index idx_kpis_phase on kpis(phase_id);
create index idx_kpis_milestone on kpis(milestone_id);
create index idx_tasks_project on tasks(project_id);
create index idx_tasks_phase on tasks(phase_id);
create index idx_tasks_status on tasks(status);
create index idx_tasks_assigned on tasks(assigned_to);
create index idx_meetings_project on meetings(project_id);
create index idx_meetings_committee on meetings(committee_id);
create index idx_meeting_attendees_meeting on meeting_attendees(meeting_id);
create index idx_meeting_reports_meeting on meeting_reports(meeting_id);
create index idx_decisions_project on decisions(project_id);
create index idx_decisions_meeting on decisions(meeting_id);
create index idx_documents_project on documents(project_id);
create index idx_documents_meeting on documents(meeting_id);
create index idx_risks_project on risks(project_id);
create index idx_cost_items_project on cost_items(project_id);
create index idx_cost_items_phase on cost_items(phase_id);
create index idx_cost_items_committee on cost_items(committee_id);
create index idx_invitations_project on invitations(project_id);
create index idx_invitations_email on invitations(email);
create index idx_notification_log_user on notification_log(user_id);
create index idx_notification_log_read on notification_log(user_id, read);
create index idx_committee_members_committee on committee_members(committee_id);
create index idx_committee_members_user on committee_members(user_id);
create index idx_committee_members_consultant on committee_members(consultant_id);
create index idx_consultants_user on consultants(user_id);

alter table users enable row level security;
alter table consultants enable row level security;
alter table committees enable row level security;
alter table committee_members enable row level security;
alter table projects enable row level security;
alter table project_phases enable row level security;
alter table project_services enable row level security;
alter table project_providers enable row level security;
alter table service_providers enable row level security;
alter table project_providers_delegates enable row level security;
alter table project_members enable row level security;
alter table stakeholders enable row level security;
alter table milestones enable row level security;
alter table kpis enable row level security;
alter table tasks enable row level security;
alter table meetings enable row level security;
alter table meeting_attendees enable row level security;
alter table meeting_reports enable row level security;
alter table decisions enable row level security;
alter table documents enable row level security;
alter table risks enable row level security;
alter table cost_items enable row level security;
alter table invitations enable row level security;
alter table notification_log enable row level security;

do $$ begin
  create policy "dev_allow_all" on users for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on consultants for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on committees for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on committee_members for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on projects for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on project_phases for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on project_services for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on project_providers for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on service_providers for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on project_providers_delegates for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on project_members for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on stakeholders for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on milestones for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on kpis for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on tasks for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on meetings for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on meeting_attendees for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on meeting_reports for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on decisions for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on documents for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on risks for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on cost_items for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on invitations for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
do $$ begin
  create policy "dev_allow_all" on notification_log for all using (true) with check (true);
exception when duplicate_object then null;
end $$;
