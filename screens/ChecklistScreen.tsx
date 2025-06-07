"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert, Dimensions, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../context/ThemeContext"
import { GradientBackground } from "../components/GradientBackground"
import { HeaderWithDrawer } from "../components/HeaderWithDrawer"
import type { RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../App"

type ChecklistScreenRouteProp = RouteProp<RootStackParamList, "Checklist">
type ChecklistScreenNavigationProp = StackNavigationProp<RootStackParamList, "Checklist">

interface Props {
  route: ChecklistScreenRouteProp
  navigation: ChecklistScreenNavigationProp
}

interface DocumentItem {
  id: string
  nombre: string
  descripcion: string
  progreso: number
  archivo: string
  fecha: string
  aprobacion: boolean
}

interface Collaborator {
  id: string
  nombres: string
  apellidos: string
  avatar?: string
}

export default function ChecklistScreen({ route, navigation }: Props) {
  const { colors, isDark } = useTheme()
  const { projectId, projectName, projectType } = route.params
  const [previewModalVisible, setPreviewModalVisible] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null)

  // Mock data - En una app real, esto vendría de una API
  const documents: DocumentItem[] = [
    {
      id: "1",
      nombre: "Análisis de Requisitos",
      descripcion: "Documento de análisis y especificación de requisitos del sistema",
      progreso: 100,
      archivo: "analisis_requisitos.pdf",
      fecha: "2024-01-15",
      aprobacion: true,
    },
    {
      id: "2",
      nombre: "Diseño de Arquitectura",
      descripcion: "Documento de diseño de la arquitectura del sistema",
      progreso: 85,
      archivo: "diseno_arquitectura.pdf",
      fecha: "2024-01-20",
      aprobacion: false,
    },
    {
      id: "3",
      nombre: "Plan de Pruebas",
      descripcion: "Documento del plan de pruebas y casos de prueba",
      progreso: 60,
      archivo: "plan_pruebas.pdf",
      fecha: "2024-01-25",
      aprobacion: false,
    },
    {
      id: "4",
      nombre: "Manual de Usuario",
      descripcion: "Manual de usuario final del sistema",
      progreso: 30,
      archivo: "manual_usuario.pdf",
      fecha: "2024-01-30",
      aprobacion: false,
    },
  ]

  const collaborators: Collaborator[] = [
    { id: "1", nombres: "Juan Carlos", apellidos: "Pérez García" },
    { id: "2", nombres: "María Elena", apellidos: "Rodríguez López" },
    { id: "3", nombres: "Carlos Alberto", apellidos: "Martínez Silva" },
    { id: "4", nombres: "Ana Sofía", apellidos: "González Torres" },
  ]

  const handlePreviewDocument = (document: DocumentItem) => {
    setSelectedDocument(document)
    setPreviewModalVisible(true)
  }

  const handleEditDocument = (document: DocumentItem) => {
    Alert.alert("Editar Documento", `¿Deseas editar ${document.nombre}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Editar",
        onPress: () => {
          // Aquí iría la lógica para abrir el editor
          Alert.alert("Información", "Abriendo editor externo...")
        },
      },
    ])
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return colors.success
    if (progress >= 50) return colors.warning
    return colors.error
  }

  const renderDocumentItem = ({ item }: { item: DocumentItem }) => (
    <View style={[styles.documentCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.documentHeader}>
        <View style={styles.checkboxContainer}>
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: item.aprobacion ? colors.success : colors.surface,
                borderColor: item.aprobacion ? colors.success : colors.border,
              },
            ]}
          >
            {item.aprobacion && <Ionicons name="checkmark" size={16} color={colors.primaryText} />}
          </View>
        </View>

        <View style={styles.documentInfo}>
          <Text style={[styles.documentName, { color: colors.text }]}>{item.nombre}</Text>
          <Text style={[styles.documentDescription, { color: colors.textSecondary }]}>{item.descripcion}</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={[styles.progressText, { color: colors.text }]}>{item.progreso}%</Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${item.progreso}%`,
                    backgroundColor: getProgressColor(item.progreso),
                  },
                ]}
              />
            </View>
          </View>

          <Text style={[styles.documentDate, { color: colors.textSecondary }]}>Fecha: {item.fecha}</Text>
        </View>
      </View>

      <View style={styles.documentActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={() => handlePreviewDocument(item)}
        >
          <Ionicons name="eye-outline" size={16} color={colors.primaryText} />
          <Text style={[styles.actionButtonText, { color: colors.primaryText }]}>Ver</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.textTertiary }]}
          onPress={() => handleEditDocument(item)}
        >
          <Ionicons name="create-outline" size={16} color={colors.primaryText} />
          <Text style={[styles.actionButtonText, { color: colors.primaryText }]}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderCollaborator = ({ item }: { item: Collaborator }) => (
    <View style={[styles.collaboratorItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.collaboratorAvatar, { backgroundColor: colors.primary }]}>
        <Ionicons name="person" size={20} color={colors.primaryText} />
      </View>
      <Text style={[styles.collaboratorName, { color: colors.text }]}>
        {item.nombres} {item.apellidos}
      </Text>
    </View>
  )

  return (
    <GradientBackground variant={isDark ? "secondary" : "primary"}>
      <HeaderWithDrawer title="Checklist de Documentación" navigation={navigation} showThemeToggle={true} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Project Info */}
        <View style={[styles.projectInfo, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.projectName, { color: colors.text }]}>{projectName}</Text>
          <Text style={[styles.projectType, { color: colors.textSecondary }]}>{projectType}</Text>
        </View>

        {/* Documents List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Documentación del Proyecto</Text>

          <FlatList
            data={documents}
            renderItem={renderDocumentItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Collaborators */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Colaboradores</Text>

          <FlatList
            data={collaborators}
            renderItem={renderCollaborator}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Acciones del Proyecto</Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => navigation.navigate("Sprints", { projectId })}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
                <Ionicons name="refresh-outline" size={24} color={colors.primaryText} />
              </View>
              <Text style={[styles.actionTitle, { color: colors.text }]}>Sprints</Text>
              <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                Gestionar sprints del proyecto
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              onPress={() => navigation.navigate("Tasks", { projectId })}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.success }]}>
                <Ionicons name="checkmark-done-outline" size={24} color={colors.primaryText} />
              </View>
              <Text style={[styles.actionTitle, { color: colors.text }]}>Tareas</Text>
              <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>
                Administrar tareas pendientes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Preview Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={previewModalVisible}
        onRequestClose={() => setPreviewModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Vista: {selectedDocument?.nombre}</Text>
              <TouchableOpacity onPress={() => setPreviewModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={[styles.previewContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <View style={styles.previewPlaceholder}>
                <Ionicons name="document-text-outline" size={64} color={colors.textSecondary} />
                <Text style={[styles.previewText, { color: colors.textSecondary }]}>Vista previa del documento</Text>
                <Text style={[styles.previewSubtext, { color: colors.textSecondary }]}>
                  {selectedDocument?.archivo}
                </Text>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={() => {
                  setPreviewModalVisible(false)
                  Alert.alert("Información", "Abriendo documento en visor externo...")
                }}
              >
                <Ionicons name="open-outline" size={20} color={colors.primaryText} />
                <Text style={[styles.modalButtonText, { color: colors.primaryText }]}>Abrir</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.textTertiary }]}
                onPress={() => {
                  setPreviewModalVisible(false)
                  selectedDocument && handleEditDocument(selectedDocument)
                }}
              >
                <Ionicons name="create-outline" size={20} color={colors.primaryText} />
                <Text style={[styles.modalButtonText, { color: colors.primaryText }]}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </GradientBackground>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  projectInfo: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
  },
  projectName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  projectType: {
    fontSize: 16,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  documentCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
  },
  documentHeader: {
    flexDirection: "row",
    marginBottom: 15,
  },
  checkboxContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  documentDescription: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  documentDate: {
    fontSize: 12,
  },
  documentActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 5,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  collaboratorItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  collaboratorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  collaboratorName: {
    fontSize: 16,
    fontWeight: "500",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 15,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  actionSubtitle: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxHeight: "80%",
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  previewContainer: {
    height: 300,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  previewPlaceholder: {
    alignItems: "center",
  },
  previewText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  previewSubtext: {
    fontSize: 14,
  },
  modalActions: {
    flexDirection: "row",
    gap: 15,
  },
  modalButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
})
