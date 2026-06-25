'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Copy, Eye, MoreVertical, Trash2 } from 'lucide-react';
import type { Link as LinkType } from '@/types/api';
import { format } from 'date-fns';
import { toast } from 'sonner';
import NextLink from 'next/link';
import { buildShortUrl } from '@/lib/constants';

interface LinkTableProps {
  links: LinkType[];
  onDelete?: (linkId: string) => void;
}

export function LinkTable({ links, onDelete }: LinkTableProps) {
  const copyToClipboard = (shortCode: string) => {
    const url = buildShortUrl(shortCode);
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Short URL</TableHead>
            <TableHead className="hidden md:table-cell">Original URL</TableHead>
            <TableHead className="text-center">Clicks</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden lg:table-cell">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    /p/{link.shortCode}
                  </code>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(link.shortCode)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground truncate max-w-xs block">
                  {link.originalUrl}
                </a>
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary">{link.clickCount}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant={link.isActive ? 'default' : 'secondary'}>
                  {link.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                {format(new Date(link.createdAt), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem render={<NextLink href={`/dashboard/analytics/${link.shortCode}`} />}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => copyToClipboard(link.shortCode)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Link
                    </DropdownMenuItem>
                    {onDelete && (
                      <DropdownMenuItem className="text-destructive" onClick={() => onDelete(link.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
