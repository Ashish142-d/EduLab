const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DIRECT_URL, max: 1 });
async function main() {
  await pool.query(`INSERT INTO "User" (id, email, name, "createdAt", "updatedAt") VALUES ('system','system@edulab.local','System', now(), now()) ON CONFLICT (id) DO NOTHING;`);
  const s = await pool.query(`INSERT INTO "Subject" (id, name, description) VALUES ('11111111-1111-1111-1111-111111111111','Physics','Classical mechanics and motion.') ON CONFLICT (id) DO NOTHING RETURNING id;`);
  const subjectId = s.rows[0]?.id || '11111111-1111-1111-1111-111111111111';
  await pool.query(`INSERT INTO "Experiment" (id, title, description, "subjectId", "createdById", "createdAt") VALUES ('proj-motion','Projectile Motion','Launch a ball and analyze kinematics variables and trajectories under a constant gravity field.', $1, 'system', now()) ON CONFLICT (id) DO NOTHING;`, [subjectId]);
  console.log("Seeded. subjectId =", subjectId);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => pool.end());
