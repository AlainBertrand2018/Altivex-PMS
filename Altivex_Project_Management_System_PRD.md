# Product Requirements Document (PRD)

## Product Name

**Altivex Project Management System (Altivex PMS)**

### Tagline

**From Conversation to Completion.**

## Product Vision

Altivex Project Management System (Altivex PMS) is an AI-powered Project
Intelligence Operating System designed for organizations managing
complex projects, governance boards, steering committees, consultants,
contractors, suppliers, and multiple stakeholders.

Rather than functioning solely as a meeting recorder or task manager,
Altivex PMS transforms every meeting, document, and decision into
structured, actionable project intelligence. Using multimodal AI, the
platform captures discussions, analyzes context, extracts decisions,
identifies risks, generates tasks, and continuously updates project
execution in real time.

The platform serves as the organization's institutional memory, enabling
project teams and executives to make informed decisions with complete
traceability from conversation to completion.

## Development Strategy

The MVP prioritizes rapid development.

-   No Supabase or external database will be implemented initially.
-   Data will be stored locally using structured JSON files.
-   A repository abstraction layer will isolate storage from business
    logic.
-   Future migration to Supabase/PostgreSQL should require minimal
    changes.

## Core MVP Objectives

1.  Multi-project management.
2.  AI-powered meeting recording and transcription.
3.  Automatic meeting minutes generation.
4.  Decision extraction and tracking.
5.  AI-generated action items.
6.  Modern Kanban board.
7.  Stakeholder management.
8.  Document management.
9.  AI project intelligence and risk detection.
10. Export to PDF, DOCX, HTML, and Markdown.

## Recommended Technology Stack

### Frontend

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui

### Backend

-   Next.js Server Actions
-   Node.js

### AI

-   OpenAI GPT-5.5
-   Gemini 2.5 Pro
-   Whisper-class speech recognition

### MVP Storage

-   Local JSON files

### Future Storage

-   Supabase
-   PostgreSQL
-   pgvector

## Success Criteria

The MVP is successful when it can: - Manage multiple projects. - Capture
and analyze meetings. - Generate professional minutes. - Extract
decisions and tasks automatically. - Maintain a searchable project
knowledge base. - Operate entirely using the local JSON storage layer
while remaining ready for future migration to Supabase.
