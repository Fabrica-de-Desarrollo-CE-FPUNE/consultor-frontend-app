import  {createContext, useContext} from 'react';

export const LoadingContext = createContext({
  estaCargando: false,
  setEstaCargando: (estaCargando: boolean) => {},
});


export const useLoader = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useAutenticacion debe ser usado dentro de un AuthProvider');
  }
  return context;
};
