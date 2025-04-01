import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { RootStackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoundedButton } from '../../components/RoundedButton';
import { Nav } from '../../components/Nav';



export const SobreNosotros = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [expandedImage, setExpandedImage] = useState<number | null>(null);

    const handlePress = (index: number, url: string) => {
        if (expandedImage === index) {
            Linking.openURL(url).catch(err => console.error('Error al abrir el enlace ', err));
        } else {
            setExpandedImage(index);
        }
    };

    return (

        <View style={styles.container}>
            <Image
                source={require('../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() =>
                navigation.navigate('HomeScreen')}>
            </Nav>

            <View style={styles.info}>
                <Text style={styles.titulo}>Sobre Nosotros</Text>

                <View style={styles.member}>
                    <TouchableOpacity onPress={() => handlePress(0, 'https://github.com/SantiagoC18')}>
                        <Image
                            source={require('../../../assets/Administradores/santiago.jpg')}
                            style={[styles.fotoAdmin, expandedImage === 0 && styles.expanded]}
                        />
                    </TouchableOpacity>
                    <Text style={styles.nombre}>Santiago Cárdenas Hernández</Text>
                    <Text style={styles.funcion}>Función</Text>
                </View>

                <View style={styles.member}>
                    <TouchableOpacity onPress={() => handlePress(1, 'https://github.com/majoromero2006')}>
                        <Image
                            source={require('../../../assets/Administradores/majo.jpeg')}
                            style={[styles.fotoAdmin, expandedImage === 1 && styles.expanded]}
                        />
                    </TouchableOpacity>
                    <Text style={styles.nombre}>María José Romero Gómez</Text>
                    <Text style={styles.funcion}>Función</Text>
                </View>

                <View style={styles.member}>
                    <TouchableOpacity onPress={() => handlePress(2, 'https://github.com/Shiuu28')}>
                        <Image
                            source={require('../../../assets/Administradores/shiuu.jpg')}
                            style={[styles.fotoAdmin, expandedImage === 2 && styles.expanded]}
                        />
                    </TouchableOpacity>
                    <Text style={styles.nombre}>Shiuu Valenzuela Penagos</Text>
                    <Text style={styles.funcion}>Función</Text>
                </View>

                <View style={{marginTop: 42}}>
                    <RoundedButton text='CONTACTENOS' onPress={() =>
                        navigation.navigate('HomeScreen')}>
                    </RoundedButton>
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
        position: 'absolute',
    },

    titulo: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        marginTop: 100,
        fontWeight: 'bold',
    },

    info: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        padding: 20,
        top: 30,
    },

    member: {
        alignItems: 'center',
        marginVertical: 20,
    },

    fotoAdmin: {
        width: 100,
        height: 100,
        borderRadius: 50,
        transition: 'transform 0.3s ease',
    },

    expanded: {
        transform: [{ scale: 1.4 }],
    },

    nombre: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
    },

    funcion: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
    },
});

