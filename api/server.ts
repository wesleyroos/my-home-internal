import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Database ───────────────────────────────────────────────────────────────

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS survey_responses (
      id SERIAL PRIMARY KEY,
      segment TEXT NOT NULL,
      answers JSONB NOT NULL,
      ranking JSONB NOT NULL DEFAULT '[]',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

// ─── Server ─────────────────────────────────────────────────────────────────

async function startServer() {
  await initDb();
  console.log("Database connected and table ready.");

  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Survey API
  app.post("/api/survey", async (req, res) => {
    try {
      const { segment, answers, ranking } = req.body;
      if (!segment || !answers) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      await pool.query(
        `INSERT INTO survey_responses (segment, answers, ranking) VALUES ($1, $2, $3)`,
        [segment, JSON.stringify(answers), JSON.stringify(ranking ?? [])]
      );
      res.json({ ok: true });
    } catch (err: any) {
      console.error("Survey submit error:", err);
      res.status(500).json({ error: "Failed to save response" });
    }
  });

  app.get("/api/survey/responses", async (_req, res) => {
    try {
      const result = await pool.query("SELECT * FROM survey_responses ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (err: any) {
      console.error("Survey fetch error:", err);
      res.status(500).json({ error: "Failed to fetch responses" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3001;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
