import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { ApiResponse, HealthCheck } from '@/types/api';

export function useHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<HealthCheck>>('/health');
      return response.data.data!;
    },
    refetchInterval: 60000,
  });
}
