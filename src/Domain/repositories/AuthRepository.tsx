import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import {User} from "../Entities/User";

export interface AuthRepository {
    login(email: string, password: string): Promise<ResponseApiDelivery>;
    register(user: User): Promise<ResponseApiDelivery>;
}