export interface User {
    email: string;
    tipodoc: string;
    documento: string;
    password: string;
    session_token?: string;
}

export interface RegisterProyEntities {
    nombre: string;
    descripcion: string;
    tipo: string;
    fechaI: string;
}

export interface ChecklistEntities {
    idmod: number;
    nombre: string;
    descripcion: string;
    progreso: number;
    archivo: string;
    fecha: string;
    checked: boolean;
}

export interface PerfilEntities {
    nombres: string;
    email: string;
    funcion: string;
    nombre_proyecto: string;
    descripcion_proyecto: string;
}