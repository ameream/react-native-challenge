import axios from "axios";

import { SimpleCache, withRetry } from "../utils";

import type { Person, Species, Planet, OrganizedData } from "../models";

/**
 * Service class for interacting with the Star Wars API (SWAPI).
 * Provides methods to fetch, process, and organize Star Wars data with caching and retry logic.
 * Organizes people by species and includes homeworld information.
 */
export class SWAPIService {
  private cache = new SimpleCache();

  // SWAPI endpoint URLs
  private readonly SWAPI_BASE_URL = "https://swapi.info/api";
  private readonly SWAPI_PEOPLE_URL = `${this.SWAPI_BASE_URL}/people`;
  private readonly SWAPI_SPECIES_URL = `${this.SWAPI_BASE_URL}/species`;
  private readonly SWAPI_PLANETS_URL = `${this.SWAPI_BASE_URL}/planets`;

  // base settings
  private readonly BASE_TIMEOUT_MS = 10000;

  // cache settings
  private readonly CACHE_TTL_SECONDS = 300;
  private readonly MAIN_CACHE_KEY = "SWAPI_ORGANIZED_DATA";

  // retry settings
  private readonly MAX_RETRIES = 3;
  private readonly BASE_DELAY_MS = 1000;

  // constants
  private readonly DEFAULT_SPECIES = "Human";
  private readonly UNKNOWN_HOMEWORLD = "Unknown";

  /**
   * Helper function to fetch data from SWAPI with retry logic.
   * Uses axios to make HTTP requests with timeout and automatic retries on failure.
   *
   * @template T - The type of data expected from the API response
   * @param url - The SWAPI endpoint URL to fetch data from
   * @returns Promise<T[]> - Array of entities fetched from the API
   *
   * @throws Will throw an error if all retry attempts fail
   *
   * @example
   * ```typescript
   * const people = await this.fetchSWAPIData<Person>(this.SWAPI_PEOPLE_URL);
   * ```
   */
  private async fetchSWAPIData<T>(url: string): Promise<T[]> {
    return withRetry(
      async () => {
        const response = await axios.get<T[]>(url, {
          timeout: this.BASE_TIMEOUT_MS,
        });
        return response.data;
      },
      this.MAX_RETRIES,
      this.BASE_DELAY_MS,
      `fetchSWAPIData(${url})`,
    );
  }

  /**
   * Helper function to transform a person into organized data format.
   * Extracts relevant person properties and resolves homeworld name from planet map.
   *
   * @param person - The person object from SWAPI
   * @param planetMap - Map of planet URLs to planet objects for homeworld lookup
   * @returns Transformed person object with homeworld name instead of URL
   *
   * @example
   * ```typescript
   * const transformed = this.transformPersonToOrganizedFormat(person, planetMap);
   * // Returns: { name: "Luke Skywalker", height: "172", mass: "77", gender: "male", homeworld: "Tatooine" }
   * ```
   */
  private transformPersonToOrganizedFormat(
    person: Person,
    planetMap: Map<string, Planet>,
  ) {
    const { name, height, mass, gender, homeworld } = person;

    const homeworldName =
      planetMap.get(homeworld)?.name || this.UNKNOWN_HOMEWORLD;

    return {
      name,
      height,
      mass,
      gender,
      homeworld: homeworldName,
    };
  }

  /**
   * Helper function to create URL-to-entity map for quick lookup.
   * Creates a Map with entity URLs as keys and entity objects as values for O(1) lookup performance.
   *
   * @template T - Entity type that must have a url property
   * @param entities - Array of entities to create map from
   * @returns Map<string, T> - Map with URLs as keys and entities as values
   *
   * @example
   * ```typescript
   * const planetMap = this.createEntityMap(allPlanets);
   * const tatooine = planetMap.get("https://swapi.info/api/planets/1");
   * ```
   */
  private createEntityMap<T extends { url: string }>(
    entities: T[],
  ): Map<string, T> {
    const entityMap = new Map<string, T>();

    entities.forEach((entity) => {
      entityMap.set(entity.url, entity);
    });

    return entityMap;
  }

