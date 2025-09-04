import { Router } from 'express';
import { dashboardMetrics, simulateDelay } from '../data/mockData';

const router = Router();

/**
 * GET /api/dashboard/metrics
 * 
 * Returns dashboard KPI metrics including:
 * - Workflows run in last 24h
 * - Tasks outstanding, due today, overdue, finished in last 24h
 * 
 * Query params:
 * - now: ISO timestamp (optional, for demo consistency)
 */
router.get('/metrics', async (req, res) => {
  try {
    await simulateDelay(450);
    
    // You could use the 'now' param to calculate time-based metrics
    // const now = req.query.now as string || new Date().toISOString();
    
    res.json(dashboardMetrics);
  } catch (error) {
    console.error('Dashboard metrics error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
});

export default router;
