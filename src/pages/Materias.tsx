import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonModal} from '@ionic/react';
import { calculatorOutline, exitSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import MateriaCard from '../components/MateriaCard';
import './Materias.css';
import { InfoInscripcionesAsistenciaStore, MateriaStore } from '../data/MateriasStore';
import Calculadora from '../components/Calculadora';
import { M } from 'vitest/dist/chunks/reporters.d.BFLkQcL6';




const Materias: React.FC = () => {

  const history = useHistory();
  const materias = MateriaStore.useState(s=>s.materias);

  const cerrar = ()=>{
    cerrarCalculadora();
  }


  const [mostrarCalculadora, cerrarCalculadora] = useIonModal(Calculadora,{
    cerrar,
  })



  const handleMateriaClick = (id: number) => {
    history.push(`/materias/${id}`);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Materias</IonTitle>
          <IonButtons slot='end'>
            <IonButton color="danger" onClick={()=>{}}><IonIcon icon={exitSharp}/></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Materias</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {
              materias.map((materia, index) => (
                  <IonCol key={index} sizeXs='12' sizeSm='6'  sizeLg='4'  sizeMd='4'  sizeXl='3' >
                    <MateriaCard
                      nombre={materia.nombre}
                      semestre={materia.semestre.toString()}
                      onClick={() => handleMateriaClick(materia.id)}
                    />
                  </IonCol>
                )
              )
            }
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={()=>mostrarCalculadora()}>
            <IonIcon icon={calculatorOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Materias;
