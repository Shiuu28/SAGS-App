import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";
import { RegisterProyEntities } from '../../Entities/User';

const {RegisterProy} = new AuthRepositoryImpl();

export const RegisterProyAuthUseCase = async (Proy: RegisterProyEntities) => {
    return await RegisterProy(Proy);
}