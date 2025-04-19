import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";
import { ChecklistEntities } from '../../../Domain/Entities/User';


// Caso de uso para obtener los checklists
export class GetChecklistsUseCase {

  // Caso de uso para obtener los checklists
  constructor(private repository: AuthRepositoryImpl) { }

  async execute(): Promise<{
    success: boolean;
    data?: any[];
    message?: string;
    error?: any;
  }> {
    try {
      const response = await this.repository.getChecklists();
      return {
        success: response.success,
        data: response.data,
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

export class GetDocumentUseCase {
  constructor(private repository: AuthRepositoryImpl) { }

  async execute(nombreArchivo: string): Promise<Blob> {
    return this.repository.getDocument(nombreArchivo);
  }
}

