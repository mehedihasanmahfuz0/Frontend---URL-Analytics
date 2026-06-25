export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://link-analytics-backend-n4g4.onrender.com'

export function buildShortUrl(shortCode: string): string {
  return `${API_URL}/p/${shortCode}`
}
