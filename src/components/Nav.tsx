import React from "react"
import { TouchableOpacity, StyleSheet, Touchable, View, Image } from 'react-native';
import { MyColors } from "../theme/AppTheme";


interface ImageProps {
    onPress: () => void,
}


export const Nav = ({ onPress }: ImageProps) => {

    return (
        <View style={styles.Nav}>
            <TouchableOpacity onPress={onPress}>
                <Image
                    source={require('../../assets/sirs.jpg')}
                    style={styles.logo}
                />
                <Image
                    source={require('../../assets/menu.png')}
                    style={styles.menu}
                />
            </TouchableOpacity>
        </View>
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
        width: 22,
        height: 22,
        resizeMode: 'contain',
        margin: 'auto',
        left: 320,
    },

    logo:{
        width: 40,
        height: 40,
        resizeMode: 'contain',
        top: 28,
    }
}); 