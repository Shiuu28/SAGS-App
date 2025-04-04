export interface User {
    email: string;
    tipodoc: string;
    documento: number; // int en BD
    password: string;  
    telefono: number;  // bigint en BD
    nombres: string;
    apellidos: string;
    foto: string;
    idrol: number; // int en BD
    perfil: string;
    session_token?: string;
}
