# Jarvio Backend API

Mock API server for the Jarvio frontend interview exercise.

## 🚀 Quick Start

```bash
# From project root
npm run dev:backend

# Or from backend directory
cd backend
npm run dev
```

Server runs on **http://localhost:3001** with auto-reload enabled.

## 📖 API Documentation

### Base URL: `http://localhost:3001/api`

All endpoints include realistic latency (300-500ms) and return JSON responses.

---

### 🔐 Authentication

#### `GET /auth/me`
Returns authenticated user information (stub).

**Response:**
```json
{
  "userId": "u_123",
  "name": "Alex",
  "plan": "Pro"
}
```

---

### 📊 Dashboard Metrics

#### `GET /dashboard/metrics`
Returns KPI metrics for dashboard cards.

**Query Parameters:**
- `now` (optional) - ISO timestamp for consistent demo data

**Response:**
```json
{
  "workflowsRunLast24h": 46,
  "tasks": {
    "outstanding": 18,
    "dueToday": 7,
    "overdue": 3,
    "finishedLast24h": 22
  }
}
```

---

### 🔄 Area Summaries (Shortcuts)

#### `GET /workflows/summary`
Workflows summary for shortcuts section.

**Response:**
```json
{
  "total": 128,
  "active": 37,
  "lastRunAt": "2025-09-04T10:42:15Z"
}
```

#### `GET /tasks/summary`
Tasks summary for shortcuts section.

**Response:**
```json
{
  "outstanding": 18,
  "dueToday": 7,
  "overdue": 3,
  "completed": 942,
  "lastCompletedAt": "2025-09-04T10:58:09Z"
}
```

#### `GET /data/summary`
Data sources summary for shortcuts section.

**Response:**
```json
{
  "lastSyncAt": "2025-09-04T09:30:00Z",
  "status": "ok",
  "sources": [
    { "name": "Amazon SP-API", "status": "ok" },
    { "name": "Shopify", "status": "delayed" }
  ]
}
```

#### `GET /agent/summary`
Agent summary for shortcuts section.

**Response:**
```json
{
  "lastRunAt": "2025-09-04T10:12:00Z",
  "lastRunStatus": "success",
  "runsLast24h": 12
}
```

---

### 📈 Insights

#### `GET /insights`
Returns paginated insights list with filtering.

**Query Parameters:**
- `range`: `'24h'` | `'7d'` | `'30d'` (default: `'24h'`)
- `favourited`: `'true'` | `'false'` (default: `'false'`)
- `page`: number (default: `1`)
- `pageSize`: number (default: `20`)

**Special Parameter:**
- `range=error` - Returns HTTP 500 for error testing

**Response:**
```json
{
  "items": [
    {
      "id": "ins_sales_gb",
      "title": "Sales (UK)",
      "type": "timeseries",
      "metric": "sales",
      "currency": "GBP",
      "latest": { "ts": "2025-09-04T11:00:00Z", "value": 4821.34, "deltaPct": 12.4 },
      "favourited": true,
      "series": [
        { "ts": "2025-09-03T12:00:00Z", "value": 4102.10 },
        { "ts": "2025-09-04T11:00:00Z", "value": 4821.34 }
      ]
    },
    {
      "id": "ins_account_health",
      "title": "Account Health",
      "type": "status",
      "status": "At Risk",
      "latest": { "ts": "2025-09-04T08:12:00Z", "value": "ASIN policy warning", "severity": "high" },
      "favourited": true,
      "history": [
        { "ts": "2025-09-03T17:41:00Z", "value": "Late shipment spike", "severity": "medium" },
        { "ts": "2025-09-04T08:12:00Z", "value": "ASIN policy warning", "severity": "high" }
      ]
    }
  ],
  "page": 1,
  "pageSize": 20,
  "total": 3
}
```

#### `GET /insights/favourited`
Returns list of favourited insight IDs.

**Query Parameters:**
- `range`: `'24h'` | `'7d'` | `'30d'` (default: `'30d'`)

**Response:**
```json
{
  "items": ["ins_sales_gb", "ins_account_health"]
}
```

#### `GET /insights/series`
Returns detailed time series data for charting.

**Query Parameters:**
- `metric`: string (required) - e.g., `'sales'`, `'buybox_pct'`
- `market`: string (optional) - e.g., `'GB'`, `'US'` (default: `'GB'`)
- `range`: `'24h'` | `'7d'` | `'30d'` (default: `'30d'`)

