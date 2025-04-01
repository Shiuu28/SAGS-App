import React, { useState } from "react"
import { TouchableOpacity, StyleSheet, FlatList, View, Image, Modal, Text } from 'react-native';
import { MyColors } from "../theme/AppTheme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

interface ImageProps {
    onPress: () => void,
}


export const Nav = ({ onPress }: ImageProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const menu = [
        { id: "1", label: "Home", action: () => navigation.navigate('HomeScreen')},
        { id: "2", label: "Perfil", action: () => navigation.navigate("PerfilUsu")},        
        { id: "3", label: "Gestión de Proyectos", action: () => navigation.navigate("Proyectos")},
        { id: "4", label: "Sobre Nosotros", action: () => navigation.navigate("SobreNosotros")}
    ];


    const [modalVisible, setModalVisible] = useState(false);
    const [selectOption, setSelectOption] = useState("Selecciona una opción")

    const handleSelect = (option: { id: string; label: string }) => {
        setSelectOption(option.label);
        setModalVisible(false);
    };


    return (
        <View style={styles.Nav}>
            <TouchableOpacity onPress={() => {
                setModalVisible(true);
            }}>
                <Image
                    source={require('../../assets/menu.png')}
                    style={styles.menu}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.navigate('HomeScreen');
            }}>
                <Image
                    source={require('../../assets/sirs.jpg')}
                    style={styles.logo}
                />
            </TouchableOpacity>



            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={menu}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.option} onPress = {item.action}>
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    );
};


const styles = StyleSheet.create({

    Nav: {
        backgroundColor: MyColors.primary,
        width: '100%',
        height: '12%',
        position: 'absolute',
        top: 0,
        padding: 30,
        flexDirection: 'row',
    },

    menu: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        margin: 'auto',
        left: 315,
        top: 26,
    },

    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        top: 28,
    },

    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
        top: 44,
        left: 88,
    },

    modalContent: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        width: "55%",
        color: 'white',
    },

    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },

    optionText: {
        fontSize: 16,
        color: 'white',
    },

    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: MyColors.primary,
        alignItems: "center",
        borderRadius: 5,
    },

    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default Nav;