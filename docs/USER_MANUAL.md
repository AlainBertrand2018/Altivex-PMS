# ALTIVEX PMS — User Manual

**Intelligent Project Management Platform**

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Dashboard](#2-dashboard)
3. [User Management (Admin)](#3-user-management-admin)
4. [Committees](#4-committees)
5. [Projects](#5-projects)
6. [Tasks & Kanban Board](#6-tasks--kanban-board)
7. [Meetings](#7-meetings)
8. [Decisions](#8-decisions)
9. [Stakeholders](#9-stakeholders)
10. [Documents](#10-documents)
11. [Settings & Invitations](#11-settings--invitations)

---

## Recommended Starting Flow

If you are new to ALTIVEX PMS, follow this sequence for the most logical onboarding experience. Each step builds on the previous one.

```
Step 1: Login & Dashboard     →  Get your bearings
Step 2: Users (Admin only)    →  Set up your team
Step 3: Committees             →  Create governing bodies
Step 4: Projects               →  Define the work
Step 5: Tasks (Kanban)         →  Break work into actions
Step 6: Meetings               →  Schedule collaboration
Step 7: Decisions              →  Formalize outcomes
Step 8: Stakeholders           →  Map the people involved
Step 9: Documents              →  Attach files and records
Step 10: Settings & Invitations →  Grow your team
```

### Why this order?

| Step | Rationale |
|---|---|
| **1. Login & Dashboard** | You need to see the big picture before diving in. The dashboard tells you what's happening at a glance. |
| **2. Users** | You can't assign work or meetings without knowing who the people are. Admins should set up users first. |
| **3. Committees** | A committee is the governance body that owns projects. Create them before projects, since each project is assigned to a committee. |
| **4. Projects** | Projects are the central unit of work. All other entities (tasks, meetings, decisions) belong to a project. Create your projects first. |
| **5. Tasks** | Once projects exist, break them into actionable tasks. Tasks are where the actual work gets done. |
| **6. Meetings** | Schedule meetings to discuss project progress. Meetings produce decisions and reports. |
| **7. Decisions** | Formalize the outcomes of meetings as decisions with status, impact, and rationale. |
| **8. Stakeholders** | Map who has influence and interest in each project. |
| **9. Documents** | Attach reports, contracts, and plans to projects and meetings. |
| **10. Settings & Invitations** | Invite new users to join the platform as your team grows. |

### Quick Answer: "What should I start with?"

**Start with Projects.** Everything else (tasks, meetings, decisions, stakeholders, documents) attaches to a project. Without a project, you have nowhere to put things.

The full order is: **Users → Committees → Projects → Tasks → Meetings → Decisions → Stakeholders → Documents**

---

## 1. Getting Started

### 1.1 Login

1. Navigate to the app URL. You will see the **Login** page at `/auth`.
2. Enter your **email** and **password**.
3. Click **Sign In**.
4. After successful login, you land on the **Dashboard** (`/dashboard`).

> If you do not have an account, contact your system administrator to be invited.

### 1.2 Navigation

The **sidebar** on the left is your primary navigation. It contains links to every section:

| Icon | Section | Description |
|---|---|---|
| Layout Dashboard | **Dashboard** | Overview of all projects, KPIs, risks |
| Folder Kanban | **Projects** | Manage projects |
| Clipboard List | **Tasks** | Kanban board for tasks |
| Calendar | **Meetings** | Schedule and manage meetings |
| Brain Circuit | **Decisions** | Track decisions |
| Users | **Users** (Admin) | Manage user accounts |
| User Check | **Stakeholders** | Stakeholder mapping |
| File Text | **Documents** | Document repository |
| Settings | **Settings** | Invitations and profile |

The sidebar can be collapsed by clicking the **hamburger icon** at the top.

### 1.3 Dark / Light Theme

Toggle between dark and light themes using the **sun/moon icon** at the bottom of the sidebar.

---

## 2. Dashboard

The dashboard (`/dashboard`) gives you a bird's-eye view of everything happening in the organization.

### Sections

| Widget | What It Shows |
|---|---|
| **KPI Cards** | Total projects, active projects, budget utilization, open risks, pending decisions |
| **Project Health Grid** | Health score for each project with status indicators |
| **Critical Risk Matrix** | Risk severity/impact grid — shows risks by likelihood and impact |
| **Neural Insights** | AI-generated insights based on project data trends |
| **Operations Sync** | Real-time operations feed showing recent activity |

### How to use it

- The dashboard is **read-only** — it displays aggregate data from all other sections.
- Click on any **project name** in the health grid to navigate to that project's detail page.
- Use it as your daily starting point to understand the overall state of affairs.

---

## 3. User Management (Admin)

**Access:** Only `super_admin` and `admin` roles can access this page.

### 3.1 View Users

1. Click **Users** in the sidebar.
2. You see a table with columns: Avatar, Name, Email, Role, Department, Phone, Actions.
3. Use the **search bar** to filter by name, email, or role.

### 3.2 Role Reference

| Role | Permissions |
|---|---|
| `super_admin` | Full system access, can manage admins |
| `admin` | Full system access, can manage users (except super_admins) |
| `committee_member` | Can view/edit projects and attend meetings |
| `consultant` | Can work on assigned tasks |
| `provider_delegate` | Provider-side project access |
| `viewer` | Read-only access |

### 3.3 Add a User

1. Click the **Add User** button.
2. Fill in: **Name**, **Email**, **Role**, **Department** (optional), **Phone** (optional).
3. Click **Add**.

> Note: The user will also need a Supabase Auth account created by an admin (see Settings → Invitations).

### 3.4 Edit a User

1. Click the **pencil icon** next to the user.
2. Modify the fields.
3. Click **Update**.

### 3.5 Delete a User

1. Click the **trash icon** next to the user.
2. Confirm in the dialog.

> You cannot delete yourself.

---

## 4. Committees

**Where:** Navigate to a project → the committee is shown in the project detail.

Committees are the **governing bodies** that oversee projects. Each project belongs to one committee.

### How committees work

- A **committee** has a type (e.g., Steering, Technical, Financial).
- **Committee members** are users or consultants assigned to that committee.
- Committee members attend **meetings** and make **decisions**.

### Viewing Committees

Committees are managed within project context:
1. Open a **Project** detail page.
2. The committee is listed in the project summary (under "Committee" or in the detail panel).

---

## 5. Projects

**Where:** Sidebar → **Projects** (`/projects`)

### 5.1 Projects Dashboard

The projects dashboard shows all projects as **glass cards** in a grid layout. Each card displays:

- **Name** and **description**
- **Status badge** (Envision, In Progress, Completed, On Hold, Cancelled)
- **Budget utilization bar** (spent vs approved)
- **Owner** avatar and name
- **Priority** indicator

**Filtering:** Use the project filter dropdown to narrow by status.

### 5.2 Create a Project

1. Click **New Project** button.
2. Fill in the form:

   | Field | Required | Notes |
   |---|---|---|
   | Name | Yes | Project title |
   | Description | Yes | Brief summary |
   | Status | Yes | envision, in_progress, completed, on_hold, cancelled |
   | Priority | Yes | critical, high, medium, low |
   | Committee | Yes | Select the governing committee |
   | Owner | Yes | Person responsible |
   | Budget | No | Estimated and approved budget |
   | Timeline | No | Start and end dates |

3. Click **Add**.

### 5.3 Project Detail Page

Click on any project card to open its **detail page** (`/projects/{projectId}`).

The detail page is organized as a **bento grid** with rows:

#### Row 1: Summary + Health Score
- **Project Summary**: Name, status, priority, owner, committee, budget
- **AI Health Ring**: A circular gauge showing project health (0-100) based on milestones, tasks, budget, and risks

#### Row 2: Timeline + Financials
- **Milestone Timeline**: Key milestones with completion status
- **Financial Snapshot**: Budget breakdown (estimated vs approved vs spent)

#### Row 3: Stakeholder Network
- **Influence Map**: Stakeholders visualized by influence level

#### Tabs (below the grid)
| Tab | What You See |
|---|---|
| **Tasks** | Filtered list of tasks for this project |
| **Meetings** | Meetings related to this project |
| **Decisions** | Decisions made for this project |
| **Phases** | Project phases with progress |
| **Milestones** | Milestone checklist |
| **KPIs** | Key Performance Indicators for this project |
| **Documents** | Files attached to this project |
| **Risks** | Risks identified for this project |

### 5.4 Edit a Project

1. On the project detail page, click the **edit button** (pencil icon) in the header.
2. Modify the fields.
3. Click **Update**.

### 5.5 Delete a Project

1. On the project detail page, click the **delete button** (trash icon).
2. Confirm.

### 5.6 Project Status Definitions

| Status | Meaning |
|---|---|
| **Envision** | Project is being planned / conceptualized |
| **In Progress** | Active execution |
| **Completed** | All phases delivered |
| **On Hold** | Temporarily paused |
| **Cancelled** | Permanently terminated |

### 5.7 Project Phases

Each project can have multiple **phases** with a defined order. Phases are displayed in the project detail under the **Phases** tab.

**Phase statuses:**
| Icon | Status |
|---|---|
| ✓ | Completed |
| ↻ | Active |
| ◷ | Pending |

---

## 6. Tasks & Kanban Board

**Where:** Sidebar → **Tasks** (`/tasks`)

### 6.1 Overview

Tasks are displayed on a **Kanban board** with 5 columns:

| Column | Meaning |
|---|---|
| **To Do** | Not yet started |
| **In Progress** | Being actively worked on |
| **Under Review** | Completed, awaiting approval |
| **Done** | Completed and approved |
| **Blocked** | Cannot proceed |

### 6.2 Create a Task

1. Click **New Task** (header button) or click the **+** or **"New Task"** button in any column.
2. Fill in the form:

   | Field | Required | Notes |
   |---|---|---|
   | Title | Yes | Task name |
   | Description | Yes | What needs to be done |
   | Project | Yes | Which project this belongs to |
   | Assign To | No | Person responsible |
   | Status | Yes | Defaults to the column you clicked from |
   | Priority | Yes | critical, high, medium, low |
   | Due Date | No | Deadline |

3. Click **Add**.

### 6.3 Drag & Drop

- **Move a task** between columns by dragging the **grip handle** (6-dot icon) on the right side of the card.
- The task status updates automatically when dropped.

### 6.4 Task Detail

Click on any task card to open its **detail page** (`/tasks/{taskId}`).

The detail page shows:
- **Hero header**: Status pulse dot, title, priority badge
- **Quick action bar**: Buttons to change status (To Do → In Progress → Review → Done)
- **Left panel**: Description, assignee, project, dates, tags, attachments
- **Right panel**: Dependencies (blocked by / blocks), Altivex Insight (AI analysis)
- **Execution timeline**: Activity history

### 6.5 Edit a Task

1. Click the **edit icon** on the task card (or open the task detail and click edit).
2. Modify the fields.
3. Click **Update**.

### 6.6 Delete a Task

Click the **delete** button on the task detail page.

### 6.7 Filtering

Use the **project filter dropdown** in the Tasks header to show tasks for a specific project, or keep "All Projects" to see everything.

### 6.8 Priority Reference

| Priority | Color | Meaning |
|---|---|---|
| **Critical** | Red | Must be resolved immediately |
| **High** | Orange/Amber | Important, should be prioritized |
| **Medium** | Blue/Primary | Normal priority |
| **Low** | Gray | Nice-to-have |

---

## 7. Meetings

**Where:** Sidebar → **Meetings** (`/meetings`)

### 7.1 Meetings Dashboard

The meetings page has three areas:

| Area | What It Shows |
|---|---|
| **Intelligence Cards** | Total meetings, upcoming, this week's count |
| **Meeting Table** | All meetings with title, project, date, status, duration |
| **Right Sidebar** | Next priority meeting, productivity chart, real-time feed |

### 7.2 Filters & Tabs

- **Status tabs** at the top: ALL / ACTIVE / COMPLETED
- **Project filter** dropdown to filter by project

### 7.3 Create a Meeting

1. Click **Schedule Meeting**.
2. Fill in the form:

   | Field | Required | Notes |
   |---|---|---|
   | Title | Yes | Meeting name |
   | Description | Yes | Agenda |
   | Project | Yes | Related project |
   | Committee | No | Related committee |
   | Status | Yes | scheduled, in_progress, completed, cancelled |
   | Date & Time | Yes | When it takes place |
   | Duration | Yes | In minutes |
   | Location | No | Physical or virtual location |

3. Click **Schedule**.

### 7.4 Meeting Status

| Status | Meaning |
|---|---|
| **Scheduled** | Planned, not yet started |
| **In Progress** | Currently happening |
| **Completed** | Finished |
| **Cancelled** | Called off |

### 7.5 Meeting Reports

After a meeting is completed, a **meeting report** can be generated. Reports track:
- Summary of discussion
- Action items (decisions made)
- Attachments

---

## 8. Decisions

**Where:** Sidebar → **Decisions** (`/decisions`)

### 8.1 Decisions Dashboard

The decisions page has:

| Widget | What It Shows |
|---|---|
| **Pending Approval** | Count of decisions awaiting approval |
| **Critical** | Count of critical-impact decisions |
| **Implementation Rate** | % of decisions that reached "implemented" |
| **Active Ledger** | Table of all decisions with status, impact, project, deciders |

### 8.2 Side Detail Panel

Click on a decision row to open the **detail panel** on the right, showing:
- **Rationale**: Why the decision was made
- **Consequences**: Expected outcomes
- **Progress bar**: Implementation progress

### 8.3 Create a Decision

1. Click **New Decision**.
2. Fill in the form:

   | Field | Required | Notes |
   |---|---|---|
   | Title | Yes | Decision summary |
   | Description | Yes | Full context |
   | Project | Yes | Related project |
   | Meeting | No | Meeting where it was decided |
   | Status | Yes | proposed, approved, implemented, rejected |
   | Impact | Yes | low, medium, high, critical |
   | Decided By | No | Who made the decision (select users) |
   | Rationale | No | Reasoning |
   | Consequences | No | Expected outcomes |

3. Click **Add**.

### 8.4 Decision Lifecycle

```
Proposed → Approved → Implemented
                    ↘ Rejected
```

---

## 9. Stakeholders

**Where:** Sidebar → **Stakeholders** (`/stakeholders`)

### 9.1 Overview

Stakeholders are people or organizations with an interest in a project. Each stakeholder is mapped by:

| Dimension | Values |
|---|---|
| **Category** | executive, committee, internal, contractor, supplier, external |
| **Influence** | high, medium, low |
| **Interest** | high, medium, low |

### 9.2 View Stakeholders

Stakeholders are displayed as **cards** in a grid, each showing:
- Name and role
- Category badge (color-coded)
- Influence indicator
- Project affiliation

### 9.3 Create a Stakeholder

1. Click **Add Stakeholder**.
2. Fill in the form.
3. Click **Add**.

### 9.4 Edit / Delete

Use the **pencil** (edit) or **trash** (delete) icons on each stakeholder card.

---

## 10. Documents

**Where:** Sidebar → **Documents** (`/documents`)

### 10.1 Overview

Documents are files attached to projects or meetings. Types include:

| Type | Examples |
|---|---|
| Contract | Signed agreements |
| Report | Progress or status reports |
| Proposal | Project proposals |
| Invoice | Billing documents |
| Plan | Project plans |
| Specification | Technical specs |
| Correspondence | Emails, letters |
| Other | Miscellaneous |

### 10.2 Upload / Add a Document

1. Click **Add Document**.
2. Fill in: **Name**, **Type**, **Project**, **Meeting** (optional), **Tags**.
3. Click **Add**.

### 10.3 Filter Documents

Use the **project filter** dropdown to narrow by project.

---

## 11. Settings & Invitations

**Where:** Sidebar → **Settings** (`/settings`)

### 11.1 Invitations

Invitations allow you to invite new users to the platform.

1. Click **Send Invitation**.
2. Enter the **email address**.
3. Select the **role** (Committee Member, Consultant, Provider Delegate, Viewer).
4. Optionally assign to a **project**.
5. Click **Send**.

### Invitation Statuses

| Status | Meaning |
|---|---|
| **Pending** | Not yet accepted |
| **Accepted** | User has joined |
| **Expired** | Invitation link expired |

> After a user accepts an invitation, an admin must still create their Supabase Auth account (out of scope of the app — use Supabase dashboard or the create-admin script).

### 11.2 Profile

Click your avatar or name in the sidebar to view your **profile** (`/profile/{userId}`).

Your profile shows:
- Your user details (name, email, role)
- Your assigned **projects**
- Your assigned **tasks**
- Your upcoming **meetings**
- Your **committees**

---

## Quick Reference: Button Locations

| Action | Where to Click |
|---|---|
| Login | `/auth` page |
| View dashboard | Sidebar → Dashboard |
| Manage users | Sidebar → Users (admin only) |
| View all projects | Sidebar → Projects |
| Create project | Projects page → **New Project** |
| View project detail | Click a project card |
| View all tasks | Sidebar → Tasks |
| Create a task | Tasks page → **New Task** or column **+** button |
| View task detail | Click a task card |
| Schedule meeting | Meetings page → **Schedule Meeting** |
| Create decision | Decisions page → **New Decision** |
| Add stakeholder | Stakeholders page → **Add Stakeholder** |
| Upload document | Documents page → **Add Document** |
| Send invitation | Settings → **Send Invitation** |
| Toggle dark/light mode | Sidebar bottom → sun/moon icon |

---

## Keyboard & Interaction Tips

- **Drag & drop** works on the Kanban board (Tasks) for task cards.
- **Click outside** a modal to close it.
- **Search bars** are available on Users and other table-based pages.
- **Project filters** are dropdowns available on Tasks, Meetings, Decisions, Documents.
