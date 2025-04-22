import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../components/RoundedButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Nav from '../../components/Nav';
import usePerfilViewModel from './viewModelPerfil';  
import useHomeViewModel from './viewModel';
import { AuthContext, AuthProvider } from '../../../Domain/useCases/auth/AuthContext';


export const PerfilUsu = () => {
    const { user } = useContext(AuthContext);
    const {logout} = useHomeViewModel();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { perfilData, errorMessage, loading, eliminarUsuario } = usePerfilViewModel();

    const handleEliminarUsuario = () => {
        Alert.alert(
            "Eliminar Usuario",
            "¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        await eliminarUsuario();
                        navigation.navigate('HomeScreen');
                    },
                    style: "destructive"
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() => navigation.navigate('HomeScreen')} logout={logout}></Nav>

            {/* User Info Section */}
            <View style={styles.Info}>
                <View style={styles.userInfo}>
                    <Text style={styles.sectionTitle}>Información del Usuario</Text>
                    {errorMessage ? (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ) : (
                        <View style={styles.userDetails}>
                            <Image
                                source={require('../../../../assets/sirs.jpg')}
                                style={styles.profileImage}
                            />
                            <View style={styles.userText}>
                                <Text style={styles.userDataText}>
                                    <Text style={styles.bold}>Nombre:, {user?.name} </Text>
                                    {perfilData?.nombres}
                                </Text>
                                <Text style={styles.userDataText}>
                                    <Text style={styles.bold}>Correo Electrónico: </Text>
                                    {perfilData?.email}
                                </Text>
                                <Text style={styles.userDataText}>
                                    <Text style={styles.bold}>Función: </Text>
                                    {perfilData?.funcion}
                                </Text>
                                <View style={styles.buttons}>
                                    <RoundedButton 
                                        text='Editar Datos' 
                                        onPress={() => navigation.navigate('EditarPerfil')} 
                                    />
                                    <RoundedButton 
                                        text='Editar Clave' 
                                        onPress={() => navigation.navigate('PerfilUsu')} 
                                    />
                                </View>
                            </View>
                            <TouchableOpacity onPress={handleEliminarUsuario}>
                                <Text style={styles.deleteUserText}>Eliminar Usuario</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.projectsSection}>
                    <View style={styles.addProject}>
                        <Text style={styles.sectionTitle}>Proyectos del Usuario</Text>
                        <Image source={require('../../../../assets/mas.png')}
                            style={styles.add} />
                    </View>
                    <View style={styles.projectCard}>
                        <Text style={styles.projectTitle}>Proyecto: {perfilData?.nombre_proyecto}</Text>
                        <Text style={styles.projectDesc}>Descripción: {perfilData?.descripcion_proyecto}</Text>
                        <Text style={styles.projectStatus}>Estado: Activo</Text>
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

    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10
    }
});

