export type Range = '24h' | '7d' | '30d';
export type InsightType = 'timeseries' | 'status' | 'event';

export interface DashboardMetrics {
  workflowsRunLast24h: number;
  tasks: {
    outstanding: number;
    dueToday: number;
    overdue: number;
    finishedLast24h: number;
  };
}

export interface WorkflowsSummary {
  total: number;
  active: number;
  lastRunAt: string;
}

export interface TasksSummary {
  outstanding: number;
  dueToday: number;
  overdue: number;
  completed: number;
  lastCompletedAt: string;
}

export interface DataSummary {
  lastSyncAt: string;
  status: 'ok' | 'delayed' | 'error';
  sources: { name: string; status: 'ok' | 'delayed' | 'error' }[];
}

export interface AgentSummary {
  lastRunAt: string;
  lastRunStatus: 'success' | 'warning' | 'failed';
  runsLast24h: number;
}

export interface InsightTimeseries {
  id: string;
  title: string;
  type: 'timeseries';
  metric: string;
  currency?: string;
  latest: { ts: string; value: number; deltaPct?: number };
  favourited: boolean;
  series: { ts: string; value: number }[];
}

export interface InsightStatus {
  id: string;
  title: string;
  type: 'status';
  status: string;
  latest: { ts: string; value: string; severity?: 'low' | 'medium' | 'high' };
  favourited: boolean;
  history: { ts: string; value: string; severity?: 'low' | 'medium' | 'high' }[];
}

export type InsightItem = InsightTimeseries | InsightStatus;

export interface InsightList {
  items: InsightItem[];
  page: number;
  pageSize: number;
  total: number;
}

export interface AuthUser {
  userId: string;
  name: string;
  plan: string;
}

export interface Task {
  id: string;
  title: string;
  dueAt: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// API Error response
export interface ApiError {
  error: string;
  message?: string;
  status?: number;
}
