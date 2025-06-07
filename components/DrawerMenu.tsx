"use client"

import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { Logo } from "./Logo"
import { ThemeToggle } from "./ThemeToggle"

interface DrawerMenuProps {
  visible: boolean
  onClose: () => void
  navigation: any
  currentRoute?: string
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose, navigation, currentRoute }) => {
  const { colors } = useTheme()

  const menuItems = [
    {
      title: "Inicio",
      icon: "home-outline",
      route: "Home",
    },
    {
      title: "Gestión de Proyectos",
      icon: "folder-outline",
      route: "Projects",
    },
    {
      title: "PQRS",
      icon: "chatbubble-outline",
      route: "PQRS",
    },
    {
      title: "Perfil",
      icon: "person-outline",
      route: "Profile",
    },
    {
      title: "Sobre Nosotros",
      icon: "information-circle-outline",
      route: "About",
    },
  ]

  const handleNavigation = (route: string) => {
    onClose()
    navigation.navigate(route)
  }

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar Sesión",
        style: "destructive",
        onPress: () => {
          onClose()
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        },
      },
    ])
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <View style={[styles.drawer, { backgroundColor: colors.surface }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Logo size="medium" showText={true} />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, currentRoute === item.route && { backgroundColor: colors.primary + "20" }]}
                onPress={() => handleNavigation(item.route)}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={currentRoute === item.route ? colors.primary : colors.textSecondary}
                />
                <Text
                  style={[
                    styles.menuText,
                    {
                      color: currentRoute === item.route ? colors.primary : colors.text,
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <View style={styles.themeToggleContainer}>
              <Text style={[styles.themeLabel, { color: colors.textSecondary }]}>Tema</Text>
              <ThemeToggle />
            </View>

            <TouchableOpacity style={[styles.logoutButton, { backgroundColor: '#dc3545' }]} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
              <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    width: 280,
    height: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    padding: 5,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: "500",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  themeToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})
