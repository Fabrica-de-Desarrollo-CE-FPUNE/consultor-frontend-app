import { createContext, useContext, } from 'react';


interface FetcherContextType {
  fetch: (activeFunction: () => Promise<void>) => Promise<void>;
  logout: () => void;
}

export const FetcherContext = createContext<FetcherContextType | undefined>(undefined);


export const useFetcher = () => {
  const context = useContext(FetcherContext);
  if (context === undefined) {
    throw new Error('useAutenticacion debe ser usado dentro de un AuthProvider');
  }
  return context;
};
