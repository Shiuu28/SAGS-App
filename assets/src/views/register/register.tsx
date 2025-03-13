import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TextInput, ToastAndroid, Touchable, TouchableOpacity } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';


export const RegisterScreen = () => {

    return (

        <View style={styles.container}>

            <Image
                source={require('../../../img/fondo.png')}
                style={styles.imageBackground}
            />

            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../img/sirs.jpg')}
                    style={styles.logoImage}
                />
                <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
            </View>



            <View style={styles.form}>

                <Text style={styles.formText}>REGISTRARSE</Text>


                <View style={styles.formInput}>
                    <Image style={styles.formIcon}
                        source={require('../../../img/sirs.jpg')}
                    />

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Nombres'
                        keyboardType='default'
                    />
                </View>



                <View style={styles.formInput}>
                    <Image style={styles.formIcon}
                        source={require('../../../img/sirs.jpg')}
                    />

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Apellidos'
                        keyboardType='default'
                    />
                </View>



                <View style={styles.formInput}>
                    <Image style={styles.formIcon}
                        source={require('../../../img/sirs.jpg')}
                    />

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Correo electrónico'
                        keyboardType='email-address'
                    />
                </View>


                <View style={styles.formInput}>
                    <Image style={styles.formIcon}
                        source={require('../../../img/sirs.jpg')}
                    />

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Teléfono'
                        keyboardType='numeric'
                    />
                </View>



                <View style={styles.formInput}>
                    <Image style={styles.formIcon}
                        source={require('../../../img/sirs.jpg')}
                    />

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Contraseña'
                        keyboardType='default'
                        secureTextEntry={true}
                    />
                </View>



                <View style={styles.formInput}>

                    <Image style={styles.formIcon}
                        source={require('../../../img/sirs.jpg')}
                    />

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Confirmar Contraseña'
                        keyboardType='default'
                        secureTextEntry={true}
                    />
                </View>

                <View style={{ marginTop: 30 }}>
                    <RoundedButton text='CONFIRMAR' onPress={() => ToastAndroid.show('HOLA!', ToastAndroid.SHORT)} />
                </View>


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
        opacity: 0.5,
        bottom: '30%',
    },


    form: {
        width: '100%',
        height: '70%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
    },


    formText: {
        fontWeight: 'bold',
        fontSize: 16,
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
    },


    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },


    formRegisterText: {
        fontStyle: 'italic',
        color: 'orange',
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
        fontWeight: 'bold',
        marginLeft: 10,
    },

    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '5%',
        alignItems: 'center',
    },

    logoImage: {
        width: 100,
        height: 100,
    },

    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
    },

});

