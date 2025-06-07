"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../App"
import { Ionicons } from "@expo/vector-icons"
import { GradientBackground } from "../components/GradientBackground"
import { HeaderWithDrawer } from "../components/HeaderWithDrawer"
import { Logo } from "../components/Logo"
import { useTheme } from "../context/ThemeContext"
import { Colors } from "../theme/colors"

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">

interface Props {
  navigation: HomeScreenNavigationProp
}

const { width } = Dimensions.get("window")

export default function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme()

  const plans = [
    {
      name: "Basic",
      price: "$150.000 COP",
      features: ["IEEE-830", "Casos de Uso", "Casos de Uso extendido", "Reuniones online"],
      excluded: [
        "Visitas físicas",
        "Diagrama de Clases",
        "Diagrama de Objetos",
        "Modelo Entidad Relación",
        "Modelo Relacional",
      ],
    },
    {
      name: "Standard",
      price: "$300.000 COP",
      features: [
        "IEEE-830",
        "Casos de Uso",
        "Casos de Uso extendido",
        "Reuniones online",
        "Visitas físicas",
        "Diagrama de Clases",
      ],
      excluded: ["Diagrama de Objetos", "Modelo Entidad Relación", "Modelo Relacional"],
    },
    {
      name: "Premium",
      price: "$600.000 COP",
      features: [
        "IEEE-830",
        "Casos de Uso",
        "Casos de Uso extendido",
        "Reuniones online",
        "Visitas físicas",
        "Diagrama de Clases",
        "Diagrama de Objetos",
        "Modelo Entidad Relación",
        "Modelo Relacional",
      ],
      excluded: [],
    },
  ]

  const quickActions = [
    {
      title: "Nuevo Proyecto",
      icon: "add-circle-outline",
      color: Colors.success.light,
      onPress: () => navigation.navigate("RegisterProject"),
    },
    {
      title: "Ver Proyectos",
      icon: "folder-outline",
      color: colors.primary,
      onPress: () => navigation.navigate("Projects"),
    },
    {
      title: "PQRS",
      icon: "chatbubble-outline",
      color: Colors.warning.light,
      onPress: () => navigation.navigate("PQRS"),
    },
    {
      title: "Perfil",
      icon: "person-outline",
      color: Colors.secondary[500],
      onPress: () => navigation.navigate("Profile"),
    },
  ]

  return (
    <GradientBackground>
      <HeaderWithDrawer navigation={navigation} currentRoute="Home" />
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={styles.header}>
          <Logo size="medium" showText={false} />
          <Text style={[styles.title, { color: colors.text }]}>Sistema Avanzado de Gestión de Software</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            SAGS optimiza la planificación y el análisis en el desarrollo de software, facilitando la colaboración para
            crear documentación clara y estructurada.
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Acciones Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickActionCard, { backgroundColor: colors.surface }]}
                onPress={action.onPress}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + "20" }]}>
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={[styles.quickActionText, { color: colors.text }]}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Plans Section */}
        <View style={styles.plansContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Planes Disponibles</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {plans.map((plan, index) => (
              <View key={index} style={[styles.planCard, { backgroundColor: colors.surface }]}>
                <Text style={[styles.planName, { color: colors.text }]}>{plan.name}</Text>
                <Text style={[styles.planPrice, { color: colors.primary }]}>{plan.price}</Text>

                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <Ionicons name="checkmark" size={16} color={Colors.success.light} />
                      <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
                    </View>
                  ))}
                  {plan.excluded.map((feature, idx) => (
                    <View key={idx} style={styles.featureItem}>
                      <Ionicons name="close" size={16} color={Colors.error.light} />
                      <Text style={[styles.featureText, styles.excludedText, { color: colors.textSecondary }]}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.planButton, { backgroundColor: colors.primary }]}
                  onPress={() => navigation.navigate("RegisterProject")}
                >
                  <Text style={[styles.planButtonText, { color: colors.primaryText }]}>Empezar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  quickActionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionCard: {
    width: "48%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  plansContainer: {
    padding: 20,
  },
  planCard: {
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    width: width * 0.8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  planName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 14,
  },
  excludedText: {
    textDecorationLine: "line-through",
  },
  planButton: {
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  planButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
})
