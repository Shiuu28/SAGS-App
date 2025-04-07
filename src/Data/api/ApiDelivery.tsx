import axios from "axios";

const ApiDelivery = axios.create({
    baseURL: 'http://192.168.1.44:3000/api',
    headers:{
        'Content-Type': 'aplication/json'
    }
});

export {ApiDelivery};