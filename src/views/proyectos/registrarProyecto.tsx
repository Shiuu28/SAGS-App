import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TextInput, ToastAndroid, Touchable, TouchableOpacity } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { Nav } from '../../components/Nav';



export const NewProyScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (

        <View style={styles.container}>

            <Image
                source={require('../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() =>
                navigation.navigate('Proyectos')}>
            </Nav>

            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Registrar Proyecto</Text>
            </View>



            <View style={styles.form}>

                <View style={styles.formInput}>
                    <Text style={styles.formText}>Nombre del Proyecto</Text>

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Ingrese el nombre del proyecto'
                        keyboardType='default'
                    />
                </View>



                <View style={styles.formInput}>
                <Text style={styles.formText}>Descripción</Text>

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Descripción detallada del proyecto'
                        keyboardType='default'
                    />
                </View>


                <View style={styles.formInput}>
                <Text style={styles.formText}>Tipo de aplicativo</Text>

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='Aplicativo Web'
                        keyboardType='email-address'
                    />
                </View>


                <View style={styles.formInput}>
                <Text style={styles.formText}>Fecha de Registro</Text>

                    <TextInput
                        style={styles.formTextInput}
                        placeholder='dd/mm/aa'
                        keyboardType='numeric'
                    />
                </View>


                <View style={{ marginTop: 30 }}>
                    <RoundedButton text='Registrar' onPress={() => ToastAndroid.show('¡Su proyecto se ha registrado!', ToastAndroid.LONG)} />
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
    },


    form: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#146099',
        position: 'absolute',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'white',
        padding: 30,
        top: '36%',
        opacity: 0.9,
    },


    formText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left'
    },


    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5,
    },


    formInput: {
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
        fontSize: 35,
        marginTop: '40%',
        fontWeight: 'bold',
    },

});

