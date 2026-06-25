import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '@/lib/constants';

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
            toast.error('Session expired. Please login again.');
          }
          break;
        case 403:
          toast.error('You do not have permission to access this resource.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 429:
          const retryAfter = error.response.headers['retry-after'];
          toast.error(`Too many requests. Please try again in ${retryAfter || 'a few'} seconds.`);
          break;
        case 400:
          if (data.errors) {
            const errorMessages = data.errors.map((e: any) => e.message).join(', ');
            toast.error(errorMessages);
          } else {
            toast.error(data.message || 'Invalid request.');
          }
          break;
        case 409:
          toast.error(data.message || 'Resource already exists.');
          break;
        default:
          toast.error(data.message || 'An error occurred. Please try again.');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    }
    return Promise.reject(error);
  }
);
