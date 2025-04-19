export interface User {
    email: string;
    tipodoc: string;
    documento: string; 
    password: string;  
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