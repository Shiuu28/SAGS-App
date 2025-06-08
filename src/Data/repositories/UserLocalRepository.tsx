import { User } from '../../Domain/Entities/User';
import { UserLocalRepository } from '../../Domain/repositories/UserLocalRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = "user";

export class UserLocalRepositoryImp implements UserLocalRepository {
    async getUser(): Promise<User | null> {
        try {
          const jsonValue = await AsyncStorage.getItem(KEY);
          if (!jsonValue) return null;
      
          const user: User = JSON.parse(jsonValue);
          return user;
        } catch (error) {
          console.error("Error getting user:", error);
          return null;
        }
      }
      

    async save(user: User): Promise<void> {
        try {

            const { password, ...userData } = user;
            const jsonValue = JSON.stringify(userData);
            await AsyncStorage.setItem(KEY, jsonValue);


            const test = await AsyncStorage.getItem(KEY);
            console.log('User saved successfully:', test); // Verificación
        } catch (error) {
            console.log('Error saving user:', error);
            throw error;
        }
    }

    // Obtener el usuario desde AsyncStorage
    async getItem(): Promise<User | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(KEY);
            if (!jsonValue) {
                console.log("No user found in storage");
            }
            return jsonValue ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.log('Error getting user:', error);
            return null;
        }
    }

    // Eliminar el usuario de AsyncStorage
    async remove(): Promise<void> {
        try {
            await AsyncStorage.removeItem(KEY);

            const test = await AsyncStorage.getItem(KEY);
            console.log('User removed successfully:', test); 
        } catch (error) {
            console.log('Error removing user:', error);
            throw error;
        }
    }
}
