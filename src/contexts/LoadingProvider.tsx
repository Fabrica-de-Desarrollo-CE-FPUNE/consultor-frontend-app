import { IonGrid, IonCol } from "@ionic/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ReactNode, useState } from "react";
import { LoadingContext } from "./LoadingContext";

import './LoadingProvider.css';

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
              <IonGrid className="loader">
                  <IonCol size='12'>
                      <DotLottieReact 
                      src="lotties/logo.json"
                      loop
                      autoplay
                      />
                  </IonCol>
                  <IonCol push='3' size='6' >
                      <DotLottieReact
                          className='ball'
                          src="lotties/ball.json"
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
  