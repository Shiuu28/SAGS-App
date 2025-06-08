import { AuthRepositoryImpl } from '../../../Data/repositories/AuthRepository';
import { PerfilEntities } from '../../Entities/User';

const authRepository = new AuthRepositoryImpl();

export const UpdatePerfilUseCase = async (perfil: PerfilEntities) => {
    return await authRepository.updatePerfil(perfil);
}