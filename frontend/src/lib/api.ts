import axios from 'axios';
import type { 
  DashboardMetrics,
  WorkflowsSummary,
  TasksSummary,
  DataSummary,
  AgentSummary,
  InsightList,
  AuthUser,
  Range
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging (optional)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * API CLIENT
 * 
 * Provides typed methods for calling the Jarvio backend API.
 * Each method includes error handling and returns typed data.
 */
export const api = {
  /**
   * Authentication (stub)
   */
  auth: {
    me: async (): Promise<AuthUser> => {
      const response = await apiClient.get<AuthUser>('/auth/me');
      return response.data;
    },
  },

  /**
   * Dashboard metrics
   */
  dashboard: {
    metrics: async (now?: string): Promise<DashboardMetrics> => {
      const params = now ? { now } : {};
      const response = await apiClient.get<DashboardMetrics>('/dashboard/metrics', { params });
      return response.data;
    },
  },

  /**
   * Area summaries for shortcuts
   */
  workflows: {
    summary: async (): Promise<WorkflowsSummary> => {
      const response = await apiClient.get<WorkflowsSummary>('/workflows/summary');
      return response.data;
    },
  },

  tasks: {
    summary: async (): Promise<TasksSummary> => {
      const response = await apiClient.get<TasksSummary>('/tasks/summary');
      return response.data;
    },
  },

  data: {
    summary: async (): Promise<DataSummary> => {
      const response = await apiClient.get<DataSummary>('/data/summary');
      return response.data;
    },
  },

  agent: {
    summary: async (): Promise<AgentSummary> => {
      const response = await apiClient.get<AgentSummary>('/agent/summary');
      return response.data;
    },
  },

  /**
   * Insights
   */
  insights: {
    list: async (
      range: Range = '24h',
      favourited: boolean = false,
      page: number = 1,
      pageSize: number = 20
    ): Promise<InsightList> => {
      const params = {
        range,
        favourited: String(favourited),
        page: String(page),
        pageSize: String(pageSize),
      };
      const response = await apiClient.get<InsightList>('/insights', { params });
      return response.data;
    },

    favourited: async (range: Range = '30d'): Promise<{ items: string[] }> => {
      const params = { range };
      const response = await apiClient.get<{ items: string[] }>('/insights/favourited', { params });
      return response.data;
    },

    series: async (
      metric: string,
      market: string = 'GB',
      range: Range = '30d'
    ): Promise<{
      metric: string;
      market: string;
      currency?: string;
      series: { ts: string; value: number }[];
    }> => {
      const params = { metric, market, range };
      const response = await apiClient.get('/insights/series', { params });
      return response.data;
    },
  },
};

/**
 * UTILITY FUNCTIONS
 */

// Generic error handler for React components
export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    if (error.response?.status === 404) {
      return 'Resource not found';
    }
    if (error.response?.status >= 500) {
      return 'Server error - please try again later';
    }
    if (error.code === 'ECONNREFUSED') {
      return 'Unable to connect to server';
    }
  }
  return error.message || 'An unexpected error occurred';
};

// Check if the API is available
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await apiClient.get('/health');
    return true;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export default api;
