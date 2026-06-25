'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ReferrerChartProps {
  data: Array<{ referrer: string; count: number }>;
}

export function ReferrerChart({ data }: ReferrerChartProps) {
  const chartData = data.map((item) => ({
    name: item.referrer || 'Direct',
    clicks: item.count,
  }));

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle>Referrers</CardTitle><CardDescription>Clicks by referrer</CardDescription></CardHeader>
        <CardContent className="flex items-center justify-center h-[300px] text-muted-foreground">No data available</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Referrers</CardTitle>
        <CardDescription>Clicks by referrer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" width={100} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
              <Bar dataKey="clicks" fill="var(--success)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
