import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { RootStackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoundedButton } from '../../components/RoundedButton';
import { Nav } from '../../components/Nav';

export const Proyectos = () => {
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

            <View style={styles.proyectos}>
                <View style={styles.registroProy}>
                    <Text style={styles.registerText}>Registro de Proyectos</Text>
                    <Text style={styles.descripcionText}>El formulario de registro de proyecto recopila datos clave como nombre, descripción, objetivo, plazos y recursos, asegurando una gestión eficiente y bien estructurada desde el inicio.</Text>
                    <RoundedButton text='REGISTRAR' onPress={() =>
                        navigation.navigate('NewProyScreen')}>
                    </RoundedButton>
                </View>

                <View style={styles.gestionProy}>
                    <Text style={styles.gestionText}>Gestión de Proyectos</Text>
                    <Text style={styles.descripcionText}>Utilizamos la métodologia ágil scrum para la gestión de proyectos, donde los equipos trabajan de manera colaborativa para entregar valor de manera iterativa.</Text>
                    <RoundedButton text='INGRESAR' onPress={() =>
                        navigation.navigate('Checklist')}>
                    </RoundedButton>
                </View>
            </View>
        </View>
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

    proyectos: {
        margin: 'auto',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 54,
    },

    registroProy: {
        width: '84%',
        height: '30%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        margin: 'auto',
        padding: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
    },

    registerText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        fontFamily:'serif',
        fontWeight: 'bold',
    },

    gestionProy: {
        width: '84%',
        height: '30%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        margin: 'auto',
        padding: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
    },

    gestionText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        fontFamily:'serif',
        fontWeight: 'bold',
    },

    descripcionText: {
        color: 'white',
        textAlign: 'justify',
        fontSize: 15,
        margin: 'auto',
        padding: 8,
    }

});