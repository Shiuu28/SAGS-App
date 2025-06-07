"use client"

import type React from "react"
import { View, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface GradientBackgroundProps {
  children: React.ReactNode
  style?: any
  variant?: "primary" | "secondary" | "surface"
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, style, variant = "primary" }) => {
  const { colors, isDark } = useTheme()

  const getBackgroundColor = () => {
    switch (variant) {
      case "primary":
        return colors.background
      case "secondary":
        return colors.backgroundSecondary
      case "surface":
        return colors.surface
      default:
        return colors.background
    }
  }

  const getOverlayColor = () => {
    switch (variant) {
      case "primary":
        return isDark ? colors.surface + "20" : colors.primary + "05"
      case "secondary":
        return isDark ? colors.surfaceSecondary + "30" : colors.primary + "10"
      case "surface":
        return isDark ? colors.background + "40" : colors.backgroundSecondary + "50"
      default:
        return isDark ? colors.surface + "20" : colors.primary + "05"
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
        },
        style,
      ]}
    >
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: getOverlayColor(),
          },
        ]}
      />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.6,
  },
})
