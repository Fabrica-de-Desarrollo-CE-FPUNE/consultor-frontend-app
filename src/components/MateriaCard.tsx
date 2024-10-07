// src/components/MateriaCard.tsx

import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
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
        <p>Profesor: {profesor}</p>
        <p>Semestre: {semestre}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default MateriaCard;
