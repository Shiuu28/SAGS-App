import React, { useState, useEffect } from 'react';
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
        documento: '',
        telefono: '',
        proyectos: []
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { user } = useUserLocal();

    const getPerfilInfo = async () => {
        try {
            setLoading(true);
            setErrorMessage(null);

            if (!user?.email) {
                console.log('No hay usuario logueado:', user);
                setErrorMessage('No hay usuario logueado');
                return;
            }

            console.log('Obteniendo perfil para email:', user.email);
            const response = await GetPerfilUseCase(user.email);
            console.log('Respuesta completa del perfil:', JSON.stringify(response, null, 2));

            if (response.success && response.user) {
                // Verificar si response.user es un array o un objeto
                const userData = Array.isArray(response.user) ? response.user[0] : response.user;
                
                setPerfilData({
                    nombres: userData.nombres || '',
                    apellidos: userData.apellidos || '',
                    email: userData.email || user.email,
                    funcion: userData.funcion || '',
                    documento: userData.documento || '',
                    telefono: userData.telefono || '',
                    proyectos: userData.proyectos || []
                });
                setErrorMessage(null);
            } else {
                console.log('Error en respuesta:', response.message);
                setErrorMessage(response.message || 'No se encontraron datos del perfil');
                // Mantener al menos el email del usuario local
                setPerfilData({
                    nombres: '',
                    apellidos: '',
                    email: user.email || '',
                    funcion: '',
                    documento: '',
                    telefono: '',
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
                documento: '',
                telefono: '',
                proyectos: []
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Usuario en useEffect:', user);
        if (user?.email) {
            getPerfilInfo();
        } else {
            console.log('No hay email de usuario disponible');
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
        setPerfilData,
        errorMessage,
        loading,
        getPerfilInfo,
        eliminarUsuario
    };
};

export default usePerfilViewModel;