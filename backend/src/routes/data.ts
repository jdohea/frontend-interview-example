import { Router } from 'express';
import { dataSummary, simulateDelay } from '../data/mockData';

const router = Router();

/**
 * GET /api/data/summary
 * 
 * Returns data sources summary for shortcuts section:
 * - Last sync timestamp
 * - Overall sync status
 * - Individual source statuses
 */
router.get('/summary', async (req, res) => {
  try {
    await simulateDelay(400);
    res.json(dataSummary);
  } catch (error) {
    console.error('Data summary error:', error);
    res.status(500).json({ error: 'Failed to fetch data summary' });
  }
});

export default router;
