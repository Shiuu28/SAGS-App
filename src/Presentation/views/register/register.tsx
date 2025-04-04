import React, { useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TextInput, ToastAndroid, ScrollView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { Nav } from '../../components/Nav';
import useRegisterViewModel from "../../views/register/viewModel";


export const RegisterScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { email, tipodoc, documento, password, onChange, errorMessage, register } = useRegisterViewModel();

    useEffect(() => {
            if (errorMessage !== '')
                ToastAndroid.show(errorMessage, ToastAndroid.LONG)
        }, [errorMessage]
    );

    return (

        <View style={styles.container}>

            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() =>
                navigation.navigate('HomeScreen')}>
            </Nav>

            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>¡BIENVENIDO!</Text>
            </View>



            <View style={styles.form}>
                <ScrollView>
                    <Text style={styles.formText}>REGISTRARSE</Text>


                    <View style={styles.formInput}>
                        <Image style={styles.formIcon}
                            source={require('../../../../assets/avatar.png')}
                        />

                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Tipo de documento'
                            placeholderTextColor={'white'}
                            keyboardType='default'
                            onChangeText={(text) => onChange('tipodoc', text)}
                        />
                    </View>



                    <View style={styles.formInput}>
                        <Image style={styles.formIcon}
                            source={require('../../../../assets/id.png')}
                        />

                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Documento (solo números)'
                            placeholderTextColor={'white'}
                            keyboardType='default'
                            
                        />
                    </View>


                    <View style={styles.formInput}>
                        <Image style={styles.formIcon}
                            source={require('../../../../assets/correo.png')}
                        />

                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Correo electrónico'
                            placeholderTextColor={'white'}
                            keyboardType='email-address'
                        />
                    </View>


                    <View style={styles.formInput}>
                        <Image style={styles.formIcon}
                            source={require('../../../../assets/password.png')}
                        />

                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Contraseña'
                            placeholderTextColor={'white'}
                            keyboardType='default'
                            secureTextEntry={true}
                        />
                    </View>


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
        width: '100%',
        height: 'auto',
        backgroundColor: 'rgba(60, 121, 157, 0.8)',
        position: 'absolute',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        padding: 30,
        top: '36%',
        opacity: 0.9,
    },


    formText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
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

