import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export default function HomeScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


  return (
    <View style={styles.container}>
      <Image
        source={require('../../../img/fondo.png')}
        style={styles.imageBackground}
      />

      <View style={styles.LogoContainer}>
        <Image
          source={require('../../../img/sirs.jpg')}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>BIENVENIDO A SAGS</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formInput}>
          <Image style={styles.formIcon}
            source={require('../../../img/usuario.png')}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder='Correo electrónico'
            keyboardType='email-address'
          />
        </View>

        <View style={styles.formInput}>
          <Image style={styles.formIcon}
            source={require('../../../img/bloquear.png')}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder='Contraseña'
            keyboardType='default'
            secureTextEntry={true}
          />
        </View>

        <View style={{ marginTop: 30 }}>
          <RoundedButton text='INICIAR SESIÓN' onPress={() => ToastAndroid.show('¡BIENVENIDO!', ToastAndroid.SHORT)} />
        </View>

        <View style={styles.formRegister}>
          <Text>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() =>
            navigation.navigate('RegisterScreen')}>
            <Text style={styles.formRegisterText}>Registrarse</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  imageBackground: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
    bottom: 20,
  },

  form: {
    width: '90%',
    height: '40%',
    backgroundColor: '#154360',
    position: 'absolute',
    top: '42%',
    padding: 30,
    margin: 22,
    opacity: 0.8,
  },

  formText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },

  formInput: {
    flexDirection: 'row',
    marginTop: 30,
  },

  formTextInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },

  formRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },

  formRegisterText: {
    fontStyle: 'italic',
    color: 'black',
    borderBottomWidth: 1,
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 14,
  },

  LogoContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '18%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImage: {
    width: 70,
    height: 93,
  },

  logoText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 19,
    marginTop: 10,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },

}); 