import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Materias.css';

const Materias: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Materias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Materias</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Aquí información de las materias" />
      </IonContent>
    </IonPage>
  );
};

export default Materias;
