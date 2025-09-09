import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";

import { ThemedView } from "@/components/ui/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useExpandedSections } from "@/hooks/use-expanded-sections";
import { usePeopleBySpecies } from "@/hooks/use-people-by-species";
import { SpeciesGroup as SpeciesGroupType } from "@/types/people";

import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "./people-by-species-states";
import { SpeciesGroup } from "./species-group";

export default function PeopleBySpecies() {
  const theme = useColorScheme() ?? "light";
  const { toggleSection, isExpanded } = useExpandedSections();
  const { data, isLoading, error, refetch, isRefetching, isFetchedAfterMount } =
    usePeopleBySpecies();

  const renderSpeciesGroup = ({ item }: { item: SpeciesGroupType }) => (
    <SpeciesGroup
      species={item.species}
      people={item.people}
      isExpanded={isExpanded(item.species)}
      onToggle={() => toggleSection(item.species)}
    />
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!data || data.length === 0) {
    return <EmptyState onRefresh={refetch} />;
  }

  return (
    <ThemedView style={styles.container} testID="people-by-species-container">
      {isRefetching && !isLoading && !isFetchedAfterMount && (
        <ThemedView style={styles.refetchIndicator} testID="refetch-indicator">
          <ActivityIndicator
            size="small"
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
            testID="refetch-activity-indicator"
          />
        </ThemedView>
      )}
      <FlatList
        data={data}
        renderItem={renderSpeciesGroup}
        keyExtractor={(item) => item.species}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        testID="species-list"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={theme === "light" ? Colors.light.icon : Colors.dark.icon}
            testID="refresh-control"
          />
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    padding: Spacing.xs,
  },
  refetchIndicator: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
  },
});
