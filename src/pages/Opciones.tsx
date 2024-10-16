import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Opciones.css';
import { useAutenticacion } from '../contexts/AutenticacionContext';
import { exitSharp } from 'ionicons/icons';

const Opciones: React.FC = () => {

  const {logout} = useAutenticacion()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Opciones</IonTitle>
          <IonButtons slot='end'>
            <IonButton color="danger" onClick={()=>logout()}><IonIcon icon={exitSharp}/></IonButton>
          </IonButtons>
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
