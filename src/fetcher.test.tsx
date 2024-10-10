import { expect } from 'vitest';
import { ApiClient } from './data/fetchers/ApiClient';

interface Prueba {
    userId: number;
    id: number;
    title: string;
    body: string;
}

class TestApiClient extends ApiClient<Prueba> {
    constructor(){
        super('https://jsonplaceholder.typicode.com/posts/1');
    }
    protected handleStatus(status: number): void {
      if (status >= 400) {
        switch (status) {
          case 401:
            console.warn("No autorizado. Por favor, inicie sesión.");
            break;
          case 404:
            console.warn("No encontrado.");
            break;
          default:
            console.warn(`Error en la consulta de usuario: ${status}`);
        }
        throw new Error(`Error de usuario: ${status}`);
      }
    }
  }

describe('conjunto de fetchers funcionales', async ()=>{

    test('fetcher custom cargando con url genérica de pruebas', async () => {

        const testClient = new TestApiClient();

        const data = await testClient.get();
        console.log(data);
        
    
        // Verificar que data tiene la forma de Prueba
        expect(data).toMatchObject<Prueba>({
            userId: expect.any(Number),
            id: expect.any(Number),
            title: expect.any(String),
            body: expect.any(String),
        });
    });

    
})
