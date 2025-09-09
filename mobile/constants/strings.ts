export const Strings = {
  // App Configuration
  app: {
    title: "Star Wars",
    subtitle: "Pull to refresh the data",
  },

  // Loading States
  loading: {
    default: "Loading...",
    retrying: "Retrying...",
    refreshing: "Refreshing...",
  },

  // Error States
  error: {
    title: "Error",
    networkConnectionFailed: "Network connection failed",
    serverError: "Server error occurred",
    serverUnavailable: "Server is temporarily unavailable",
    backendServerMessage:
      "Please make sure the backend server is running on http://localhost:4000",
    retry: "Retry",
  },

  // Empty States
  empty: {
    noDataAvailable: "No data available",
    noPeopleToDisplay: "There are no people to display at the moment",
    refresh: "Refresh",
  },

  // Person Details
  person: {
    height: "Height",
    mass: "Mass",
    gender: "Gender",
    homeworld: "Homeworld",
    unknown: "unknown",
    units: {
      height: "cm",
      mass: "kg",
    },
  },

  // Species
  species: {
    count: "({count})",
  },

  // Common
  common: {
    bulletSeparator: " • ",
  },

  // API
  api: {
    baseUrl: "http://localhost:4000/api/people",
  },
} as const;
