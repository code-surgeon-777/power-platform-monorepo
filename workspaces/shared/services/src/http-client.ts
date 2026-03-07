/**
 * HTTP Client utilities
 */

import { ApiClient, ApiResponse, ApiClientConfig } from './api-client';

/**
 * Create a configured API client instance
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}

/**
 * Default API client factory
 */
export class HttpClientFactory {
  private static clients: Map<string, ApiClient> = new Map();

  /**
   * Get or create a client for the given base URL
   */
  static getClient(baseUrl: string, config?: Partial<ApiClientConfig>): ApiClient {
    if (!this.clients.has(baseUrl)) {
      const client = new ApiClient({
        baseUrl,
        ...config,
      });
      this.clients.set(baseUrl, client);
    }
    return this.clients.get(baseUrl)!;
  }

  /**
   * Clear all cached clients
   */
  static clearClients(): void {
    this.clients.clear();
  }
}

export { ApiClient, ApiResponse, ApiClientConfig };
