import { defineConfig } from "prisma/config";

// Prisma 7 evaluates this config during `prisma generate` (which runs as the
// first step of `npm run build`). We read the URL from process.env with a
// fallback so the build never crashes when the variable is absent (e.g. a Vercel
// build before Environment Variables are set). The real connection string is
// consumed at runtime in src/lib/prisma.ts.
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/postgres";

export default defineConfig({
  datasource: {
    url: databaseUrl,
  },
});
