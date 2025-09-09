import { QueryClient } from "@tanstack/react-query";

// query configuration constants
const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const GC_TIME = 10 * 60 * 1000; // 10 minutes
const MAX_RETRY_ATTEMPTS = 2;
const MAX_RETRY_DELAY = 30000; // 30 seconds
const RETRY_DELAY_BASE = 1000; // 1 second
const MUTATION_RETRY_ATTEMPTS = 1;
const MUTATION_RETRY_DELAY = 1000; // 1 second

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes("4")) {
          return false;
        }
        return failureCount < MAX_RETRY_ATTEMPTS;
      },
      retryDelay: (attemptIndex) =>
        Math.min(RETRY_DELAY_BASE * 2 ** attemptIndex, MAX_RETRY_DELAY),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: MUTATION_RETRY_ATTEMPTS,
      retryDelay: MUTATION_RETRY_DELAY,
    },
  },
});
