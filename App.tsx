"use client"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Provider as PaperProvider } from "react-native-paper"
import { StatusBar } from "expo-status-bar"
import { ThemeProvider, useTheme } from "./context/ThemeContext"

// Screens
import LoginScreen from "./screens/LoginScreen"
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen"
import HomeScreen from "./screens/HomeScreen"
import ProjectsScreen from "./screens/ProjectsScreen"
import SprintsScreen from "./screens/SprintsScreen"
import TasksScreen from "./screens/TasksScreen"
import ProfileScreen from "./screens/ProfileScreen"
import PQRSScreen from "./screens/Api/PQRSScreen"
import AboutScreen from "./screens/AboutScreen"
import RegisterProjectScreen from "./screens/RegisterProjectScreen"
import ChecklistScreen from "./screens/ChecklistScreen"

// Types
export type RootStackParamList = {
  Login: undefined
  ForgotPassword: undefined
  Home: undefined
  Projects: undefined
  Sprints: { projectId: string }
  Tasks: { projectId: string }
  Profile: undefined
  PQRS: undefined
  About: undefined
  RegisterProject: undefined
  Checklist: { projectId: string; projectName: string; projectType: string }
}

const Stack = createStackNavigator<RootStackParamList>()

function AppNavigator() {
  const { colors, isDark } = useTheme()

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Projects" component={ProjectsScreen} />
        <Stack.Screen name="Sprints" component={SprintsScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Checklist" component={ChecklistScreen} />
        <Stack.Screen name="PQRS" component={PQRSScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="RegisterProject" component={RegisterProjectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </ThemeProvider>
  )
}
