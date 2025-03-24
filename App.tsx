import * as React from 'react';
import { HomeScreen } from './src/views/home/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterScreen } from './src/views/register/register';
import { Proyectos } from './src/views/proyectos/Proyectos';
import { NewProyScreen } from './src/views/proyectos/registrarProyecto';


export type RootStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  Proyectos: undefined;
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

        { /*<Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;