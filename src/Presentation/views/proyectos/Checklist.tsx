import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Nav } from '../../components/Nav';
import { Checkbox } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { WebView } from 'react-native-webview';
import { MyColors } from '../../theme/AppTheme';


export const Checklist = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [selectedDocument, setSelectedDocument] = useState<{
        title: string;
        path: string;
    } | null>(null);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() =>
                navigation.navigate('HomeScreen')}>
            </Nav>

            <Text style={styles.title}>Checklist de Documentación</Text>

            <ScrollView horizontal style={styles.check}>
                <View style={styles.tableContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.headerCell}>Check</Text>
                        <Text style={styles.headerCell}>Documentation</Text>
                        <Text style={styles.headerCell}>Description</Text>
                        <Text style={styles.headerCell}>Progress</Text>
                        <Text style={styles.headerCell}>File</Text>
                        <Text style={styles.headerCell}>Date</Text>
                    </View>

                    {/* Example of a table row - this would be repeated for each data item */}
                    <View style={styles.row}>
                        <View style={styles.cell}>
                            <TouchableOpacity style={styles.checkbox}>
                                {/* Checkbox indicator */}
                                <View style={styles.checkboxInner} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.cell}>Document Name</Text>
                        <Text style={styles.cell}>Document Description</Text>
                        <View style={styles.cell}>
                            <View style={styles.progressContainer}>
                                <Text style={styles.progressText}>75%</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '75%' }]} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.cell}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Ver</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.cell}>2024-01-20</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.previewContainer}>
                <Text style={styles.previewTitle}>
                    {selectedDocument
                        ? `Vista: ${selectedDocument.title}`
                        : 'Selecciona un documento para visualizar'}
                </Text>
                {selectedDocument && (
                    <WebView
                        source={{ uri: selectedDocument.path }}
                        style={styles.webview}
                    />
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
    },

    title:{
        color: 'rgba(255, 255, 255, 0.7)',
        position: 'absolute',
        alignSelf: 'center',
        top: '13%',
        fontSize: 28,
        fontWeight: 'bold',
    },

    check: {
        position: 'absolute',
        height: '50%',
        width: '90%',
        top: '17%',
        alignSelf: 'center',
    },

    tableContainer: {
        borderRadius: 8,
        padding: 10,
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
        minWidth: 100,
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
        minWidth: 100,
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
        backgroundColor: '#3b82f6',
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
        top: '50%',
        alignSelf: 'center',
        borderRadius: 5,
        height: '48%',
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

});

