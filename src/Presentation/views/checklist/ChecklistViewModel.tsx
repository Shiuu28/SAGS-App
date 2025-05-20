import { useState, useContext } from 'react';
import { AuthContext } from '../../../Domain/useCases/auth/AuthContext';
import { GetChecklistUseCase } from '../../../Domain/useCases/checklist/GetChecklist';
import { ChecklistRepositoryImpl } from '../../../Domain/repositories/ChecklistRepository';
import { ChecklistEntities } from '../../../Domain/Entities/User';

const useChecklistViewModel = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [checklistItems, setChecklistItems] = useState<ChecklistEntities[]>([]);

    const repository = new ChecklistRepositoryImpl();
    const checklistUseCase = new GetChecklistUseCase(repository);

    const checkAuthStatus = () => {
        return user !== null && user.email !== undefined;
    };

    const getChecklist = async () => {
        try {
            setLoading(true);
            setErrorMessage('');
            if (!user?.email) {
                setErrorMessage('Usuario no autenticado');
                return;
            }
            const response = await checklistUseCase.execute(user.email);
            if (response.success && response.checklist) {
                setChecklistItems(response.checklist);
            } else {
                setErrorMessage(response.message || 'Error al cargar la lista');
            }
        } catch (error) {
            console.error('Error en getChecklist:', error);
            setErrorMessage('Error al obtener la lista de verificación');
        } finally {
            setLoading(false);
        }
    };

    const updateChecklistItem = async (itemId: string, completed: boolean) => {
        try {
            setLoading(true);
            setErrorMessage('');
            if (!user?.email) {
                setErrorMessage('Usuario no autenticado');
                return;
            }
            
            const response = await repository.updateChecklistItem(itemId, completed, user.email);
            
            if (!response.success) {
                setErrorMessage('Error al actualizar el elemento');
                return;
            }
            
            await getChecklist();
        } catch (error) {
            console.error('Error en updateChecklistItem:', error);
            setErrorMessage('Error al actualizar el elemento');
        } finally {
            setLoading(false);
        }
    };

    return {
        checkAuthStatus,
        loading,
        errorMessage,
        checklistItems,
        getChecklist,
        updateChecklistItem
    };
};

export default useChecklistViewModel;