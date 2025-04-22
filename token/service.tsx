// datosService.ts
import { ApiDelivery } from "../src/Data/api/ApiDelivery";

export const obtenerDatosProtegidos = async () => {
  try {
    const response = await ApiDelivery.get("/datos-protegidos");
    return response.data;
  } catch (err) {
    console.error("Error al obtener datos:", err);
    throw err;
  }
};
