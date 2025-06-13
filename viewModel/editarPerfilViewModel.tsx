import React, { useState, useEffect } from 'react';
import { useUserLocal } from '../src/Hooks/useUserLocal';
import { UpdatePerfilUseCase } from '../src/Domain/useCases/auth/updatePerfilAuth';
import { GetPerfilUseCase } from '../src/Domain/useCases/auth/getPerfilAuth';
import { PerfilEntities } from '../src/Domain/Entities/User';

const useEditarPerfilViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState<PerfilEntities>({
        nombres: '',
        apellidos: '',
        email: '',
        documento: '',
        telefono: '',
        funcion: '',
        proyectos: []
    });
    const { user } = useUserLocal();

    useEffect(() => {
        if (user?.email) {
            loadUserProfile();
        }
    }, [user]);

    const loadUserProfile = async () => {
        try {
            setIsLoading(true);
            const response = await GetPerfilUseCase(user!.email);
            if (response.success && response.user && response.user.length > 0) {
                const userData = response.user[0];
                setValues({
                    nombres: userData.nombres || '',
                    apellidos: userData.apellidos || '',
                    email: userData.email || '',
                    documento: userData.documento || '',
                    telefono: userData.telefono || '',
                    funcion: userData.funcion || '',
                    proyectos: userData.proyectos || []
                });
                setErrorMessage('');
            } else {
                setErrorMessage('No se pudieron cargar los datos del perfil');
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            setErrorMessage('Error al cargar el perfil');
        } finally {
            setIsLoading(false);
        }
    };

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    };

    const updatePerfil = async (profileData?: PerfilEntities): Promise<boolean> => {
        const dataToUpdate = profileData || values;
        
        if (!dataToUpdate.nombres || !dataToUpdate.email || !dataToUpdate.funcion) {
            setErrorMessage('Por favor complete todos los campos obligatorios');
            return false;
        }

        try {
            setIsLoading(true);
            setErrorMessage('');
            
            const response = await UpdatePerfilUseCase(dataToUpdate);
            
            if (response.success) {
                // Actualizar los valores locales con los datos actualizados
                setValues(dataToUpdate);
                setErrorMessage('');
                return true;
            } else {
                setErrorMessage(response.message || 'Error al actualizar el perfil');
                return false;
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setErrorMessage('Error al actualizar el perfil');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const refreshProfile = async (): Promise<void> => {
        await loadUserProfile();
    };

    return {
        ...values,
        onChange,
        updatePerfil,
        refreshProfile,
        errorMessage,
        isLoading
    };
};

export default useEditarPerfilViewModel;