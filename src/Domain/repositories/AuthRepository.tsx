import { ResponseApiDelivery } from "../../Data/sources/models/ResponseApiDelivery";
import { User, RegisterProyEntities, ChecklistEntities, PerfilEntities } from '../Entities/User';

export interface AuthRepository {
    login(email: string, password: string): Promise<ResponseApiDelivery>;
    register(user: User): Promise<ResponseApiDelivery>;
    RegisterProy(proy: RegisterProyEntities): Promise<ResponseApiDelivery>;
    getChecklists(userEmail?: string): Promise<ResponseApiDelivery>;
    getPerfil(email: string): Promise<ResponseApiDelivery>;
    PerfilEntities(email: string): Promise<PerfilEntities>;
    updatePerfil(perfil: PerfilEntities): Promise<ResponseApiDelivery>;
    deleteUser(email: string): Promise<ResponseApiDelivery>;
}