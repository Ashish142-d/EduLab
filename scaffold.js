const fs = require('fs');
const path = require('path');

// Safe recursive directory creator and file writer helper
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n');
  console.log(`Created file: ${filePath}`);
}

console.log("Starting project file scaffolding...");

// 1. Write package.json with standard 2026 Next.js, Three.js, and Prisma v7 structure
writeFile('package.json', JSON.stringify({
  "name": "edulab",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@clerk/nextjs": "^5.0.0",
    "@prisma/client": "^7.0.0",
    "@react-three/cannon": "^6.6.0",
    "@react-three/drei": "^9.100.0",
    "@react-three/fiber": "^8.15.0",
    "canvas-confetti": "^1.9.0",
    "lucide-react": "^0.300.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^0.160.0"
  },
  "devDependencies": {
    "@types/canvas-confetti": "^1.6.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "^0.160.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0",
    "prisma": "^7.0.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0"
  }
}, null, 2));

// 2. Write Prisma Schema (using modern Prisma v7 explicit client output format)
writeFile('prisma/schema.prisma', `
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

enum Role {
  STUDENT
  TEACHER
  ADMIN
}

enum ExperimentStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
}

model User {
  id        String    @id
  email     String    @unique
  name      String?
  role      Role      @default(STUDENT)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  progress     Progress[]
  quizAttempts QuizAttempt[]
  experiments  Experiment[]  @relation("CreatedExperiments")
}

model Subject {
  id          String       @id @default(uuid())
  name        String       @unique
  description String?
  experiments Experiment[]
}

model Experiment {
  id          String   @id @default(uuid())
  title       String
  description String   @db.Text
  procedure   String?  @db.Text
  modelPath   String?
  subjectId   String
  subject     Subject  @relation(fields: [subjectId], references: [id], onDelete: Cascade)
  createdById String
  createdBy   User     @relation("CreatedExperiments", fields: [createdById], references: [id])
  createdAt   DateTime @default(now())

  questions Question[]
  progress  Progress[]
  attempts  QuizAttempt[]
}

model Question {
  id           String     @id @default(uuid())
  experimentId String
  experiment   Experiment @relation(fields: [experimentId], references: [id], onDelete: Cascade)
  text         String     @db.Text
  points       Int        @default(10)
  answers      Answer[]
}

model Answer {
  id         String   @id @default(uuid())
  questionId String
  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  text       String
  isCorrect  Boolean  @default(false)
}

model Progress {
  id           String           @id @default(uuid())
  userId       String
  user         User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  experimentId String
  experiment   Experiment       @relation(fields: [experimentId], references: [id], onDelete: Cascade)
  status       ExperimentStatus @default(NOT_STARTED)
  lastAccessed DateTime         @updatedAt

  @@unique([userId, experimentId])
}

model QuizAttempt {
  id           String     @id @default(uuid())
  userId       String
  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  experimentId String
  experiment   Experiment @relation(fields: [experimentId], references: [id], onDelete: Cascade)
  score        Float
  maxScore     Float
  completedAt  DateTime   @default(now())
}
`);

// 3. Write Tailwind configuration files
writeFile('tailwind.config.ts', `
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
`);

writeFile('postcss.config.js', `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`);

// 4. Write TypeScript configuration file
writeFile('tsconfig.json', JSON.stringify({
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}, null, 2));

// 5. Write environmental template configuration
writeFile('.env.example', `
# Setup Postgres connections (e.g. Supabase or Neon)
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"
DIRECT_URL="postgresql://user:pass@host:5432/db?schema=public"

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Gemini or OpenAI API Key
GEMINI_API_KEY=your-gemini-key
OPENAI_API_KEY=your-openai-key
`);

