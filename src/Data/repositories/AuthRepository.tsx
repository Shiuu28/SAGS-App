import { AxiosError } from "axios";
import { RegisterProyEntities, User } from "../../Domain/Entities/User";
import { AuthRepository } from '../../Domain/repositories/AuthRepository';
import { ApiDelivery } from "../api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { PerfilEntities } from "../../Domain/Entities/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

      const {token, user} = response.data;
      if (token) {
        await AsyncStorage.setItem('token', token);
      } else {
        throw new Error('Token no recibido del servidor');
      }
      

      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      console.log('Error en login:', JSON.stringify(e.response?.data));
      const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
      return apiError;
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

  async getChecklists(userEmail?: string | undefined): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.get<ResponseApiDelivery>('/check');
      return {
        success: true,
        message: response.data.message || "Checklists obtenidos exitosamente",
        user: response.data.user
      };
    } catch (error) {
      const e = error as AxiosError;
      const errorData = e.response?.data as { message?: string } || {};
      return {
        success: false,
        message: errorData.message || "Error al obtener checklists",
        error: e.response?.data
      };
    }
  }

  async updateChecklistItem(itemId: string, completed: boolean, userEmail: string): Promise<ResponseApiDelivery> {
    try {
        const currentList = await AsyncStorage.getItem(`checklist_${userEmail}`);
        const checklistData = currentList ? JSON.parse(currentList) : [];
        
        const updatedList = checklistData.map((item: any) => 
            item.id === itemId ? { ...item, completed } : item
        );
        
        await AsyncStorage.setItem(`checklist_${userEmail}`, JSON.stringify(updatedList));

        return {
            success: true,
            message: "Elemento actualizado exitosamente",
            user: updatedList
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al actualizar el elemento',
            error
        };
    }
  }

  async getDocument(nombreArchivo: string): Promise<Blob> {
    try {
      const response = await ApiDelivery.get(`/documents/${nombreArchivo}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      throw new Error((e.response?.data as { message?: string })?.message || "Error al obtener documento");
    }
  }

  async getPerfil(email: string): Promise<ResponseApiDelivery> {
    try {
      const response = await ApiDelivery.get<ResponseApiDelivery>(`/perfil?email=${email}`);
      return response.data;
    } catch (error) {
        console.log('Error en PerfilRepository:', error);
        return {
            success: false,
            message: 'Error al obtener datos del perfil',
            user: null
        };
    }
  }

  async PerfilEntities(email: string): Promise<PerfilEntities> {
    try {
      const response = await this.getPerfil(email);
      if (response.success && response.user && response.user.length > 0) {
        return response.user[0] as PerfilEntities;
      }
      throw new Error(response.message || 'Error al obtener perfil');
    } catch (error) {
      throw new Error('Error al obtener datos del perfil');
    }
  }

  async updatePerfil(perfil: PerfilEntities): Promise<ResponseApiDelivery> {
      try {
          const response = await ApiDelivery.put<ResponseApiDelivery>('/updatePerfil', perfil);
          return response.data;
      } catch (error) {
          const e = error as AxiosError;
          return {
              success: false,
              message: 'Error al actualizar el perfil',
              user: null
          };
      }
  }

  async deleteUser(email: string): Promise<ResponseApiDelivery> {
      try {
          const response = await ApiDelivery.delete<ResponseApiDelivery>(`/deleteUser/${email}`);
          return response.data;
      } catch (error) {
          const e = error as AxiosError;
          return {
              success: false,
              message: 'Error al eliminar el usuario',
              user: null
          };
      }
  }
}
