import { useEffect, useState } from 'react'
import { LoginAuthUseCase } from '../../../Domain/useCases/auth/Login.Auth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { UserLocalRepositoryImp } from '../../../Data/repositories/UserLocalRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useHomeViewModel = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const {user, getUserSession} = useUserLocal();
    console.log('Usuario: ' + JSON.stringify(user));

    useEffect(() => {
        getUserSession();
    },[]);

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const login = async () => {
        if (isValidForm()) {
            try {
                const userRepo = new UserLocalRepositoryImp();
                await userRepo.remove();
                
                const response = await LoginAuthUseCase(values.email, values.password);
                console.log('Respuesta login:', JSON.stringify(response));

                // Handle server error response
                if ('error' in response) {
                    setErrorMessage(response.error);
                    return;
                }

                // Handle successful login
                if (response.success && response.user) {
                    try {
                        await AsyncStorage.removeItem('user');

                        await userRepo.save(response.user);
                        await getUserSession();
                        console.log('Usuario guardado:', response.user);

                        if (response.user) {
                            await getUserSession();
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Proyectos' }],
                            });
                        } else {
                            throw new Error('Error al guardar la sesión');
                        }
                    } catch (saveError) {
                        console.log('Error guardando usuario:', saveError);
                        setErrorMessage('Error al guardar la sesión del usuario');
                    }
                } else {
                    setErrorMessage('Credenciales inválidas');
                }
                
            } catch (error: any) {
                console.log('Error en login:', error?.message || error);
                setErrorMessage('Error de conexión con el servidor');
            }
        }
    };

    // También podemos agregar un método de logout
    const logout = async () => {
        try {
            // Antes de hacer logout, verificamos el estado del usuario
            const userBefore = await AsyncStorage.getItem('user');
            console.log('Antes del logout, user en AsyncStorage:', userBefore);
    
            // Limpiar el usuario de AsyncStorage
            await new UserLocalRepositoryImp().remove();
    
            // Verificamos después de eliminar si realmente se eliminó
            const userAfter = await AsyncStorage.getItem('user');
            console.log('Después del logout, user en AsyncStorage:', userAfter);
    
            setValues({ email: '', password: '' }); 
            setErrorMessage(''); 
    
            // Actualizamos la sesión
            await getUserSession();
    
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }]
            });
        } catch (error) {
            console.log('Error en logout:', error);
        }
    };
    
    function setUser(arg0: null) {
        throw new Error('Function not implemented.');
    }
    
    const isValidForm = () => {
        if(!values.email && !values.password){
            setErrorMessage('Debe completar todos los campos');
            return false;
        }
        if (values.email === '') {
            setErrorMessage('El email es requerido');
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
        user,
        onChange,
        login,
        logout,
        errorMessage
    };
};


export default useHomeViewModel;

