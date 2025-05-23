import { useState, useEffect } from 'react';
import { PerfilEntities } from '../../../Domain/Entities/User';
import { GetPerfilUseCase } from '../../../Domain/useCases/auth/GetPerfil';
import { useUserLocal } from '../../hooks/useUserLocal';
import { DeletePerfilUseCase } from '../../../Domain/useCases/auth/DeletePerfil';

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
                setPerfilData(response.user[0]);
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
            setLoading(true);
            if (!user?.email) {
                setErrorMessage('No hay usuario logueado');
                return false;
            }
            
            const response = await DeletePerfilUseCase(user.email);
            if (response && response.success) {
                return true;
            }
            setErrorMessage(response?.message || 'Error al eliminar el usuario');
            return false;
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            setErrorMessage('Error al eliminar el usuario');
            return false;
        } finally {
            setLoading(false);
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