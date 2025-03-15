
import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import { AlertOptions, useIonAlert } from "@ionic/react";
import { ErrorMessageServer } from "../types";

interface FetchConfig {
  headers: { [key: string]: string };
  data?: any;
}

/**
 * ApiClient.ts
 * 
 * Clase Abstracta para realizar solicitudes HTTP utilizando el plugin HTTP de Capacitor.
 * 
 * @version 1.1.0
 * @autor David Delvalle
 * 
 */

export abstract class ApiClient <T> {

    private alerta = useIonAlert()[0];
    
    private url:string = ''

    private defaultHeaders: { [key: string]: string } = {
        'Content-Type': 'application/json',
    };

    /**
     * 
     * @param url - La URL en donde se gestionará cada solicitud HTTP.
     */
    constructor(url:string){
        this.url = url;
    }

    /**
     * Función para poder emitir un Alert al cliente luego de una situación con una descripción del error o éxito.
     * @param {message} status - Descripción de la alerta.
     * @param {buttons} buttons - Asignación de botones para el alert.
     * @returns {void} No hay valor de retorno.
     */

    public showAlerta (options:AlertOptions) {
        this.alerta(options);
    }

    /**
     * Método  para manejar el estado de respuesta HTTP.
     * 
     * @param {response} status - Código de estado de la respuesta HTTP.
     */

    protected abstract handleResponse(response: HttpResponse): void;

    /**
     * Método común para realizar solicitudes HTTP.
     * 
     * @template T - El tipo de dato esperado en la respuesta.
     * @param {string} method - El método HTTP (GET, POST, etc.).
     * @param {Object} config - Configuración de la solicitud (headers, data, etc.).
     * @returns {Promise<T>} Una promesa que se resuelve con la respuesta de tipo T.
     */
    private async realizarRequest(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        config: FetchConfig
    ): Promise<T> {

        try {
            const response = await CapacitorHttp.request({
                method: method,
                url: this.url,
                headers: config.headers,
                data: config.data
            });
            
            const {data, status} = response;

            if(data && (data as unknown as ErrorMessageServer).error){

                const error =  (data as unknown as ErrorMessageServer).error;

                this.showAlerta({
                    header:'Ocurrió un error',
                    subHeader: error.message,
                    message: `Código de error: ${error.errorCode}\nCódigo de estado: ${status}`,
                    buttons: ['Cerrar']
                });

            }
            
            // Manejar el estado de la respuesta
            await this.handleResponse(response);

            return data as T;    

        } catch (error) {

            console.error('Error en la solicitud HTTP:', error);
            
            this.showAlerta({
                header: 'Ocurrió un error',
                message: 'Verifique su conexión a internet',
                buttons: ['Reintentar']
            });

            throw error
            
        }
    }

    /**
     * Realiza una solicitud GET.
     * 
     * @template T - El tipo de dato esperado en la respuesta.
     * @param {Object} [headers] - Encabezados opcionales.
     * @returns {Promise<T>} Una promesa que se resuelve con los datos de respuesta de tipo T.
     */
    public get( headers?: { [key: string]: string }): Promise<T> {
        const config: FetchConfig = { headers: { ...this.defaultHeaders, ...headers } };
        return this.realizarRequest('GET', config);
    }

    /**
     * Realiza una solicitud POST.
     * 
     * @template T - El tipo de dato esperado en la respuesta.
     * @param {any} data - Los datos a enviar en el cuerpo de la solicitud.
     * @param {Object} [headers] - Encabezados opcionales.
     * @returns {Promise<T>} Una promesa que se resuelve con los datos de respuesta de tipo T.
     */
    public post(data: any, headers?: { [key: string]: string }): Promise<T> {
        const config: FetchConfig = { headers: { ...this.defaultHeaders, ...headers }, data };
        return this.realizarRequest('POST', config);
    }

    /**
     * Realiza una solicitud PUT.
     * 
     * @template T - El tipo de dato esperado en la respuesta.
     * @param {any} data - Los datos a enviar en el cuerpo de la solicitud.
     * @param {Object} [headers] - Encabezados opcionales.
     * @returns {Promise<T>} Una promesa que se resuelve con los datos de respuesta de tipo T.
     */
    public put(data: any, headers?: { [key: string]: string }): Promise<T> {
        const config: FetchConfig = { headers: { ...this.defaultHeaders, ...headers }, data };
        return this.realizarRequest('PUT', config);
    }

    /**
     * Realiza una solicitud DELETE.
     * 
     * @template T - El tipo de dato esperado en la respuesta.
     * @param {Object} [headers] - Encabezados opcionales.
     * @returns {Promise<T>} Una promesa que se resuelve con los datos de respuesta de tipo T.
     */
    public delete(headers?: { [key: string]: string }): Promise<T> {
        const config: FetchConfig = { headers: { ...this.defaultHeaders, ...headers } };
        return this.realizarRequest('DELETE', config);
    }
}
