import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalStorage = () => {

    const save = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
            console.log(`Item saved with key: ${key}`);
        } catch (error) {
            console.log('Error in Local Storage: ' + error);
        }
    }

    const getItem = async (key: string) => {
        try {
            const item = await AsyncStorage.getItem(key);
            return item;
        } catch (error) {
            console.log('Error in Local Storage: ' + error);
        }
    }

    const remove = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
            console.log(`Item removed with key: ${key}`);
        } catch (error) {
            console.log('Error in Local Storage: ' + error);
        }
    }

    return {
        save,
        getItem,
        remove
    }
}
