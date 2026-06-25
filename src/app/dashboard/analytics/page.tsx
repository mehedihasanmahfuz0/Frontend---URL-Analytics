'use client';

import { useLinks } from '@/hooks/useLinks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, Eye } from 'lucide-react';
import Link from 'next/link';
import { EmptyState } from '@/components/shared/EmptyState';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function AnalyticsOverviewPage() {
  usePageTitle('Analytics');
  const { data: links, isLoading } = useLinks();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!links || links.length === 0) {
    return (
      <EmptyState
        icon={BarChart3}
        title="No analytics yet"
        description="Create a link and share it to see analytics"
        action={
          <Button nativeButton={false} render={<Link href="/dashboard/links/new" />}>
            Create Link
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Select a link to view detailed analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Card key={link.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded">/p/{link.shortCode}</code>
              </CardTitle>
              <CardDescription className="truncate">{link.originalUrl}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-sm">{link.clickCount} clicks</Badge>
                <Button variant="ghost" size="sm" nativeButton={false} render={<Link href={`/dashboard/analytics/${link.shortCode}`} />}>
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
