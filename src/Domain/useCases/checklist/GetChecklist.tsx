import { ChecklistRepository, ChecklistRepositoryImpl } from "../../repositories/ChecklistRepository";
import { ChecklistEntities } from "../../Entities/User";

interface ChecklistResponse {
    success: boolean;
    message?: string;
    checklist?: ChecklistEntities[];
}

export class GetChecklistUseCase {
    constructor(private repository: ChecklistRepository) {}

    async execute(email: string): Promise<ChecklistResponse> {
        try {
            const checklist = await this.repository.getChecklist(email);
            return {
                success: true,
                checklist
            };
        } catch (error) {
            return {
                success: false,
                message: 'Error al obtener la lista de verificación'
            };
        }
    }
}