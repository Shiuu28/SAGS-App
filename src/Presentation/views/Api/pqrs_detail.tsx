import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { PQRS } from '../../../Domain/Entities/User';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from './types/navigation';
import { RouteProp } from '@react-navigation/native';

type PQRSDetailParams = {
    id: number;
};

type RouteProps = RouteProp<{
    PQRSDetail: PQRSDetailParams;
}, 'PQRSDetail'>;




export const PQRSDetailScreen = () => {
    const route = useRoute<RouteProps>();
    const id = route.params.id;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [pqrs, setPqrs] = useState<PQRS | null>(null);

    useEffect(() => {
        fetchPQRSDetail();
    }, []);

    const fetchPQRSDetail = async () => {
        try {
            const response = await fetch(`/api/pqrs/${id}`);
            const data = await response.json();
            setPqrs(data);
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Error al cargar los datos.');
        }
    };

    const handleDelete = async () => {

        Alert.alert(
            'Confirmar',
            '¿Está seguro que desea eliminar esta PQRS?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await fetch(`/api/pqrs/${id}`, {
                                method: 'DELETE'
                            });
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Error', 'Error al eliminar la PQRS');
                        }
                    }
                }
            ]
        );
    };

    if (!pqrs) return null;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatar}>
                            <Text>LS</Text>
                        </View>
                        <Text style={styles.email}>{pqrs.email}</Text>
                    </View>
                    <View style={styles.priorityBadge}>
                        <Text style={styles.priorityText}>Prioridad: {pqrs.calificacion}/5</Text>
                    </View>
                </View>
                <View style={styles.separator} />
                <View style={styles.content}>
                    <View style={[styles.typeBadge, { backgroundColor: (pqrs.tipo_opi) }]}>
                        <Text style={styles.typeText}>{pqrs.tipo_opi}</Text>
                    </View>
                    <Text style={styles.description}>{pqrs.opinion}</Text>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>Volver a la lista</Text>
                    </TouchableOpacity>
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('EditPQRS', { id: pqrs.id_opi })}
                        >
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={handleDelete}
                        >
                            <Text style={styles.buttonText}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    email: {
        fontSize: 16
    },
    priorityBadge: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 4
    },
    priorityText: {
        fontSize: 14
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 16
    },
    content: {
        marginBottom: 16
    },
    typeBadge: {
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 4,
        marginBottom: 8
    },
    typeText: {
        color: '#fff',
        fontSize: 16
    },
    description: {
        fontSize: 16,
        lineHeight: 24
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actions: {
        flexDirection: 'row'
    },
    backButton: {
        backgroundColor: '#007AFF',
        padding: 8,
        borderRadius: 4
    },
    editButton: {
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 4,
        marginRight: 8
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 8,
        borderRadius: 4
    },
    buttonText: {
        color: '#fff',
        fontSize: 14
    }
});