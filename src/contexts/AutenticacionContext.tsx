import { createContext, useContext, } from 'react';
import { TodaLaInfo } from '../data/types';


interface AutenticacionContextType {
  todaLaInfo: TodaLaInfo| null  | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AutenticacionContext = createContext<AutenticacionContextType | undefined>(undefined);


export const useAutenticacion = () => {
  const context = useContext(AutenticacionContext);
  if (context === undefined) {
    throw new Error('useAutenticacion debe ser usado dentro de un AuthProvider');
  }
  return context;
};
