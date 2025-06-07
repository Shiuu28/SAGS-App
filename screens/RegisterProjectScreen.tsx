"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../App"
import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"

type RegisterProjectScreenNavigationProp = StackNavigationProp<RootStackParamList, "RegisterProject">

interface Props {
  navigation: RegisterProjectScreenNavigationProp
}

export default function RegisterProjectScreen({ navigation }: Props) {
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [projectType, setProjectType] = useState("web")
  const [startDate, setStartDate] = useState("")

  const handleRegisterProject = () => {
    if (!projectName || !description || !startDate) {
      Alert.alert("Error", "Por favor complete todos los campos")
      return
    }

    // Simulate project registration
    Alert.alert("Éxito", "Proyecto registrado correctamente", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Projects"),
      },
    ])
  }

  return (
    <LinearGradient colors={["#000a11", "#001122", "#000a11"]} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Registrar Proyecto</Text>
          <Text style={styles.subtitle}>Complete la información para crear un nuevo proyecto</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre del Proyecto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese el nombre del proyecto"
              placeholderTextColor="#666"
              value={projectName}
              onChangeText={setProjectName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripción detallada del proyecto"
              placeholderTextColor="#666"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Aplicativo</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={projectType} onValueChange={setProjectType} style={styles.picker}>
                <Picker.Item label="Aplicativo Web" value="web" />
                <Picker.Item label="Aplicativo Móvil" value="mobile" />
                <Picker.Item label="Aplicativo de Escritorio" value="desktop" />
                <Picker.Item label="API/Servicio Web" value="api" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha de Inicio</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#666"
              value={startDate}
              onChangeText={setStartDate}
            />
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterProject}>
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.registerButtonText}>Registrar Proyecto</Text>
          </TouchableOpacity>
        </View>

        {/* Project Benefits */}
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Beneficios de SAGS</Text>

          <View style={styles.benefitItem}>
            <Ionicons name="document-text-outline" size={24} color="#0EA5E9" />
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Documentación Automática</Text>
              <Text style={styles.benefitDescription}>Genera documentación IEEE-830 de forma automática</Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <Ionicons name="people-outline" size={24} color="#10B981" />
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Colaboración en Tiempo Real</Text>
              <Text style={styles.benefitDescription}>Trabaja en equipo de manera eficiente y coordinada</Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <Ionicons name="analytics-outline" size={24} color="#F59E0B" />
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Seguimiento de Progreso</Text>
              <Text style={styles.benefitDescription}>Monitorea el avance de tu proyecto en tiempo real</Text>
            </View>
          </View>

          <View style={styles.benefitItem}>
            <Ionicons name="shield-checkmark-outline" size={24} color="#EF4444" />
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>Gestión de Calidad</Text>
              <Text style={styles.benefitDescription}>Asegura la calidad con estándares de la industria</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 24,
  },
  formContainer: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    margin: 20,
    borderRadius: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  picker: {
    color: "#fff",
  },
  registerButton: {
    flexDirection: "row",
    backgroundColor: "#0284C7",
    borderRadius: 15,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  benefitsContainer: {
    padding: 20,
  },
  benefitsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  benefitItem: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  benefitContent: {
    flex: 1,
    marginLeft: 15,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  benefitDescription: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 20,
  },
})
