import { ApiClient } from "./ApiClient";
import { TodaLaInfo } from "../types";
import { vaciarTodaLaInfo } from "../TodaLaInfoStore";

export class LoginClient extends ApiClient<TodaLaInfo> {

    constructor() {
        super('https://bqs-service.onrender.com/api/estudiante')
    }

    protected handleStatus(status: number): void {
        if (status >= 400 && status < 500) {
            console.warn(`Error del cliente: ${status}`);
            switch(status){
                case 400:
                    vaciarTodaLaInfo();
                    break;
                    
            }
        } else if (status >= 500) {
            console.error(`Error del servidor: ${status}`);
        }
    }
    
}