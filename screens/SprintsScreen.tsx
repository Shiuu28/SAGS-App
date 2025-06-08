"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RouteProp } from "@react-navigation/native"
import type { RootStackParamList } from "../App"
import { Ionicons } from "@expo/vector-icons"
import { HeaderWithDrawer } from "../components/HeaderWithDrawer"
import { GradientBackground } from "../components/GradientBackground"
import { useTheme } from "../context/ThemeContext"

type SprintsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Sprints">
type SprintsScreenRouteProp = RouteProp<RootStackParamList, "Sprints">

interface Props {
  navigation: SprintsScreenNavigationProp
  route: SprintsScreenRouteProp
}

interface Sprint {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  progress: number
  status: "active" | "completed" | "planning"
}

export default function SprintsScreen({ navigation, route }: Props) {
  const {colors, isDark} = useTheme()
  const { projectId } = route.params
  const [modalVisible, setModalVisible] = useState(false)
  const [sprintName, setSprintName] = useState("")
  const [sprintDescription, setSprintDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [sprints, setSprints] = useState<Sprint[]>([
    {
      id: "1",
      name: "Sprint 1: Diseño de UI",
      description: "Diseño de interfaces de usuario y experiencia del usuario",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      progress: 100,
      status: "completed",
    },
    {
      id: "2",
      name: "Sprint 2: Backend API",
      description: "Desarrollo de APIs y servicios backend",
      startDate: "2024-02-16",
      endDate: "2024-03-16",
      progress: 75,
      status: "active",
    },
    {
      id: "3",
      name: "Sprint 3: Integración",
      description: "Integración frontend-backend y testing",
      startDate: "2024-03-17",
      endDate: "2024-04-17",
      progress: 0,
      status: "planning",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#10B981"
      case "completed":
        return "#0EA5E9"
      case "planning":
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
      case "planning":
        return "Planificación"
      default:
        return "Desconocido"
    }
  }

  const handleCreateSprint = () => {
    if (!sprintName || !sprintDescription || !startDate || !endDate) {
      Alert.alert("Error", "Por favor complete todos los campos")
      return
    }

    const newSprint: Sprint = {
      id: Date.now().toString(),
      name: sprintName,
      description: sprintDescription,
      startDate,
      endDate,
      progress: 0,
      status: "planning",
    }

    setSprints([...sprints, newSprint])
    setModalVisible(false)
    setSprintName("")
    setSprintDescription("")
    setStartDate("")
    setEndDate("")
    Alert.alert("Éxito", "Sprint creado correctamente")
  }

  const renderSprintCard = ({ item }: { item: Sprint }) => (
    <View style={styles.sprintCard}>
      <View style={styles.sprintHeader}>
        <Text style={styles.sprintName}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <Text style={styles.sprintDescription}>{item.description}</Text>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {item.startDate} - {item.endDate}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progreso</Text>
          <Text style={styles.progressPercentage}>{item.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
        </View>
      </View>

      <View style={styles.sprintActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <GradientBackground variant={isDark ? "surface" : "primary"} style={styles.container}>
     <HeaderWithDrawer navigation={navigation} currentRoute="Sprints"/>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Nuevo Sprint</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sprints}
        renderItem={renderSprintCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sprintsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Create Sprint Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nuevo Sprint</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Nombre del Sprint"
              placeholderTextColor="#666"
              value={sprintName}
              onChangeText={setSprintName}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripción"
              placeholderTextColor="#666"
              value={sprintDescription}
              onChangeText={setSprintDescription}
              multiline
              numberOfLines={3}
            />

            <TextInput
              style={styles.input}
              placeholder="Fecha de inicio (YYYY-MM-DD)"
              placeholderTextColor="#666"
              value={startDate}
              onChangeText={setStartDate}
            />

            <TextInput
              style={styles.input}
              placeholder="Fecha de fin (YYYY-MM-DD)"
              placeholderTextColor="#666"
              value={endDate}
              onChangeText={setEndDate}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, styles.createButton]} onPress={handleCreateSprint}>
                <Text style={styles.modalButtonText}>Crear Sprint</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
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
  sprintsList: {
    padding: 20,
    paddingTop: 0,
  },
  sprintCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  sprintHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  sprintName: {
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
  sprintDescription: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  dateContainer: {
    marginBottom: 15,
  },
  dateText: {
    color: "#0EA5E9",
    fontSize: 14,
    fontWeight: "600",
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    color: "#ccc",
    fontSize: 14,
  },
  progressPercentage: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
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
  sprintActions: {
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
  deleteButton: {
    backgroundColor: "#EF4444",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1a2032",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#6B7280",
  },
  createButton: {
    backgroundColor: "#10B981",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
