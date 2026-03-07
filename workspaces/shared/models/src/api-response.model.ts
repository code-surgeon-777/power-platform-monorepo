/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiErrorDetail;
  meta?: ApiResponseMeta;
}

export interface ApiErrorDetail {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponseMeta {
  timestamp: string;
  requestId?: string;
  version?: string;
}

/**
 * Success response factory
 */
export function successResponse<T>(data: T, meta?: ApiResponseMeta): ApiResponse<T> {
  return {
    success: true,
    data,
    meta: meta || { timestamp: new Date().toISOString() },
  };
}

/**
 * Error response factory
 */
export function errorResponse(
  code: string,
  message: string,
  details?: Record<string, unknown>
): ApiResponse {
  return {
    success: false,
    error: { code, message, details },
    meta: { timestamp: new Date().toISOString() },
  };
}
