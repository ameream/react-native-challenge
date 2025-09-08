import type { Person, Planet, Species } from "./swapi";

export interface OrganizedPerson {
  name: Person["name"];
  height: Person["height"];
  mass: Person["mass"];
  gender: Person["gender"];
  homeworld: Planet["name"];
}

export interface OrganizedData {
  [speciesName: Species["name"]]: OrganizedPerson[];
}
