import React from "react"
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { MyColors } from "../theme/AppTheme";


interface Props {
    text: string;
    onPress: () => void,
    style?: ViewStyle;
    textStyle: TextStyle;
}


export const RoundedButton: React.FC<Props> = ({text, onPress, style, textStyle}) => {

    return (
        <TouchableOpacity
            style={[styles.RoundedButton, style]}
            onPress={() => onPress()}>

            <Text style={[styles.textButton,textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    RoundedButton: {
        width: '100%',
        height: 50,
        backgroundColor: MyColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },

    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'serif',
    }

}); 