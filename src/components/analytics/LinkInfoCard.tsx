'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CopyUrlButton } from '@/components/links/CopyUrlButton';
import { useLink } from '@/hooks/useLinks';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink } from 'lucide-react';

interface LinkInfoCardProps {
  shortCode: string;
}

export function LinkInfoCard({ shortCode }: LinkInfoCardProps) {
  const { data: link, isLoading, isError } = useLink(shortCode);

  if (isLoading) {
    return <Skeleton className="h-24 w-full" />;
  }

  if (!link || isError) return null;

  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded">
                /p/{link.shortCode}
              </code>
              <CopyUrlButton shortCode={link.shortCode} />
            </div>
            <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground truncate block max-w-md flex items-center gap-1">
              <ExternalLink className="h-3 w-3 shrink-0" />
              {link.originalUrl}
            </a>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-bold">{link.clickCount}</p>
            <p className="text-xs text-muted-foreground">total clicks</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
