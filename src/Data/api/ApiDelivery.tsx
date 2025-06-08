import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ApiDelivery = axios.create({
    baseURL: 'http://10.0.2.2:3000/api/users',
    headers: {
        'Content-Type': 'application/json'
    }
});

ApiDelivery.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export { ApiDelivery };