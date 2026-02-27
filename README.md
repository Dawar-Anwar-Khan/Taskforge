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

This repo includes `scripts/seed-admin.ts` which creates:

- Email: `admin@taskforge.com`
- Password: `TempAdmin@123`

Run:

```bash
npm run dev
# in another terminal:
npx ts-node scripts/seed-admin.ts
```

On first login you’ll be forced to set a permanent password.

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

- **Role-based API access**: admin-only employee/task assignment endpoints; employees only update their own task status
- **Password changes**:
  - first-time setup (`mustChangePassword=true`) can set a new password
  - normal password change requires the current password
