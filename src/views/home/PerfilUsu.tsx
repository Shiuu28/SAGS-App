import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ToastAndroid } from 'react-native';
import { RootStackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../components/RoundedButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Nav from '../../components/Nav';

export const PerfilUsu = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (

        <View style={styles.container}>
            <Image
                source={require('../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() =>
                navigation.navigate('HomeScreen')}>

            </Nav>

            <View style={styles.infoUsu}>
                <Text style={styles.titulo}>Información del Usuario</Text>
                <Image
                    source={require('../../../assets/sirs.jpg')}
                    style={styles.FotoPerfil}
                />
                <View style={styles.datos}>
                    <Text style={styles.personal}>Nombre:</Text>
                    <Text style={styles.personal}>Correo Electrónico:</Text>
                    <Text style={styles.personal}>Función:</Text>
                </View>

                <View style={{ marginTop: 150, flexDirection: 'row', gap: 12}}>
                    <RoundedButton text='Editar Datos' onPress={() =>
                        ToastAndroid.show('¡Datos Editados!', ToastAndroid.SHORT)}
                        style={styles.smallButton}>
                    </RoundedButton>

                    <RoundedButton text='Editar Datos' onPress={() =>
                        ToastAndroid.show('¡Contraseña Editada!', ToastAndroid.SHORT)}
                        style={styles.smallButton}>
                    </RoundedButton>
                </View>
            </View>

            <View style={styles.datosProy}>
                <Text style={styles.titulo}>Proyecto del Usuario</Text>
                <Text style={styles.proy}>Proyecto:</Text>
                <Text style={styles.descripcion}>Descripción:</Text>

                <View style={{ marginTop: 180 }}>
                    <RoundedButton text='VER' onPress={() =>
                        ToastAndroid.show('Proyecto Visualizado', ToastAndroid.SHORT)}>
                    </RoundedButton>
                </View>
            </View>

        </View >
    )
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

    infoUsu: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '80%',
        height: '30%',
        position: 'absolute',
        top: '23%',
        left: '10%',
        display: 'flex',
        borderColor: 'white',
        borderWidth: 2,
    },

    titulo: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        borderColor: 'white',
        borderWidth: 2,
        width: '100%',
        height: 40,
        position: 'absolute',
        top: 0,
    },

    FotoPerfil: {
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: 'white',
        width: 100,
        height: 100,
        position: 'absolute',
        left: 14,
        top: 55,
    },

    datos: {
        fontSize: 15,
        position: 'absolute',
        top: '29%',
        left: '40%',
        marginBottom: 5,
    },
    
    personal:{
        color: 'white',
        fontWeight: 'bold',
    },

    smallButton: {
        width: '42%',
        height: 50,
        marginBottom: '6%',   
        top: '65%',
        margin: 'auto',
    },

    datosProy: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '80%',
        height: '30%',
        position: 'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        top: '60%',
        left: '10%',
        display: 'flex',
        borderColor: 'white',
        borderWidth: 2,
    },

    proy: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'serif',
        position: 'absolute',
        top: '33%',
        left: 20,
        fontWeight: 'bold',

    },

    descripcion: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'serif',
        position: 'absolute',
        top: '50%',
        left: 20,
        fontWeight: 'bold',
    },
});