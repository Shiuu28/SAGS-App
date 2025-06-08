import { useEffect, useState } from 'react'
import { GetUserLocalUseCase } from '../Domain/useCases/userLocal/GetUserLocal';
import { User } from '../Domain/Entities/User';


export const useUserLocal = () => {

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => { //Obtiene el usuario de la sesion  
        getUserSession();
    }, []);


    const getUserSession = async () => {
        const user = await GetUserLocalUseCase();
        setUser(user);
    }


    return {
        user,
        getUserSession
    };

}

