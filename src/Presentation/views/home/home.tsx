import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../components/RoundedButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useHomeViewModel from './viewModel';
import { CustomTextInput } from '../../components/CustomTextInput';


export const HomeScreen = () => {

    const { email, password, errorMessage, onChange, login } = useHomeViewModel();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (errorMessage !== '') {
            ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        }
    }, [errorMessage]);

    return (

        <View style={styles.container}>
            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../../assets/sirs.jpg')}
                    style={styles.logoImage}
                />
                <Text style={styles.logoText}>¡BIENVENIDO A SAGS!</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.formText}>Iniciar Sesion</Text>
                
                    <CustomTextInput
                        image={require('../../../../assets/user.png')}
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        property='email'
                        value={email}
                        onChangeText={onChange}
                    />

               

                    <CustomTextInput
                        image={require('../../../../assets/password.png')}
                        placeholder='Contraseña'
                        keyboardType='default'
                        property='password'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={onChange}
                    />


                <View style={{ marginTop: 30 }}>
                    <RoundedButton text='INGRESAR' onPress={() => {login();
                        navigation.navigate('Proyectos');
                    }} />
                </View>


                <View style={styles.formRegister}>
                    <Text>¿No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('RegisterScreen')}>
                        <Text style={styles.formRegisterText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    imageBackground: {
        width: '100%',
        height: '110%',
    },

    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '15%',
    },

    logoImage: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        marginTop: 10,
        fontWeight: 'bold',
        fontFamily: 'serif',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },

    form: {
        width: '80%',
        height: '40%',
        top: '48%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomEndRadius: 20,
        position: 'absolute',
        padding: 30,
        left: '10%',
        opacity: 0.9,
    },

    formText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#146099',
        textAlign: 'center',
        fontFamily: 'serif',
    },   

    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        fontFamily: 'serif',
    },

    formRegisterText: {
        fontStyle: 'italic',
        color: '#146099',
        borderBottomWidth: 1,
        borderBottomColor: '#146099',
        fontWeight: 'bold',
        marginLeft: 10,
        fontFamily: 'serif',
    },

});