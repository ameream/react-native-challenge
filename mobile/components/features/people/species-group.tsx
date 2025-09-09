import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import {
  BorderRadius,
  Colors,
  IconSizes,
  Opacity,
  Spacing,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { PersonCard } from "./person-card";

interface Person {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
}

interface SpeciesGroupProps {
  species: string;
  people: Person[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function SpeciesGroup({
  species,
  people,
  isExpanded,
  onToggle,
}: SpeciesGroupProps) {
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.speciesContainer} testID={`species-group-${species.toLowerCase().replace(/\s+/g, '-')}`}>
      <TouchableOpacity
        style={styles.speciesHeader}
        onPress={onToggle}
        activeOpacity={0.8}
        testID={`species-header-${species.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <IconSymbol
          name="chevron.right"
          size={IconSizes.md}
          weight="medium"
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isExpanded ? "90deg" : "0deg" }] }}
          testID={`species-chevron-${species.toLowerCase().replace(/\s+/g, '-')}`}
        />
        <ThemedText type="defaultSemiBold" testID={`species-name-${species.toLowerCase().replace(/\s+/g, '-')}`}>
          {species}
        </ThemedText>
        <ThemedText style={styles.countText} type="default" testID={`species-count-${species.toLowerCase().replace(/\s+/g, '-')}`}>
          {people.length}
        </ThemedText>
      </TouchableOpacity>

      {isExpanded && (
        <ThemedView style={styles.peopleContainer} testID={`people-container-${species.toLowerCase().replace(/\s+/g, '-')}`}>
          {people.map((person, index) => (
            <PersonCard
              key={person.name}
              person={person}
              testID={`person-card-${species.toLowerCase().replace(/\s+/g, '-')}-${index}`}
            />
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  speciesContainer: {
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  speciesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  countText: {
    marginLeft: "auto",
    opacity: Opacity.muted,
  },
  peopleContainer: {
    marginTop: Spacing.xs,
    marginLeft: Spacing.xxl,
  },
});
