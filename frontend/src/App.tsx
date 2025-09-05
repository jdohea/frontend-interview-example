import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/**
 * JARVIO DASHBOARD - STARTER TEMPLATE
 * 
 * This is a minimal starting point for the frontend interview exercise.
 * Build the complete dashboard based on the requirements:
 * 
 * 1. KPI Cards (top row) - Workflows run, Tasks outstanding, etc.
 * 2. Insights Panel - List with sparklines, status badges, range filter
 * 3. Shortcuts Row - Links to Workflows, Tasks, Data, Agent with counts
 * 4. Loading, error, and empty states
 * 
 * Available components: Card, Button, Badge (+ more in @/components/ui/)
 * API client: import { api } from '@/lib/api'
 * Types: import { DashboardMetrics, etc. } from '@/types'
 */

export default function App() {
  return (
    <main className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <img src="/img/jarvio-blue.svg" alt="Jarvio" className="h-10 w-auto" />
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Workflow automation platform overview
        </p>
      </div>

      {/* Placeholder: KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          'Workflows Run (24h)',
          'Tasks Outstanding', 
          'Tasks Due Today',
          'Tasks Finished (24h)'
        ].map((title) => (
          <Card key={title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">[Value]</div>
              <p className="text-xs text-muted-foreground">
                [Change indicator]
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder: Insights Panel */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Insights</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                24h
              </Button>
              <Button variant="outline" size="sm">
                7d  
              </Button>
              <Button variant="outline" size="sm">
                30d
              </Button>
              <Button variant="outline" size="sm">
                ⭐ Favourited only
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded">
              <div>
                <h3 className="font-medium">[Insight Title]</h3>
                <p className="text-sm text-muted-foreground">[Value/Status]</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">[Trend/Status]</Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  [Timestamp]
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder: Shortcuts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Workflows', count: '[Active]', status: '[Last Run]' },
          { name: 'Tasks', count: '[Outstanding]', status: '[Last Completed]' },
          { name: 'Data', count: '[Sources]', status: '[Last Sync]' },
          { name: 'Agent', count: '[Runs 24h]', status: '[Status]' },
        ].map((shortcut) => (
          <Card key={shortcut.name} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{shortcut.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">{shortcut.count}</div>
              <p className="text-xs text-muted-foreground">{shortcut.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Development Helper */}
      <div className="mt-12 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">🚀 Development Notes</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Backend API running on http://localhost:3001</li>
          <li>• Use React Query for data fetching: <code>useQuery</code></li>
          <li>• Zustand for client state management</li>
          <li>• All API endpoints documented in backend/README.md</li>
          <li>• Test error handling with ?range=error</li>
        </ul>
      </div>
    </main>
  );
}