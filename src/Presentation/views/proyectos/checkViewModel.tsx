import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";
import { useUserLocal } from '../../hooks/useUserLocal';

export class GetChecklistsUseCase {
  constructor(private repository: AuthRepositoryImpl) { }

  async execute(userEmail?: string): Promise<{
    success: boolean;
    user?: any[];
    message?: string;
    error?: any;
  }> {
    try {
      const response = await this.repository.getChecklists();
      
      if (userEmail && response.success && response.user) {
        // Filtrar los checklists por el email del usuario
        const userChecklists = response.user.filter((checklist: { userEmail: string; }) => 
          checklist.userEmail === userEmail
        );
        
        return {
          success: true,
          user: userChecklists,
          message: userChecklists.length ? 'Checklists encontrados' : 'No hay checklists para este usuario'
        };
      }

      return {
        success: response.success,
        user: response.user,
        message: response.message
      };
    } catch (error) {
      return {
        success: false,
        message: "Error al obtener checklists",
        error
      };
    }
  }
}

export const useChecklistViewModel = () => {
  const { user } = useUserLocal();
  const authRepository = new AuthRepositoryImpl();
  const getChecklistsUseCase = new GetChecklistsUseCase(authRepository);
  const documentUseCase = new GetDocumentUseCase(authRepository);

  const getUserChecklists = async () => {
    if (!user?.email) {
      return {
        success: false,
        message: 'No hay usuario logueado',
        user: []
      };
    }
    return await getChecklistsUseCase.execute(user.email);
  };

  const getDocument = async (nombreArchivo: string): Promise<Blob> => {
    return await documentUseCase.execute(nombreArchivo);
  };

  return {
    getUserChecklists,
    getDocument
  };
};

export class GetDocumentUseCase {
  constructor(private repository: AuthRepositoryImpl) { }

  async execute(nombreArchivo: string): Promise<Blob> {
    return this.repository.getDocument(nombreArchivo);
  }
}

