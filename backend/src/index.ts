import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Import routes
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import workflowsRoutes from './routes/workflows';
import tasksRoutes from './routes/tasks';
import dataRoutes from './routes/data';
import agentRoutes from './routes/agent';
import insightsRoutes from './routes/insights';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Frontend development servers
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with']
}));

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/workflows', workflowsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/insights', insightsRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /health',
      'GET /api/auth/me',
      'GET /api/dashboard/metrics',
      'GET /api/workflows/summary',
      'GET /api/tasks/summary',
      'GET /api/data/summary',
      'GET /api/agent/summary',
      'GET /api/insights',
      'GET /api/insights/favourited',
      'GET /api/insights/series'
    ]
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

app.listen(PORT, () => {
  console.log(`
🚀 Jarvio Mock API Server
📡 Server running on http://localhost:${PORT}
🌍 CORS enabled for http://localhost:5173 and http://localhost:3000
📋 Available endpoints:
   • GET /health - Health check
   • GET /api/auth/me - User authentication (stub)
   • GET /api/dashboard/metrics - Dashboard KPIs
   • GET /api/workflows/summary - Workflows summary
   • GET /api/tasks/summary - Tasks summary
   • GET /api/data/summary - Data sources summary
   • GET /api/agent/summary - Agent summary
   • GET /api/insights - Insights list (supports ?range=24h|7d|30d&favourited=true|false)
   • GET /api/insights/favourited - Favourited insights list
   • GET /api/insights/series - Time series data
   • GET /api/tasks - Open tasks list

💡 Tip: Use ?range=error to test error handling
  `);
});
