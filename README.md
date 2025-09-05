# Jarvio Frontend Interview Exercise

A full-stack dashboard application for workflow automation platform interview exercise.

## 🚀 Quick Start

```bash
# Clone and setup the entire project
git clone <repository-url>
cd frontend-interview

# Install all dependencies and start development servers
npm run setup
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173 (Vite dev server with HMR)
- **Backend**: http://localhost:3001 (Express API with nodemon auto-reload)

## 📋 Exercise Overview

**Time Limit**: 45 minutes  
**Goal**: Build a dashboard cover page for Jarvio's workflow automation platform

### What to Build

1. **KPI Cards** (top row)
   - Workflows run (last 24h)
   - Tasks outstanding
   - Tasks due (today + overdue total)
   - Tasks finished (last 24h)

2. **Insights Panel**
   - List insights (most-recent first)
   - Time-series: show latest value + tiny sparkline
   - Status/event: show status badge + message + timestamp
   - Toggle "Favourited only"
   - Range selector: 24h / 7d / 30d

3. **Shortcuts Row**
   - Cards for Workflows, Tasks, Data, Agent
   - Show summary counts/status

4. **Good UX States**
   - Loading states
   - Error states (test with `?range=error`)
   - Empty states

## 🛠 Technology Stack

### Frontend
- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui (Radix-based components)
- **Data Fetching**: Axios + React Query
- **State Management**: Zustand
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js + Express.js + TypeScript
- **Data**: In-memory mock data (resets on restart)
- **CORS**: Enabled for localhost:5173
- **Hot Reload**: Nodemon with TypeScript support

## 📁 Project Structure

```
frontend-interview/
├── README.md                 # This file
├── package.json             # Monorepo workspace configuration
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/ui/   # shadcn/ui components
│   │   ├── lib/            # Utilities and API client
│   │   ├── types.ts        # TypeScript type definitions
│   │   └── App.tsx         # Main dashboard component (starter)
│   ├── public/             # Static assets
│   └── package.json
└── backend/                 # Express API server
    ├── src/
    │   ├── routes/         # API route handlers
    │   ├── data/           # Mock data store
    │   ├── types/          # Shared TypeScript types
    │   └── index.ts        # Express server entry point
    └── package.json
```

## 🔌 Available APIs

All endpoints include realistic latency (300-500ms) and proper error handling.

### Base URL: `http://localhost:3001/api`

| Endpoint | Description |
|----------|-------------|
| `GET /auth/me` | User authentication (stub) |
| `GET /dashboard/metrics` | Dashboard KPIs |
| `GET /workflows/summary` | Workflows summary |
| `GET /tasks/summary` | Tasks summary |
| `GET /data/summary` | Data sources summary |
| `GET /agent/summary` | Agent summary |
| `GET /insights?range=24h&favourited=false` | Insights list |
| `GET /insights/favourited` | Favourited insights |
| `GET /insights/series` | Time series data |

**Error Testing**: Use `?range=error` to simulate API failures.

## 🎯 Acceptance Criteria

### Functionality
- ✅ KPI cards show correct values from `/dashboard/metrics`
- ✅ Insights panel loads and filters by range/favourited
- ✅ Time-series show latest values (bonus: sparklines)
- ✅ Status insights show badges + messages
- ✅ Shortcuts show summaries from respective endpoints
- ✅ Error handling with retry capability

### Code Quality
- ✅ Clean component decomposition
- ✅ Proper state management (React Query + Zustand)
- ✅ TypeScript usage with proper typing
- ✅ Clear naming conventions

### UX & Accessibility
- ✅ Loading states for all data fetching
- ✅ Error states with user-friendly messages
- ✅ Empty states when no data
- ✅ Keyboard navigation support

### Polish
- ✅ Status badges with appropriate colors
- ✅ Relative timestamps
- ✅ Trend indicators
- ✅ Micro-interactions

## 💡 Development Tips

### Getting Started
1. The starter template in `frontend/src/App.tsx` provides the basic layout
2. Use the API client: `import { api } from '@/lib/api'`
3. All TypeScript types are defined in `src/types.ts`
4. shadcn/ui components are ready to use

### Data Fetching Pattern
```tsx
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

const { data, isLoading, error } = useQuery({
  queryKey: ['dashboard-metrics'],
  queryFn: api.dashboard.metrics
});
```

### Error Handling
```tsx
// Test error states
const { data, error } = useQuery({
  queryKey: ['insights', 'error'],
  queryFn: () => api.insights.list('error' as any) // Triggers 500 error
});
```

### Mock Data Notes
- Data is consistent and realistic
- Timestamps are relative to `2025-09-04T12:00:00Z`
- Favourited insights: `ins_sales_gb`, `ins_account_health`
- All numeric values include percentage changes

## 🧪 Available Commands

### Root Level
```bash
npm run setup          # Install all dependencies
npm run dev            # Start both frontend and backend
npm run build          # Build both projects
npm start              # Start production backend
```

### Frontend Only
```bash
cd frontend
npm run dev            # Start Vite dev server
npm run build          # Build for production
npm run preview        # Preview production build
```

### Backend Only
```bash
cd backend
npm run dev            # Start with nodemon (auto-reload)
npm run build          # Compile TypeScript
npm start              # Start production server
```

## 🎨 Design System

### Colors & Tokens
- Uses CSS variables from shadcn/ui
- Consistent spacing with Tailwind classes
- Responsive design with mobile-first approach

### Components Available
- `Button` - Various sizes and variants
- `Card` - Container with header, content, footer
- `Badge` - Status indicators with color variants
- More components can be added as needed

