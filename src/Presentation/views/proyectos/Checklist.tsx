import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList, ToastAndroid } from 'react-native';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Nav } from '../../components/Nav';
import { Checkbox } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';


export const Checklist = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [checked, setChecked] = useState(false);
    const rows = [
        { id: 1, name: "Casos de Uso", progress: "70%", date: "07/07/2023" },
        { id: 2, name: "Casos de Uso", progress: "70%", date: "07/07/2023" },
    ];


    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Nav onPress={() =>
                navigation.navigate('HomeScreen')}>
            </Nav>



            <View style={styles.overlay}>

                {/*Encabezados*/}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Check</Text>
                    <Text style={styles.headerText}>Documentación</Text>
                    <Text style={styles.headerText}>Progreso</Text>
                    <Text style={styles.headerText}>Archivo</Text>
                    <Text style={styles.headerText}>Fecha</Text>
                </View>

                {/*Estructura - Elementos*/}
                <FlatList
                    data={rows}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Checkbox status={checked ? "checked" : "unchecked"}
                                onPress={() => setChecked(!checked)} />

                            <Text style={styles.text}>{item.name} Modelo</Text>
                            <Text style={styles.text}>{item.progress}</Text>

                            <RoundedButton text='Ver' onPress={() =>
                                ToastAndroid.show('¡Datos Editados!', ToastAndroid.SHORT)}
                                style={styles.smallButton}
                                textStyle={styles.buttonText}>
                            </RoundedButton>
                            <Text style={styles.text}>{item.date}</Text>
                        </View>
                    )}
                />
            </View>


            <View style={styles.view}>
                <Text style={styles.titulo}>Selecciona un documento para visualizar</Text>
                <Image
                source={require('../../../../assets/sirs.jpg')}
                style={styles.documento}
                />
            </View>

        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    imageBackground: {
        width: '100%',
        height: '110%',
    },

    header: {
        flexDirection: "row",
        paddingVertical: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        top: '2%',
    },

    headerText: {
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
        color: 'white',
        fontSize: 14,
    },

    listItem: {
        backgroundColor: 'white',
        padding: 6, 
        marginVertical: 5,
        borderRadius: 5,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        top: 12,
    },

    text: {
        color: 'black', 
        fontSize: 12,
    },

    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 40,
        top: '17%',
        position: 'absolute',
        width: '95%', 
        height: '35%', 
        alignSelf: 'center', 
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
    },

    smallButton: {
        width: '12%',
        height: '40%',
        marginBottom: '6%',
        alignSelf: 'center',
        top: 10,
    },

    buttonText: {
        fontSize: 9, 
        fontWeight: 'bold', 
    },

    view: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 12,
        top: '60%',
        position: 'absolute',
        width: '95%',
        height: '35%', 
        alignSelf: 'center', 
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
    },

    titulo:{
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },

    documento:{
        alignSelf: 'center',
        alignItems: 'center',
        width: '50%',
        height: '50%',
        top: '12%',
    },

});

export default Checklist;