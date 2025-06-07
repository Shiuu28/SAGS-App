import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PQRS } from '../../../Domain/Entities/User';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from './types/navigation';
import Nav from '../../components/Nav';
import useHomeViewModel from '../home/viewModel';



const API_URL = 'http://10.0.2.2:8000/api';

export const PQRSScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { logout } = useHomeViewModel();
    const [pqrs, setPqrs] = useState<PQRS[]>([]);
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        cargarPQRS();
    }, []);

    async function cargarPQRS() {
        try {
            const response = await fetch(`${API_URL}/pqrs`);
            const data = await response.json();
            setPqrs(data);
        } catch (error) {
            Alert.alert('Error', 'Error cargando PQRS');
            console.error('Error cargando PQRS:', error);
        }
    }

    const filteredPQRS = pqrs.filter(item => {
        const matchesSearch = item.email.toLowerCase().includes(searchText.toLowerCase()) ||
            item.opinion.toLowerCase().includes(searchText.toLowerCase());
        const matchesType = filterType === 'all' || item.tipo_opi === filterType;
        return matchesSearch && matchesType;
    });

    const getBadgeStyle = (tipo: string) => {
        const colors = {
            'Sugerencia': '#28a745',
            'Queja': '#dc3545',
            'Petición': '#007bff',
            'Reclamo': '#ffc107'
        };
        return { backgroundColor: colors[tipo as keyof typeof colors] || '#6c757d' };
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() => navigation.navigate('Proyectos')} logout={logout}></Nav>

            <Text style={styles.title}>Sistema de PQRS</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar por correo o contenido..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <Picker
                selectedValue={filterType}
                onValueChange={(value) => setFilterType(value)}
                style={styles.picker}
            >
                <Picker.Item label="Todos los tipos" value="all" />
                <Picker.Item label="Sugerencias" value="Sugerencia" />
                <Picker.Item label="Quejas" value="Queja" />
                <Picker.Item label="Peticiones" value="Petición" />
                <Picker.Item label="Reclamos" value="Reclamo" />
            </Picker>

            <ScrollView style={styles.scrollView}>
                {filteredPQRS.map((item) => (
                    <View key={item.id_opi} style={styles.card}>
                        <View style={styles.cardContent}>
                            <View style={styles.cardHeader}>
                                <View style={styles.userInfo}>
                                    <View style={styles.avatar}>
                                        <Image
                                            source={require('../../../../assets/avatar.png')}
                                            style={styles.avatarImage}
                                        />
                                    </View>
                                    <View style={styles.userDetails}>
                                        <Text style={styles.email}>{item.email}</Text>
                                    </View>
                                </View>
                                <View style={[styles.badge, getBadgeStyle(item.tipo_opi)]}>
                                    <Text style={styles.badgeText}>{item.tipo_opi}</Text>
                                </View>
                            </View>

                            <Text style={styles.cardDescription}>{item.opinion}</Text>

                            <View style={styles.cardFooter}>
                                <Text style={styles.priorityText}>
                                    Prioridad: {item.calificacion}/5
                                </Text>
                                <TouchableOpacity
                                    style={styles.detailsButton}
                                    onPress={() => navigation.navigate('pqrs_detail', { id: item.id_opi })}
                                >
                                    <Text style={styles.detailsButtonText}>Ver detalles</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate('CreatePQRS')}
            >
                <Text style={styles.createButtonText}>Crear nueva PQRS</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#000A11',
    },

    imageBackground: {
        width: '100%',
        height: '110%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16
    },
    picker: {
        marginBottom: 16
    },
    scrollView: {
        flex: 1
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
        elevation: 2
    },
    cardContent: {
        padding: 16
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        overflow: 'hidden'
    },
    avatarImage: {
        width: '100%',
        height: '100%'
    },
    userDetails: {
        justifyContent: 'center'
    },
    email: {
        fontSize: 16,
        fontWeight: '500'
    },
    badge: {
        padding: 8,
        borderRadius: 4
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    cardDescription: {
        fontSize: 14,
        color: '#333',
        marginVertical: 12,
        lineHeight: 20
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12
    },
    priorityText: {
        fontSize: 14,
        color: '#666'
    },
    detailsButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4
    },
    detailsButtonText: {
        color: '#fff',
        fontWeight: '500'
    },
    createButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});