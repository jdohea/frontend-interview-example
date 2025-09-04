import { Router } from 'express';
import { authUser, simulateDelay } from '../data/mockData';

const router = Router();

/**
 * GET /api/auth/me
 * 
 * Returns authenticated user information (stub)
 * This endpoint simulates user authentication
 */
router.get('/me', async (req, res) => {
  try {
    await simulateDelay(300);
    res.json(authUser);
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Failed to get user information' });
  }
});

export default router;
