import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

const perfilRepository = new AuthRepositoryImpl();

export const GetPerfilUseCase = async (email: string) => {
    return await perfilRepository.getPerfil(email);
}