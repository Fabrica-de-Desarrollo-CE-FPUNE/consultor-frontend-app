// src/pages/MateriaDetalle.tsx

import React from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import './MateriaDetalle.css';
import { calculatorOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import { TodaLaInfoStore } from '../data/TodaLaInfoStore';
import { espaciosEntreNumeros, primerasLetrasMayusculas } from '../data/utils';
import Calculadora from '../components/Calculadora';

const MateriaDetalle: React.FC = () => {

  const {name} = useParams<{name:string}>();
 

  const materiaInscripcion = TodaLaInfoStore.useState(s=> s.todo?.info_inscripciones
    .filter(materiaDetalle=>materiaDetalle.materia.toLowerCase().includes(name.toLowerCase()))[0]
  );

  const materiaDesemp = TodaLaInfoStore.useState(s=>s.todo?.info_parciales.filter(materiaDetalle=>
    materiaDetalle.materia.toLowerCase().includes(name.toLowerCase()))[0]);

  const cerrar = ()=>{
    return cerrarCalculadora()
  }

  const [mostrarCalculadora, cerrarCalculadora] = useIonModal(Calculadora, {
    materia: `Bonificación de ${name}`,
    infoParcial: {...materiaDesemp},
    cerrar
  });

  
  const noIncluir = [
    'materia'
  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Atrás" defaultHref="/materias"/>
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonLabel>
                <h1>Información de {name}</h1>
              </IonLabel>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
              {
                materiaInscripcion && Object.keys(materiaInscripcion).map((parametro, index)=>{
                  const valor = materiaInscripcion[parametro];
                  if(valor && !noIncluir.includes(parametro)){
                    return(
                      <IonCol key={index} sizeXs='6' sizeSm='4' sizeMd='3'>
                        <IonLabel color="dark">
                          <h3>{primerasLetrasMayusculas(parametro.replace(/_/g,' '))}</h3>
                          <p>{valor}</p>
                        </IonLabel>
                      </IonCol>
                    );
                  }
                  return null
                })
              }
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonLabel>
                <h1>Desempeño</h1>
              </IonLabel>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {
                  materiaDesemp && (
                    Object.keys(materiaDesemp).map((parametro, index)=>{
                      
                      const titulo = primerasLetrasMayusculas(espaciosEntreNumeros({texto: parametro, ignorarOtrosNumeros:false}).replace(/_/g,' '))
                      const valor = materiaDesemp[parametro]
                      
                      if(!noIncluir.includes(parametro)){
                        return (
                          <IonCol key={index} sizeXs='6' sizeSm='4' sizeMd='3'>
                            <IonLabel color="dark">
                              <h3>{titulo}</h3>
                              <p>{valor!==""?valor:"0"}</p>
                            </IonLabel>
                          </IonCol>
                        )
                      }
                      return null
                    })
                    
                  )
                }
                
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={()=>mostrarCalculadora()}>
            <IonIcon icon={calculatorOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MateriaDetalle;
