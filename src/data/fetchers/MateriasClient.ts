import { InfoEscala } from "../types";
import { InfoMateriaAllDetalles, Materia } from "../types2";
import { api } from "./ApiClient";

export const getEscalasApi = async (): Promise<InfoEscala[]> => {
    const data = await api.get<InfoEscala[]>('/api/estudiante/escalas');
    return data;
}

export const getMateriasApi = async (): Promise<Materia[]> => {
    const data = await api.get<Materia[]>('/api/estudiante/materia');
    return data;
}


export const getMateriaByIdApi = async (id: number): Promise<InfoMateriaAllDetalles> => {
    const data = await api.get<any>(`/api/estudiante/materia/${id}`);
    return data;
}