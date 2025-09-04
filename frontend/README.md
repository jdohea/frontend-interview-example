# Jarvio Frontend

React dashboard application for the frontend interview exercise.

## 🚀 Quick Start

```bash
# From project root
npm run dev:frontend

# Or from frontend directory  
cd frontend
npm run dev
```

Application runs on **http://localhost:5173** with hot module replacement.

## 📋 Interview Exercise

**Time Limit**: 45 minutes  
**Goal**: Complete the dashboard implementation

### Current State
✅ **Setup Complete:**
- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui design system
- API client with typed methods
- Basic UI shell with placeholders

🎯 **Your Task:**
Replace the placeholder content in `src/App.tsx` with a fully functional dashboard.

## 🛠 Technology Stack

### Core Framework
- **Vite**: Ultra-fast build tool with HMR
- **React 18**: Latest React with concurrent features
- **TypeScript**: Full type safety with strict mode

### Styling & Components  
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Radix UI**: Accessible primitive components
- **CSS Variables**: Theme-aware design tokens

### Data Management
- **Axios**: HTTP client with interceptors
- **React Query**: Server state management *(to be added)*
- **Zustand**: Client state management *(to be added)*

### Development
- **Hot Module Replacement**: Instant updates without losing state
- **TypeScript Path Mapping**: Clean imports with `@/` prefix
- **ESLint**: Code quality and consistency

## 📁 Project Structure

```
frontend/src/
├── components/
│   └── ui/                # shadcn/ui components
│       ├── button.tsx     # Button component with variants
│       ├── card.tsx       # Card layout components  
│       └── badge.tsx      # Status badge component
├── lib/
│   ├── utils.ts          # Utility functions (cn helper)
│   └── api.ts            # API client with typed methods
├── types.ts              # TypeScript type definitions
├── index.css             # Global styles + Tailwind
└── App.tsx               # Main dashboard (YOUR CANVAS!)
```

## 🎨 Design System

### Components Available

#### Card Components
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>KPI Title</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">42</div>
  </CardContent>
</Card>
```

#### Button Variants
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Subtle</Button>
<Button size="sm">Small</Button>
```

#### Status Badges
```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="default">Active</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="secondary">Neutral</Badge>
```

### Responsive Design
```tsx
// Mobile-first responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Color System
Uses CSS variables for theming:
- `bg-background` / `text-foreground` - Main colors
- `bg-card` / `text-card-foreground` - Card colors
- `bg-muted` / `text-muted-foreground` - Subtle colors
- `border-border` - Consistent borders

## 🔌 API Integration

### Pre-configured Client
```tsx
import { api } from '@/lib/api';

// All methods are typed and include error handling
const metrics = await api.dashboard.metrics();
const insights = await api.insights.list('24h', false);
```

### Available Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `api.auth.me()` | GET /auth/me | User info |
| `api.dashboard.metrics()` | GET /dashboard/metrics | KPI data |
| `api.workflows.summary()` | GET /workflows/summary | Workflows info |
| `api.tasks.summary()` | GET /tasks/summary | Tasks info |
| `api.data.summary()` | GET /data/summary | Data sources |
| `api.agent.summary()` | GET /agent/summary | Agent status |
| `api.insights.list(range, favourited)` | GET /insights | Insights list |

### Error Handling
```tsx
import { handleApiError } from '@/lib/api';

try {
  const data = await api.dashboard.metrics();
} catch (error) {
  const message = handleApiError(error); // User-friendly message
}
```

## 📊 Data Types

All TypeScript types are pre-defined in `src/types.ts`:

```tsx
import type { 
  DashboardMetrics, 
  InsightItem, 
  Range 
} from '@/types';
```

### Key Types
- `DashboardMetrics` - KPI card data
- `InsightTimeseries` - Time series insights with sparkline data
- `InsightStatus` - Status insights with severity levels
- `Range` - Time range filter (`'24h'` | `'7d'` | `'30d'`)

## 🎯 Implementation Guide

### 1. KPI Cards (15 min)
```tsx
// Fetch dashboard metrics
const { data: metrics } = useQuery({
  queryKey: ['dashboard-metrics'],
  queryFn: api.dashboard.metrics
});

