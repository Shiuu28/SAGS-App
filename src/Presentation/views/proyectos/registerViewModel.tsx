import { useState } from "react";
import { RegisterProyAuthUseCase } from "../../../Domain/useCases/auth/RegisterProy";
import { Alert } from "react-native";


const useRegisterProyViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        nombre: '',
        descripcion: '',
        tipo: '',
        fechaI: ''
    });

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value});
    };

    const RegisterProy = async () => {
        
        if (isValidForm()) {
            try {
                const result = await RegisterProyAuthUseCase(values);
    
                if (result.success) {
                    Alert.alert('Proyecto registrado exitosamente');
                }
            } catch (error: any) {
                console.error('Error en el registro:', error.message || error.error);
            }
        }
    }

    const isValidForm = (): boolean => {
        console.log('Datos que se enviarán al servidor:', values);
        if (values.nombre === '') {
            setErrorMessage('El nombre de proyecto es requerido');
            return false;
        }
        if (values.descripcion === '') {
            setErrorMessage('La descripción del proyecto es requerida');
            return false;
        }
        if (values.tipo === '') {
            setErrorMessage('Debe seleccionar el tipo de proyecto');
            return false;
        }
        if (values.fechaI === '') {
            setErrorMessage('Debe seleccionar la fecha');
            return false;
        }
        
       
        return true;
    }

    return {
        ...values,
        onChange,
        RegisterProy,
        errorMessage, 
        setErrorMessage
    };
};

export default useRegisterProyViewModel;
