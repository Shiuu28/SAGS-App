import { useState } from "react";
import { RegisterAuthUseCase } from "../src/Domain/useCases/auth/registerAuth";
import { Alert } from "react-native";


const useRegisterViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        tipodoc: '',
        documento: '',
        email: '',
        password: ''
    });

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    };

    const register = async () => {
        if (isValidForm()) {
            const response = await RegisterAuthUseCase(values);
            console.log('Result' + JSON.stringify(response));
            if (response.success){
                Alert.alert('¡Usuario registrado exitosamente!')
            }
            return response;
        }
        return null;
    }

    const isValidForm = (): boolean => {
        if (!values.documento && !values.email && !values.password && !values.tipodoc) {
            setErrorMessage('Debe completar todos los campos');
            return false;
        }
        if (values.tipodoc === '') {
            setErrorMessage('El tipo de documento es requerido');
            return false;
        }
        if (values.documento === '') {
            setErrorMessage('El documento es requerido');
            return false;
        }
        if (values.email === '') {
            setErrorMessage('El correo es requerido');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('La contraseña es requerida');
            return false;
        }

        return true;
    }

    return {
        ...values,
        onChange,
        register,
        errorMessage,
        setErrorMessage
    };
};

export default useRegisterViewModel;
