import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import steamRouter from './steamapi.js';
import {
  loginSteam,
  startIdling,
  stopIdling,
  getStatus,
  getCurrentGames,
} from './idler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// API router
app.use('/api', steamRouter);

// Status endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: getStatus(), games: getCurrentGames() });
});

// Start idling
app.post('/api/start', (req, res) => {
  const { games } = req.body;
  if (!Array.isArray(games)) {
    return res.status(400).json({ error: 'Invalid game list' });
  }

  startIdling(games);
  res.json({ success: true });
});

// Stop idling
app.post('/api/stop', (req, res) => {
  stopIdling();
  res.json({ success: true });
});

// Start the server and Steam login
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  loginSteam();
});
