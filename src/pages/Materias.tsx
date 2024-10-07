// src/pages/Materias.tsx 

import React from 'react';
import { IonAccordionGroup, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { calculatorOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import MateriaCard from '../components/MateriaCard';
import './Materias.css';

const Materias: React.FC = () => {
  const history = useHistory();
  
  const materias = [
    { nombre: 'Matemáticas', profesor: 'Juan Pérez', semestre: '1er Semestre' },
    { nombre: 'Física', profesor: 'Ana Gómez', semestre: '2do Semestre' },
    { nombre: 'Química', profesor: 'María López', semestre: '3er Semestre' },
  ];

  const handleMateriaClick = (nombre: string) => {
    history.push(`/materia/${nombre}`);
  };

  const handleCalculatorClick = () => {
    // Lógica para manejar el click del botón de la calculadora
    console.log('Calculator button clicked');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Materias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className='ion-padding'>
        <IonAccordionGroup expand='compact'>
          {materias.map((materia, index) => (
            <MateriaCard
              key={index}
              nombre={materia.nombre}
              profesor={materia.profesor}
              semestre={materia.semestre}
              onClick={() => handleMateriaClick(materia.nombre)}
            />
          ))}
        </IonAccordionGroup>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={calculatorOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Materias;
