'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClickEvent } from '@/types/api';
import { format } from 'date-fns';

interface RecentClicksTableProps {
  clicks: ClickEvent[];
}

export function RecentClicksTable({ clicks }: RecentClicksTableProps) {
  if (clicks.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle>Recent Clicks</CardTitle><CardDescription>Latest click activity</CardDescription></CardHeader>
        <CardContent className="flex items-center justify-center py-8 text-muted-foreground">No clicks yet</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Clicks ({clicks.length})</CardTitle>
        <CardDescription>Latest click activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="hidden md:table-cell">Device</TableHead>
                <TableHead className="hidden md:table-cell">Browser</TableHead>
                <TableHead className="hidden lg:table-cell">Referrer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clicks.map((click) => (
                <TableRow key={click.id}>
                  <TableCell className="text-sm">{format(new Date(click.clickedAt), 'MMM d, HH:mm')}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{click.country || 'Unknown'}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell capitalize">{click.deviceType || '-'}</TableCell>
                  <TableCell className="hidden md:table-cell">{click.browser || '-'}</TableCell>
                  <TableCell className="hidden lg:table-cell max-w-[150px] truncate">{click.referrer || 'direct'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
