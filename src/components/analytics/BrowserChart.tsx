'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface BrowserChartProps {
  data: Array<{ browser: string; count: number }>;
}

const COLORS = ['var(--primary)', 'var(--success)', 'var(--warning)', '#3b82f6', '#a855f7', '#ec4899', 'var(--muted-foreground)'];

export function BrowserChart({ data }: BrowserChartProps) {
  const chartData = data.map((item) => ({
    name: item.browser || 'Unknown',
    value: item.count,
  }));

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle>Browsers</CardTitle><CardDescription>Clicks by browser</CardDescription></CardHeader>
        <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground">No data available</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Browsers</CardTitle>
        <CardDescription>Clicks by browser</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
