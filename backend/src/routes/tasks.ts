import { Router } from 'express';
import { tasksSummary, openTasks, simulateDelay } from '../data/mockData';

const router = Router();

/**
 * GET /api/tasks/summary
 * 
 * Returns tasks summary for shortcuts section:
 * - Outstanding tasks count
 * - Tasks due today count
 * - Overdue tasks count
 * - Completed tasks count
 * - Last completed timestamp
 */
router.get('/summary', async (req, res) => {
  try {
    await simulateDelay(420);
    res.json(tasksSummary);
  } catch (error) {
    console.error('Tasks summary error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks summary' });
  }
});

/**
 * GET /api/tasks
 * 
 * Returns list of open tasks (optional endpoint for demo)
 * Query params:
 * - status: 'open' | 'completed' (default: 'open')
 * - limit: number (default: 50)
 */
router.get('/', async (req, res) => {
  try {
    await simulateDelay(350);
    
    const status = req.query.status as string || 'open';
    const limit = parseInt(req.query.limit as string) || 50;
    
    if (status === 'open') {
      const limitedTasks = openTasks.slice(0, limit);
      res.json({ items: limitedTasks });
    } else {
      // For demo, return empty completed tasks
      res.json({ items: [] });
    }
  } catch (error) {
    console.error('Tasks list error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

export default router;
