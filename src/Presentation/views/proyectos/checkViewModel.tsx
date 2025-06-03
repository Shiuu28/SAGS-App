import { useState } from 'react';
import { AuthRepositoryImpl } from '../../../Data/repositories/AuthRepository';
import { useUserLocal } from '../../hooks/useUserLocal';

// Tipos
export interface ChecklistItem {
  idmod: number | string;
  nombre: string;
  descripcion: string;
  progreso: number;
  archivo: string;
  fecha: string;
  userEmail: string;
  checked?: boolean;
}

export interface DocumentPreview {
  title: string;
  path: string;
}

export interface ChecklistResponse {
  success: boolean;
  user?: ChecklistItem[];
  message?: string;
  error?: unknown;
}

// Casos de uso
class GetChecklistsUseCase {
  constructor(private repository: AuthRepositoryImpl) {}

  async execute(userEmail?: string): Promise<ChecklistResponse> {
    try {
      const response = await this.repository.getChecklists(userEmail);
      
      return {
        success: response.success,
        user: response.user,
        message: response.message
      };
    } catch (error) {
      console.error('GetChecklistsUseCase error:', error);
      return {
        success: false,
        message: "Error al obtener checklists",
        error
      };
    }
  }
}

class GetDocumentUseCase {
  constructor(private repository: AuthRepositoryImpl) {}

  async execute(nombreArchivo: string): Promise<Blob> {
    try {
      return await this.repository.getDocument(nombreArchivo);
    } catch (error) {
      console.error('GetDocumentUseCase error:', error);
      throw new Error('Error al obtener el documento');
    }
  }
}

// ViewModel
export const useChecklistViewModel = () => {
  const { user } = useUserLocal();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checklists, setChecklists] = useState<ChecklistItem[]>([]);
  const [documentPreview, setDocumentPreview] = useState<DocumentPreview | null>(null);
  
  const authRepository = new AuthRepositoryImpl();
  const getChecklistsUC = new GetChecklistsUseCase(authRepository);
  const getDocumentUC = new GetDocumentUseCase(authRepository);

   const getUserChecklists = async (): Promise<ChecklistResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getChecklistsUC.execute(user?.email);
      
      if (result.success && result.user) {
        const formattedChecklists = result.user.map(item => ({
          ...item,
          idmod: item.idmod?.toString() || '0',
          nombre: item.nombre || `Documento ${item.idmod || '0'}`,
          descripcion: item.descripcion || 'Sin descripción',
          checked: false,
          // Asegurar que todos los campos requeridos tengan valor
          progreso: item.progreso || 0,
          archivo: item.archivo || '',
          fecha: item.fecha || 'N/A',
          userEmail: item.userEmail || user?.email || ''
        }));
        
        setChecklists(formattedChecklists);
        
        return {
          success: true,
          user: formattedChecklists,
          message: result.message
        };
      }
      
      setError(result.message || 'Error al cargar checklists');
      return result;
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión');
      return {
        success: false,
        message: 'Error de conexión',
        error: err
      };
    } finally {
      setLoading(false);
    }
  };

  const getDocument = async (fileName: string): Promise<Blob> => {
    if (!fileName) {
      throw new Error('Nombre de archivo no válido');
    }

    setLoading(true);
    setError(null);
    
    try {
      return await getDocumentUC.execute(fileName);
    } catch (err) {
      setError('No se pudo abrir el documento');
      console.error('getDocument error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearDocumentPreview = () => {
    if (documentPreview) {
      URL.revokeObjectURL(documentPreview.path);
      setDocumentPreview(null);
    }
  };

  return {
    loading,
    error,
    checklists,
    setChecklists,
    documentPreview,
    getUserChecklists,
    getDocument,
    clearDocumentPreview
  };
};