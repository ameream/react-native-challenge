import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { Opacity, Spacing, Typography } from "@/constants/theme";
import i18n from "@/i18n";
import { Person } from "@/types/people";
import { formatPersonDetails } from "@/utils/strings";

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <ThemedView style={styles.personItem}>
      <ThemedText style={styles.personName} type="defaultSemiBold">
        {person.name}
      </ThemedText>
      <ThemedText style={styles.personDetails} type="default">
        {formatPersonDetails(person.height, person.mass, person.gender)}
      </ThemedText>
      <ThemedText style={styles.personDetails} type="default">
        {i18n.t("HOMEWORLD")}: {person.homeworld}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  personItem: {
    marginBottom: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  personName: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semiBold,
    marginBottom: Spacing.xs,
  },
  personDetails: {
    fontSize: Typography.sizes.sm,
    opacity: Opacity.subtle,
    marginBottom: Spacing.xs / 2,
  },
});
