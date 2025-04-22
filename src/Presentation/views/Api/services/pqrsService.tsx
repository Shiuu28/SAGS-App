// src/services/pqrsService.ts

import axios from 'axios';

// URL base de tu backend
const BASE_URL = 'http://10.0.2.2:5000/api';

export interface PQRS {
  id?: string;
  nombre: string;
  correo: string;
  tipo: string;
  descripcion: string;
}

// Obtener todas las PQRS
export const getAllPQRS = async (): Promise<PQRS[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Obtener una PQRS por ID
export const getPQRSById = async (id: number): Promise<PQRS> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Crear una nueva PQRS
export const createPQRS = async (data: PQRS): Promise<PQRS> => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

// Actualizar una PQRS existente
export const updatePQRS = async (id: number, data: PQRS): Promise<PQRS> => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

// Eliminar una PQRS
export const deletePQRS = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
