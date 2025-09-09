import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "ios" ? "http://localhost:4000" : "http://10.0.2.2:4000";

// API Configuration Constants
export const API_CONFIG = {
  BASE_URL: BASE_URL,
  ENDPOINTS: {
    PEOPLE: "/api/people",
  },
} as const;

// Query Configuration Constants
export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  GC_TIME: 10 * 60 * 1000, // 10 minutes
  MAX_RETRIES: 2,
  RETRY_DELAY_BASE: 1000, // 1 second
  RETRY_DELAY_MULTIPLIER: 2,
  MAX_RETRY_DELAY: 30000, // 30 seconds
} as const;

// HTTP Status Constants
export const HTTP_STATUS = {
  CLIENT_ERROR_PREFIX: "4",
} as const;
