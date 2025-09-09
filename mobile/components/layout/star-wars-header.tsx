import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { SaberIcon } from "@/components/ui/icons/saber-icon";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { Colors, Fonts, Spacing, Typography } from "@/constants/theme";
import i18n from "@/i18n";

export function StarWarsHeader() {
  return (
    <>
      <View style={styles.headerImageContainer}>
        <Image
          source={require("@/assets/images/darth-vader.png")}
          contentFit="contain"
          style={styles.headerImage}
        />
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>
          {i18n.t("HOME_TITLE")}
        </ThemedText>
        <SaberIcon />
      </ThemedView>

      <ThemedView style={styles.subtitleContainer}>
        <ThemedText type="defaultSemiBold" style={styles.subtitleText}>
          {i18n.t("HOME_SUBTITLE")}
        </ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  headerImageContainer: {
    height: 256,
    right: -32,
    marginVertical: Spacing.sm,
  },
  headerImage: {
    width: "100%",
    height: "100%",
    marginBottom: Spacing.sm,
  },
  titleContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
    paddingTop: Spacing.lg,
  },
  titleText: {
    fontFamily: Fonts.rounded,
    fontSize: Typography.sizes.xxxl,
    fontWeight: Typography.weights.bold,
    lineHeight: Typography.lineHeights.loose,
  },
  subtitleContainer: {
    marginBottom: Spacing.sm,
  },
  subtitleText: {
    color: Colors.light.icon,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semiBold,
  },
});
