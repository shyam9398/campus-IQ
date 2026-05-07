require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;
if (!process.env.DATABASE_URL) { console.error('DATABASE_URL not set in .env'); process.exit(1); }
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret123';

// Middleware
app.use(cors());
app.use(express.json());

// Database Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Render.com requires SSL but with self‑signed certs
  ssl: { rejectUnauthorized: false }
});

// Initialize DB – run schema if tables missing and seed if empty
const initDb = async () => {
  try {
    // 1️⃣ Run schema if any table is missing
    const requiredTables = ['users', 'colleges', 'saved_colleges', 'compare_history'];
    const res = await pool.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    );
    const existing = res.rows.map(r => r.table_name);
    const missing = requiredTables.filter(t => !existing.includes(t));
    if (missing.length) {
      console.log('Missing tables', missing, '- applying schema.sql');
      const fs = require('fs');
      const path = require('path');
      const schemaPath = path.join(__dirname, 'db', 'schema.sql');
      const sql = fs.readFileSync(schemaPath, 'utf8');
      // Split on semicolon followed by newline to execute each statement
      const statements = sql.split(/;\s*\n/).filter(s => s.trim().length > 0);
      for (const stmt of statements) {
        await pool.query(stmt);
      }
      console.log('Schema applied');
    }
    // 2️⃣ Load seed data if colleges table empty
    const cntRes = await pool.query('SELECT COUNT(*) FROM colleges');
    const cnt = parseInt(cntRes.rows[0].count, 10);
    if (cnt === 0) {
      console.log('Colleges table empty – loading seed data');
      const seedPath = path.join(__dirname, 'db', 'seed.sql');
      const seedSql = fs.readFileSync(seedPath, 'utf8');
      const seedStmts = seedSql.split(/;\s*\n/).filter(s => s.trim().length > 0);
      for (const stmt of seedStmts) {
        await pool.query(stmt);
      }
      console.log('Seed data loaded');
    }
  } catch (e) {
    console.error('Database init error:', e);
  }
};

initDb();


// Helper: Verify Token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- AUTH ROUTES ---

app.post('/api/auth/signup', async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id, name',
      [name, hashedPassword]
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'User registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
    if (result.rows.length === 0) return res.status(400).json({ error: 'User not found' });
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// --- COLLEGE ROUTES ---

app.get('/api/colleges', async (req, res) => {
  const { search, course, location, type, minRating, maxRating, fees, exams } = req.query;
  let query = 'SELECT * FROM colleges WHERE 1=1';
  let params = [];
  let counter = 1;

  if (search) {
    query += ` AND (name ILIKE $${counter} OR course ILIKE $${counter} OR location ILIKE $${counter})`;
    params.push(`%${search}%`);
    counter++;
  }
  if (course) {
    const courses = course.split(',');
    const courseConditions = courses.map((c, i) => `course ILIKE $${counter + i}`).join(' OR ');
    query += ` AND (${courseConditions})`;
    courses.forEach(c => params.push(`%${c}%`));
    counter += courses.length;
  }
  if (location) {
    const locations = location.split(',');
    const locConditions = locations.map((l, i) => `location ILIKE $${counter + i}`).join(' OR ');
    query += ` AND (${locConditions})`;
    locations.forEach(l => params.push(`%${l}%`));
    counter += locations.length;
  }
  if (type) {
    const types = type.split(',');
    const typeConditions = types.map((t, i) => `college_type = $${counter + i}`).join(' OR ');
    query += ` AND (${typeConditions})`;
    types.forEach(t => params.push(t));
    counter += types.length;
  }
  if (minRating) {
    query += ` AND rating >= $${counter}`;
    params.push(minRating);
    counter++;
  }
  if (maxRating) {
    query += ` AND rating <= $${counter}`;
    params.push(maxRating);
    counter++;
  }
  if (fees) {
    // Assume fees field stored as string like '2.1L/yr', perform ILIKE match
    query += ` AND fees ILIKE $${counter}`;
    params.push(`%${fees}%`);
    counter++;
  }
  if (exams) {
    query += ` AND exams ILIKE $${counter}`;
    params.push(`%${exams}%`);
    counter++;
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching colleges:', err);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

app.get('/api/colleges/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM colleges WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'College not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch college details' });
  }
});

// --- USER ROUTES (Authenticated) ---

  // --- COMPARE ROUTES ---

  // Save compare list (max 3 colleges)
  app.post('/api/user/compare', authenticateToken, async (req, res) => {
    const { collegeIds } = req.body; // array of college ids
    if (!Array.isArray(collegeIds) || collegeIds.length === 0) {
      return res.status(400).json({ error: 'collegeIds must be a non‑empty array' });
    }
    if (collegeIds.length > 3) {
      return res.status(400).json({ error: 'You can compare up to 3 colleges' });
    }
    try {
      // Upsert compare history (replace any existing for user)
      await pool.query('DELETE FROM compare_history WHERE user_id = $1', [req.user.id]);
      await pool.query('INSERT INTO compare_history (user_id, college_ids) VALUES ($1, $2)', [req.user.id, collegeIds]);
      res.json({ message: 'Compare list saved' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save compare list' });
    }
  });

  // Get compare list for user
  app.get('/api/user/compare', authenticateToken, async (req, res) => {
    try {
      const result = await pool.query('SELECT college_ids FROM compare_history WHERE user_id = $1', [req.user.id]);
      if (result.rowCount === 0) return res.json({ collegeIds: [] });
      res.json({ collegeIds: result.rows[0].college_ids });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch compare list' });
    }
  });

  // --- SAVE COLLEGE ROUTES ---

  // Save a college for the user
  app.post('/api/user/save', authenticateToken, async (req, res) => {
    const { collegeId } = req.body;
    if (!collegeId) return res.status(400).json({ error: 'collegeId required' });
    try {
      await pool.query(
        'INSERT INTO saved_colleges (user_id, college_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [req.user.id, collegeId]
      );
      res.json({ message: 'College saved successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save college' });
    }
  });

  // Remove a saved college
  app.delete('/api/user/save/:id', authenticateToken, async (req, res) => {
    try {
      await pool.query(
        'DELETE FROM saved_colleges WHERE user_id = $1 AND college_id = $2',
        [req.user.id, req.params.id]
      );
      res.json({ message: 'College removed successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to remove college' });
    }
  });

  // Get saved colleges for user
  app.get('/api/user/saved', authenticateToken, async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT c.* FROM colleges c JOIN saved_colleges sc ON c.id = sc.college_id WHERE sc.user_id = $1',
        [req.user.id]
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch saved colleges' });
    }
  });





// --- TOOLS ---

app.post('/api/tools/predict-rank', async (req, res) => {
  const { rank, course, category } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM colleges WHERE course ILIKE $1',
      [`%${course}%`]
    );
    const colleges = result.rows;
    const numRank = parseInt(rank, 10) || 10000;
    
    // Fake formula based on NIRF rank mapping to entrance rank for demonstration
    // Assume NIRF #1 needs rank < 500, NIRF #10 needs rank < 5000, etc.
    const dream = colleges.filter(c => (c.nirf_rank * 500) > numRank - 2000 && (c.nirf_rank * 500) <= numRank);
    const target = colleges.filter(c => (c.nirf_rank * 500) > numRank && (c.nirf_rank * 500) <= numRank + 5000);
    const safe = colleges.filter(c => (c.nirf_rank * 500) > numRank + 5000);
    
    res.json({ dream: dream.slice(0,5), target: target.slice(0,5), safe: safe.slice(0,5) });
  } catch (err) {
    res.status(500).json({ error: 'Rank prediction failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
