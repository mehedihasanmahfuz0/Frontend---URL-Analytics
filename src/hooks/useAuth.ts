import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { ApiResponse, AuthResponse, User } from '@/types/api';
import { toast } from 'sonner';

interface LoginCredentials {
  email: string;
  password: string;
}

export function useLogin() {
  const { login } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
      return response.data.data!;
    },
    onSuccess: (data) => {
      login(data.token, data.user);
      toast.success('Login successful!');
      router.push('/dashboard');
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await apiClient.post<ApiResponse<User>>('/auth/register', data);
      return response.data.data!;
    },
    onSuccess: () => {
      toast.success('Registration successful! Please login.');
      router.push('/login');
    },
  });
}

export function useLogout() {
  const { logout } = useAuthStore();
  const router = useRouter();

  return () => {
    logout();
    router.push('/login');
  };
}
