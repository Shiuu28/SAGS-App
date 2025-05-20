import { ChecklistEntities } from "../Entities/User";
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { ApiDelivery } from "../../Data/api/ApiDelivery";

export interface ChecklistRepository {
    getChecklist(email: string): Promise<ChecklistEntities[]>;
    updateChecklistItem(itemId: string, completed: boolean, userEmail: string): Promise<ResponseApiDelivery>;
}

export class ChecklistRepositoryImpl implements ChecklistRepository {
    async getChecklist(email: string): Promise<ChecklistEntities[]> {
        try {
            const response = await ApiDelivery.get<ResponseApiDelivery>(`/checklist/${email}`);
            return response.data.user || [];
        } catch (error) {
            throw new Error('Error al obtener checklist');
        }
    }

    async updateChecklistItem(itemId: string, completed: boolean, userEmail: string): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.put(`/checklist/update`, {
                itemId,
                completed,
                userEmail
            });
            
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: 'Error al actualizar el elemento',
                error
            };
        }
    }
}