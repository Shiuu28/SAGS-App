"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../App"
import { GradientBackground } from "../components/GradientBackground"
import { Logo } from "../components/Logo"
import { useTheme } from "../context/ThemeContext"

type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, "ForgotPassword">

interface Props {
  navigation: ForgotPasswordScreenNavigationProp
}

export default function ForgotPasswordScreen({ navigation }: Props) {
  const { colors } = useTheme()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor ingrese su email")
      return
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Por favor ingrese un email válido")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      Alert.alert(
        "Email Enviado",
        "Se ha enviado un enlace de recuperación a su email. Revise su bandeja de entrada.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
      )
    }, 2000)
  }

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Logo size="large" showText={true} />

          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Recuperar Contraseña</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Ingrese su email y le enviaremos un enlace para restablecer su contraseña
            </Text>
          </View>

          <View style={[styles.formContainer, { backgroundColor: colors.surface }]}>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Ingrese su email"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[styles.resetButton, { backgroundColor: colors.primary, opacity: isLoading ? 0.7 : 1 }]}
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={[styles.resetButtonText, { color: colors.primaryText }]}>Enviando...</Text>
              ) : (
                <>
                  <Ionicons name="send-outline" size={20} color={colors.primaryText} />
                  <Text style={[styles.resetButtonText, { color: colors.primaryText }]}>Enviar Enlace</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.backToLoginButton} onPress={() => navigation.goBack()}>
              <Text style={[styles.backToLoginText, { color: colors.primary }]}>Volver al inicio de sesión</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.infoContainer, { backgroundColor: colors.surface }]}>
            <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>¿No recibe el email?</Text>
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                Revise su carpeta de spam o correo no deseado. El enlace expirará en 10 minutos.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  formContainer: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  backToLoginButton: {
    alignItems: "center",
    padding: 10,
  },
  backToLoginText: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 10,
    alignItems: "flex-start",
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 18,
  },
})
