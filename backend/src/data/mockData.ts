import { 
  DashboardMetrics, 
  WorkflowsSummary, 
  TasksSummary, 
  DataSummary, 
  AgentSummary, 
  InsightItem, 
  AuthUser, 
  Task 
} from '../types';

/**
 * IN-MEMORY DATA STORE
 * 
 * This simulates a database with mock data for the Jarvio dashboard.
 * The data resets when the server restarts.
 * 
 * In a real application, this would be replaced with:
 * - Database queries (PostgreSQL, MongoDB, etc.)
 * - External API calls
 * - File-based persistence
 * - Redis cache
 * 
 * Data Structure:
 * - All timestamps are in ISO 8601 format
 * - Metrics are calculated based on current time
 * - Insights data varies by time range (24h, 7d, 30d)
 * - Favourited insights are stored in a separate array
 */

// Simulated current time for consistent demo data
const NOW = '2025-09-04T12:00:00Z';

// User authentication (stub)
export const authUser: AuthUser = {
  userId: 'u_123',
  name: 'Alex',
  plan: 'Pro'
};

// Dashboard metrics
export const dashboardMetrics: DashboardMetrics = {
  workflowsRunLast24h: 46,
  tasks: {
    outstanding: 18,
    dueToday: 7,
    overdue: 3,
    finishedLast24h: 22
  }
};

// Area summaries
export const workflowsSummary: WorkflowsSummary = {
  total: 128,
  active: 37,
  lastRunAt: '2025-09-04T10:42:15Z'
};

export const tasksSummary: TasksSummary = {
  outstanding: 18,
  dueToday: 7,
  overdue: 3,
  completed: 942,
  lastCompletedAt: '2025-09-04T10:58:09Z'
};

export const dataSummary: DataSummary = {
  lastSyncAt: '2025-09-04T09:30:00Z',
  status: 'ok',
  sources: [
    { name: 'Amazon SP-API', status: 'ok' },
    { name: 'Shopify', status: 'delayed' }
  ]
};

export const agentSummary: AgentSummary = {
  lastRunAt: '2025-09-04T10:12:00Z',
  lastRunStatus: 'success',
  runsLast24h: 12
};

// Open tasks for demo
export const openTasks: Task[] = [
  { id: 't1', title: 'Fix bullets for ASIN B07...', dueAt: '2025-09-04T18:00:00Z', priority: 'high' },
  { id: 't2', title: 'Raise case for suppressed SKU', dueAt: '2025-09-03T17:00:00Z', priority: 'medium' },
  { id: 't3', title: 'Restock Plan – UK', dueAt: '2025-09-05T12:00:00Z', priority: 'low' }
];

// Favourited insights IDs
export const favouritedInsights = ['ins_sales_gb', 'ins_account_health'];

// Insights data by time range
export const insights24h: InsightItem[] = [
  {
    id: 'ins_sales_gb',
    title: 'Sales (UK)',
    type: 'timeseries',
    metric: 'sales',
    currency: 'GBP',
    latest: { ts: '2025-09-04T11:00:00Z', value: 4821.34, deltaPct: 12.4 },
    favourited: true,
    series: [
      { ts: '2025-09-03T12:00:00Z', value: 4102.10 },
      { ts: '2025-09-03T18:00:00Z', value: 4388.53 },
      { ts: '2025-09-04T00:00:00Z', value: 4605.22 },
      { ts: '2025-09-04T06:00:00Z', value: 4719.88 },
      { ts: '2025-09-04T11:00:00Z', value: 4821.34 }
    ]
  },
  {
    id: 'ins_account_health',
    title: 'Account Health',
    type: 'status',
    status: 'At Risk',
    latest: { ts: '2025-09-04T08:12:00Z', value: 'ASIN policy warning', severity: 'high' },
    favourited: true,
    history: [
      { ts: '2025-09-03T17:41:00Z', value: 'Late shipment spike', severity: 'medium' },
      { ts: '2025-09-04T08:12:00Z', value: 'ASIN policy warning', severity: 'high' }
    ]
  },
  {
    id: 'ins_buybox_pct',
    title: 'Buy Box %',
    type: 'timeseries',
    metric: 'buybox_pct',
    latest: { ts: '2025-09-04T11:00:00Z', value: 84.2, deltaPct: -3.1 },
    favourited: false,
    series: [
      { ts: '2025-09-03T11:00:00Z', value: 87.3 },
      { ts: '2025-09-04T11:00:00Z', value: 84.2 }
    ]
  }
];

