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
  Typography,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import i18n from "@/i18n";
import { getErrorMessage } from "@/utils/strings";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = i18n.t("LOADING"),
}: LoadingStateProps) {
  return (
    <ThemedView style={styles.centerContainer}>
      <ThemedText type="defaultSemiBold">{message}</ThemedText>
    </ThemedView>
  );
}

interface ErrorStateProps {
  error: Error;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.centerContainer}>
      <IconSymbol
        name="exclamationmark.triangle"
        size={IconSizes.xxl}
        weight="medium"
        color={
          theme === "light" ? Colors.light.errorIcon : Colors.dark.errorIcon
        }
        style={styles.errorIcon}
      />
      <ThemedText type="defaultSemiBold" style={styles.errorText}>
        {getErrorMessage(error)}
      </ThemedText>
      <ThemedText type="default" style={styles.errorSubtext}>
        {i18n.t("ERROR_SERVER_MESSAGE")}
      </ThemedText>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <ThemedText type="defaultSemiBold" style={styles.retryButtonText}>
          {i18n.t("RETRY")}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

interface EmptyStateProps {
  onRefresh: () => void;
}

export function EmptyState({ onRefresh }: EmptyStateProps) {
  return (
    <ThemedView style={styles.centerContainer}>
      <ThemedText type="defaultSemiBold">
        {i18n.t("NO_DATA_AVAILABLE")}
      </ThemedText>
      <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
        <ThemedText type="defaultSemiBold" style={styles.retryButtonText}>
          {i18n.t("REFRESH")}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xl * 2,
  },
  errorIcon: {
    marginBottom: Spacing.sm,
  },
  errorText: {
    color: Colors.light.error,
    textAlign: "center",
    marginBottom: Spacing.sm,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semiBold,
  },
  errorSubtext: {
    textAlign: "center",
    opacity: Opacity.disabled,
    marginBottom: Spacing.xl,
    fontSize: Typography.sizes.md,
    lineHeight: Typography.lineHeights.normal,
  },
  retryButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.light.buttonSecondary,
  },
  retryButtonText: {
    color: Colors.light.text,
    textAlign: "center",
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semiBold,
  },
});
