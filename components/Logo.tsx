"use client"

import type React from "react"
import { View, Image, Text, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface LogoProps {
  size?: "small" | "medium" | "large"
  showText?: boolean
}

export const Logo: React.FC<LogoProps> = ({ size = "medium", showText = true }) => {
  const { colors } = useTheme()

  const logoSizes = {
    small: 40,
    medium: 60,
    large: 100,
  }

  const textSizes = {
    small: 16,
    medium: 24,
    large: 32,
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={[
          styles.logo,
          {
            width: logoSizes[size],
            height: logoSizes[size],
          },
        ]}
        resizeMode="contain"
      />
      {showText && (
        <Text
          style={[
            styles.text,
            {
              color: colors.text,
              fontSize: textSizes[size],
            },
          ]}
        >
          SAGS
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    borderRadius: 50,
  },
  text: {
    fontWeight: "bold",
    marginTop: 8,
  },
})
