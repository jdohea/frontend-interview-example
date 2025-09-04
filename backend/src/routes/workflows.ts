import { Router } from 'express';
import { workflowsSummary, simulateDelay } from '../data/mockData';

const router = Router();

/**
 * GET /api/workflows/summary
 * 
 * Returns workflows summary for shortcuts section:
 * - Total workflows count
 * - Active workflows count  
 * - Last run timestamp
 */
router.get('/summary', async (req, res) => {
  try {
    await simulateDelay(380);
    res.json(workflowsSummary);
  } catch (error) {
    console.error('Workflows summary error:', error);
    res.status(500).json({ error: 'Failed to fetch workflows summary' });
  }
});

export default router;
