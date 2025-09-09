import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// import PeopleBySpecies from "@/components/features/people/people-by-species";
import { StarWarsHeader } from "@/components/layout/star-wars-header";
import { ThemedView } from "@/components/ui/themed-view";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <StarWarsHeader />

        <ThemedView style={styles.peopleBySpeciesContainer}>
          {/* <PeopleBySpecies /> */}
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  peopleBySpeciesContainer: {
    flex: 1,
  },
});
