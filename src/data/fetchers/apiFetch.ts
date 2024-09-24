/**
 * apiFetch.ts
 * 
 * Función utilitaria para realizar solicitudes HTTP utilizando el plugin HTTP de Capacitor.
 * 
 * @version 1.0.0
 * @autor David Delvalle
 * 
 * @module apiFetch
 */

import { CapacitorHttp } from "@capacitor/core";

/**
 * Opciones de configuración para la solicitud fetch.
 */
interface FetchConfig {
  method: string;                   // El método HTTP a utilizar para la solicitud (por ejemplo, GET, POST).
  headers: { [key: string]: string }; // Los encabezados a incluir en la solicitud.
  data?: any;                       // Datos opcionales de carga para solicitudes POST o PUT.
}

/**
 * Realiza una solicitud HTTP utilizando el plugin HTTP de Capacitor.
 * 
 * @template T - El tipo de dato esperado en la respuesta.
 * @param {string} url - La URL a la que se enviará la solicitud.
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method - El método HTTP a utilizar para la solicitud.
 * @param {Object} [headers] - Encabezados opcionales para incluir en la solicitud.
 * @param {any} [data] - Datos opcionales a enviar con la solicitud (para métodos POST y PUT).
 * @returns {Promise<T>} Una promesa que se resuelve con los datos de respuesta de tipo T.
 * 
 * @throws {Error} Lanza un error si el estado de respuesta es 400 o mayor.
 */
export const apiFetch = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  headers?: { [key: string]: string },
  data?: any
): Promise<T> => {

  const defaultHeaders: { [key: string]: string } = {
    'Content-Type': 'application/json', // Tipo de contenido por defecto para la solicitud.
    ...headers,                         // Mezclar encabezados personalizados si se proporcionan.
  };

  const config: FetchConfig = {
    method: method,
    headers: defaultHeaders,
    data: data
  };

  try {
    const response = await CapacitorHttp.request({
      method: config.method,
      url: url,
      headers: config.headers,
      data: config.data
    });

    // Comprobar el estado de respuesta para errores
    if (!response || response.status >= 400) {
      const errorMessage = `Error: ${response.status}`;
      switch(response.status) {
        case 401:
          // Manejar el error de no autorizado
          break;
      }
      throw new Error(errorMessage);
    }

    return response.data as T; // Retornar los datos de respuesta como tipo T
  } catch (error) {
    console.error('Error de Fetch:', error);
    throw error;
  }
};
