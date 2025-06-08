import { useState, useEffect } from 'react';
import { PerfilEntities } from '../src/Domain/Entities/User';
import { GetPerfilUseCase } from '../src/Domain/useCases/auth/getPerfilAuth';
import { useUserLocal } from '../src/Hooks/useUserLocal';
import { DeletePerfilUseCase } from '../src/Domain/useCases/auth/deletePerfilAuth';


const usePerfilViewModel = () => {
    const [perfilData, setPerfilData] = useState<PerfilEntities>({
        nombres: '',
        apellidos: '',
        email: '',
        funcion: '',
        proyectos: []
    });
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

            if (response.success && response.user) {
                setPerfilData({
                    nombres: response.user.nombres || '',
                    apellidos: response.user.apellidos || '',
                    email: response.user.email || user.email,
                    funcion: response.user.funcion || '',
                    proyectos: response.user.proyectos || []
                });

            } else {
                setErrorMessage(response.message || 'No se encontraron datos del perfil');
                setPerfilData({
                    nombres: '',
                    apellidos: '',
                    email: user.email || '',
                    funcion: '',
                    proyectos: []
                });
            }
        } catch (error) {
            console.log('Error al obtener perfil:', error);
            setErrorMessage('Error al cargar los datos del perfil');
            setPerfilData({
                nombres: '',
                apellidos: '',
                email: user?.email || '',
                funcion: '',
                proyectos: []
            });
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