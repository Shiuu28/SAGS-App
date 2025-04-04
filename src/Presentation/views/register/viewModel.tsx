import { useState } from "react";
import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth";


const useRegisterViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        tipodoc: '',
        documento: '',
        email: '',
        password: ''
    });

    const onChange = (key: string, value: string) => {
        setValues(prevState => ({
            ...prevState,
            [key]: value
        }));
        console.log(`Campo actualizado: ${key} -> ${value}`);
    }

    const register = async () => {
        if (!isValidForm()) return;
        
        try {
            console.log('Enviando datos:', values); // Verifica qué se está enviando
            const response = await RegisterAuthUseCase(values);
            console.log('Resultado:', response);
        } catch (error) {
            console.error('Error en el registro:', error);
            setErrorMessage('Error al conectar con el servidor');
        }
    }

    const isValidForm = (): boolean => {
       
        if (values.tipodoc === ' ') {
            setErrorMessage('El tipo de documento es requerido');
            return false;
        }
        if (values.documento === ' ') {
            setErrorMessage('El documento es requerido');
            return false;
        }
        if (values.email === ' ') {
            setErrorMessage('El correo es requerido');
            return false;
        }
        if (values.password === ' ') {
            setErrorMessage('La contraseña es requerida');
            return false;
        }
       
        return true;
    }

    return {
        ...values,
        onChange,
        register,
        errorMessage
    }
}

export default useRegisterViewModel;
