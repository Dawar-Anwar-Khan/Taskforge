# TaskForge — HR Task Management

TaskForge is a role-based HR task management system built with Next.js (App Router), MongoDB (Mongoose), and JWT auth.

## Requirements

- Node.js 20+
- MongoDB (Atlas or local)

## Environment variables

Copy `.env.example` to `.env.local` and fill values:

- **`MONGODB_URI`**: Mongo connection string
- **`JWT_SECRET`**: long random secret (do not reuse between environments)

## Local development

Install and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Seed an admin user (optional)

This repo includes `scripts/seed-admin.ts`, which can be used to create an initial admin user for local development.

- Review the script and configure the desired admin credentials before running it.
- Do **not** commit any seeded credentials or real user data to version control.

To run the script during local development:

```bash
npm run dev
# in another terminal:
npx ts-node scripts/seed-admin.ts
```

On first login the seeded admin user will be required to set a permanent password according to the application’s password policy.

## Production build (pre-deploy check)

```bash
npm run lint
npm run build
npm run start
```

## Deployment (Vercel)

- Create a Vercel project from this repo
- Add environment variables (`MONGODB_URI`, `JWT_SECRET`) in Vercel Project Settings
- Deploy

## Security notes

- **Role-based API access**: Admin-only endpoints for employee and task administration; employees can only update their own task status.
- **Password changes**:
  - First-time setup (`mustChangePassword=true`) requires the user to set a new password.
  - Normal password changes require the current password.
- **Sensitive configuration**: All secrets (e.g. database URLs, JWT secrets, admin credentials) are stored exclusively in environment variables and must never be committed to the repository.

## Project overview

TaskForge is a role-based HR task management platform focused on assigning, tracking, and reviewing work across your organization. It provides a web-based dashboard where HR staff and managers can create and manage tasks, while employees can view and update their own assignments in a secure, auditable way.

At a high level, TaskForge offers:

- A modern, responsive UI built on Next.js and React.
- A MongoDB-backed data model for users and tasks.
- Role-aware APIs that enforce permissions at the server level.
- JWT-based authentication with support for first-time password setup.

## Architecture

TaskForge is implemented as a full-stack Next.js application using the App Router:

- **Frontend**: React components with Tailwind CSS and shadcn/ui-style primitives for a consistent, accessible design system.
- **State management**: `@reduxjs/toolkit` and `react-redux` for managing client-side UI state where needed.
- **Backend**: Next.js server routes (API routes) that handle authentication, user management, and task operations.
- **Database layer**: MongoDB accessed through `mongoose` models for schema definitions and data access.
- **Authentication & authorization**:
  - JWT-based auth using `jose` / `jsonwebtoken`.
  - Role checks on protected endpoints to ensure only authorized users can perform sensitive operations.

This architecture keeps the UI, API, and data layers logically separated while still being hosted within a single Next.js project.

## Core concepts

- **Users**: Represent employees or HR staff. Each user has authentication credentials and one or more roles.
- **Roles**:
  - **Admin/HR**: Manage employees, configure roles, and oversee all tasks.
  - **Manager (if enabled in your setup)**: Create and assign tasks for a subset of employees and review their completion.
  - **Employee**: View and update their own assigned tasks.
- **Tasks**: Units of work associated with one or more employees and tracked through their lifecycle (e.g. created → in progress → completed).
- **Password lifecycle**: New or reset accounts can be required to change their password on first login using the `mustChangePassword` flag.

Exact role names and capabilities can be adapted to your organization’s needs, but the system is designed around clearly separated permissions and server-side enforcement.

## Feature highlights

- **Role-based dashboards**:
  - HR/Admin users see an overview of employees, tasks, and high-level status metrics.
  - Employees see a focused view of their own tasks with clear due dates and statuses.
- **Task assignment and tracking**:
  - Create tasks with titles, descriptions, and due dates.
  - Assign tasks to one or more employees.
  - Track progress as employees update their task statuses.
- **Secure authentication**:
  - JWT-based session management.
  - First-time password setup and subsequent password changes.
- **Modern UI/UX**:
  - Tailwind CSS and component utilities (`class-variance-authority`, `tailwind-merge`) for consistent styling.
  - Iconography powered by `lucide-react` and `react-icons`.

## Technology stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Frontend**:
  - React 19
  - Tailwind CSS 4
  - shadcn-style component primitives
  - `lucide-react`, `react-icons` for icons
- **State management**:
  - `@reduxjs/toolkit`
  - `react-redux`
- **Backend**:
  - Next.js API routes
  - `mongoose` for MongoDB
- **Security & auth**:
  - `bcryptjs` for password hashing
  - `jsonwebtoken` / `jose` for JWT handling
- **Tooling**:
  - ESLint (`eslint-config-next`)
  - TypeScript
  - `ts-node` and `tsconfig-paths` for scripting and local tooling

## Environment configuration

Environment variables are used for all sensitive configuration. Do **not** commit any `.env` files or actual values.

Common variables include (names may vary depending on your setup):

- `MONGODB_URI` — MongoDB connection string for your environment.
- `JWT_SECRET` — Long, random secret used to sign and verify JWTs.

For local development:

1. Copy `.env.example` to `.env.local`.
2. Fill in the required values using environment-specific secrets.
3. Keep `.env.local` out of version control.

## Local development workflow

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.

Changes to frontend or backend code will trigger hot reloads in development, allowing for rapid iteration.

## Building and running in production mode

Before deploying, you can perform a local production-like build:

```bash
npm run lint
npm run build
npm run start
```

This sequence lints the codebase, generates an optimized production build, and then starts the application using that build.

## Deployment

TaskForge is designed to be deployed on platforms that support Next.js (such as Vercel or Node-based hosts).

Typical Vercel deployment steps:

1. Create a new Vercel project from this repository.
2. Configure the required environment variables (e.g. `MONGODB_URI`, `JWT_SECRET`) in the Vercel project settings.
3. Trigger a deployment (either automatically from your main branch or manually).

Ensure you maintain separate environment variable values for development, staging, and production environments.

## Contributing and customization

While TaskForge is ready to use as a starting point, it is also intended to be extended:

- Adapt role names and permissions to your organization’s hierarchy.
- Customize the UI theme, branding, and components using Tailwind and the existing design system utilities.
- Introduce additional entities (such as departments or projects) as needed in the MongoDB models and API layer.

If you plan to share your fork publicly, remove any environment-specific assumptions and keep documentation high-level, avoiding any real credentials or infrastructure details.