// Render cards
<div className="grid grid-cols-4 gap-6">
  <Card>
    <CardHeader>
      <CardTitle>Workflows Run (24h)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{metrics?.workflowsRunLast24h}</div>
    </CardContent>
  </Card>
  {/* ... more cards */}
</div>
```

### 2. Insights Panel (20 min)
```tsx
const [range, setRange] = useState<Range>('24h');
const [favouritedOnly, setFavouritedOnly] = useState(false);

const { data: insights } = useQuery({
  queryKey: ['insights', range, favouritedOnly],
  queryFn: () => api.insights.list(range, favouritedOnly)
});

// Render insights with filtering
<Card>
  <CardHeader>
    <div className="flex justify-between">
      <CardTitle>Insights</CardTitle>
      <div className="flex gap-2">
        {['24h', '7d', '30d'].map(r => (
          <Button 
            key={r}
            variant={range === r ? 'default' : 'outline'}
            onClick={() => setRange(r)}
          >
            {r}
          </Button>
        ))}
      </div>
    </div>
  </CardHeader>
  <CardContent>
    {insights?.items.map(insight => (
      <InsightCard key={insight.id} insight={insight} />
    ))}
  </CardContent>
</Card>
```

### 3. Shortcuts Row (5 min)
```tsx
// Fetch all summaries in parallel
const queries = useQueries({
  queries: [
    { queryKey: ['workflows'], queryFn: api.workflows.summary },
    { queryKey: ['tasks'], queryFn: api.tasks.summary },
    { queryKey: ['data'], queryFn: api.data.summary },
    { queryKey: ['agent'], queryFn: api.agent.summary }
  ]
});

// Render shortcut cards
```

### 4. UX States (5 min)
```tsx
// Loading state
if (isLoading) return <div>Loading...</div>;

// Error state  
if (error) return (
  <div className="text-center p-8">
    <p className="text-destructive">{handleApiError(error)}</p>
    <Button onClick={refetch}>Try Again</Button>
  </div>
);

// Empty state
if (!data?.items.length) return (
  <div className="text-center p-8">
    <p className="text-muted-foreground">No insights available</p>
  </div>
);
```

## 🧩 Missing Dependencies

You'll need to add these during the exercise:

```bash
npm install @tanstack/react-query zustand
```

### React Query Setup
```tsx
// Add to main.tsx or App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

## 💡 Pro Tips

### Time Management
- **0-10 min**: Set up React Query, fetch dashboard metrics
- **10-25 min**: Build insights panel with filtering  
- **25-35 min**: Add shortcuts and loading states
- **35-45 min**: Polish, error handling, final testing

### Quick Wins
- Use `isLoading` and `error` from useQuery for UX states
- Test error handling with `?range=error` API parameter
- Focus on functionality over pixel-perfect styling
- Use existing shadcn/ui components for consistency

### Bonus Features
- Sparkline charts for time-series data
- Relative timestamps ("2 hours ago")
- Keyboard navigation
- Trend arrows (↑↓) for percentage changes
- Color-coded status badges

## 🚨 Common Pitfalls

1. **Don't over-engineer** - 45 minutes goes fast!
2. **Test error states early** - Use `?range=error`
3. **Keep components small** - Easier to debug
4. **Use TypeScript** - It'll catch bugs quickly
5. **Mobile responsive** - Grid should stack on small screens

## ⚡ Performance Notes

### What's Optimized
- Vite's lightning-fast HMR
- Tree-shaking for small bundle size
- CSS-in-JS avoided for better performance
- Lazy loading ready (if needed)

### Bundle Analysis
```bash
npm run build
npm run preview  # Test production build locally
```

---

**Ready to build something awesome?** 🎨  
**Backend API**: http://localhost:3001  
**Frontend Dev**: http://localhost:5173  

Good luck! 🚀