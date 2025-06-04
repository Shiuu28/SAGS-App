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

export interface ChecklistItem {
    idmod: number | string;
    nombre: string;
    descripcion: string;
    progreso: number;
    archivo: string;
    fecha: string;
    userEmail: string;
    checked?: boolean;
    idproy: number;
}

export interface DocumentPreview {
    title: string;
    path: string;
}

export interface ChecklistResponse {
    success: boolean;
    user?: ChecklistItem[];
    message?: string;
    error?: unknown;
}

export interface PerfilEntities {
    nombres: string;
    apellidos: string;
    email: string;
    funcion: string;
    proyectos: Array<{
        nombre_proyecto: string;
        descripcion_proyecto: string;
    }>;
}

export interface Proyecto {
    nombre_proyecto: string;
    descripcion_proyecto: string;
}