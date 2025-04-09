import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacityProps } from "react-native";
import { MyColors } from "../theme/AppTheme";

interface Props extends TouchableOpacityProps {
    text: string;
    onPress: () => void;
    children?: React.ReactNode;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'primary' | 'secondary' | 'outline';
}

export const RoundedButton: React.FC<Props> = ({
    text, 
    onPress, 
    style, 
    textStyle,
    children,
    variant = 'primary',
    ...props
}) => {
    const getButtonStyle = () => {
        switch(variant) {
            case 'secondary':
                return styles.secondaryButton;
            case 'outline':
                return styles.outlineButton;
            default:
                return styles.primaryButton;
        }
    };

    const getTextStyle = () => {
        switch(variant) {
            case 'secondary':
                return styles.secondaryText;
            case 'outline':
                return styles.outlineText;
            default:
                return styles.primaryText;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.baseButton, getButtonStyle(), style]}
            onPress={onPress}
            activeOpacity={0.8}
            {...props}
        >
            {children}
            <Text style={[getTextStyle(), textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    baseButton: {
        width: '100%',
        minHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 24,
        flexDirection: 'row',
    },
    primaryButton: {
        backgroundColor: MyColors.primary,
    },
    secondaryButton: {
        backgroundColor: MyColors.secondary,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: MyColors.primary,
    },
    primaryText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    outlineText: {
        color: MyColors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
});