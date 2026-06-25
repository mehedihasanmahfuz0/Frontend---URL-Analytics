import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { ApiResponse, AnalyticsData } from '@/types/api';

export function useAnalytics(shortCode: string) {
  return useQuery({
    queryKey: ['analytics', shortCode],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<AnalyticsData>>(`/analytics/${shortCode}`);
      return response.data.data!;
    },
    enabled: !!shortCode,
    refetchInterval: 30000,
  });
}
