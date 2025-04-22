import { useState, useEffect } from 'react';
import { PerfilEntities } from '../../../Domain/Entities/User';
import { GetPerfilUseCase } from '../../../Domain/useCases/auth/GetPerfil';
import { useUserLocal } from '../../hooks/useUserLocal';

const usePerfilViewModel = () => {
    const [perfilData, setPerfilData] = useState<PerfilEntities | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { user } = useUserLocal();


    const getPerfilInfo = async () => {
        try {
            setLoading(true);
            setErrorMessage('');

            if (!user?.email) {
                setErrorMessage('No hay usuario logueado');
                return;
            }

            const response = await GetPerfilUseCase(user.email);
            console.log('Respuesta perfil:', response);

            if (response.success && response.user && response.user.length > 0) {
                setPerfilData(response.user);
            } else {
                setErrorMessage(response.message || 'No se encontraron datos del perfil');
            }
        } catch (error) {
            console.log('Error al obtener perfil:', error);
            setErrorMessage('Error al cargar los datos del perfil');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            getPerfilInfo();
        }
    }, [user]);

    const eliminarUsuario = async () => {
        try {
            if (!user?.email) {
                setErrorMessage('No hay usuario logueado');
                return;
            }
            
            const response = await GetPerfilUseCase(user.email);
            if (!response.success) {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage('Error al eliminar el usuario');
        }
    };

    return {
        perfilData,
        errorMessage,
        loading,
        getPerfilInfo,
        eliminarUsuario
    };
};

export default usePerfilViewModel;