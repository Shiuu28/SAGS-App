import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../components/RoundedButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Nav from '../../components/Nav';
import usePerfilViewModel from './viewModelPerfil';
import useHomeViewModel from './viewModel';
import { AuthContext } from '../../../Domain/useCases/auth/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export const PerfilUsu = () => {
    const { user } = useContext(AuthContext);
    const { logout } = useHomeViewModel();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { perfilData, errorMessage, eliminarUsuario } = usePerfilViewModel();

    const handleEliminarUsuario = async () => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Está seguro que desea eliminar su cuenta? Esta acción no se puede deshacer.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        const success = await eliminarUsuario();
                        if (success) {
                            await logout();
                            Alert.alert('Éxito', 'Usuario eliminado correctamente');
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'HomeScreen' }]
                            });
                        } else {
                            Alert.alert('Error', errorMessage || 'No se pudo eliminar el usuario');
                        }
                    }
                }
            ]
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/background.png')}
                    style={styles.imageBackground}
                />
                <Nav onPress={() => navigation.navigate('HomeScreen')} logout={logout} />

                <View style={styles.Info}>
                    <ScrollView>
                        <View style={styles.userInfo}>
                            <Text style={styles.sectionTitle}>Información del Usuario</Text>
                            {errorMessage ? (
                                <Text style={styles.errorText}>{errorMessage}</Text>
                            ) : (
                                // Replace the delete button with text
                                <View style={styles.userDetails}>
                                    <Image
                                        source={require('../../../../assets/sirs.jpg')}
                                        style={styles.profileImage}
                                    />
                                    <View style={styles.userText}>
                                        <Text style={styles.userDataText}>
                                            <Text style={styles.bold}>Nombre: </Text>
                                            {perfilData?.nombres} {perfilData?.apellidos}
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
                                    <TouchableOpacity
                                        style={styles.deleteText}
                                        onPress={handleEliminarUsuario}
                                    >
                                        <Text style={styles.linkText}>Eliminar Cuenta</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        <View style={styles.projectsSection}>
                            <View style={styles.addProject}>
                                <Text style={styles.sectionTitle}>Proyectos del Usuario</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('NewProyScreen')}>
                                    <Image
                                        source={require('../../../../assets/mas.png')}
                                        style={styles.add}
                                    />
                                </TouchableOpacity>
                            </View>


                            {perfilData.proyectos.length > 0 ? (
                                perfilData.proyectos.map((proyecto, index) => (
                                    <View key={index} style={styles.projectCard}>
                                        <Text style={styles.projectTitle}>Proyecto: {proyecto.nombre_proyecto || 'Sin nombre'}</Text>
                                        <Text style={styles.projectDesc}>Descripción: {proyecto.descripcion_proyecto || 'Sin descripción'}</Text>
                                        <Text style={styles.projectStatus}>Estado: Activo</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.projectDesc}>No hay proyectos asignados</Text>
                            )}

                        </View>

                    </ScrollView>
                </View>
            </View>
        </GestureHandlerRootView>
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
    Info: {
        position: 'absolute',
        top: '15%',
        alignSelf: 'center',
        height: '100%',
    },
    userInfo: {
        padding: 20,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 5,
        height: 'auto',
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
    deleteText: {
        marginTop: 20,
        alignItems: 'center'
    },
    linkText: {
        color: '#FF4444',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    errorText: {
        color: '#FF4444',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10
    },
    projectsSection: {
        borderWidth: 2,
        backgroundColor: 'rgba(0, 10, 17, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.7)',
        padding: 20,
        borderRadius: 5,
        top: 20,
        height: 'auto',
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
    }
});

