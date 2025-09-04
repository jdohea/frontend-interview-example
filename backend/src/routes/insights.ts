import { Router } from 'express';
import { 
  getInsightsByRange, 
  filterInsightsByFavourited, 
  favouritedInsights, 
  getInsightById,
  simulateDelay 
} from '../data/mockData';
import { Range } from '../types';

const router = Router();

/**
 * GET /api/insights
 * 
 * Returns paginated insights list with filtering
 * 
 * Query params:
 * - range: '24h' | '7d' | '30d' (default: '24h')
 * - favourited: 'true' | 'false' (default: 'false')
 * - page: number (default: 1)
 * - pageSize: number (default: 20)
 * 
 * Special: Use range=error to test error handling
 */
router.get('/', async (req, res) => {
  try {
    // Intentional error path for testing error UX
    if (req.query.range === 'error') {
      await simulateDelay(400);
      return res.status(500).json({ error: 'Upstream error' });
    }
    
    await simulateDelay(500);
    
    const range = (req.query.range as Range) || '24h';
    const favouritedOnly = req.query.favourited === 'true';
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    
    // Validate range
    if (!['24h', '7d', '30d'].includes(range)) {
      return res.status(400).json({ 
        error: 'Invalid range', 
        message: 'Range must be one of: 24h, 7d, 30d' 
      });
    }
    
    // Get insights for the specified range
    let insights = getInsightsByRange(range);
    
    // Filter by favourited status
    if (favouritedOnly) {
      insights = filterInsightsByFavourited(insights, true);
    }
    
    // Pagination (simple slice for demo)
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedInsights = insights.slice(startIndex, endIndex);
    
    const response = {
      items: paginatedInsights,
      page,
      pageSize,
      total: insights.length
    };
    
    res.json(response);
    
  } catch (error) {
    console.error('Insights list error:', error);
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});

/**
 * GET /api/insights/favourited
 * 
 * Returns list of favourited insight IDs for the specified range
 * 
 * Query params:
 * - range: '24h' | '7d' | '30d' (default: '30d')
 */
router.get('/favourited', async (req, res) => {
  try {
    await simulateDelay(200);
    
    const range = (req.query.range as Range) || '30d';
    
    // Validate range
    if (!['24h', '7d', '30d'].includes(range)) {
      return res.status(400).json({ 
        error: 'Invalid range', 
        message: 'Range must be one of: 24h, 7d, 30d' 
      });
    }
    
    // For demo, favourited insights are the same regardless of range
    // In a real app, this might vary by time range
    res.json({ items: favouritedInsights });
    
  } catch (error) {
    console.error('Favourited insights error:', error);
    res.status(500).json({ error: 'Failed to fetch favourited insights' });
  }
});

/**
 * GET /api/insights/series
 * 
 * Returns deep-dive time series data for a specific metric
 * Optional endpoint for detailed chart views
 * 
 * Query params:
 * - metric: string (required, e.g., 'sales', 'buybox_pct')
 * - market: string (optional, e.g., 'GB', 'US')
 * - range: '24h' | '7d' | '30d' (default: '30d')
 */
router.get('/series', async (req, res) => {
  try {
    await simulateDelay(350);
    
    const metric = req.query.metric as string;
    const market = req.query.market as string || 'GB';
    const range = (req.query.range as Range) || '30d';
    
    if (!metric) {
      return res.status(400).json({ 
        error: 'Missing metric parameter',
        message: 'metric parameter is required'
      });
    }
    
    // Validate range
    if (!['24h', '7d', '30d'].includes(range)) {
      return res.status(400).json({ 
        error: 'Invalid range', 
        message: 'Range must be one of: 24h, 7d, 30d' 
      });
    }
    
    // Find the insight with matching metric
    const insights = getInsightsByRange(range);
    const insight = insights.find(item => 
      item.type === 'timeseries' && 
      item.metric === metric
    );
    
    if (!insight) {
      return res.status(404).json({ 
        error: 'Metric not found',
        message: `No time series data found for metric: ${metric}`
      });
    }
    
    if (insight.type !== 'timeseries') {
      return res.status(400).json({ 
        error: 'Invalid metric type',
        message: `Metric ${metric} is not a time series`
      });
    }
    
    const response = {
      metric,
      market,
      currency: insight.currency || undefined,
      series: insight.series
    };
    
    res.json(response);
    
  } catch (error) {
    console.error('Insight series error:', error);
    res.status(500).json({ error: 'Failed to fetch insight series' });
  }
});

export default router;
