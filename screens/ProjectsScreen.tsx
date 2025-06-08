"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../App"
import { Ionicons } from "@expo/vector-icons"
import { HeaderWithDrawer } from "../components/HeaderWithDrawer"
import { GradientBackground } from "../components/GradientBackground"
import { useTheme } from "../context/ThemeContext"

type ProjectsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Projects">

interface Props {
  navigation: ProjectsScreenNavigationProp
}

interface Project {
  id: string
  name: string
  description: string
  plan: string
  progress: number
  startDate: string
  endDate: string
  status: "active" | "completed" | "pending"
}

export default function ProjectsScreen({ navigation }: Props) {
  const {colors, isDark} = useTheme()

  const [viewMode, setViewMode] = useState<"developer" | "admin">("developer")

  const projects: Project[] = [
    {
      id: "1",
      name: "Sistema de Gestión Hospitalaria",
      description: "Desarrollo de sistema para gestión de pacientes y citas médicas",
      plan: "Premium",
      progress: 75,
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      status: "active",
    },
    {
      id: "2",
      name: "E-commerce Platform",
      description: "Plataforma de comercio electrónico con sistema de pagos",
      plan: "Standard",
      progress: 45,
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      status: "active",
    },
    {
      id: "3",
      name: "App de Delivery",
      description: "Aplicación móvil para delivery de comida",
      plan: "Basic",
      progress: 100,
      startDate: "2023-10-01",
      endDate: "2024-01-01",
      status: "completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#10B981"
      case "completed":
        return "#0EA5E9"
      case "pending":
        return "#F59E0B"
      default:
        return "#6B7280"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "completed":
        return "Completado"
      case "pending":
        return "Pendiente"
      default:
        return "Desconocido"
    }
  }

  const renderProjectCard = ({ item }: { item: Project }) => (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectName}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <Text style={styles.projectDescription}>{item.description}</Text>

      <View style={styles.projectInfo}>
        <Text style={styles.infoLabel}>
          Plan: <Text style={styles.infoValue}>{item.plan}</Text>
        </Text>
        <Text style={styles.infoLabel}>
          Progreso: <Text style={styles.infoValue}>{item.progress}%</Text>
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Inicio: {item.startDate}</Text>
        <Text style={styles.dateText}>Fin: {item.endDate}</Text>
      </View>

      <View style={styles.projectActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Sprints", { projectId: item.id })}
        >
          <Ionicons name="git-branch-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Sprints</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Tasks", { projectId: item.id })}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Tareas</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <GradientBackground variant={isDark ? "surface" : "primary"} style={styles.container}>
      <HeaderWithDrawer navigation={navigation} currentRoute="Projects"/>
      <View style={styles.header}>
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === "developer" && styles.activeToggle]}
            onPress={() => setViewMode("developer")}
          >
            <Text style={[styles.toggleText, viewMode === "developer" && styles.activeToggleText]}>
              Vista Desarrollador
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === "admin" && styles.activeToggle]}
            onPress={() => setViewMode("admin")}
          >
            <Text style={[styles.toggleText, viewMode === "admin" && styles.activeToggleText]}>
              Vista Administrador
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("RegisterProject")}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Nuevo Proyecto</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={projects}
        renderItem={renderProjectCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.projectsList}
        showsVerticalScrollIndicator={false}
      />
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  header: {
    padding: 20,
  },
  viewToggle: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 25,
    padding: 5,
    marginBottom: 15,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  activeToggle: {
    backgroundColor: "#0284C7",
  },
  toggleText: {
    color: "#ccc",
    fontSize: 14,
    fontWeight: "600",
  },
  activeToggleText: {
    color: "#fff",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#10B981",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  projectsList: {
    padding: 20,
    paddingTop: 0,
  },
  projectCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  projectDescription: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  projectInfo: {
    marginBottom: 15,
  },
  infoLabel: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 5,
  },
  infoValue: {
    color: "#fff",
    fontWeight: "600",
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0EA5E9",
    borderRadius: 4,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dateText: {
    color: "#ccc",
    fontSize: 12,
  },
  projectActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    flexDirection: "row",
    backgroundColor: "#0284C7",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
})
