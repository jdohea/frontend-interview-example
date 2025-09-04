import { Router } from 'express';
import { agentSummary, simulateDelay } from '../data/mockData';

const router = Router();

/**
 * GET /api/agent/summary
 * 
 * Returns agent summary for shortcuts section:
 * - Last run timestamp
 * - Last run status (success/warning/failed)
 * - Number of runs in last 24h
 */
router.get('/summary', async (req, res) => {
  try {
    await simulateDelay(360);
    res.json(agentSummary);
  } catch (error) {
    console.error('Agent summary error:', error);
    res.status(500).json({ error: 'Failed to fetch agent summary' });
  }
});

export default router;
