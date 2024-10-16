import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import './MateriaCard.css';

interface MateriaCardProps {
  nombre: string;
  semestre: string;
  onClick: () => void;
}

const MateriaCard: React.FC<MateriaCardProps> = ({ nombre, semestre, onClick }) => {
  return (
    <IonCard button onClick={onClick}>
      <IonCardHeader>
        <IonCardTitle>
          <IonLabel>
            <h1>{nombre}</h1>
          </IonLabel>
        </IonCardTitle>
      </IonCardHeader>
        <IonCardContent>
            <IonLabel color="tertiary">
              <h3><b>Semestre</b></h3>
              <p>{semestre}</p>
            </IonLabel>
        </IonCardContent>
    </IonCard>
  );
};

export default MateriaCard;
