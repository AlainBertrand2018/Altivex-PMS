-- ============================================================================
-- 001d: Indexes and Row Level Security (run last, after 001c)
-- ============================================================================

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

-- Enable RLS on all tables
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

-- Dev policies (allow all)
do  begin
  create policy "dev_allow_all" on users for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on consultants for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on committees for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on committee_members for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on projects for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on project_phases for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on project_services for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on project_providers for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on service_providers for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on project_providers_delegates for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on project_members for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on stakeholders for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on milestones for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on kpis for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on tasks for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on meetings for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on meeting_attendees for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on meeting_reports for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on decisions for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on documents for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on risks for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on cost_items for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on invitations for all using (true) with check (true);
exception when duplicate_object then null;
end ;
do  begin
  create policy "dev_allow_all" on notification_log for all using (true) with check (true);
exception when duplicate_object then null;
end ;