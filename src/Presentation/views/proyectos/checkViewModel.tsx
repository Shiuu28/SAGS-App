import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";


export class GetChecklistsUseCase {

  constructor(private repository: AuthRepositoryImpl) { }

  async execute(): Promise<{
    success: boolean;
    user?: any[];
    message?: string;
    error?: any;
  }> {
    try {
      const response = await this.repository.getChecklists();
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

export class GetDocumentUseCase {
  constructor(private repository: AuthRepositoryImpl) { }

  async execute(nombreArchivo: string): Promise<Blob> {
    return this.repository.getDocument(nombreArchivo);
  }
}