**Response:**
```json
{
  "metric": "sales",
  "market": "GB",
  "currency": "GBP",
  "series": [
    { "ts": "2025-08-06T11:00:00Z", "value": 2980.11 },
    { "ts": "2025-09-04T11:00:00Z", "value": 4821.34 }
  ]
}
```

---

### 📋 Tasks (Optional)

#### `GET /tasks`
Returns list of open tasks.

**Query Parameters:**
- `status`: `'open'` | `'completed'` (default: `'open'`)
- `limit`: number (default: `50`)

**Response:**
```json
{
  "items": [
    { "id": "t1", "title": "Fix bullets for ASIN B07...", "dueAt": "2025-09-04T18:00:00Z", "priority": "high" },
    { "id": "t2", "title": "Raise case for suppressed SKU", "dueAt": "2025-09-03T17:00:00Z", "priority": "medium" }
  ]
}
```

---

## 🏗 Architecture

### Data Storage
**In-Memory Mock Data** - Located in `src/data/mockData.ts`

```
📦 Mock Data Store
├── Dashboard metrics (KPIs)
├── Area summaries (Workflows, Tasks, Data, Agent)
├── Insights by time range (24h, 7d, 30d)
├── Favourited insights list
└── Open tasks list
```

**Important Notes:**
- Data resets when server restarts
- All timestamps relative to `2025-09-04T12:00:00Z`
- Realistic data with proper relationships
- Includes percentage changes and trends

### Error Handling
- Structured error responses with helpful messages
- Intentional error path: `?range=error` returns HTTP 500
- Network timeout simulation
- Validation for query parameters

### CORS Configuration
Enabled for:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative React dev server)

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.ts           # Express server setup
│   ├── types/
│   │   └── index.ts       # TypeScript type definitions
│   ├── data/
│   │   └── mockData.ts    # In-memory data store
│   └── routes/
│       ├── auth.ts        # Authentication endpoints
│       ├── dashboard.ts   # Dashboard metrics
│       ├── workflows.ts   # Workflows summary
│       ├── tasks.ts       # Tasks summary & list
│       ├── data.ts        # Data sources summary
│       ├── agent.ts       # Agent summary
│       └── insights.ts    # Insights endpoints
├── dist/                  # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json         # TypeScript configuration
└── nodemon.json          # Development auto-reload config
```

## 🛠 Development

### Available Scripts
```bash
npm run dev        # Start with auto-reload (nodemon)
npm run build      # Compile TypeScript to dist/
npm start          # Start production server
npm run type-check # Check TypeScript without building
```

### Adding New Endpoints
1. Create route handler in `src/routes/`
2. Add route to `src/index.ts`
3. Update mock data in `src/data/mockData.ts`
4. Add types to `src/types/index.ts`

### Debugging
- Server logs all requests with morgan
- Structured error logging to console
- Health check: `GET /health`

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

### TypeScript Config
- Target: ES2022
- Module: CommonJS (for Node.js compatibility)
- Strict mode enabled
- Path mapping: `@/*` → `./src/*`

## 📊 Mock Data Details

### Time Ranges
- **24h**: 5 data points, hourly granularity
- **7d**: 7 data points, daily granularity  
- **30d**: 6 data points, weekly granularity

### Insight Types
1. **Timeseries**: Numeric values with percentage changes
   - Sales (GBP currency)
   - Buy Box percentage
   - Inventory days of cover

2. **Status**: Text values with severity levels
   - Account Health (low/medium/high)
   - System status updates

### Data Relationships
- Dashboard metrics aggregate from detailed data
- Shortcuts show summary statistics
- Insights vary by time range with realistic trends
- Favourited insights remain consistent across ranges

## 🧪 Testing Endpoints

### Health Check
```bash
curl http://localhost:3001/health
```

### Dashboard Metrics
```bash
curl http://localhost:3001/api/dashboard/metrics
```

### Insights with Filtering
```bash
# 24h insights
curl "http://localhost:3001/api/insights?range=24h&favourited=false"

# Favourited only
curl "http://localhost:3001/api/insights?range=7d&favourited=true"

# Error testing
curl "http://localhost:3001/api/insights?range=error"
```

## 🚨 Error Responses

All errors return JSON with consistent structure:

```json
{
  "error": "Error Type",
  "message": "Detailed error message"
}
```

Common HTTP status codes:
- `400` - Bad Request (invalid parameters)
- `404` - Not Found (invalid endpoint)
- `500` - Internal Server Error (simulated or real errors)

---

**Happy coding!** 🚀
