const { Pool } = require("pg");
const pool = new Pool({ connectionString: process.env.DIRECT_URL, max: 1 });

const subjects = [
  { id: "11111111-1111-1111-1111-111111111111", name: "Physics", description: "CBSE Class 11 — based on Anup Kumar Rajput & NCERT." },
  { id: "22222222-2222-2222-2222-222222222222", name: "Chemistry", description: "CBSE Class 11 — based on Anup Kumar Rajput & NCERT." },
  { id: "33333333-3333-3333-3333-333333333333", name: "Biology", description: "CBSE Class 11 — based on Anup Kumar Rajput & NCERT." },
  { id: "44444444-4444-4444-4444-444444444444", name: "Mathematics", description: "CBSE Class 11 — based on Anup Kumar Rajput & NCERT." },
];

const experiments = [
  // Physics
  { id: "phy-projectile", title: "Projectile Motion", subject: "Physics", desc: "Motion of an object under gravity; derive range, max height and time of flight." },
  { id: "phy-laws-motion", title: "Laws of Motion", subject: "Physics", desc: "Newton's three laws, inertia, momentum and friction." },
  { id: "phy-work-energy", title: "Work, Energy & Power", subject: "Physics", desc: "Scalar product, kinetic/potential energy, work-energy theorem." },
  { id: "phy-gravitation", title: "Gravitation", subject: "Physics", desc: "Universal law of gravitation, g, escape velocity, satellites." },
  { id: "phy-thermo", title: "Thermodynamics", subject: "Physics", desc: "Zeroth, first and second laws; heat, internal energy, Carnot cycle." },
  // Chemistry
  { id: "chem-basic", title: "Some Basic Concepts of Chemistry", subject: "Chemistry", desc: "Mole concept, stoichiometry, molar masses." },
  { id: "chem-atom", title: "Structure of Atom", subject: "Chemistry", desc: "Bohr model, quantum numbers, orbitals." },
  { id: "chem-bonding", title: "Chemical Bonding", subject: "Chemistry", desc: "Ionic, covalent and metallic bonds; VSEPR." },
  { id: "chem-states", title: "States of Matter", subject: "Chemistry", desc: "Gas laws, ideal gas equation, liquid state." },
  // Biology
  { id: "bio-living", title: "The Living World", subject: "Biology", desc: "Biodiversity, taxonomy, binomial nomenclature." },
  { id: "bio-cell", title: "Cell Structure", subject: "Biology", desc: "Prokaryotic/eukaryotic cells, organelles, biomolecules." },
  { id: "bio-photosynthesis", title: "Photosynthesis", subject: "Biology", desc: "Light & dark reactions, pigments, factors affecting it." },
  // Mathematics
  { id: "math-sets", title: "Sets & Relations", subject: "Mathematics", desc: "Sets, subsets, relations and functions." },
  { id: "math-trig", title: "Trigonometric Functions", subject: "Mathematics", desc: "Angles, identities, equations." },
  { id: "math-derivatives", title: "Limits & Derivatives", subject: "Mathematics", desc: "Intuitive idea of limit, definition of derivative." },
  { id: "math-probability", title: "Probability", subject: "Mathematics", desc: "Random experiments, events, axiomatic probability." },
];

async function main() {
  await pool.query(
    `INSERT INTO "User" (id, email, name, "createdAt", "updatedAt") VALUES ('system','system@edulab.local','System', now(), now()) ON CONFLICT (id) DO NOTHING;`
  );
  for (const s of subjects) {
    await pool.query(
      `INSERT INTO "Subject" (id, name, description) VALUES ($1,$2,$3) ON CONFLICT (id) DO NOTHING;`,
      [s.id, s.name, s.description]
    );
  }
  for (const e of experiments) {
    const sid = subjects.find((s) => s.name === e.subject).id;
    await pool.query(
      `INSERT INTO "Experiment" (id, title, description, "subjectId", "createdById", "createdAt") VALUES ($1,$2,$3,$4,'system',now()) ON CONFLICT (id) DO NOTHING;`,
      [e.id, e.title, e.desc, sid]
    );
  }
  console.log("Seeded", experiments.length, "CBSE Class 11 topics across", subjects.length, "subjects.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => pool.end());
