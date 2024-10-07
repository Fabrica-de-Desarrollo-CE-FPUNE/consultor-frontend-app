// src/pages/MateriaDetalle.tsx

import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './MateriaDetalle.css';
import { calculatorOutline } from 'ionicons/icons';

const MateriaDetalle: React.FC = () => {
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
          <IonTitle>Detalle de Materia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="table-responsive">
          <table className="materia-detalle-table">
            <thead>
              <tr>
                <th>Inscripción (fecha)</th>
                <th>Asistencia</th>
                <th>1ra Parcial</th>
                <th>2da Parcial</th>
                <th>Trab. Pract.</th>
                <th>Trab. Lab.</th>
                <th>Eval.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{datos.inscripcion}</td>
                <td>{datos.asistencia}</td>
                <td>{datos.parcial1}</td>
                <td>{datos.parcial2}</td>
                <td>{datos.trabPract}</td>
                <td>{datos.trabLab}</td>
                <td>{datos.eval}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
