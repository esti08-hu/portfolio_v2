/**
 * API client utilities for external data integration
 * Provides consistent API interaction patterns with caching and error handling
 */

import { QueryClient } from '@tanstack/react-query';

// API configuration
export const API_CONFIG = {
  GITHUB_BASE_URL: 'https://api.github.com',
  DEFAULT_CACHE_TIME: 1000 * 60 * 5, // 5 minutes
  DEFAULT_STALE_TIME: 1000 * 60 * 1, // 1 minute
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Create and configure React Query client
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: API_CONFIG.DEFAULT_STALE_TIME,
        cacheTime: API_CONFIG.DEFAULT_CACHE_TIME,
        retry: API_CONFIG.RETRY_ATTEMPTS,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
      },
    },
  });
};

// API response types
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  pushed_at: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
  };
  created_at: string;
  payload: Record<string, unknown>;
}

// API endpoints
export const API_ENDPOINTS = {
  USER_PROFILE: (username: string) => `/users/${username}`,
  USER_REPOS: (username: string) => `/users/${username}/repos`,
  USER_EVENTS: (username: string) => `/users/${username}/events`,
} as const;

// HTTP client utilities
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_CONFIG.GITHUB_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-v2/1.0.0',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.request<GitHubUser>(API_ENDPOINTS.USER_PROFILE(username));
  }

  async getUserRepos(username: string, params?: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    per_page?: number;
    page?: number;
  }): Promise<GitHubRepo[]> {
    const searchParams = new URLSearchParams();
    if (params?.sort) searchParams.set('sort', params.sort);
    if (params?.per_page) searchParams.set('per_page', params.per_page.toString());
    if (params?.page) searchParams.set('page', params.page.toString());

    const query = searchParams.toString();
    const endpoint = query
      ? `${API_ENDPOINTS.USER_REPOS(username)}?${query}`
      : API_ENDPOINTS.USER_REPOS(username);

    return this.request<GitHubRepo[]>(endpoint);
  }

  async getUserEvents(username: string, params?: {
    per_page?: number;
    page?: number;
  }): Promise<GitHubEvent[]> {
    const searchParams = new URLSearchParams();
    if (params?.per_page) searchParams.set('per_page', params.per_page.toString());
    if (params?.page) searchParams.set('page', params.page.toString());

    const query = searchParams.toString();
    const endpoint = query
      ? `${API_ENDPOINTS.USER_EVENTS(username)}?${query}`
      : API_ENDPOINTS.USER_EVENTS(username);

    return this.request<GitHubEvent[]>(endpoint);
  }
}

// Create singleton API client instance
export const apiClient = new ApiClient();

// Query keys for React Query
export const QUERY_KEYS = {
  github: {
    user: (username: string) => ['github', 'user', username] as const,
    repos: (username: string) => ['github', 'repos', username] as const,
    events: (username: string) => ['github', 'events', username] as const,
  },
} as const;

// Error handling utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

// Rate limiting helpers (GitHub API has rate limits)
export const GITHUB_RATE_LIMITS = {
  UNAUTHENTICATED: 60, // requests per hour
  AUTHENTICATED: 5000, // requests per hour
} as const;

export const getRateLimitDelay = (isAuthenticated: boolean = false): number => {
  const limit = isAuthenticated ? GITHUB_RATE_LIMITS.AUTHENTICATED : GITHUB_RATE_LIMITS.UNAUTHENTICATED;
  return (3600 * 1000) / limit; // milliseconds between requests
};