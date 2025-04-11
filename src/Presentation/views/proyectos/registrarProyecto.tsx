import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Nav from '../../components/Nav';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoundedButton } from '../../components/RoundedButton';

export const NewProyScreen = () => {
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


            <View style={styles.formContainer}>
                <ScrollView>
                    <Text style={styles.title}>Registrar Proyecto</Text>

                    <View style={styles.formContent}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nombre del Proyecto</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ingrese el nombre del proyecto"
                                placeholderTextColor="#666"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Descripción</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Descripción detallada del proyecto"
                                placeholderTextColor="#666"
                                multiline
                                numberOfLines={4}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tipo de Aplicativo</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    style={styles.picker}
                                    dropdownIconColor="#fff"
                                >
                                    <Picker.Item label="Seleccione el tipo de aplicativo" value="" />
                                    <Picker.Item label="Aplicativo Web" value="web" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Fecha de Registro</Text>
                            <TouchableOpacity style={styles.dateButton}>
                                <Text style={styles.dateButtonText}>Seleccionar Fecha</Text>
                            </TouchableOpacity>
                        </View>

                        <RoundedButton text='Registrar' onPress={() => {
                            navigation.navigate('NewProyScreen')
                        }}>
                        </RoundedButton>
                    </View>
                </ScrollView>
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

    formContainer: {
        backgroundColor: 'rgba(0, 10, 17, 0.9)',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        top: '22%',
        alignSelf: 'center',
        borderColor: 'rgba(255, 255, 255, 0.7)',
        borderWidth: 1,
        width: '90%',

    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    formContent: {
        padding: 10,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: '#ccc',
        marginBottom: 8,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#1A2032',
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 5,
        padding: 12,
        color: '#fff',
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        backgroundColor: '#1A2032',
        borderRadius: 5,
        borderColor: '#333',
        borderWidth: 1,
    },
    picker: {
        color: '#fff',
    },
    dateButton: {
        backgroundColor: '#1A2032',
        padding: 12,
        borderRadius: 5,
        borderColor: '#333',
        borderWidth: 1,
    },
    dateButtonText: {
        color: '#666',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

