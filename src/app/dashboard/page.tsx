'use client';

import { useLinks } from '@/hooks/useLinks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Link2, MousePointerClick, BarChart3, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function DashboardPage() {
  usePageTitle('Dashboard');
  const { data: links, isLoading, error } = useLinks();

  const stats = useMemo(() => {
    if (!links) return { totalLinks: 0, totalClicks: 0, activeLinks: 0, topLink: null as import('@/types/api').Link | null };
    const totalClicks = links.reduce((sum, l) => sum + l.clickCount, 0);
    const activeLinks = links.filter((l) => l.isActive).length;
    const sorted = [...links].sort((a, b) => b.clickCount - a.clickCount);
    return { totalLinks: links.length, totalClicks, activeLinks, topLink: sorted[0] || null };
  }, [links]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-destructive">Failed to load dashboard data. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to your URL analytics dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Link2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Links</p>
                <p className="text-2xl font-bold">{stats.totalLinks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-[#10b981]/10">
                <MousePointerClick className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="text-2xl font-bold">{stats.totalClicks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-[#f59e0b]/10">
                <BarChart3 className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Links</p>
                <p className="text-2xl font-bold">{stats.activeLinks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <ArrowUpRight className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Clicks/Link</p>
                <p className="text-2xl font-bold">{stats.totalLinks ? Math.round(stats.totalClicks / stats.totalLinks) : 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {stats.topLink && (
        <Card>
          <CardHeader>
            <CardTitle>Most Clicked Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded">
                  /p/{stats.topLink.shortCode}
                </code>
                <p className="text-sm text-muted-foreground truncate mt-1 max-w-md">{stats.topLink.originalUrl}</p>
                <p className="text-xs text-muted-foreground mt-1">Created {format(new Date(stats.topLink.createdAt), 'MMM d, yyyy')}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-3xl font-bold text-primary">{stats.topLink.clickCount}</p>
                <p className="text-xs text-muted-foreground">clicks</p>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" nativeButton={false} render={<Link href={`/dashboard/analytics/${stats.topLink.shortCode}`} />}>
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {stats.totalLinks > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" nativeButton={false} render={<Link href="/dashboard/links/new" />}>
              Create New Link
            </Button>
            <Button variant="outline" nativeButton={false} render={<Link href="/dashboard/links" />}>
              View All Links
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
