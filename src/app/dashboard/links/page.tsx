'use client';

import { useLinks, useDeleteLink } from '@/hooks/useLinks';
import { LinkTable } from '@/components/links/LinkTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Link2 } from 'lucide-react';
import Link from 'next/link';
import { EmptyState } from '@/components/shared/EmptyState';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function LinksPage() {
  usePageTitle('My Links');
  const { data: links, isLoading, error } = useLinks();
  const { mutate: deleteLink } = useDeleteLink();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-destructive">Failed to load links. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!links || links.length === 0) {
    return (
      <EmptyState
        icon={Link2}
        title="No links yet"
        description="Create your first short link to get started"
        action={
          <Button nativeButton={false} render={<Link href="/dashboard/links/new" />}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Link
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Links</h1>
          <p className="text-muted-foreground">Manage all your shortened URLs</p>
        </div>
        <Button nativeButton={false} render={<Link href="/dashboard/links/new" />}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Link
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Links ({links.length})</CardTitle>
          <CardDescription>Click on any link to view detailed analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <LinkTable links={links} onDelete={deleteLink} />
        </CardContent>
      </Card>
    </div>
  );
}
