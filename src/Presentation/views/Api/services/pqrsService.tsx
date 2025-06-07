import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:5000/api/pqrs'; 

export interface PQRS {
    id?: string;
    nombre: string;
    tipo: string;
    descripcion: string;
    correo: string;
    calificacion?: number;
    fecha?: string;
}

export const getAllPQRS = async (): Promise<PQRS[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        if (!response.data) {
            throw new Error('No data received');
        }
        return response.data;
    } catch (error) {
        console.error('Error en getAllPQRS:', error);
        throw error;
    }
};

export const createPQRS = async (pqrsData: PQRS): Promise<PQRS> => {
    try {
        if (!pqrsData.tipo || !pqrsData.descripcion || !pqrsData.correo) {
            throw new Error('Missing required fields');
        }
        const response = await axios.post(`${API_BASE_URL}/pqrs`, pqrsData);
        return response.data;
    } catch (error) {
        console.error('Error al crear PQRS:', error);
        throw error;
    }
};

export const updatePQRS = async (id: number, pqrsData: PQRS): Promise<PQRS> => {
    try {
        if (!id) {
            throw new Error('ID is required for update');
        }
        const response = await axios.put(`${API_BASE_URL}/pqrs/${id}`, pqrsData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar PQRS:', error);
        throw error;
    }
};

export const deletePQRS = async (id: number): Promise<void> => {
    try {
        if (!id) {
            throw new Error('ID is required for deletion');
        }
        await axios.delete(`${API_BASE_URL}/pqrs/${id}`);
    } catch (error) {
        console.error('Error al eliminar PQRS:', error);
        throw error;
    }
};
