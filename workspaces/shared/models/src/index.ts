/**
 * Shared Models Package
 * Contains types, interfaces, DTOs, and domain models
 */

// Example: Base entity interface
export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Example: Pagination params
export interface PaginationParams {
  page: number;
  limit: number;
}

// Example: Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Example: API error response
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export * from './user.model';
export * from './api-response.model';
