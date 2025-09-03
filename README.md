# Star Wars Code Challenge

This repo contains a starter project with:

- `backend/` → Express API (TypeScript)
- `frontend/` → React app (TypeScript)

Backend task:

1. Implement the GET '/people' end point to:

- Retrieve all Star Wars characters from this API: https://swapi.info/api/people
- Retreive all different species from this API: https://swapi.info/api/species
- API must return an object containing all species, each specie must contain all people belonging to that specie, each person must contain: name, height, mass, gender and home world name.

2. Mobile task:

- In the component "PeopleBySpecies", implement the API call for retrieving all people
- While fetching the data, a loading state must be displayed
- After retrieving all people grouped by specie, render each in a collapsable panel, collapisble panel text must be the specie name.
- Show all people belonging to that specie sorted from tallest to shortest height.
