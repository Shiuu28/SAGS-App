import { UserLocalRepositoryImp } from "../../../Data/repositories/UserLocalRepository";


const {remove} = new UserLocalRepositoryImp();

export const RemoveUserLocalUseCase = async () => {
    return await remove();
}