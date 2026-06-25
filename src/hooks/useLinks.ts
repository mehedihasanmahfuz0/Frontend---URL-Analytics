import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { ApiResponse, Link } from '@/types/api';
import { toast } from 'sonner';

export function useLinks() {
  return useQuery({
    queryKey: ['links'],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Link[]>>('/links');
      return response.data.data!;
    },
  });
}

export function useLink(shortCode: string) {
  const { data: links } = useLinks();

  const link = links?.find((l) => l.shortCode === shortCode) ?? null;

  return {
    data: link,
    isLoading: !links,
    isError: !link && !!links,
  };
}

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (originalUrl: string) => {
      const response = await apiClient.post<ApiResponse<Link>>('/links', { originalUrl });
      return response.data.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('Link created successfully!');
    },
  });
}

export function useDeleteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (linkId: string) => {
      const response = await apiClient.delete(`/links/${linkId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('Link deleted successfully!');
    },
  });
}

export function useUpdateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ linkId, isActive }: { linkId: string; isActive: boolean }) => {
      const response = await apiClient.patch(`/links/${linkId}`, { isActive });
      return response.data.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      toast.success('Link updated successfully!');
    },
  });
}
