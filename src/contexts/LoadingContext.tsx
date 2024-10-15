import  {createContext} from 'react';

export const LoadingContext = createContext({
  estaCargando: false,
  setEstaCargando: (estaCargando: boolean) => {},
});

