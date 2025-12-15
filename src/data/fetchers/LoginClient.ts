import { useIonAlert } from "@ionic/react";
import { setTokenStore } from "../TokenStore";
import { AuthToken } from "../types";
import { api } from "./ApiClient";
import { ApiError } from "./ApiError";

export interface LoginCredentials {
    cedula: string;
    pass: string;
}




export const loginUser = async (credentials: LoginCredentials): Promise<AuthToken > => {
    const data = await api.post<AuthToken, LoginCredentials>('/api/login', credentials);
    if (data) {
        setTokenStore(data);
    }
    return data;
}