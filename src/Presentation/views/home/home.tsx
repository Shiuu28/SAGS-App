import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../components/RoundedButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export const HomeScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (errorMessage !== ''){
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
                <View style={styles.formInput}>
                    <Image style={styles.formIcon}
                        source={require('../../../../assets/user.png')}
                    />

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>

                <View style={styles.formInput}>
                    <Image style={styles.formIcon}
                        source={require('../../../../assets/password.png')}
                    />

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Contraseña'
                        keyboardType='default'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                </View>


                <View style={{ marginTop: 30 }}>
                    <RoundedButton text='INGRESAR' onPress={() =>
                        navigation.navigate('Proyectos')}>
                    </RoundedButton>
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

    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5,
    },

    formInput: {
        flexDirection: 'row',
        marginTop: 30,
    },

    formTextInput:{
        textAlign: 'auto',
        left: 10,
        width: '84%',
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
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