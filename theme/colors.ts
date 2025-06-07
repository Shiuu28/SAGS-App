// Color palette based on the SIRS logo with enhanced dark/light mode support
export const Colors = {
  // Primary colors from logo
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Main blue from logo
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },

  // Secondary colors (complementary)
  secondary: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },

  // Success, warning, error colors
  success: {
    light: "#10b981",
    dark: "#059669",
  },
  warning: {
    light: "#f59e0b",
    dark: "#d97706",
  },
  error: {
    light: "#ef4444",
    dark: "#dc2626",
  },

  // Light theme
  light: {
    background: "#ffffff",
    backgroundSecondary: "#f8fafc",
    surface: "#ffffff",
    surfaceSecondary: "#f1f5f9",
    card: "#ffffff",
    text: "#1e293b",
    textSecondary: "#64748b",
    textTertiary: "#94a3b8",
    border: "#e2e8f0",
    borderSecondary: "#cbd5e1",
    primary: "#3b82f6",
    primaryText: "#ffffff",
    shadow: "rgba(0, 0, 0, 0.1)",
    overlay: "rgba(0, 0, 0, 0.5)",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#0ea5e9",
  },

  // Dark theme
  dark: {
    background: "#0f172a",
    backgroundSecondary: "#1e293b",
    surface: "#1e293b",
    surfaceSecondary: "#334155",
    card: "#334155",
    text: "#f8fafc",
    textSecondary: "#cbd5e1",
    textTertiary: "#94a3b8",
    border: "#475569",
    borderSecondary: "#64748b",
    primary: "#60a5fa",
    primaryText: "#0f172a",
    shadow: "rgba(0, 0, 0, 0.3)",
    overlay: "rgba(0, 0, 0, 0.7)",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#0ea5e9",
  },
}

export type Theme = "light" | "dark"
