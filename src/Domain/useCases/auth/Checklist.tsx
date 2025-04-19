import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";
import { ChecklistEntities } from "../../Entities/User";


const authRepo = new AuthRepositoryImpl();

export const ChecklistAuthUseCase = async (check: ChecklistEntities) => {
  return await authRepo.getChecklists();
}  