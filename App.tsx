import * as React from 'react';
import { HomeScreen } from './src/views/home/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterScreen } from './src/views/register/register';
import { Proyectos } from './src/views/proyectos/Proyectos';
import { NewProyScreen } from './src/views/proyectos/registrarProyecto';
import { SobreNosotros } from './src/views/SobreNosotros/SobreNosotros';
import { PerfilUsu } from './src/views/home/PerfilUsu';
import { Checklist } from './src/views/proyectos/Checklist';

export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  Proyectos: undefined;
  NewProyScreen: undefined;
  SobreNosotros: undefined;
  PerfilUsu: undefined;
  Checklist: undefined;
}


const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {

  return (
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



        { /*<Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;