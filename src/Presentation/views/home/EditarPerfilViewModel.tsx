import { useState } from 'react';
import { UpdatePerfilUseCase } from '../../../Domain/useCases/auth/UpdatePerfil';
import { useUserLocal } from '../../hooks/useUserLocal';

const useEditarPerfilViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [nombres, setNombres] = useState('');
    const [email, setEmail] = useState('');
    const [funcion, setFuncion] = useState('');
    const { user } = useUserLocal();

    const onChange = (property: string, value: any) => {
        switch(property) {
            case 'nombres':
                setNombres(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'funcion':
                setFuncion(value);
                break;
        }
    }

    const updatePerfil = async () => {
        if (isValidForm()) {
            const response = await UpdatePerfilUseCase({
                nombres,
                email,
                funcion,
                nombre_proyecto: '',
                descripcion_proyecto: ''
            });
            if (!response.success) {
                setErrorMessage(response.message);
            }
        }
    }

    const isValidForm = (): boolean => {
        if (nombres === '') {
            setErrorMessage('Ingresa tu nombre');
            return false;
        }
        if (email === '') {
            setErrorMessage('Ingresa tu email');
            return false;
        }
        if (funcion === '') {
            setErrorMessage('Ingresa tu función');
            return false;
        }
        return true;
    }

    return {
        nombres,
        email,
        funcion,
        onChange,
        updatePerfil,
        errorMessage
    }
}

export default useEditarPerfilViewModel;