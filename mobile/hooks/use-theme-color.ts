import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

/**
 * Custom hook for getting theme-appropriate colors.
 * Returns a color based on the current theme (light/dark) with fallback to default theme colors.
 * @param props - object with optional light and dark color overrides
 * @param colorName - name of the color property from the theme colors
 * @returns the appropriate color string for the current theme
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
