// src/components/MateriaCard.tsx

import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import './MateriaCard.css';

interface MateriaCardProps {
  nombre: string;
  profesor: string;
  semestre: string;
  onClick: () => void;
}

const MateriaCard: React.FC<MateriaCardProps> = ({ nombre, profesor, semestre, onClick }) => {
  return (
    <IonCard button onClick={onClick} className="materia-card">
      <IonCardHeader>
        <IonCardTitle>{nombre}</IonCardTitle>
      </IonCardHeader>
        <IonCardContent>
          <IonItem button detail={true}>
            <IonLabel>
              <h4>Profesor/a:</h4>
              <p>{profesor}</p>
            </IonLabel>
            <IonLabel>
              <h4>Semestre</h4>
              <p>{semestre}</p>
            </IonLabel>
          </IonItem>
        </IonCardContent>
    </IonCard>
  );
};

export default MateriaCard;
