import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

const authRepository = new AuthRepositoryImpl();

export const LoginAuthUseCase = async (email: string, password: string) => {
  try {
    const response = await authRepository.login(email, password);
    return response;
  } catch (error) {
    // Manejo de errores
    throw error;
  }
};