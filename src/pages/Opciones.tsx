import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Opciones.css';

const Opciones: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Opciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Opciones</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Aquí ajustes y opciones para el usuario" />
      </IonContent>
    </IonPage>
  );
};

export default Opciones;
