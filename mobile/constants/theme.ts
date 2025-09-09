import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    error: "#ff4444",
    errorIcon: "#ff4444",
    buttonPrimary: "#0a7ea4",
    buttonSecondary: "#f0f0f0",
    buttonTextPrimary: "#fff",
    buttonTextSecondary: "#11181C",
    border: "#687076",
    overlay: "rgba(0, 0, 0, 0.1)",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    error: "#ff6666",
    errorIcon: "#ff6666",
    buttonPrimary: "#007AFF",
    buttonSecondary: "#333",
    buttonTextPrimary: "#fff",
    buttonTextSecondary: "#ECEDEE",
    border: "#9BA1A6",
    overlay: "rgba(255, 255, 255, 0.1)",
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const Typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    normal: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
  },
  lineHeights: {
    tight: 16,
    normal: 20,
    relaxed: 24,
    loose: 32,
  },
} as const;

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const Opacity = {
  disabled: 0.6,
  muted: 0.7,
  subtle: 0.8,
  normal: 1,
} as const;

export const IconSizes = {
  xs: 12,
  sm: 16,
  md: 18,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;