  /**
   * Helper function to process people and organize them by species.
   * Creates organized data structure with people grouped by species name.
   * Handles people without explicit species assignment by categorizing them as "Human".
   *
   * @param allPeople - Array of all people from SWAPI
   * @param allSpecies - Array of all species from SWAPI
   * @param allPlanets - Array of all planets from SWAPI
   * @returns OrganizedData - Object with species names as keys and arrays of transformed people as values
   *
   * @remarks
   * - People explicitly listed in species.people arrays are grouped under their species
   * - People not listed in any species.people array are categorized as "Human"
   * - Each person object includes resolved homeworld name instead of URL
   *
   * @example
   * ```typescript
   * const organized = this.processAndOrganizePeople(people, species, planets);
   * // Returns: { "Human": [...], "Droid": [...], "Wookiee": [...] }
   * ```
   */
  private processAndOrganizePeople(
    allPeople: Person[],
    allSpecies: Species[],
    allPlanets: Planet[],
  ): OrganizedData {
    const organizedData: OrganizedData = {};

    // create maps for quick lookup
    const peopleMap = this.createEntityMap(allPeople);
    const planetMap = this.createEntityMap(allPlanets);

    // process people with species
    for (const species of allSpecies) {
      const speciesName = species.name;

      organizedData[speciesName] = species.people
        .map((personUrl) => peopleMap.get(personUrl))
        .filter((person): person is Person => person !== undefined)
        .map((person) =>
          this.transformPersonToOrganizedFormat(person, planetMap),
        );
    }

    // process people without species (they are humans but not listed in any species.people array)
    const peopleWithoutSpecies = allPeople
      .filter((person) => {
        // check if person is not referenced in any species.people array
        return !allSpecies.some((species) =>
          species.people.includes(person.url),
        );
      })
      .map((person) =>
        this.transformPersonToOrganizedFormat(person, planetMap),
      );

    // add people without species to Human category (or merge if Human species already exists)
    if (peopleWithoutSpecies.length > 0) {
      if (organizedData[this.DEFAULT_SPECIES]) {
        organizedData[this.DEFAULT_SPECIES].push(...peopleWithoutSpecies);
      } else {
        organizedData[this.DEFAULT_SPECIES] = peopleWithoutSpecies;
      }
    }

    return organizedData;
  }

  /**
   * Main public method to get organized Star Wars data.
   * Fetches all people, species, and planets from SWAPI, processes and organizes them by species.
   * Implements caching to avoid redundant API calls and improve performance.
   *
   * @returns Promise<OrganizedData> - Promise resolving to organized data grouped by species
   *
   * @throws Will throw an error if API requests fail after all retry attempts
   *
   * @remarks
   * - First checks cache for existing data (5-minute TTL)
   * - If cache miss, fetches all required data concurrently from SWAPI
   * - Processes and organizes data by species
   * - Caches the result for future requests
   * - Uses retry logic for resilient API communication
   *
   * @example
   * ```typescript
   * const swapiService = new SWAPIService();
   * const organizedData = await swapiService.getOrganizedStarWarsData();
   * console.log(organizedData.Human); // Array of human characters
   * ```
   */
  async getOrganizedStarWarsData(): Promise<OrganizedData> {
    // check cache first
    const cachedData = this.cache.get<OrganizedData>(this.MAIN_CACHE_KEY);

    if (cachedData) {
      return cachedData;
    }

    // fetch all people, species, and planets concurrently
    const [allPeople, allSpecies, allPlanets] = await Promise.all([
      this.fetchSWAPIData<Person>(this.SWAPI_PEOPLE_URL),
      this.fetchSWAPIData<Species>(this.SWAPI_SPECIES_URL),
      this.fetchSWAPIData<Planet>(this.SWAPI_PLANETS_URL),
    ]);

    // process and organize all people by species
    const organizedData = this.processAndOrganizePeople(
      allPeople,
      allSpecies,
      allPlanets,
    );

    // cache the organized data
    this.cache.set(this.MAIN_CACHE_KEY, organizedData, this.CACHE_TTL_SECONDS);

    return organizedData;
  }
}
