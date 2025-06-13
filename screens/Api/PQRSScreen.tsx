"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { HeaderWithDrawer } from "../../components/HeaderWithDrawer"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../App"
import { useTheme } from "../../context/ThemeContext"
import { GradientBackground } from "../../components/GradientBackground"
import { useUserLocal } from "../../src/Hooks/useUserLocal"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios';


type PQRSProp = StackNavigationProp<RootStackParamList, "PQRS">

interface Props {
    navigation: PQRSProp
}

interface PQRSItem {
    id_opi: number;
    email: string;
    tipo_opi: 'Petición' | 'Queja' | 'Reclamo' | 'Sugerencia';
    opinion: string;
    calificacion: number;
}

const API_URL = 'http://10.0.2.2:8000/api';

// Crear una instancia de Axios específica para PQRS
const PQRSApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Agregar interceptor para el token
PQRSApi.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default function PQRSScreen({ navigation }: Props) {
    const { colors, isDark } = useTheme()
    const [modalVisible, setModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [pqrsType, setPqrsType] = useState<PQRSItem["tipo_opi"]>("Petición")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState(3)
    const [searchText, setSearchText] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [loading, setLoading] = useState(false)
    const [selectedPQRS, setSelectedPQRS] = useState<PQRSItem | null>(null)

    // Usar el hook useUserLocal para obtener el usuario logueado
    const { user, getUserSession } = useUserLocal()
    const [userEmail, setUserEmail] = useState<string>("")

    const [pqrsList, setPqrsList] = useState<PQRSItem[]>([])

    useEffect(() => {
        // Obtener la sesión del usuario al cargar el componente
        getUserSession();
    }, []);

    // Actualizar el email cuando el usuario cambia
    useEffect(() => {
        if (user && user.email) {
            setUserEmail(user.email);
            // Cargar los PQRS cuando tengamos el email del usuario
            loadPQRS();
        }
    }, [user]);

    // Función para cargar los PQRS desde el servidor
    const loadPQRS = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) {
                console.log('No hay token disponible');
                Alert.alert("Error", "No se pudo autenticar. Por favor inicie sesión nuevamente.");
                // Opcional: redirigir al usuario a la pantalla de login
                // navigation.navigate('Login');
                return;
            }

            // Usar la instancia de Axios que ya tienes configurada
            const response = await PQRSApi.get('/pqrs');
            setPqrsList(response.data);
        } catch (error) {
            console.error('Error al cargar PQRS:', error);
            Alert.alert("Error", "No se pudieron cargar los PQRS. Intente nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    const getToken = async () => {
        try {
            // Cambiar 'userToken' a 'token' para coincidir con AuthRepository.tsx
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('No hay token disponible');
                return null;
            }
            return token;
        } catch (error) {
            console.error('Error al obtener token:', error);
            return null;
        }
    };

    // Y luego reemplazar los fetch por PQRSApi
    const createPQRS = async (pqrsData: Omit<PQRSItem, 'id_opi'>): Promise<PQRSItem> => {
        try {
            const token = await getToken();
            if (!token) {
                throw new Error('Usuario no autenticado');
            }

            const response = await PQRSApi.post('/pqrs', {
                opinion: pqrsData.opinion,
                calificacion: pqrsData.calificacion,
                tipo_opi: pqrsData.tipo_opi,
                email: pqrsData.email
            });

            return response.data;
        } catch (error) {
            console.error('Error al crear PQRS:', error);
            throw error;
        }
    };

    const updatePQRS = async (id: number, pqrsData: Partial<PQRSItem>): Promise<PQRSItem> => {
        try {
            const token = await getToken();
            if (!token) {
                throw new Error('Usuario no autenticado');
            }

            const response = await fetch(`${API_URL}/pqrs/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    opinion: pqrsData.opinion,
                    calificacion: pqrsData.calificacion,
                    tipo_opi: pqrsData.tipo_opi,
                    email: userEmail // Enviar email directamente
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar PQRS');
            }

            return await response.json();
        } catch (error) {
            console.error('Error al actualizar PQRS:', error);
            throw error;
        }
    };

    const deletePQRS = async (id: number): Promise<void> => {
        try {
            const token = await getToken();
            if (!token) {
                throw new Error('Usuario no autenticado');
            }

            const response = await fetch(`${API_URL}/pqrs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail // Enviar email directamente
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al eliminar PQRS');
            }
        } catch (error) {
            console.error('Error al eliminar PQRS:', error);
            throw error;
        }
    };


    const getTypeColor = (type: string) => {
        switch (type) {
            case "Petición":
                return "#0EA5E9"
            case "Queja":
                return "#EF4444"
            case "Reclamo":
                return "#F59E0B"
            case "Sugerencia":
                return "#10B981"
            default:
                return "#6B7280"
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "#F59E0B"
            case "in-progress":
                return "#0EA5E9"
            case "resolved":
                return "#10B981"
            default:
                return "#6B7280"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "pending":
                return "Pendiente"
            case "in-progress":
                return "En Proceso"
            case "resolved":
                return "Resuelto"
            default:
                return "Desconocido"
        }
    }

    const handleCreatePQRS = async () => {
        if (!description.trim()) {
            Alert.alert("Error", "Por favor ingrese una descripción")
            return
        }
        if (!userEmail) {
            Alert.alert("Error", "No se pudo obtener el email del usuario");
            return;
        }
        try {
            setLoading(true)

            // Crear el objeto PQRS con los datos del formulario
            const newPQRS = {
                tipo_opi: pqrsType,
                opinion: description.trim(),
                calificacion: priority,
                email: userEmail, // Mantenemos email en el objeto local
            };

            // Usar la función createPQRS definida anteriormente
            const response = await createPQRS(newPQRS);
            await createPQRS(newPQRS);
            // Actualizar la lista con el nuevo PQRS
            setPqrsList([response, ...pqrsList])
            setModalVisible(false)
            setDescription("")
            setPqrsType("Petición")
            setPriority(3)
            Alert.alert("Éxito", "PQRS creado correctamente")

        } catch (error) {
            console.log('Error al crear PQRS:', error)
            Alert.alert("Error", "Ocurrió un error al crear el PQRS")
        } finally {
            setLoading(false)
        }
    }

    const [editingPQRS, setEditingPQRS] = useState<PQRSItem | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleEditPQRS = (item: PQRSItem) => {
        setEditingPQRS(item);
        setPqrsType(item.tipo_opi);
        setDescription(item.opinion);
        setPriority(item.calificacion);
        setModalVisible(true);
    };

    const handleUpdatePQRS = async () => {
        if (!editingPQRS || !description.trim()) {
            Alert.alert("Error", "Por favor ingrese una descripción");
            return;
        }

        try {
            setLoading(true);

            const updatedData = {
                tipo_opi: pqrsType,
                opinion: description.trim(),
                calificacion: priority
            };

            const updatedPQRS = await updatePQRS(editingPQRS.id_opi, updatedData);

            setPqrsList(pqrsList.map(item =>
                item.id_opi === updatedPQRS.id_opi ? updatedPQRS : item
            ));

            resetModal();
            Alert.alert("Éxito", "PQRS actualizado correctamente");
        } catch (error) {
            console.log('Error al actualizar PQRS:', error);
            Alert.alert("Error", "Ocurrió un error al actualizar el PQRS");
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePQRS = async (id: number) => {
        try {
            setLoading(true);
            await deletePQRS(id);
            setPqrsList(pqrsList.filter(item => item.id_opi !== id));
            Alert.alert("Éxito", "PQRS eliminado correctamente");
        } catch (error) {
            console.log('Error al eliminar PQRS:', error);
            Alert.alert("Error", "Ocurrió un error al eliminar el PQRS");
        } finally {
            setLoading(false);
            setDeleteId(null);
        }
    };

    const resetModal = () => {
        setModalVisible(false);
        setEditingPQRS(null);
        setDescription("");
        setPqrsType("Petición");
        setPriority(3);
    };

    const filteredPQRS = pqrsList.filter((item) => {
        const matchesSearch = (item.email?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
            (item.opinion?.toLowerCase() || '').includes(searchText.toLowerCase());
        const matchesType = filterType === 'all' || item.tipo_opi === filterType;
        return matchesSearch && matchesType;
    })

    const renderPQRSCard = ({ item }: { item: PQRSItem }) => (
        <View style={styles.pqrsCard}>
            <View style={styles.pqrsHeader}>
                <View style={styles.userInfo}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={20} color="#fff" />
                    </View>
                    <Text style={styles.userEmail}>{item.email}</Text>
                </View>
                <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.tipo_opi) }]}>
                    <Text style={styles.typeBadgeText}>{item.tipo_opi}</Text>
                </View>
            </View>

            <Text style={styles.pqrsDescription}>{item.opinion}</Text>

            <View style={styles.pqrsFooter}>
                <View style={styles.priorityContainer}>
                    <Text style={styles.priorityText}>Prioridad: {item.calificacion}/5</Text>
                    <View style={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                            <Ionicons
                                key={i}
                                name={i < item.calificacion ? "star" : "star-outline"}
                                size={16}
                                color="#F59E0B"
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    {userEmail === item.email && (
                        <>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleEditPQRS(item)}
                            >
                                <Ionicons name="create-outline" size={16} color="#0EA5E9" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => setDeleteId(item.id_opi)}
                            >
                                <Ionicons name="trash-outline" size={16} color="#EF4444" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </View>
    );

    if (loading) {
        return (
            <GradientBackground variant={isDark ? "surface" : "primary"} style={styles.container}>
                <HeaderWithDrawer navigation={navigation} currentRoute="PQRS" />
                <View>
                    <ActivityIndicator size="large" color="#10B981" />
                    <Text>Cargando PQRS...</Text>
                </View>
            </GradientBackground>
        )
    }

    return (
        <GradientBackground variant={isDark ? "surface" : "primary"} style={styles.container}>
            <HeaderWithDrawer navigation={navigation} currentRoute="PQRS" />
            <View style={styles.header}>
                <Text style={styles.title}>Sistema de PQRS</Text>
                <Text style={styles.subtitle}>Peticiones, Quejas, Reclamos y Sugerencias</Text>
            </View>

            {/* Search and Filter */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar por correo o contenido..."
                        placeholderTextColor="#666"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                <View style={styles.filterContainer}>
                    <Picker selectedValue={filterType} onValueChange={setFilterType} style={styles.filterPicker}>
                        <Picker.Item label="Todos los tipos" value="all" />
                        <Picker.Item label="Peticiones" value="Petición" />
                        <Picker.Item label="Quejas" value="Queja" />
                        <Picker.Item label="Reclamos" value="Reclamo" />
                        <Picker.Item label="Sugerencias" value="Sugerencia" />
                    </Picker>
                </View>
            </View>

            <FlatList
                data={filteredPQRS}
                renderItem={renderPQRSCard}
                keyExtractor={(item) => item.id_opi.toString()}
                contentContainerStyle={styles.pqrsList}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add" size={24} color="#fff" />
                <Text style={styles.createButtonText}>Crear nueva PQRS</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={resetModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {editingPQRS ? 'Editar PQRS' : 'Crear nueva PQRS'}
                            </Text>
                            <TouchableOpacity onPress={resetModal}>
                                <Ionicons name="close" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerLabel}>Tipo de PQRS:</Text>
                            <Picker selectedValue={pqrsType} onValueChange={setPqrsType} style={styles.picker}>
                                <Picker.Item label="Petición" value="Petición" />
                                <Picker.Item label="Queja" value="Queja" />
                                <Picker.Item label="Reclamo" value="Reclamo" />
                                <Picker.Item label="Sugerencia" value="Sugerencia" />
                            </Picker>
                        </View>

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describa detalladamente su PQRS"
                            placeholderTextColor="#666"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                        />

                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerLabel}>Prioridad:</Text>
                            <Picker selectedValue={priority} onValueChange={setPriority} style={styles.picker}>
                                <Picker.Item label="1 - Baja" value={1} />
                                <Picker.Item label="2 - Media-Baja" value={2} />
                                <Picker.Item label="3 - Media" value={3} />
                                <Picker.Item label="4 - Media-Alta" value={4} />
                                <Picker.Item label="5 - Alta" value={5} />
                            </Picker>
                        </View>

                    </View>
                    <View style={styles.modalActions}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={resetModal}
                        >
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, styles.createModalButton]}
                            onPress={editingPQRS ? handleUpdatePQRS : handleCreatePQRS}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.modalButtonText}>
                                    {editingPQRS ? 'Actualizar' : 'Enviar'} PQRS
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de confirmación para eliminar */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={!!deleteId}
                onRequestClose={() => setDeleteId(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>¿Eliminar PQRS?</Text>
                        <Text style={{ color: '#ccc', marginBottom: 20 }}>
                            Esta acción no se puede deshacer.
                        </Text>

                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setDeleteId(null)}
                            >
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#EF4444' }]}
                                onPress={() => deleteId && handleDeletePQRS(deleteId)}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.modalButtonText}>Eliminar</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </GradientBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: "#ccc",
        textAlign: "center",
    },
    searchContainer: {
        padding: 20,
        paddingTop: 0,
    },
    searchInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 10,
        marginBottom: 15,
    },
    searchIcon: {
        marginLeft: 15,
    },
    searchInput: {
        flex: 1,
        padding: 15,
        color: "#fff",
        fontSize: 16,
    },
    filterContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 10,
    },
    filterPicker: {
        color: "#fff",
    },
    pqrsList: {
        padding: 20,
        paddingTop: 0,
    },
    pqrsCard: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
    },
    pqrsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    userEmail: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    typeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    typeBadgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    pqrsDescription: {
        color: "#ccc",
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 15,
    },
    pqrsFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    priorityContainer: {
        flex: 1,
    },
    priorityText: {
        color: "#ccc",
        fontSize: 12,
        marginBottom: 5,
    },
    stars: {
        flexDirection: "row",
    },
    statusContainer: {
        alignItems: "flex-end",
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        marginBottom: 5,
    },
    statusText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "600",
    },
    dateText: {
        color: "#666",
        fontSize: 10,
    },
    createButton: {
        flexDirection: "row",
        backgroundColor: "#10B981",
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    createButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#1a2032",
        borderRadius: 20,
        padding: 20,
        width: "90%",
        maxHeight: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    pickerContainer: {
        marginBottom: 15,
    },
    pickerLabel: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 5,
    },
    picker: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 10,
        color: "#fff",
    },
    input: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        color: "#fff",
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: "#6B7280",
    },
    createModalButton: {
        backgroundColor: "#10B981",
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        marginLeft: 10,
        padding: 5,
    },
})
