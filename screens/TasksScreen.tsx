"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RouteProp } from "@react-navigation/native"
import type { RootStackParamList } from "../App"
import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"

type TasksScreenNavigationProp = StackNavigationProp<RootStackParamList, "Tasks">
type TasksScreenRouteProp = RouteProp<RootStackParamList, "Tasks">

interface Props {
  navigation: TasksScreenNavigationProp
  route: TasksScreenRouteProp
}

interface Task {
  id: string
  title: string
  description: string
  status: "active" | "evaluating" | "pending" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string
  sprintId: string
  assignedTo?: string
}

export default function TasksScreen({ navigation, route }: Props) {
  const { projectId } = route.params
  const [modalVisible, setModalVisible] = useState(false)
  const [taskTitle, setTaskTitle] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskStatus, setTaskStatus] = useState<Task["status"]>("pending")
  const [taskPriority, setTaskPriority] = useState<Task["priority"]>("medium")
  const [taskDueDate, setTaskDueDate] = useState("")
  const [selectedSprint, setSelectedSprint] = useState("")

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Diseñar interfaz de login",
      description: "Crear mockups y prototipos para la pantalla de login",
      status: "completed",
      priority: "high",
      dueDate: "2024-01-20",
      sprintId: "1",
      assignedTo: "Juan Pérez",
    },
    {
      id: "2",
      title: "Implementar autenticación",
      description: "Desarrollar sistema de autenticación con JWT",
      status: "active",
      priority: "high",
      dueDate: "2024-02-15",
      sprintId: "2",
      assignedTo: "María García",
    },
    {
      id: "3",
      title: "Testing de APIs",
      description: "Realizar pruebas unitarias y de integración",
      status: "pending",
      priority: "medium",
      dueDate: "2024-03-01",
      sprintId: "2",
    },
  ])

  const sprints = [
    { id: "1", name: "Sprint 1: Diseño de UI" },
    { id: "2", name: "Sprint 2: Backend API" },
    { id: "3", name: "Sprint 3: Integración" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#10B981"
      case "completed":
        return "#0EA5E9"
      case "evaluating":
        return "#F59E0B"
      case "pending":
        return "#6B7280"
      default:
        return "#6B7280"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#EF4444"
      case "medium":
        return "#F59E0B"
      case "low":
        return "#10B981"
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
      case "evaluating":
        return "Evaluando"
      case "pending":
        return "Pendiente"
      default:
        return "Desconocido"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Media"
      case "low":
        return "Baja"
      default:
        return "Desconocida"
    }
  }

  const handleCreateTask = () => {
    if (!taskTitle || !taskDescription || !taskDueDate || !selectedSprint) {
      Alert.alert("Error", "Por favor complete todos los campos")
      return
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      priority: taskPriority,
      dueDate: taskDueDate,
      sprintId: selectedSprint,
    }

    setTasks([...tasks, newTask])
    setModalVisible(false)
    resetForm()
    Alert.alert("Éxito", "Tarea creada correctamente")
  }

  const resetForm = () => {
    setTaskTitle("")
    setTaskDescription("")
    setTaskStatus("pending")
    setTaskPriority("medium")
    setTaskDueDate("")
    setSelectedSprint("")
  }

  const renderTaskCard = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      <Text style={styles.taskDescription}>{item.description}</Text>

      <View style={styles.taskMeta}>
        <View style={styles.badgeContainer}>
          <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.badgeText}>{getStatusText(item.status)}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: getPriorityColor(item.priority) }]}>
            <Text style={styles.badgeText}>{getPriorityText(item.priority)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.taskFooter}>
        <View style={styles.taskInfo}>
          <Text style={styles.infoText}>Fecha límite: {item.dueDate}</Text>
          {item.assignedTo && <Text style={styles.infoText}>Asignado a: {item.assignedTo}</Text>}
        </View>
      </View>
    </View>
  )

  return (
    <LinearGradient colors={["#000a11", "#001122", "#000a11"]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Nueva Tarea</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.tasksList}
        showsVerticalScrollIndicator={false}
      />

      {/* Create Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nueva Tarea</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Título de la tarea"
              placeholderTextColor="#666"
              value={taskTitle}
              onChangeText={setTaskTitle}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripción"
              placeholderTextColor="#666"
              value={taskDescription}
              onChangeText={setTaskDescription}
              multiline
              numberOfLines={3}
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Sprint:</Text>
              <Picker selectedValue={selectedSprint} onValueChange={setSelectedSprint} style={styles.picker}>
                <Picker.Item label="Seleccionar Sprint" value="" />
                {sprints.map((sprint) => (
                  <Picker.Item key={sprint.id} label={sprint.name} value={sprint.id} />
                ))}
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Estado:</Text>
              <Picker selectedValue={taskStatus} onValueChange={setTaskStatus} style={styles.picker}>
                <Picker.Item label="Pendiente" value="pending" />
                <Picker.Item label="Activo" value="active" />
                <Picker.Item label="Evaluando" value="evaluating" />
                <Picker.Item label="Completado" value="completed" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Prioridad:</Text>
              <Picker selectedValue={taskPriority} onValueChange={setTaskPriority} style={styles.picker}>
                <Picker.Item label="Baja" value="low" />
                <Picker.Item label="Media" value="medium" />
                <Picker.Item label="Alta" value="high" />
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Fecha límite (YYYY-MM-DD)"
              placeholderTextColor="#666"
              value={taskDueDate}
              onChangeText={setTaskDueDate}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, styles.createButton]} onPress={handleCreateTask}>
                <Text style={styles.modalButtonText}>Crear Tarea</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
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
  tasksList: {
    padding: 20,
    paddingTop: 0,
  },
  taskCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    marginRight: 10,
  },
  moreButton: {
    padding: 5,
  },
  taskDescription: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  taskMeta: {
    marginBottom: 15,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 5,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  taskFooter: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    paddingTop: 15,
  },
  taskInfo: {
    gap: 5,
  },
  infoText: {
    color: "#ccc",
    fontSize: 12,
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
    maxHeight: "90%",
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
  pickerContainer: {
    marginBottom: 15,
  },
  pickerLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    color: "#fff",
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
