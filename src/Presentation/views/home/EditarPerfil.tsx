import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import useEditarPerfilViewModel from './EditarPerfilViewModel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import Nav from '../../components/Nav';
import useHomeViewModel from './viewModel';

export const EditarPerfil = () => {
    const { logout } = useHomeViewModel();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { nombres, email, funcion, onChange, updatePerfil, errorMessage } = useEditarPerfilViewModel();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updatePerfil();
            navigation.goBack();
        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() => navigation.navigate('HomeScreen')} logout={logout} />

            <View style={styles.formContainer}>
                <Text style={styles.title}>Editar Perfil</Text>

                <CustomTextInput
                    placeholder='Nombres'
                    value={nombres}
                    property='nombres'
                    onChangeText={onChange}
                    image={require('../../../../assets/user.png')}
                    keyboardType='default'
                />

                <CustomTextInput
                    placeholder='Email'
                    value={email}
                    property='email'
                    onChangeText={onChange}
                    image={require('../../../../assets/correo.png')}
                    keyboardType='email-address'
                />

                <CustomTextInput
                    placeholder='Función'
                    value={funcion}
                    property='funcion'
                    onChangeText={onChange}
                    image={require('../../../../assets/user.png')}
                    keyboardType='default'
                />

                <View style={{ marginTop: 60 }}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#3189C5" />
                    ) : (
                        <RoundedButton
                            text='GUARDAR CAMBIOS'
                            onPress={handleSave}
                        />
                    )}
                </View>

                {errorMessage && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
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
        height: '100%',
        position: 'absolute',
    },

    formContainer: {
        width: '90%',
        height: 'auto',
        backgroundColor: 'white',
        position: 'absolute',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        padding: 30,
        top: '30%',
        opacity: 0.9,
        borderColor: 'rgb(49, 137, 197)',
        borderWidth: 4,
        alignSelf: 'center',
    },

    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        marginLeft: 15,
        color: 'white',
    },

    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },

    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10
    }
});