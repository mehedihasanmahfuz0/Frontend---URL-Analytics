'use client';

import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { buildShortUrl } from '@/lib/constants';

interface CopyUrlButtonProps {
  shortCode: string;
}

export function CopyUrlButton({ shortCode }: CopyUrlButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const url = buildShortUrl(shortCode);
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="outline" size="sm" onClick={copyToClipboard}>
      {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
      {copied ? 'Copied!' : 'Copy URL'}
    </Button>
  );
}
