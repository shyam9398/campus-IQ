require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'campusiq_secret_key';

// Middleware
app.use(cors());
app.use(express.json());

// Database Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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
  const { search, course, location, type, minRating } = req.query;
  let query = 'SELECT * FROM colleges WHERE 1=1';
  let params = [];
  let counter = 1;

  if (search) {
    query += ` AND (name ILIKE $${counter} OR courses ILIKE $${counter} OR location ILIKE $${counter})`;
    params.push(`%${search}%`);
    counter++;
  }
  if (course) {
    query += ` AND courses ILIKE $${counter}`;
    params.push(`%${course}%`);
    counter++;
  }
  if (location) {
    query += ` AND location ILIKE $${counter}`;
    params.push(`%${location}%`);
    counter++;
  }
  if (type) {
    query += ` AND type = $${counter}`;
    params.push(type);
    counter++;
  }
  if (minRating) {
    query += ` AND rating >= $${counter}`;
    params.push(minRating);
    counter++;
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
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

app.post('/api/user/save', authenticateToken, async (req, res) => {
  const { collegeId } = req.body;
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
  const { rank, course } = req.body;
  // Mock logic for prediction
  try {
    const result = await pool.query(
      'SELECT * FROM colleges WHERE courses ILIKE $1 ORDER BY nirf_rank ASC LIMIT 10',
      [`%${course}%`]
    );
    // Simple mock categorization
    const colleges = result.rows;
    const dream = colleges.filter(c => c.nirf_rank <= 10);
    const target = colleges.filter(c => c.nirf_rank > 10 && c.nirf_rank <= 50);
    const safe = colleges.filter(c => c.nirf_rank > 50);
    res.json({ dream, target, safe });
  } catch (err) {
    res.status(500).json({ error: 'Rank prediction failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
