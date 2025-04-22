import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { getAllPQRS, createPQRS, deletePQRS, updatePQRS } from './services/pqrsService';
import { PQRS as PQRSInterface } from './services/pqrsService';


// Actualizar la interfaz para que coincida
type PQRSItem = {
    id_opi?: string;
    tipo_opi: string;    // cambiado de tipo
    opinion: string;     // cambiado de descripcion
    email: string;       // cambiado de correo
    calificacion: number;
    fecha?: string;
};

export const PQRS = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [showDetail, setShowDetail] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [tipo, setTipo] = useState('');
    const [opinion, setOpinion] = useState('');
    const [calificacion, setCalificacion] = useState('');

    const [selectedPQRS, setSelectedPQRS] = useState<PQRSItem | null>(null);
    const [pqrsList, setPqrsList] = useState<PQRSItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllPQRS();
                setPqrsList(data.map((item: PQRSInterface) => ({
                    id_opi: item.id,
                    tipo_opi: item.tipo,
                    opinion: item.descripcion,
                    email: item.correo,
                    calificacion: 0,
                    fecha: item.fecha || new Date().toISOString().split('T')[0]
                })));
            } catch (error) {
                console.error('Error fetching PQRS:', error);
            }
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        const pqrsData: PQRSInterface = {
            nombre: 'Usuario',
            tipo: tipo,
            descripcion: opinion,
            correo: selectedPQRS?.email || 'usuario@demo.com',
            fecha: new Date().toISOString().split('T')[0]
        };

        try {
            if (selectedPQRS?.id_opi) {
                await updatePQRS(Number(selectedPQRS.id_opi), pqrsData);
            } else {
                await createPQRS(pqrsData);
            }

            const updatedList = await getAllPQRS();
            const mappedList = updatedList.map(item => ({
                id_opi: item.id,
                tipo_opi: item.tipo,
                opinion: item.descripcion,
                email: item.correo,
                calificacion: 0,
                fecha: item.fecha || new Date().toISOString().split('T')[0]
            }));
            setPqrsList(mappedList);
            setSelectedPQRS(null);
        } catch (error) {
            console.error('Error saving PQRS:', error);
        }
    };



    const PQRSDetail = () => (
        <View style={styles.detailContainer}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>LS</Text>
                        </View>
                        <Text style={styles.email}>{selectedPQRS?.email}</Text>
                    </View>
                    <View style={styles.priorityBadge}>
                        <Text style={styles.priorityText}>
                            Prioridad: {selectedPQRS?.calificacion}/5
                        </Text>
                    </View>
                </View>

                <View style={styles.cardContent}>
                    <View style={styles.typeBadge}>
                        <Text style={styles.typeText}>{selectedPQRS?.tipo_opi}</Text>
                    </View>
                    <Text style={styles.description}>{selectedPQRS?.opinion}</Text>
                </View>

                <View style={styles.cardFooter}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => setShowDetail(false)}
                    >
                        <Text style={styles.buttonText}>Volver a la lista</Text>
                    </TouchableOpacity>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => setShowEditModal(true)}
                        >
                            <Text style={styles.buttonText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={async () => {
                                if (selectedPQRS) {
                                    await deletePQRS(Number(selectedPQRS.id_opi));
                                    const updatedList = await getAllPQRS();
                                    const mappedList = updatedList.map(item => ({
                                        id_opi: item.id,
                                        tipo_opi: item.tipo,
                                        opinion: item.descripcion,
                                        email: item.correo,
                                        calificacion: 0,
                                        fecha: item.fecha || new Date().toISOString().split('T')[0]
                                    }));
                                    setPqrsList(mappedList);
                                    setSelectedPQRS(null);
                                    setShowDetail(false);
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>Eliminar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    );

    const PQRSList = () => (
        <ScrollView style={styles.listContainer}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowEditModal(true)}
            >
                <Text style={styles.addButtonText}>Nueva PQRS</Text>
            </TouchableOpacity>

            {/* Sample PQRS Item */}
            {pqrsList.map((item) => (
                <TouchableOpacity
                    key={item.id_opi}
                    style={styles.pqrsItem}
                    onPress={() => {
                        setSelectedPQRS(item);
                        setShowDetail(true);
                    }}
                >
                    <View style={styles.pqrsHeader}>
                        <Text style={styles.pqrsType}>{item.tipo_opi}</Text>
                        <Text style={styles.pqrsDate}>{item.fecha}</Text>
                    </View>
                    <Text style={styles.pqrsDescription} numberOfLines={2}>
                        {item.opinion}
                    </Text>
                    <View style={styles.pqrsFooter}>
                        <Text style={styles.pqrsEmail}>{item.email}</Text>
                        <Text style={styles.pqrsPriority}>Prioridad: {item.calificacion}/5</Text>
                    </View>
                </TouchableOpacity>
            ))}

        </ScrollView>
    );

    const EditModal = () => (
        <Modal
            visible={showEditModal}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        {selectedPQRS ? 'Editar PQRS' : 'Nueva PQRS'}
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Tipo de PQRS:</Text>
                        <TextInput
                            style={styles.input}
                            value={tipo}
                            onChangeText={setTipo}
                            placeholder="Seleccione tipo"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Descripción:</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={opinion}
                            onChangeText={setOpinion}
                            multiline
                            numberOfLines={4}
                            placeholder="Escriba su PQRS"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Prioridad:</Text>
                        <TextInput
                            style={styles.input}
                            value={calificacion}
                            onChangeText={setCalificacion}
                            placeholder="Seleccione prioridad"
                        />
                    </View>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setShowEditModal(false)}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {
                                handleSave();
                                setShowEditModal(false)
                            }}>
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );

    return (
        <View style={styles.container}>
            {showDetail ? <PQRSDetail /> : <PQRSList />}
            <EditModal />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    detailContainer: {
        flex: 1,
        padding: 16,
    },
    addButton: {
        backgroundColor: '#3b82f6',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pqrsItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    pqrsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    pqrsType: {
        color: '#3b82f6',
        fontWeight: 'bold',
    },
    pqrsDate: {
        color: '#64748b',
    },
    pqrsDescription: {
        color: '#1f2937',
        marginBottom: 8,
    },
    pqrsFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pqrsEmail: {
        color: '#64748b',
    },
    pqrsPriority: {
        color: '#64748b',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3b82f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    email: {
        color: '#1f2937',
    },
    priorityBadge: {
        backgroundColor: '#dbeafe',
        padding: 8,
        borderRadius: 16,
    },
    priorityText: {
        color: '#3b82f6',
    },
    cardContent: {
        marginBottom: 16,
    },
    typeBadge: {
        backgroundColor: '#f3f4f6',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    typeText: {
        color: '#1f2937',
    },
    description: {
        color: '#4b5563',
        lineHeight: 24,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backButton: {
        backgroundColor: '#6b7280',
        padding: 12,
        borderRadius: 8,
    },
    actionButtons: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: '#3b82f6',
        padding: 12,
        borderRadius: 8,
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: '#ef4444',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        width: Dimensions.get('window').width * 0.9,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#1f2937',
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        color: '#4b5563',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
    cancelButton: {
        backgroundColor: '#6b7280',
        padding: 12,
        borderRadius: 8,
        marginRight: 8,
    },
    saveButton: {
        backgroundColor: '#3b82f6',
        padding: 12,
        borderRadius: 8,
    },
});

