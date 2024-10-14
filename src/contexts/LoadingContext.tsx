import React, { useState, createContext, ReactNode } from 'react';
import './LoadingContext.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { IonCol, IonGrid } from '@ionic/react';

// Crear el contexto con un valor predeterminado
export const LoadingContext = createContext({
  estaCargando: false,
  setEstaCargando: (estaCargando: boolean) => {},
});

interface Props {
  children: ReactNode;
}

// Crear un proveedor de contexto
export const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [estaCargando, setEstaCargando] = useState(false);

  return (
    <LoadingContext.Provider value={{ estaCargando, setEstaCargando }}>
      {children}
      {estaCargando && (
        <div className="loader-overlay">
            <IonGrid>
                <IonCol size='12'>
                    <DotLottieReact
                    src="../resources/lotties/logo.json"
                    loop
                    autoplay
                    />
                </IonCol>
                <IonCol push='3' size='6' >
                    <DotLottieReact
                        className='ball'
                        src="../resources/lotties/ball.json"
                        loop
                        autoplay
                    />
                </IonCol>
            </IonGrid>
        </div>
      )}
    </LoadingContext.Provider>
  );
};