// 6. Write Global stylesheet
writeFile('src/app/globals.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;
`);

// 7. Write App Layout template
writeFile('src/app/layout.tsx', `
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduLab - Virtual Science Lab",
  description: "Interactive science experiments and automated quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={\`\${inter.className} bg-slate-900 text-slate-100 min-h-screen\`}>
        {children}
      </body>
    </html>
  );
}
`);

// 8. Write landing/dashboard page
writeFile('src/app/page.tsx', `
import Link from "next/link";
import { BookOpen, Award, FlaskConical } from "lucide-react";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <header className="flex justify-between items-center border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-400 flex items-center gap-2">
          <FlaskConical className="w-6 h-6" /> EduLab
        </h1>
        <div className="flex gap-4">
          <Link href="/experiments/projectile" className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 transition text-sm font-medium">
            Go to Physics Lab
          </Link>
        </div>
      </header>

      <section className="mt-20 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Interact with Real-Time Physics and Chemistry
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          A high-performance virtual laboratory built to provide accessible, engaging science experiences on any device.
        </p>
      </section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 border border-slate-800 rounded-lg bg-slate-950">
          <BookOpen className="w-8 h-8 text-indigo-400 mb-4" />
          <h3 className="font-semibold text-lg text-slate-200">Interactive Simulations</h3>
          <p className="text-slate-400 text-sm mt-2">Adjust physical parameters, run real-time equations, and inspect details in 3D views.</p>
        </div>
        <div className="p-6 border border-slate-800 rounded-lg bg-slate-950">
          <Award className="w-8 h-8 text-emerald-400 mb-4" />
          <h3 className="font-semibold text-lg text-slate-200">Progress Tracking</h3>
          <p className="text-slate-400 text-sm mt-2">Earn points, monitor completed modules, and view evaluation metrics over time.</p>
        </div>
        <div className="p-6 border border-slate-800 rounded-lg bg-slate-950">
          <FlaskConical className="w-8 h-8 text-pink-400 mb-4" />
          <h3 className="font-semibold text-lg text-slate-200">AI Tutoring</h3>
          <p className="text-slate-400 text-sm mt-2">Ask natural-language questions and receive instant guidance customized to your experiment progress.</p>
        </div>
      </section>
    </main>
  );
}
`);

// 9. Write Projectile Experiment R3F Canvas view with integrated dynamic trajectory math
writeFile('src/components/ProjectileExperiment.tsx', `
"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function PhysicsBall({ isRunning, angle, velocity, onResetComplete }: {
  isRunning: boolean;
  angle: number;
  velocity: number;
  onResetComplete: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef<number | null>(null);

  useFrame((state) => {
    if (!isRunning || !meshRef.current) {
      if (startTime.current !== null) startTime.current = null;
      return;
    }

    if (startTime.current === null) {
      startTime.current = state.clock.getElapsedTime();
    }

    const t = state.clock.getElapsedTime() - startTime.current;
    const rad = (angle * Math.PI) / 180;
    const g = 9.81;

    // Standard trajectory vector equations
    const x = velocity * Math.cos(rad) * t;
    const y = velocity * Math.sin(rad) * t - 0.5 * g * t * t;

    // Basic ground collision detection
    if (y < 0 && t > 0.1) {
      meshRef.current.position.set(x, 0.25, 0);
      onResetComplete();
      return;
    }

    meshRef.current.position.set(x, Math.max(0.25, y + 0.25), 0);
  });

  return (
    <mesh ref={meshRef} position={[0, 0.25, 0]}>
      <sphereGeometry args={[0.25, 32, 32]} />
      <meshStandardMaterial color="#f43f5e" roughness={0.1} metalness={0.1} />
    </mesh>
  );
}

export default function ProjectileExperiment() {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(15);
  const [isRunning, setIsRunning] = useState(false);

  const triggerReset = () => {
    setIsRunning(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 relative h-[450px] bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 15, 10]} intensity={1.2} />
          <PhysicsBall
            isRunning={isRunning}
            angle={angle}
            velocity={velocity}
            onResetComplete={triggerReset}
          />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[10, 0, 0]}>
            <planeGeometry args={[50, 10]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <gridHelper args={[50, 50, "#475569", "#334155"]} position={[10, 0.01, 0]} />
          <OrbitControls enableZoom={true} />
        </Canvas>

        <div className="absolute top-4 left-4 bg-slate-900/80 p-3 rounded text-xs border border-slate-800 max-w-xs">
          <p className="font-semibold mb-1">Theoretical Metrics:</p>
          <p>Peak Height: {((Math.pow(velocity * Math.sin(angle * Math.PI / 180), 2)) / (2 * 9.81)).toFixed(2)} m</p>
          <p>Range: {((Math.pow(velocity, 2) * Math.sin(2 * angle * Math.PI / 180)) / 9.81).toFixed(2)} m</p>
        </div>
      </div>

      <div className="p-6 border border-slate-800 rounded-lg bg-slate-950 space-y-6">
        <div>
          <h3 className="font-bold text-lg text-slate-200">Controls</h3>
          <p className="text-slate-400 text-sm">Configure variables to run the simulation.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Launch Angle ({angle}°)</label>
            <input
              type="range"
              min="10"
              max="90"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Initial Velocity ({velocity} m/s)</label>
            <input
              type="range"
              min="5"
              max="30"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
            className="flex-1 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition"
          >
            Launch Ball
          </button>
          <button
            onClick={triggerReset}
            className="flex-1 px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-sm font-medium transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
`);

// 10. Write experiment route layout wrapper
writeFile('src/app/experiments/projectile/page.tsx', `
import ProjectileExperiment from "@/components/ProjectileExperiment";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectilePage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 text-sm transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h2 className="text-3xl font-extrabold text-slate-100">Projectile Motion Experiment</h2>
        <p className="text-slate-400 mt-2">Adjust launch properties to analyze kinematics variables and trajectories under a constant gravity field.</p>
      </div>

      <ProjectileExperiment />
    </main>
  );
}
`);

// 11. Write Prisma client instantiation utility for Next.js
writeFile('src/lib/prisma.ts', `
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
`);

console.log("File scaffolding complete! Proceed with terminal instructions.");
