'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateLink } from '@/hooks/useLinks';
import { usePageTitle } from '@/hooks/usePageTitle';
import { Loader2, Link2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const createLinkSchema = z.object({
  originalUrl: z.string().url('Please enter a valid URL'),
});

type CreateLinkFormValues = z.infer<typeof createLinkSchema>;

export default function NewLinkPage() {
  usePageTitle('Create Link');
  const { mutate: createLink, isPending } = useCreateLink();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateLinkFormValues>({
    resolver: zodResolver(createLinkSchema),
  });

  const onSubmit = (data: CreateLinkFormValues) => {
    createLink(data.originalUrl, {
      onSuccess: () => {
        router.push('/dashboard/links');
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/dashboard/links" />}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create New Link</h1>
          <p className="text-muted-foreground">Shorten a long URL and start tracking clicks</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            URL Shortener
          </CardTitle>
          <CardDescription>Enter the long URL you want to shorten</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="originalUrl">Original URL</Label>
              <Input id="originalUrl" type="url" placeholder="https://example.com/very/long/url" {...register('originalUrl')} disabled={isPending} />
              {errors.originalUrl && <p className="text-sm text-destructive">{errors.originalUrl.message}</p>}
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isPending} className="flex-1">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Short Link
              </Button>
              <Button variant="outline" nativeButton={false} render={<Link href="/dashboard/links" />}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
