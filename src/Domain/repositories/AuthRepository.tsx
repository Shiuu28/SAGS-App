import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User, RegisterProyEntities, ChecklistEntities } from '../Entities/User';

export interface AuthRepository {
    login(email: string, password: string): Promise<ResponseApiDelivery>;
    register(user: User): Promise<ResponseApiDelivery>;
    RegisterProy(proy: RegisterProyEntities): Promise<ResponseApiDelivery>;
    getChecklists(check: ChecklistEntities): Promise<ResponseApiDelivery>;
}