import * as React from 'react';
import { HomeScreen } from './src/Presentation/views/home/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterScreen } from './src/Presentation/views/register/register';
import { Proyectos } from './src/Presentation/views/proyectos/Proyectos';
import { NewProyScreen } from './src/Presentation/views/proyectos/registrarProyecto';
import { SobreNosotros } from './src/Presentation/views/SobreNosotros/SobreNosotros';
import { PerfilUsu } from './src/Presentation/views/home/PerfilUsu';
import { Checklist } from './src/Presentation/views/proyectos/Checklist';
import { EditarPerfil } from './src/Presentation/views/home/EditarPerfil';
import { PQRS } from './src/Presentation/views/Api/pqrs';
import { AuthProvider } from './src/Domain/useCases/auth/AuthContext';

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  Proyectos: undefined;
  NewProyScreen: undefined;
  SobreNosotros: undefined;
  PerfilUsu: undefined;
  Checklist: undefined;
  EditarPerfil: undefined;
  PQRS: undefined;
}


const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {

  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Proyectos"
          component={Proyectos}
        />

        <Stack.Screen
          name="NewProyScreen"
          component={NewProyScreen}
        />

        <Stack.Screen
          name="SobreNosotros"
          component={SobreNosotros}
        />

        <Stack.Screen
          name="PerfilUsu"
          component={PerfilUsu}
        />

        <Stack.Screen
          name="Checklist"
          component={Checklist}
        />

        <Stack.Screen
          name="EditarPerfil"
          component={EditarPerfil}
        />

        <Stack.Screen
          name="PQRS"
          component={PQRS}
        />


        { /*<Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
};

export default App;