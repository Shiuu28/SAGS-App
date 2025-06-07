"use client"

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../App"
import { GradientBackground } from "../components/GradientBackground"
import { Logo } from "../components/Logo"
import { ThemeToggle } from "../components/ThemeToggle"
import { useTheme } from "../context/ThemeContext"

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">

interface Props {
  navigation: LoginScreenNavigationProp
}

export default function LoginScreen({ navigation }: Props) {
  const { colors, isDark } = useTheme()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [documento, setDocumento] = useState("")
  const [tipoDoc, setTipoDoc] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor complete todos los campos", [], {
        userInterfaceStyle: isDark ? "dark" : "light",
      })
      return
    }
    navigation.replace("Home")
  }

  const handleRegister = () => {
    if (!email || !password || !documento || !tipoDoc) {
      Alert.alert("Error", "Por favor complete todos los campos", [], {
        userInterfaceStyle: isDark ? "dark" : "light",
      })
      return
    }
    Alert.alert("Éxito", "Usuario registrado correctamente", [], {
      userInterfaceStyle: isDark ? "dark" : "light",
    })
    setIsLogin(true)
  }

  return (
    <GradientBackground>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header with theme toggle */}
          <View style={styles.headerControls}>
            <View style={styles.placeholder} />
            <ThemeToggle />
          </View>

          <View style={styles.logoContainer}>
            <Logo size="large" showText={true} />
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Sistema Avanzado de Gestión de Software
            </Text>
          </View>

          <View style={[styles.formContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.toggleContainer, { backgroundColor: colors.backgroundSecondary }]}>
              <TouchableOpacity
                style={[styles.toggleButton, isLogin && { backgroundColor: colors.primary }]}
                onPress={() => setIsLogin(true)}
                activeOpacity={0.8}
              >
                <Text style={[styles.toggleText, { color: isLogin ? colors.primaryText : colors.textSecondary }]}>
                  Iniciar Sesión
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, !isLogin && { backgroundColor: colors.primary }]}
                onPress={() => setIsLogin(false)}
                activeOpacity={0.8}
              >
                <Text style={[styles.toggleText, { color: !isLogin ? colors.primaryText : colors.textSecondary }]}>
                  Registrarse
                </Text>
              </TouchableOpacity>
            </View>

            {!isLogin && (
              <>
                <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                  <Ionicons name="card-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Tipo de Documento (C.C., T.I.)"
                    placeholderTextColor={colors.textSecondary}
                    value={tipoDoc}
                    onChangeText={setTipoDoc}
                  />
                </View>
                <View style={[styles.inputContainer, { borderColor: colors.border }]}>
                  <Ionicons name="id-card-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Número de Documento"
                    placeholderTextColor={colors.textSecondary}
                    value={documento}
                    onChangeText={setDocumento}
                    keyboardType="numeric"
                  />
                </View>
              </>
            )}

            <View style={[styles.inputContainer, { borderColor: colors.border }]}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Email"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={[styles.inputContainer, { borderColor: colors.border }]}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Contraseña"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.primary }]}
              onPress={isLogin ? handleLogin : handleRegister}
              activeOpacity={0.8}
            >
              <Text style={[styles.submitButtonText, { color: colors.primaryText }]}>
                {isLogin ? "Ingresar" : "Registrar"}
              </Text>
            </TouchableOpacity>

            {isLogin && (
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigation.navigate("ForgotPassword")}
                activeOpacity={0.7}
              >
                <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Info Section */}
          <View style={[styles.infoSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>Bienvenido a SAGS</Text>
              <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                Optimiza tu gestión de proyectos de software con herramientas profesionales
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  headerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholder: {
    width: 44,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  formContainer: {
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 25,
    borderRadius: 25,
    padding: 5,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 20,
  },
  toggleText: {
    fontWeight: "600",
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  submitButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 15,
    padding: 10,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoSection: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 16,
  },
})
