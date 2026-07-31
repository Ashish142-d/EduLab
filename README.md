# EduLab - Virtual Science Lab

An interactive, premium virtual science lab with real-time 3D simulations and AI tutoring.

## Features
- AI Tutor, AI Quiz Generator, AI Doubt Solver
- Progress Tracking (XP, levels, streaks, progress rings)
- Achievements & Certificates
- Leaderboard, Teacher Dashboard, Student Dashboard
- Bookmarks & Notes (localStorage)
- Dark / Light mode, Search, Mobile responsive, Accessible, Animated

## Tech Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- three.js / @react-three/fiber + drei (3D lab)
- Tailwind CSS (custom futuristic theme)
- Prisma 7 + @prisma/adapter-pg + pg -> PostgreSQL (Supabase)
- Clerk (auth)
- Mistral AI (OpenAI-compatible) for AI features

## Local setup
npm install --legacy-peer-deps
cp .env.example .env
npx prisma db push --url "$DIRECT_URL"
node prisma/seed.cjs
npm run dev

## Vercel deploy
1. Push to GitHub and import in Vercel.
2. Add env vars: DATABASE_URL, DIRECT_URL, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, AI_API_KEY, AI_API_BASE, AI_MODEL.
3. Build command: prisma generate && next build (already in package.json).
4. Run `npx prisma db push` once to create tables.

The AI layer is provider-agnostic: set AI_API_BASE / AI_MODEL to Groq, DeepSeek, or OpenRouter to switch providers with no code changes.
