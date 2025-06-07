"use client"

import type React from "react"
import { useState } from "react"
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { DrawerMenu } from "./DrawerMenu"
import { ThemeToggle } from "./ThemeToggle"

interface HeaderWithDrawerProps {
  navigation: any
  currentRoute?: string
  title?: string
  showThemeToggle?: boolean
}

export const HeaderWithDrawer: React.FC<HeaderWithDrawerProps> = ({
  navigation,
  currentRoute,
  title,
  showThemeToggle = true,
}) => {
  const { colors } = useTheme()
  const [drawerVisible, setDrawerVisible] = useState(false)

  const getRouteTitle = (route?: string) => {
    switch (route) {
      case "Home":
        return "Inicio"
      case "Projects":
        return "Proyectos"
      case "PQRS":
        return "PQRS"
      case "Profile":
        return "Perfil"
      case "About":
        return "Sobre Nosotros"
      case "RegisterProject":
        return "Nuevo Proyecto"
      case "Sprints":
        return "Sprints"
      case "Tasks":
        return "Tareas"
      default:
        return "SAGS"
    }
  }

  return (
    <>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: colors.backgroundSecondary }]}
          onPress={() => setDrawerVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {title || getRouteTitle(currentRoute)}
          </Text>
        </View>

        {showThemeToggle && <ThemeToggle />}
      </View>

      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
        currentRoute={currentRoute}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingVertical: 12,
    borderBottomWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    marginRight: 15,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
})
