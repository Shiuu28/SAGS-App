import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"

export default function AboutScreen() {
  const teamMembers = [
    {
      name: "María José Romero",
      role: "Analista",
      image: "https://via.placeholder.com/150",
      github: "https://github.com/majoromero2006",
    },
    {
      name: "Santiago Cárdenas Hernández",
      role: "Analista",
      image: "https://via.placeholder.com/150",
      github: "https://github.com/SantiagoC18",
    },
    {
      name: "Shiuu Valenzuela Penagos",
      role: "Analista",
      image: "https://via.placeholder.com/150",
      github: "https://github.com/Shiuu28",
    },
  ]

  const socialLinks = [
    {
      name: "Instagram",
      icon: "logo-instagram",
      url: "https://www.instagram.com",
      color: "#E4405F",
    },
    {
      name: "Twitter",
      icon: "logo-twitter",
      url: "https://www.twitter.com",
      color: "#1DA1F2",
    },
    {
      name: "WhatsApp",
      icon: "logo-whatsapp",
      url: "https://wa.link/010no6",
      color: "#25D366",
    },
  ]

  const handleOpenLink = (url: string) => {
    Linking.openURL(url)
  }

  return (
    <LinearGradient colors={["#000a11", "#001122", "#000a11"]} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sobre Nosotros</Text>
          <Text style={styles.description}>
            Conoce al equipo detrás de SAGS - Sistema Avanzado de Gestión de Software
          </Text>
        </View>

        {/* Company Info */}
        <View style={styles.companySection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>SAGS</Text>
          </View>

          <Text style={styles.companyDescription}>
            SAGS es una herramienta innovadora que optimiza la planificación y el análisis en el desarrollo de software.
            Nuestro sistema facilita la colaboración entre usuarios y terceros para crear documentación clara y
            estructurada, permitiendo a los desarrolladores enfocarse en el diseño y la programación del software.
          </Text>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Características principales:</Text>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>Captura y documentación de requisitos</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>Colaboración en tiempo real</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>Gestión de cambios</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>Generación automática de documentación</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.featureText}>Cumplimiento de la norma IEEE-830</Text>
            </View>
          </View>
        </View>

        {/* Team Section */}
        <View style={styles.teamSection}>
          <Text style={styles.sectionTitle}>Nuestro Equipo</Text>

          {teamMembers.map((member, index) => (
            <View key={index} style={styles.memberCard}>
              <TouchableOpacity style={styles.memberImageContainer} onPress={() => handleOpenLink(member.github)}>
                <Image source={{ uri: member.image }} style={styles.memberImage} />
                <View style={styles.githubOverlay}>
                  <Ionicons name="logo-github" size={24} color="#fff" />
                </View>
              </TouchableOpacity>

              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
                <TouchableOpacity style={styles.githubButton} onPress={() => handleOpenLink(member.github)}>
                  <Ionicons name="logo-github" size={16} color="#fff" />
                  <Text style={styles.githubButtonText}>Ver GitHub</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contáctanos</Text>

          <View style={styles.socialLinksContainer}>
            {socialLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.socialButton, { backgroundColor: link.color }]}
                onPress={() => handleOpenLink(link.url)}
              >
                <Ionicons name={link.icon as any} size={24} color="#fff" />
                <Text style={styles.socialButtonText}>{link.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>
              ¿Tienes preguntas o sugerencias? No dudes en contactarnos a través de nuestras redes sociales o mediante
              el sistema PQRS de la aplicación.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 SAGS. Todos los derechos reservados.</Text>
          <Text style={styles.footerSubtext}>Desarrollado con ❤️ para optimizar el desarrollo de software</Text>
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
  description: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 24,
  },
  companySection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#0EA5E9",
  },
  companyDescription: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 25,
  },
  featuresContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 20,
  },
  featuresTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    color: "#ccc",
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  teamSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  memberCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  memberImageContainer: {
    position: "relative",
    marginRight: 20,
  },
  memberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  githubOverlay: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#24292e",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  memberRole: {
    fontSize: 14,
    color: "#0EA5E9",
    marginBottom: 10,
  },
  githubButton: {
    flexDirection: "row",
    backgroundColor: "#24292e",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  githubButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 5,
  },
  contactSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  socialLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  contactInfo: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 20,
  },
  contactText: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 5,
  },
  footerSubtext: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
  },
})
