import { API_CONFIG, HTTP_STATUS, QUERY_CONFIG } from "@/constants/api";
import { Person, SpeciesGroup } from "@/types/people";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches people data from the API and groups them by species.
 * Sorts people within each species by height (tallest to shortest).
 * @returns promise that resolves to an array of species groups with sorted people
 */
const fetchPeopleBySpecies = async (): Promise<SpeciesGroup[]> => {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PEOPLE}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const apiData = await response.json();

  // convert the API data to the format expected by the component
  return Object.entries(apiData).map(([species, people]) => {
    const peopleArray = people as Person[];

    // sort people by height (tallest to shortest)
    const sortedPeople = peopleArray.sort((a, b) => {
      // handle "unknown" heights by putting them at the end
      if (a.height === "unknown" && b.height === "unknown") return 0;
      if (a.height === "unknown") return 1;
      if (b.height === "unknown") return -1;

      // convert height strings to numbers for comparison
      const heightA = parseFloat(a.height);
      const heightB = parseFloat(b.height);

      // handle invalid height values
      if (isNaN(heightA) && isNaN(heightB)) return 0;
      if (isNaN(heightA)) return 1;
      if (isNaN(heightB)) return -1;

      // sort from tallest to shortest (descending order)
      return heightB - heightA;
    });

    return {
      species,
      people: sortedPeople,
    };
  });
};

/**
 * Custom hook that fetches and caches people data grouped by species.
 * Uses React Query for data fetching, caching, and error handling.
 * @returns React Query result object with data, loading, error states, etc.
 */
export const usePeopleBySpecies = () => {
  return useQuery({
    queryKey: ["people-by-species"],
    queryFn: fetchPeopleBySpecies,
    staleTime: QUERY_CONFIG.STALE_TIME,
    gcTime: QUERY_CONFIG.GC_TIME,
    retry: (failureCount, error) => {
      // don't retry on 4xx errors (client errors)
      if (
        error instanceof Error &&
        error.message.includes(HTTP_STATUS.CLIENT_ERROR_PREFIX)
      ) {
        return false;
      }
      return failureCount < QUERY_CONFIG.MAX_RETRIES;
    },
    retryDelay: (attemptIndex) => {
      const exponentialDelay =
        QUERY_CONFIG.RETRY_DELAY_BASE *
        QUERY_CONFIG.RETRY_DELAY_MULTIPLIER ** attemptIndex;

      return Math.min(exponentialDelay, QUERY_CONFIG.MAX_RETRY_DELAY);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
