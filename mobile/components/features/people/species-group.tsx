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
    <ThemedView style={styles.speciesContainer}>
      <TouchableOpacity
        style={styles.speciesHeader}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={IconSizes.md}
          weight="medium"
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isExpanded ? "90deg" : "0deg" }] }}
        />
        <ThemedText type="defaultSemiBold">{species}</ThemedText>
        <ThemedText style={styles.countText} type="default">
          {people.length}
        </ThemedText>
      </TouchableOpacity>

      {isExpanded && (
        <ThemedView style={styles.peopleContainer}>
          {people.map((person) => (
            <PersonCard key={person.name} person={person} />
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
