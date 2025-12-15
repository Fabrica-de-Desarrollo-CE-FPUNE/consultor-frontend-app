import { CapacitorHttp, HttpOptions } from "@capacitor/core";
import { TokenStore, vaciarTokenStore } from "../TokenStore";
import { Preferences } from "@capacitor/preferences";
import { ApiError } from "./ApiError";
import { ErrorMessageServer } from "../types";
import { setConfigLoading } from "../ConfigStore";


const BASE_API_URL = "http://localhost:3005";

const httpClient = async <T = unknown>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  options: Omit<HttpOptions, 'url' | 'method'> = {}
): Promise<T> => {

  setConfigLoading(true);
  
  const authToken = (await Preferences.get({ key: 'token' })).value;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };

  const finalOptions: HttpOptions = {
    method,
    url: `${BASE_API_URL}${endpoint}`,
    headers: { ...defaultHeaders, ...options.headers },
    ...options
  };

  try {
    const response = await CapacitorHttp.request(finalOptions);
    
    if (response.status >= 400) {
      const errorData: ErrorMessageServer = response.data;
      
      const errorMessage = errorData.error.message || 'Error del servidor.';
      const errorCode = errorData.error.errorCode || 'SERVER_ERROR';

      if (response.status === 401) {
          await vaciarTokenStore();
      }
      console.log(response)

      throw new ApiError(errorMessage, response.status, errorCode)

    }

    return response.data as T;

  } catch (error) {
    if (error && typeof error === 'object' && 'error' in error && typeof error.error === 'object' && 'message' in error) {
        throw error;
    }
    throw new ApiError("Error de conexión con el servidor.", 503, 'NETWORK_ERROR');
  } finally {
    setConfigLoading(false);
  }
};

export const api = {
  get: <T = unknown>(endpoint: string, options?: Omit<HttpOptions, 'url' | 'method'>) =>
    httpClient<T>('GET', endpoint, options),
  post: <T = unknown, D = unknown>(endpoint: string, data?: D, options?: Omit<HttpOptions, 'url' | 'method' | 'data'>) =>
    httpClient<T>('POST', endpoint, { data, ...options }),
  put: <T = unknown, D = unknown>(endpoint: string, data?: D, options?: Omit<HttpOptions, 'url' | 'method' | 'data'>) =>
    httpClient<T>('PUT', endpoint, { data, ...options }),
  delete: <T = unknown>(endpoint: string, options?: Omit<HttpOptions, 'url' | 'method'>) =>
    httpClient<T>('DELETE', endpoint, options),
};
