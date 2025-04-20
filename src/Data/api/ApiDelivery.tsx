import axios from "axios";

const ApiDelivery = axios.create({
    baseURL: 'http://10.0.2.2:3000/api/users',
    headers:{
        'Content-Type': 'application/json'
    }
});

export {ApiDelivery};