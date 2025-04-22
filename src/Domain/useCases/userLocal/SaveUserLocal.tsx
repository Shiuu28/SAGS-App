import { UserLocalRepositoryImp } from "../../../Data/repositories/UserLocalRepository";
import { User } from '../../Entities/User';

const userLocalRepository = new UserLocalRepositoryImp();

export const SaveUserLocalUseCase = async (user: User) => {
    if (!user || !user.email) {
        throw new Error('Datos de usuario inválidos');
    }
    return await userLocalRepository.save(user);
}