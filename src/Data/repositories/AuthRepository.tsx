import { AxiosError } from "axios";
import { RegisterProyEntities, User } from "../../Domain/Entities/User";
import { AuthRepository } from '../../Domain/repositories/AuthRepository';
import { ApiDelivery } from "../api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";

export class AuthRepositoryImpl implements AuthRepository {
  async register(user: User): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.post<ResponseApiDelivery>('/createUser', {
        email: user.email,
        tipodoc: user.tipodoc,
        documento: user.documento,
        password: user.password
      });

      return Promise.resolve(response.data);
    } catch (error) {
      const e = error as AxiosError;
      const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }


  async login(email: string, password: string): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.post<ResponseApiDelivery>('/login', {
        email: email,
        password: password,
      });

      return Promise.resolve(response.data);

    } catch (error) {
      let e = (error as AxiosError);
      console.log('error' + JSON.stringify(e.response?.data));
      const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }

  async RegisterProy(proy: RegisterProyEntities): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.post<ResponseApiDelivery>('/newProject', {
        nombre: proy.nombre,
        descripcion: proy.descripcion,
        tipo: proy.tipo,
        fechaI: proy.fechaI,
      });
  
      return Promise.resolve(response.data);
    } catch (error) {
      const e = error as AxiosError;
      const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
      throw apiError;
    }
  }
}