import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

interface SpeciesGroup {
  species: string;
  people: string[];
}

export default function PeopleBySpecies() {
  const [, setLoading] = useState(true);
  const [data] = useState<SpeciesGroup[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        //TODO: Implement fetch data from API
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <ScrollView>
      <Text>TODO: Render collapsible species panels</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </ScrollView>
  );
}
