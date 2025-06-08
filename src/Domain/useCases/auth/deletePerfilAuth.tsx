import { AuthRepositoryImpl } from '../../../Data/repositories/AuthRepository';

interface DeleteResponse {
    success: boolean;
    message?: string;
}

export const DeletePerfilUseCase = async (email: string): Promise<DeleteResponse> => {
    const repository = new AuthRepositoryImpl();
    try {
        await repository.deleteUser(email);
        return {
            success: true,
            message: 'Usuario eliminado correctamente'
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al eliminar el usuario'
        };
    }
};