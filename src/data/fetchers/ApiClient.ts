
import { CapacitorHttp } from "@capacitor/core";

interface FetchConfig {
  headers: { [key: string]: string };
  data?: any;
}

/**
 * ApiClient.ts
 * 
 * Clase Abstracta para realizar solicitudes HTTP utilizando el plugin HTTP de Capacitor.
 * 
 * @version 1.0.0
 * @autor David Delvalle
 * 
 */

export abstract class ApiClient<T> {
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
     * Método abstracto para manejar el estado de respuesta HTTP.
     * Este método debe ser implementado por las clases concretas.
     * 
     * @param {number} status - Código de estado de la respuesta HTTP.
     */
    protected abstract handleStatus(status: number): void;

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

        // Manejar el estado de la respuesta
        this.handleStatus(response.status);

        return response.data as T;
        } catch (error) {
        console.error('Error en la solicitud HTTP:', error);
        throw error;
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
