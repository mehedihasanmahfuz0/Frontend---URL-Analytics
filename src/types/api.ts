export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
  count?: number;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Link {
  id: string;
  shortCode: string;
  originalUrl: string;
  clickCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ClickEvent {
  id: string;
  clickedAt: string;
  deviceType: string | null;
  browser: string | null;
  os: string | null;
  country: string | null;
  city: string | null;
  ipAddress: string;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  linkId: string;
}

export interface AnalyticsData {
  totalClicks: number;
  byCountry: Array<{ country: string; count: number }>;
  byDevice: Array<{ device: string; count: number }>;
  byBrowser: Array<{ browser: string; count: number }>;
  byReferrer: Array<{ referrer: string; count: number }>;
  byDay: Array<{ date: string; count: number }>;
  recentClicks: ClickEvent[];
}

export interface HealthCheck {
  status: string;
  environment: string;
  checks: {
    redis: string;
    database: string;
  };
  timestamp: string;
}
