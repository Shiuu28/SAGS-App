import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Nav } from '../../components/Nav';
import { MyColors } from '../../theme/AppTheme';
import { GetChecklistsUseCase, GetDocumentUseCase } from './checkViewModel';
import { WebView } from 'react-native-webview';
import { ChecklistEntities } from '../../../Domain/Entities/User';
import { AuthRepositoryImpl } from '../../../Data/repositories/AuthRepository';
import useHomeViewModel from '../home/viewModel';



export const Checklist = () => {
    const {logout} = useHomeViewModel();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [selectedDocument, setSelectedDocument] = useState<{
        title: string;
        path: string;
    } | null>(null);

    const [checklists, setChecklists] = useState<ChecklistEntities[]>([]);
    const [loading, setLoading] = useState(false);
    const authRepository = new AuthRepositoryImpl();
    const getChecklistsUseCase = new GetChecklistsUseCase(authRepository);
    const getDocumentUseCase = new GetDocumentUseCase(authRepository);

    useEffect(() => {
        loadChecklists();
    }, []);

    const loadChecklists = async () => {
        setLoading(true);
        try {
            const result = await getChecklistsUseCase.execute();

            if (result.success && result.user) {
                const checklistsWithChecked = result.user.map(item => ({
                    ...item,
                    idmod: item.idmod.toString(), // Convertir a string si es necesario
                    nombre: item.nombre || `Documento ${item.idmod}`,
                    descripcion: item.descripcion || 'Sin descripción',
                    checked: false
                }));
                setChecklists(checklistsWithChecked);
            } else {
                Alert.alert('Error', result.message || 'No se pudieron cargar los documentos');
            }
        } catch (error) {
            console.error('Error loading checklists:', error);
            Alert.alert('Error', 'Ocurrió un error al cargar la lista');
        } finally {
            setLoading(false);
        }
    };

    const handleVerDocumento = async (archivo: string) => {
        try {
            const blob = await getDocumentUseCase.execute(archivo);
            const url = URL.createObjectURL(blob);

            // Actualizar el documento seleccionado para mostrar en el visor
            setSelectedDocument({
                title: `Documento ${archivo}`,
                path: url
            });

            
        } catch (error) {
            console.error('Error en el documento:', error);
            Alert.alert('Error', 'No se pudo abrir el documento');
        }
    };

    const handleCheckboxChange = (index: number) => {
        const updatedChecklists = [...checklists];
        updatedChecklists[index].checked = !updatedChecklists[index].checked;
        setChecklists(updatedChecklists);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() => navigation.navigate('HomeScreen')} logout={logout} />

            <Text style={styles.title}>Checklist de Documentación</Text>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Cargando documentos...</Text>
                </View>
            ) : (
                <ScrollView horizontal style={styles.check}>
                    <ScrollView>
                        <View style={styles.tableContainer}>
                            <View style={styles.headerRow}>
                                <Text style={styles.headerCell}>Check</Text>
                                <Text style={styles.headerCell}>Documentación</Text>
                                <Text style={styles.headerCell}>Descripción</Text>
                                <Text style={styles.headerCell}>Progreso</Text>
                                <Text style={styles.headerCell}>Archivo</Text>
                                <Text style={styles.headerCell}>Fecha</Text>
                            </View>

                            {checklists.map((item, index) => (
                                <View style={styles.row} key={`${item.idmod}-${index}`}>
                                    <View style={styles.cell}>
                                        <TouchableOpacity
                                            style={styles.checkbox}
                                            onPress={() => handleCheckboxChange(index)}>
                                            <View style={[styles.checkboxInner, item.checked ? { backgroundColor: '#3b82f6' } : {}]} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.cell}>{item.nombre || `Documento ${item.idmod}`}</Text>
                                    <Text style={styles.cell}>{item.descripcion || 'Sin descripción'}</Text>
                                    <View style={styles.cell}>
                                        <View style={styles.progressContainer}>
                                            <Text style={styles.progressText}>{item.progreso}%</Text>
                                            <View style={styles.progressBar}>
                                                <View style={[styles.progressFill, { width: `${item.progreso}%` }]} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.cell}>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => handleVerDocumento(item.archivo)}
                                        >
                                            <Text style={styles.buttonText}>Ver</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.cell}>{item.fecha || 'N/A'}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </ScrollView>
            )}

            <View style={styles.previewContainer}>
                <Text style={styles.previewTitle}>
                    {selectedDocument
                        ? `Vista previa: ${selectedDocument.title}`
                        : 'Selecciona un documento para visualizar'}
                </Text>
                {selectedDocument ? (
                    <WebView
                        source={{ uri: selectedDocument.path }}
                        style={styles.webview}
                        startInLoadingState={true}
                    />
                ) : (
                    <View style={styles.emptyPreview}>
                        <Text style={styles.emptyPreviewText}>No hay documento seleccionado</Text>
                    </View>
                )}
            </View>
        </View>
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
        position: 'absolute',
    },
    title: {
        color: 'rgba(255, 255, 255, 0.7)',
        position: 'absolute',
        alignSelf: 'center',
        top: '13%',
        fontSize: 28,
        fontWeight: 'bold',
    },
    check: {
        position: 'absolute',
        height: '30%',
        width: '90%',
        top: '20%',
        alignSelf: 'center',
    },
    tableContainer: {
        borderRadius: 8,
        padding: 10,
        backgroundColor: 'rgba(0, 10, 17, 0.8)',
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e2e8f0',
        paddingVertical: 10,
    },
    headerCell: {
        fontWeight: 'bold',
        padding: 10,
        minWidth: 120,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e2e8f0',
        alignItems: 'center',
    },
    cell: {
        padding: 10,
        minWidth: 120,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#3b82f6',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: 'transparent',
        borderRadius: 2,
    },
    progressContainer: {
        width: '100%',
    },
    progressText: {
        color: MyColors.primary,
        marginBottom: 4,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#3b82f6',
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#3b82f6',
        padding: 8,
        borderRadius: 6,
        marginVertical: 2,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    previewContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: 'rgba(0, 10, 17, 0.9)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        position: 'absolute',
        top: '52%',
        alignSelf: 'center',
        borderRadius: 5,
        height: '45%',
        width: '90%',
    },
    previewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
    },
    webview: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    emptyPreview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyPreviewText: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 16,
    },
    loadingContainer: {
        position: 'absolute',
        top: '20%',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 10, 17, 0.8)',
        padding: 20,
        borderRadius: 8,
    },
    loadingText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
    },
});