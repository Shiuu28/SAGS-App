import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../components/RoundedButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Nav from '../../components/Nav';

export const PerfilUsu = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [isEditProfileVisible, setEditProfileVisible] = React.useState(false);
    const [isChangePasswordVisible, setChangePasswordVisible] = React.useState(false);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() =>
                navigation.navigate('HomeScreen')}>

            </Nav>

            {/* User Info Section */}
            <View style={styles.Info}>
                <View style={styles.userInfo}>
                    <Text style={styles.sectionTitle}>Información del Usuario</Text>
                    <View style={styles.userDetails}>
                        <Image
                            source={require('../../../../assets/sirs.jpg')}
                            style={styles.profileImage}
                        />
                        <View style={styles.userText}>
                            <Text style={styles.userDataText}>
                                <Text style={styles.bold}>Nombre: </Text>
                            </Text>
                            <Text style={styles.userDataText}>
                                <Text style={styles.bold}>Correo Electrónico: </Text>
                            </Text>
                            <Text style={styles.userDataText}>
                                <Text style={styles.bold}>Funcion: </Text>
                            </Text>
                            <View style={styles.buttons}>
                                <RoundedButton text='Editar Datos' onPress={() => {
                                    navigation.navigate('PerfilUsu')
                                }}>
                                </RoundedButton>

                                <RoundedButton text='Editar Clave' onPress={() => {
                                    navigation.navigate('PerfilUsu')
                                }}>
                                </RoundedButton>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('PerfilUsu')}>
                            <Text style={styles.deleteUserText}>Eliminar Usuario</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.projectsSection}>
                    <View style={styles.addProject}>
                        <Text style={styles.sectionTitle}>Proyectos del Usuario</Text>
                        <Image source={require('../../../../assets/mas.png')}
                            style={styles.add} />
                    </View>
                    <View style={styles.projectCard}>
                        <Text style={styles.projectTitle}>Proyecto: </Text>
                        <Text style={styles.projectDesc}>Descripción: </Text>
                        <Text style={styles.projectStatus}>Estado: </Text>
                    </View>
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

    Info: {
        position: 'absolute',
        top: '20%',
        alignSelf: 'center',
    },

    userInfo: {
        padding: 20,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 5,
        height: '62%',
        backgroundColor: 'rgba(0, 10, 17, 0.9)',
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'rgba(255, 255, 255, 0.7)',
        borderBottomColor: 'rgba(255, 255, 255, 0.7)',
        borderBottomWidth: 1,
        textAlign: 'center',
    },

    userDetails: {
        top: 5,
        alignItems: 'center',
        color: 'rgba(255, 255, 255, 0.7)',
    },

    buttons: {
        marginTop: 10,
        gap: 10,
        flexDirection: 'row',
        width: '45%',
        height: '10%',
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        marginRight: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    userText: {
        flex: 1,
        color: 'rgba(255, 255, 255, 0.7)'
    },

    userDataText: {
        fontSize: 16,
        marginBottom: 10,
        color: 'rgba(255, 255, 255, 0.7)',
        top: 10,
    },

    bold: {
        fontWeight: 'bold',
    },

    projectsSection: {
        padding: 20,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 5,
        top: 20,
        backgroundColor: 'rgba(0, 10, 17, 0.9)',
    },

    projectCard: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },

    projectTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'rgba(255, 255, 255, 0.7)'
    },

    projectDesc: {
        fontSize: 16,
        marginBottom: 5,
        color: 'rgba(255, 255, 255, 0.7)',
    },

    projectStatus: {
        fontSize: 16,
        marginBottom: 10,
        color: 'rgba(255, 255, 255, 0.7)',
    },

    addProject: {
        display: 'flex',
    },

    add: {
        position: 'absolute',
        left: '92%',
        width: 30,
        height: 30,
    },

    deleteUserText: {
        fontStyle: 'italic',
        color: 'red',
        borderBottomWidth: 1,
        borderBottomColor: 'red',
        fontWeight: 'bold',
        marginLeft: 10,
        fontFamily: 'serif',
        top: 12,
    },

});

