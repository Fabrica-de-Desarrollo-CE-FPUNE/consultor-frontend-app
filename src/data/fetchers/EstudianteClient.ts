import { InfoPerfil } from "../types";
import { api } from "./ApiClient";

export const getPerfilApi = async () =>{ 
    const data = await api.get<InfoPerfil>('/api/estudiante/perfil');
    return data;
} 