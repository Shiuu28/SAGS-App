"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../App"
import { useTheme } from "../context/ThemeContext"
import { GradientBackground } from "../components/GradientBackground"
import { HeaderWithDrawer } from "../components/HeaderWithDrawer"

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">

interface Props {
  navigation: ProfileScreenNavigationProp
}

export default function ProfileScreen({ navigation }: Props) {
  const { colors, isDark } = useTheme()
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [passwordModalVisible, setPasswordModalVisible] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    document: "12345678",
    phone: "3001234567",
    role: "Desarrollador",
  })
  const [editForm, setEditForm] = useState({ ...userInfo })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const userProjects = [
    {
      id: "1",
      name: "Sistema de Gestión Hospitalaria",
      description: "Desarrollo de sistema para gestión de pacientes",
      status: "En progreso",
    },
    {
      id: "2",
      name: "E-commerce Platform",
      description: "Plataforma de comercio electrónico",
      status: "Completado",
    },
  ]

  const handleUpdateProfile = () => {
    setUserInfo({ ...editForm })
    setEditModalVisible(false)
    Alert.alert("Éxito", "Perfil actualizado correctamente")
  }

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return
    }
    if (passwordForm.newPassword.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres")
      return
    }
    setPasswordModalVisible(false)
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    Alert.alert("Éxito", "Contraseña actualizada correctamente")
  }

  return (
    <GradientBackground variant={isDark ? "surface" : "primary"} style={styles.container}>
      <HeaderWithDrawer navigation={navigation} currentRoute="Profile"/>
      <ScrollView style={styles.scrollView}>
        {/* User Info Section */}
        <View style={[styles.userInfoSection, { borderBottomColor: colors.border }]}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={[styles.avatar, { backgroundColor: colors.surfaceSecondary }]}
            />
            <TouchableOpacity style={[styles.editAvatarButton, { backgroundColor: colors.primary }]}>
              <Ionicons name="camera" size={20} color={colors.primaryText} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.userName, { color: colors.text }]}>{userInfo.name}</Text>
          <Text style={[styles.userEmail, { color: colors.info }]}>{userInfo.email}</Text>
          <Text style={[styles.userRole, { color: colors.textSecondary }]}>{userInfo.role}</Text>

          <View style={styles.userActions}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                setEditForm({ ...userInfo })
                setEditModalVisible(true)
              }}
            >
              <Ionicons name="create-outline" size={20} color={colors.primaryText} />
              <Text style={[styles.actionButtonText, { color: colors.primaryText }]}>Editar Datos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.passwordButton]}
              onPress={() => setPasswordModalVisible(true)}
            >
              <Ionicons name="lock-closed-outline" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Cambiar Clave</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Details */}
        <View style={[styles.detailsSection, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Información Personal</Text>

          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Documento:</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{userInfo.document}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Teléfono:</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{userInfo.phone}</Text>
          </View>
        </View>

        {/* Projects Section */}
        <View style={styles.projectsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Mis Proyectos</Text>

          {userProjects.map((project) => (
            <View
              key={project.id}
              style={[styles.projectCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Text style={[styles.projectName, { color: colors.text }]}>{project.name}</Text>
              <Text style={[styles.projectDescription, { color: colors.textSecondary }]}>{project.description}</Text>
              <View style={styles.projectFooter}>
                <Text style={[styles.projectStatus, { color: colors.success }]}>Estado: {project.status}</Text>
                <TouchableOpacity
                  style={[styles.viewProjectButton, { backgroundColor: colors.primary }]}
                  onPress={() =>
                    navigation.navigate("Checklist", {
                      projectId: project.id,
                      projectName: project.name,
                      projectType: project.description,
                    })
                  }
                >
                  <Text style={[styles.viewProjectText, { color: colors.primaryText }]}>Ver</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Editar Perfil</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.surfaceSecondary, borderColor: colors.border, color: colors.text },
              ]}
              placeholder="Nombre completo"
              placeholderTextColor={colors.textTertiary}
              value={editForm.name}
              onChangeText={(text) => setEditForm({ ...editForm, name: text })}
            />

            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.surfaceSecondary, borderColor: colors.border, color: colors.text },
              ]}
              placeholder="Email"
              placeholderTextColor={colors.textTertiary}
              value={editForm.email}
              onChangeText={(text) => setEditForm({ ...editForm, email: text })}
              keyboardType="email-address"
            />

            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.surfaceSecondary, borderColor: colors.border, color: colors.text },
              ]}
              placeholder="Documento"
              placeholderTextColor={colors.textTertiary}
              value={editForm.document}
              onChangeText={(text) => setEditForm({ ...editForm, document: text })}
            />

            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.surfaceSecondary, borderColor: colors.border, color: colors.text },
              ]}
              placeholder="Teléfono"
              placeholderTextColor={colors.textTertiary}
              value={editForm.phone}
              onChangeText={(text) => setEditForm({ ...editForm, phone: text })}
              keyboardType="phone-pad"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.textTertiary }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.primaryText }]}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.success }]}
                onPress={handleUpdateProfile}
              >
                <Text style={[styles.modalButtonText, { color: colors.primaryText }]}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Cambiar Contraseña</Text>
              <TouchableOpacity onPress={() => setPasswordModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.surfaceSecondary, borderColor: colors.border, color: colors.text },
              ]}
              placeholder="Contraseña actual"
              placeholderTextColor={colors.textTertiary}
              value={passwordForm.currentPassword}
              onChangeText={(text) => setPasswordForm({ ...passwordForm, currentPassword: text })}
              secureTextEntry
            />

            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.surfaceSecondary, borderColor: colors.border, color: colors.text },
              ]}
              placeholder="Nueva contraseña"
              placeholderTextColor={colors.textTertiary}
              value={passwordForm.newPassword}
              onChangeText={(text) => setPasswordForm({ ...passwordForm, newPassword: text })}
              secureTextEntry
            />

            <TextInput
              style={[
                styles.input,
                { backgroundColor: colors.surfaceSecondary, borderColor: colors.border, color: colors.text },
              ]}
              placeholder="Confirmar nueva contraseña"
              placeholderTextColor={colors.textTertiary}
              value={passwordForm.confirmPassword}
              onChangeText={(text) => setPasswordForm({ ...passwordForm, confirmPassword: text })}
              secureTextEntry
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.textTertiary }]}
                onPress={() => setPasswordModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: colors.primaryText }]}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.success }]}
                onPress={handleChangePassword}
              >
                <Text style={[styles.modalButtonText, { color: colors.primaryText }]}>Cambiar</Text>
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
  scrollView: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: "center",
    padding: 30,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 5,
  },
  userRole: {
    fontSize: 14,
    marginBottom: 20,
  },
  userActions: {
    flexDirection: "row",
    gap: 15,
  },
  actionButton: {
    flexDirection: "row",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  passwordButton: {
    backgroundColor: "#7C3AED",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  detailsSection: {
    padding: 20,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  detailLabel: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  projectsSection: {
    padding: 20,
  },
  projectCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  projectFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectStatus: {
    fontSize: 14,
    fontWeight: "600",
  },
  viewProjectButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  viewProjectText: {
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    width: "90%",
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
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
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
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
})
