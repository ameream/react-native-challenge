import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PeopleBySpecies from "@/components/features/people/people-by-species";
import { StarWarsHeader } from "@/components/layout/star-wars-header";
import { ThemedView } from "@/components/ui/themed-view";
import { Spacing } from "@/constants/theme";
import { useSound } from "@/hooks/use-sound";

export default function HomeScreen() {
  const { playSound } = useSound(require("@/assets/sounds/lightsaber.mp3"));

  useEffect(() => {
    // Play lightsaber sound when the app opens
    playSound();
  }, [playSound]);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <StarWarsHeader />

        <ThemedView style={styles.peopleBySpeciesContainer}>
          <PeopleBySpecies />
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
    paddingHorizontal: Spacing.lg,
  },
  peopleBySpeciesContainer: {
    flex: 1,
  },
});
