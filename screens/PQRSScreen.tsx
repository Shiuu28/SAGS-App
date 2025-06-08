"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { HeaderWithDrawer } from "../components/HeaderWithDrawer"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../App"
import { useTheme } from "../context/ThemeContext"
import { GradientBackground } from "../components/GradientBackground"

type PQRSProp = StackNavigationProp<RootStackParamList, "PQRS">

interface Props {
  navigation: PQRSProp
}

interface PQRS {
  id: string
  type: "Petición" | "Queja" | "Reclamo" | "Sugerencia"
  description: string
  priority: number
  email: string
  date: string
  status: "pending" | "in-progress" | "resolved"
}

export default function PQRSScreen({ navigation } : Props) {
  const {colors, isDark} = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [pqrsType, setPqrsType] = useState<PQRS["type"]>("Petición")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState(3)
  const [searchText, setSearchText] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  const [pqrsList, setPqrsList] = useState<PQRS[]>([
    {
      id: "1",
      type: "Sugerencia",
      description: "Sería útil agregar notificaciones push para las tareas asignadas",
      priority: 3,
      email: "usuario1@email.com",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: "2",
      type: "Queja",
      description: "La aplicación se cierra inesperadamente al cargar proyectos grandes",
      priority: 5,
      email: "usuario2@email.com",
      date: "2024-01-14",
      status: "in-progress",
    },
    {
      id: "3",
      type: "Petición",
      description: "Solicito acceso a las métricas avanzadas del proyecto",
      priority: 2,
      email: "usuario3@email.com",
      date: "2024-01-13",
      status: "resolved",
    },
  ])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Petición":
        return "#0EA5E9"
      case "Queja":
        return "#EF4444"
      case "Reclamo":
        return "#F59E0B"
      case "Sugerencia":
        return "#10B981"
      default:
        return "#6B7280"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#F59E0B"
      case "in-progress":
        return "#0EA5E9"
      case "resolved":
        return "#10B981"
      default:
        return "#6B7280"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "in-progress":
        return "En Proceso"
      case "resolved":
        return "Resuelto"
      default:
        return "Desconocido"
    }
  }

  const handleCreatePQRS = () => {
    if (!description.trim()) {
      Alert.alert("Error", "Por favor ingrese una descripción")
      return
    }

    const newPQRS: PQRS = {
      id: Date.now().toString(),
      type: pqrsType,
      description: description.trim(),
      priority,
      email: "usuario@email.com", // This would come from user context
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    }

    setPqrsList([newPQRS, ...pqrsList])
    setModalVisible(false)
    setDescription("")
    setPqrsType("Petición")
    setPriority(3)
    Alert.alert("Éxito", "PQRS creado correctamente")
  }

  const filteredPQRS = pqrsList.filter((item) => {
    const matchesSearch =
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
    const matchesType = filterType === "all" || item.type === filterType
    return matchesSearch && matchesType
  })

  const renderPQRSCard = ({ item }: { item: PQRS }) => (
    <View style={styles.pqrsCard}>
      <View style={styles.pqrsHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={20} color="#fff" />
          </View>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
          <Text style={styles.typeBadgeText}>{item.type}</Text>
        </View>
      </View>

      <Text style={styles.pqrsDescription}>{item.description}</Text>

      <View style={styles.pqrsFooter}>
        <View style={styles.priorityContainer}>
          <Text style={styles.priorityText}>Prioridad: {item.priority}/5</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons key={star} name={star <= item.priority ? "star" : "star-outline"} size={16} color="#F59E0B" />
            ))}
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
    </View>
  )

  return (
    <GradientBackground variant={isDark ? "surface" : "primary"} style={styles.container}>
      <HeaderWithDrawer navigation={navigation} currentRoute="PQRS"/>
      <View style={styles.header}>
        <Text style={styles.title}>Sistema de PQRS</Text>
        <Text style={styles.subtitle}>Peticiones, Quejas, Reclamos y Sugerencias</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por correo o contenido..."
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.filterContainer}>
          <Picker selectedValue={filterType} onValueChange={setFilterType} style={styles.filterPicker}>
            <Picker.Item label="Todos los tipos" value="all" />
            <Picker.Item label="Peticiones" value="Petición" />
            <Picker.Item label="Quejas" value="Queja" />
            <Picker.Item label="Reclamos" value="Reclamo" />
            <Picker.Item label="Sugerencias" value="Sugerencia" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredPQRS}
        renderItem={renderPQRSCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.pqrsList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.createButtonText}>Crear nueva PQRS</Text>
      </TouchableOpacity>

      {/* Create PQRS Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Crear nueva PQRS</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Tipo de PQRS:</Text>
              <Picker selectedValue={pqrsType} onValueChange={setPqrsType} style={styles.picker}>
                <Picker.Item label="Petición" value="Petición" />
                <Picker.Item label="Queja" value="Queja" />
                <Picker.Item label="Reclamo" value="Reclamo" />
                <Picker.Item label="Sugerencia" value="Sugerencia" />
              </Picker>
            </View>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describa detalladamente su PQRS"
              placeholderTextColor="#666"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Prioridad:</Text>
              <Picker selectedValue={priority} onValueChange={setPriority} style={styles.picker}>
                <Picker.Item label="1 - Baja" value={1} />
                <Picker.Item label="2 - Media-Baja" value={2} />
                <Picker.Item label="3 - Media" value={3} />
                <Picker.Item label="4 - Media-Alta" value={4} />
                <Picker.Item label="5 - Alta" value={5} />
              </Picker>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalButton, styles.createModalButton]} onPress={handleCreatePQRS}>
                <Text style={styles.modalButtonText}>Enviar PQRS</Text>
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
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
  },
  searchContainer: {
    padding: 20,
    paddingTop: 0,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginLeft: 15,
  },
  searchInput: {
    flex: 1,
    padding: 15,
    color: "#fff",
    fontSize: 16,
  },
  filterContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },
  filterPicker: {
    color: "#fff",
  },
  pqrsList: {
    padding: 20,
    paddingTop: 0,
  },
  pqrsCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  pqrsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  userEmail: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  typeBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  pqrsDescription: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  pqrsFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  priorityContainer: {
    flex: 1,
  },
  priorityText: {
    color: "#ccc",
    fontSize: 12,
    marginBottom: 5,
  },
  stars: {
    flexDirection: "row",
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 5,
  },
  statusText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  dateText: {
    color: "#666",
    fontSize: 10,
  },
  createButton: {
    flexDirection: "row",
    backgroundColor: "#10B981",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
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
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 100,
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
  createModalButton: {
    backgroundColor: "#10B981",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
