import React, { useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TextInput, Alert, ScrollView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { Nav } from '../../components/Nav';
import useRegisterViewModel from "../../views/register/viewModel";
import { CustomTextInput } from '../../components/CustomTextInput';
import useHomeViewModel from '../home/viewModel';


export const RegisterScreen = () => {
    const {logout} = useHomeViewModel();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { email, tipodoc, documento, password, onChange, errorMessage, register } = useRegisterViewModel();

    useEffect(() => {
            if (errorMessage !== '')
                Alert.alert('Error', errorMessage);
        }, [errorMessage]
    );

    return (

        <View style={styles.container}>

            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() => navigation.navigate('HomeScreen')} logout={logout}></Nav>

            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>¡BIENVENIDO!</Text>
            </View>



            <View style={styles.form}>
                <ScrollView>
                    <Text style={styles.formText}>REGISTRARSE</Text>



                        <CustomTextInput
                            image={require('../../../../assets/avatar.png')}
                            placeholder='Tipo de documento'
                            keyboardType='default'
                            property='tipodoc'
                            onChangeText={onChange}
                            value={tipodoc}
                        />

                        <CustomTextInput
                            image={require('../../../../assets/id.png')}
                            placeholder='Documento (solo números)'
                            keyboardType='default'
                            property='documento'
                            onChangeText={onChange}
                            value={documento}
                            
                        />

                        <CustomTextInput
                            image={require('../../../../assets/correo.png')}
                            placeholder='Correo electrónico'
                            keyboardType='email-address'
                            property='email'
                            onChangeText={onChange}
                            value={email}
                        />

                        <CustomTextInput
                            image={require('../../../../assets/password.png')}
                            placeholder='Contraseña'
                            keyboardType='default'
                            secureTextEntry={true}
                            property='password'
                            onChangeText={onChange}
                            value={password}
                        />


                    <View style={{ marginTop: 30 }}>
                        <RoundedButton text= 'CONFIRMAR' onPress={() => register()}/>
                    </View>

                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },


    imageBackground: {
        width: '100%',
        height: '100%',
    },


    form: {
        width: '95%',
        height: 'auto',
        backgroundColor: 'white',
        position: 'absolute',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        padding: 30,
        top: '36%',
        opacity: 0.9,
        borderColor: 'rgb(49, 137, 197)',
        borderWidth: 4,
        alignSelf: 'center',
    },


    formText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#146099',
        fontFamily: 'serif',
    },


    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5,
    },


    formInput: {
        flexDirection: 'row',
        marginTop: 25,
    },


    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        marginLeft: 15,
        color: 'white',
    },


    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 80,
    },


    formRegisterText: {
        fontStyle: 'italic',
        color: 'white',
        borderBottomWidth: 1,
        fontWeight: 'bold',
        marginLeft: 10,
        fontFamily: 'serif',
    },

    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '5%',
        alignItems: 'center',
    },

    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
        marginTop: '40%',
        fontWeight: 'bold',
        fontFamily: 'serif',
    },

});

