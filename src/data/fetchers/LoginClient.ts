import { ApiClient } from "./ApiClient";
import { TodaLaInfo } from "../types";
import { setInfo, vaciarTodaLaInfo } from "../TodaLaInfoStore";
import { HttpResponse } from "@capacitor/core";
import { StatusCodes } from "http-status-codes";

export class LoginClient extends ApiClient<TodaLaInfo> {

    constructor() {
        super('https://bqs-service.onrender.com/api/estudiante');
    }

    protected  handleResponse(response: HttpResponse): void {

        const {status, data} = response;
        console.log(data);
        

        switch(status){
            
            case StatusCodes.BAD_REQUEST:
                vaciarTodaLaInfo();
                break;
            default:
                break;
        }
    }
    
}