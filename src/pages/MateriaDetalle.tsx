// src/pages/MateriaDetalle.tsx

import React from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './MateriaDetalle.css';
import { calculatorOutline } from 'ionicons/icons';
import { useParams } from 'react-router';

const MateriaDetalle: React.FC = () => {

  const {name} = useParams<{name:string}>();


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
              <IonLabel>
                <h3>F. Inscripción</h3>
                <p>{datos.inscripcion}</p>
              </IonLabel>
              <IonLabel>
                <h3>Asistencia</h3>
                <p>{datos.asistencia}</p>
              </IonLabel>
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
                  <IonCol sizeXs='6' sizeSm='4' sizeMd='3'>
                    <IonLabel>
                      <h3>1ra Parcial</h3>
                      <p>{datos.parcial1}</p>
                    </IonLabel>
                  </IonCol>
                  <IonCol sizeXs='6' sizeSm='4' sizeMd='3'>
                    <IonLabel>
                      <h3>2da Parcial</h3>
                      <p>{datos.parcial2}</p>
                    </IonLabel>
                  </IonCol>
                  <IonCol sizeXs='6' sizeSm='4' sizeMd='3'>
                    <IonLabel>
                      <h3>Trabajo Practico</h3>
                      <p>{datos.trabPract}</p>
                    </IonLabel>
                  </IonCol>
                  <IonCol sizeXs='6' sizeSm='4' sizeMd='3'>
                    <IonLabel>
                      <h3>Trabajo Laboratorio</h3>
                      <p>{datos.trabLab}</p>
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton >
            <IonIcon icon={calculatorOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MateriaDetalle;
