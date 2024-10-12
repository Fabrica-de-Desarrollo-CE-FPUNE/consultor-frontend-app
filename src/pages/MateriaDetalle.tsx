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

  const noIncluir = [
    'materia'
  ]

  const datos = {
    inscripcion: '01/02/2024',
    asistencia: '90%',
    parcial1: '80',
    parcial2: '85',
    trabPract: '88',
    trabLab: '92',
    eval: '86',
  };

  


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/materias" />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Con Respecto a {name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonGrid>
                <IonRow>
                {
                  materiaInscripcion && Object.keys(materiaInscripcion).map((parametro, index)=>{
                    const valor = materiaInscripcion[parametro];
                    if(valor && !noIncluir.includes(parametro)){
                      return(
                        <IonCol key={index} sizeXs='6' sizeSm='4' sizeMd='3'>
                          <IonLabel>
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
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Desempeño</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
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
                              <IonLabel>
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
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={calculatorOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MateriaDetalle;
