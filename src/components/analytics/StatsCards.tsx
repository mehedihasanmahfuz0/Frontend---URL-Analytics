'use client';

import { Card, CardContent } from '@/components/ui/card';
import { MousePointerClick, Globe, Smartphone, Monitor } from 'lucide-react';
import { AnalyticsData } from '@/types/api';

interface StatsCardsProps {
  data: AnalyticsData;
}

export function StatsCards({ data }: StatsCardsProps) {
  const topCountry = data.byCountry[0]?.country || 'N/A';
  const topDevice = data.byDevice[0]?.device || 'N/A';
  const topDeviceLabel = topDevice.charAt(0).toUpperCase() + topDevice.slice(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <MousePointerClick className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Clicks</p>
              <p className="text-2xl font-bold">{data.totalClicks}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[#10b981]/10">
              <Globe className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Top Country</p>
              <p className="text-2xl font-bold truncate">{topCountry}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[#f59e0b]/10">
              <Smartphone className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Top Device</p>
              <p className="text-2xl font-bold">{topDeviceLabel}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Monitor className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Countries</p>
              <p className="text-2xl font-bold">{data.byCountry.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
