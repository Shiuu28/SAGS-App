import { useState, useEffect } from 'react';
import { useUserLocal } from '../../hooks/useUserLocal';
import { UpdatePerfilUseCase } from '../../../Domain/useCases/auth/UpdatePerfil';
import { GetPerfilUseCase } from '../../../Domain/useCases/auth/GetPerfil';
import { PerfilEntities } from '../../../Domain/Entities/User';

const useEditarPerfilViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState<PerfilEntities>({
        nombres: '',
        email: '',
        funcion: '',
        nombre_proyecto: '',
        descripcion_proyecto: ''
    });
    const { user } = useUserLocal();

    useEffect(() => {
        if (user?.email) {
            loadUserProfile();
        }
    }, [user]);

    const loadUserProfile = async () => {
        try {
            const response = await GetPerfilUseCase(user!.email);
            if (response.success && response.user && response.user.length > 0) {
                const userData = response.user[0];
                setValues({
                    nombres: userData.nombres || '',
                    email: userData.email || '',
                    funcion: userData.funcion || '',
                    nombre_proyecto: userData.nombre_proyecto || '',
                    descripcion_proyecto: userData.descripcion_proyecto || ''
                });
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            setErrorMessage('Error al cargar el perfil');
        }
    };

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    };

    const updatePerfil = async () => {
        if (!values.nombres || !values.email || !values.funcion) {
            setErrorMessage('Por favor complete todos los campos');
            return;
        }

        try {
            const response = await UpdatePerfilUseCase(values);
            if (!response.success) {
                setErrorMessage(response.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setErrorMessage('Error al actualizar el perfil');
        }
    };

    return {
        ...values,
        onChange,
        updatePerfil,
        errorMessage
    };
};

export default useEditarPerfilViewModel;