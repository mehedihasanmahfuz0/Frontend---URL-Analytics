'use client';

import { useAnalytics } from '@/hooks/useAnalytics';
import { StatsCards } from '@/components/analytics/StatsCards';
import { ClicksOverTimeChart } from '@/components/analytics/ClicksOverTimeChart';
import { DeviceChart } from '@/components/analytics/DeviceChart';
import { BrowserChart } from '@/components/analytics/BrowserChart';
import { CountryChart } from '@/components/analytics/CountryChart';
import { ReferrerChart } from '@/components/analytics/ReferrerChart';
import { RecentClicksTable } from '@/components/analytics/RecentClicksTable';
import { LinkInfoCard } from '@/components/analytics/LinkInfoCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import { usePageTitle } from '@/hooks/usePageTitle';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AnalyticsPage() {
  usePageTitle('Analytics');
  const params = useParams();
  const shortCode = params.shortCode as string;
  const { data: analytics, isLoading, error } = useAnalytics(shortCode);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-destructive">Failed to load analytics. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/dashboard/analytics" />}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights for your link</p>
        </div>
      </div>

      <LinkInfoCard shortCode={shortCode} />
      <StatsCards data={analytics} />
      <ClicksOverTimeChart data={analytics.byDay} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeviceChart data={analytics.byDevice} />
        <BrowserChart data={analytics.byBrowser} />
        <CountryChart data={analytics.byCountry} />
        <ReferrerChart data={analytics.byReferrer} />
      </div>

      <RecentClicksTable clicks={analytics.recentClicks} />
    </div>
  );
}
