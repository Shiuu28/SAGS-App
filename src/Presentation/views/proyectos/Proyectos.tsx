import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoundedButton } from '../../components/RoundedButton';
import { Nav } from '../../components/Nav';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Proyectos = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() =>
                navigation.navigate('HomeScreen')}>
            </Nav>


            <View style={styles.cardsContainer}>
                <ScrollView>
                    {/* Project Registration Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Registro de Proyecto</Text>
                        <Text style={styles.cardDescription}>
                            El formulario de registro de proyecto permite a los usuarios ingresar detalles específicos sobre nuevos proyectos. A través de este formulario, se recopilan datos esenciales como el nombre del proyecto, la descripción, el objetivo, los plazos y los recursos necesarios. Esta información es fundamental para gestionar y desarrollar proyectos de software de manera eficiente, asegurando que todos los requisitos y expectativas sean claramente definidos desde el inicio.
                        </Text>
                        <RoundedButton text='Registrar' onPress={() => {
                        navigation.navigate('NewProyScreen')}}>
                        </RoundedButton>
                    </View>

                    {/* Project Management Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Gestión de Proyectos</Text>
                        <Text style={styles.cardSubtitle}>
                            Conoce el método de gestión de proyectos y los privilegios de los usuarios.
                        </Text>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Método de Gestión</Text>
                            <Text style={styles.sectionText}>
                                Utilizamos la métodologia ágil scrum para la gestión de proyectos, donde los equipos trabajan de manera colaborativa para entregar valor de manera iterativa.
                            </Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Privilegios de Usuarios</Text>

                            <View style={styles.privilegeItem}>
                                <Icon name="user" size={20} color="#fff" />
                                <View style={styles.privilegeContent}>
                                    <Text style={styles.privilegeTitle}>Miembro del Equipo</Text>
                                    <Text style={styles.privilegeDescription}>
                                        Puede ver y comentar en el proyecto.
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.privilegeItem}>
                                <Icon name="users" size={20} color="#fff" />
                                <View style={styles.privilegeContent}>
                                    <Text style={styles.privilegeTitle}>Gestor de Proyecto</Text>
                                    <Text style={styles.privilegeDescription}>
                                        Puede ver, comentar y editar el proyecto.
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.privilegeItem}>
                                <Icon name="lock" size={20} color="#fff" />
                                <View style={styles.privilegeContent}>
                                    <Text style={styles.privilegeTitle}>Administrador</Text>
                                    <Text style={styles.privilegeDescription}>
                                        Tiene acceso de administrador a todos los recursos.
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <RoundedButton text='Ingresar' onPress={() => {
                        navigation.navigate('Checklist')}}>
                        </RoundedButton>
                    </View>
                </ScrollView>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000A11',
    },

    imageBackground: {
        width: '100%',
        height: '110%',
    },

    cardsContainer: {
        padding: 16,
        gap: 16,
        position: 'absolute',
        height: '90%',
        alignSelf: 'center',
        top: '12%',
    },

    card: {
        backgroundColor: 'rgba(0, 10, 17, 0.9)',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 2,
    },

    cardTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
    },

    cardDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 16,
    },

    cardSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 24,
    },

    section: {
        marginBottom: 24,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
    },

    sectionText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
    },

    privilegeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },

    privilegeContent: {
        flex: 1,
    },

    privilegeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },

    privilegeDescription: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
    },
});