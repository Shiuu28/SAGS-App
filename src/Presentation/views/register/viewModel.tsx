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

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value});
    };

    const register = async () => {
        if (isValidForm()) {
            const response = await RegisterAuthUseCase(values);
            console.log('Result' + JSON.stringify(response));
        }
    }

    const isValidForm = (): boolean => {
       
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
