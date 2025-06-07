"use client"

import type React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme, colors } = useTheme()

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: colors.surface }]} onPress={toggleTheme}>
      <Ionicons name={isDark ? "sunny" : "moon"} size={24} color={colors.primary} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
})
