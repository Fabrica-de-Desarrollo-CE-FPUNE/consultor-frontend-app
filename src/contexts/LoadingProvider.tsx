import { IonGrid, IonCol } from "@ionic/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ReactNode, useState } from "react";
import { LoadingContext } from "./LoadingContext";

import './LoadingProvider.css';
import { ConfigStore } from "../data/ConfigStore";

interface Props {
    children: ReactNode;
  }
  
  // Crear un proveedor de contexto
  export const LoadingProvider: React.FC<Props> = ({ children }) => {

    const isLoading = ConfigStore.useState(s=>s.isLoading);
  
    return (
      <LoadingContext.Provider value={{}}>
        {children}
        {isLoading && (
          <div className="loader-overlay">
              <IonGrid>
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
  