import { Person, SpeciesGroup } from "@/types/people";
import { useQuery } from "@tanstack/react-query";

const fetchPeopleBySpecies = async (): Promise<SpeciesGroup[]> => {
  const response = await fetch("http://localhost:4000/api/people");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const apiData = await response.json();

  // Convert the API data to the format expected by the component
  return Object.entries(apiData).map(([species, people]) => {
    const peopleArray = people as Person[];

    // Sort people by height (tallest to shortest)
    const sortedPeople = peopleArray.sort((a, b) => {
      // Handle "unknown" heights by putting them at the end
      if (a.height === "unknown" && b.height === "unknown") return 0;
      if (a.height === "unknown") return 1;
      if (b.height === "unknown") return -1;

      // Convert height strings to numbers for comparison
      const heightA = parseFloat(a.height);
      const heightB = parseFloat(b.height);

      // Handle NaN cases (invalid height values)
      if (isNaN(heightA) && isNaN(heightB)) return 0;
      if (isNaN(heightA)) return 1;
      if (isNaN(heightB)) return -1;

      // Sort from tallest to shortest (descending order)
      return heightB - heightA;
    });

    return {
      species,
      people: sortedPeople,
    };
  });
};

export const usePeopleBySpecies = () => {
  return useQuery({
    queryKey: ["people-by-species"],
    queryFn: fetchPeopleBySpecies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors (client errors)
      if (error instanceof Error && error.message.includes("4")) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false, // Disable refetch on window focus for mobile
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
