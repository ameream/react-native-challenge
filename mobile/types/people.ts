export interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
}

export interface SpeciesGroup {
  species: string;
  people: Person[];
}
