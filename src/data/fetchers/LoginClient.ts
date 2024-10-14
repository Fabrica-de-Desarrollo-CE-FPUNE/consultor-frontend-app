import { ApiClient } from "./ApiClient";
import { TodaLaInfo } from "../types";

export class LoginClient extends ApiClient<TodaLaInfo> {

    constructor() {
        super('https://bqs-service.onrender.com/api/estudiante')
    }

    protected handleStatus(status: number): void {
        if (status >= 400 && status < 500) {
            console.warn(`Error del cliente: ${status}`);
        } else if (status >= 500) {
            console.error(`Error del servidor: ${status}`);
        }
    }
    
}