export const insights7d: InsightItem[] = [
  {
    id: 'ins_sales_gb',
    title: 'Sales (UK)',
    type: 'timeseries',
    metric: 'sales',
    currency: 'GBP',
    latest: { ts: '2025-09-04T11:00:00Z', value: 4821.34, deltaPct: 12.4 },
    favourited: true,
    series: [
      { ts: '2025-08-29T11:00:00Z', value: 3410.21 },
      { ts: '2025-08-30T11:00:00Z', value: 3555.18 },
      { ts: '2025-08-31T11:00:00Z', value: 3721.44 },
      { ts: '2025-09-01T11:00:00Z', value: 4290.11 },
      { ts: '2025-09-02T11:00:00Z', value: 4012.77 },
      { ts: '2025-09-03T11:00:00Z', value: 4560.05 },
      { ts: '2025-09-04T11:00:00Z', value: 4821.34 }
    ]
  },
  {
    id: 'ins_account_health',
    title: 'Account Health',
    type: 'status',
    status: 'At Risk',
    latest: { ts: '2025-09-04T08:12:00Z', value: 'ASIN policy warning', severity: 'high' },
    favourited: true,
    history: [
      { ts: '2025-09-02T17:41:00Z', value: 'Late shipment spike', severity: 'medium' },
      { ts: '2025-09-04T08:12:00Z', value: 'ASIN policy warning', severity: 'high' }
    ]
  },
  {
    id: 'ins_buybox_pct',
    title: 'Buy Box %',
    type: 'timeseries',
    metric: 'buybox_pct',
    latest: { ts: '2025-09-04T11:00:00Z', value: 84.2, deltaPct: -3.1 },
    favourited: false,
    series: [
      { ts: '2025-08-30T11:00:00Z', value: 90.4 },
      { ts: '2025-09-01T11:00:00Z', value: 88.0 },
      { ts: '2025-09-03T11:00:00Z', value: 87.3 },
      { ts: '2025-09-04T11:00:00Z', value: 84.2 }
    ]
  },
  {
    id: 'ins_inventory_days',
    title: 'Inventory Days of Cover',
    type: 'timeseries',
    metric: 'inventory_days',
    latest: { ts: '2025-09-04T11:00:00Z', value: 24, deltaPct: -7.5 },
    favourited: false,
    series: [
      { ts: '2025-08-29T11:00:00Z', value: 28 },
      { ts: '2025-09-01T11:00:00Z', value: 26 },
      { ts: '2025-09-04T11:00:00Z', value: 24 }
    ]
  }
];

export const insights30d: InsightItem[] = [
  {
    id: 'ins_sales_gb',
    title: 'Sales (UK)',
    type: 'timeseries',
    metric: 'sales',
    currency: 'GBP',
    latest: { ts: '2025-09-04T11:00:00Z', value: 4821.34, deltaPct: 18.7 },
    favourited: true,
    series: [
      { ts: '2025-08-06T11:00:00Z', value: 2980.11 },
      { ts: '2025-08-13T11:00:00Z', value: 3450.52 },
      { ts: '2025-08-20T11:00:00Z', value: 3722.09 },
      { ts: '2025-08-27T11:00:00Z', value: 4211.73 },
      { ts: '2025-09-03T11:00:00Z', value: 4560.05 },
      { ts: '2025-09-04T11:00:00Z', value: 4821.34 }
    ]
  },
  {
    id: 'ins_account_health',
    title: 'Account Health',
    type: 'status',
    status: 'At Risk',
    latest: { ts: '2025-09-04T08:12:00Z', value: 'ASIN policy warning', severity: 'high' },
    favourited: true,
    history: [
      { ts: '2025-08-15T14:21:00Z', value: 'Performance metrics declining', severity: 'low' },
      { ts: '2025-09-02T17:41:00Z', value: 'Late shipment spike', severity: 'medium' },
      { ts: '2025-09-04T08:12:00Z', value: 'ASIN policy warning', severity: 'high' }
    ]
  },
  {
    id: 'ins_buybox_pct',
    title: 'Buy Box %',
    type: 'timeseries',
    metric: 'buybox_pct',
    latest: { ts: '2025-09-04T11:00:00Z', value: 84.2, deltaPct: -8.4 },
    favourited: false,
    series: [
      { ts: '2025-08-06T11:00:00Z', value: 92.1 },
      { ts: '2025-08-13T11:00:00Z', value: 91.5 },
      { ts: '2025-08-20T11:00:00Z', value: 90.8 },
      { ts: '2025-08-27T11:00:00Z', value: 89.2 },
      { ts: '2025-09-03T11:00:00Z', value: 87.3 },
      { ts: '2025-09-04T11:00:00Z', value: 84.2 }
    ]
  },
  {
    id: 'ins_inventory_days',
    title: 'Inventory Days of Cover',
    type: 'timeseries',
    metric: 'inventory_days',
    latest: { ts: '2025-09-04T11:00:00Z', value: 24, deltaPct: -20.0 },
    favourited: false,
    series: [
      { ts: '2025-08-06T11:00:00Z', value: 30 },
      { ts: '2025-08-13T11:00:00Z', value: 29 },
      { ts: '2025-08-20T11:00:00Z', value: 28 },
      { ts: '2025-08-27T11:00:00Z', value: 27 },
      { ts: '2025-09-03T11:00:00Z', value: 25 },
      { ts: '2025-09-04T11:00:00Z', value: 24 }
    ]
  }
];

/**
 * HELPER FUNCTIONS
 */

// Get insights by range
export function getInsightsByRange(range: '24h' | '7d' | '30d'): InsightItem[] {
  switch (range) {
    case '24h': return insights24h;
    case '7d': return insights7d;
    case '30d': return insights30d;
    default: return insights24h;
  }
}

// Filter insights by favourited status
export function filterInsightsByFavourited(insights: InsightItem[], favouritedOnly: boolean): InsightItem[] {
  if (!favouritedOnly) return insights;
  return insights.filter(insight => favouritedInsights.includes(insight.id));
}

// Get insight by ID and range
export function getInsightById(id: string, range: '24h' | '7d' | '30d'): InsightItem | undefined {
  const insights = getInsightsByRange(range);
  return insights.find(insight => insight.id === id);
}

// Simulate network delay
export const simulateDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
