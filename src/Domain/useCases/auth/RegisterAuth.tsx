import { AuthRepositoryImpl } from '../../../Data/repositories/AuthRepository';
import { User } from "../../Entities/User";

export const RegisterAuthUseCase = (authRepo: AuthRepositoryImpl) => async (user: User) => {
    return authRepo.register(user);
};