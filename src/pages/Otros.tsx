import { IonAccordionGroup, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Otros.css';import ExtensionCard from '../components/ExtensionCard';
import ReservasCard from '../components/ReservasCard';
import { InfoExtension, InfoLibrosPrestamo, InfoLibrosReservas } from '../data/types';

const Otros: React.FC = () => {


  const extensiones:InfoExtension[] =[];
  const librosPrestamos: InfoLibrosPrestamo[]=[];
  const librosReservas:InfoLibrosReservas[]= [];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Otros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Otros</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonAccordionGroup expand='compact'>

          {
            extensiones && (
              <ExtensionCard data={extensiones}/>
            )
          }

        <ReservasCard librosReservas={librosReservas} librosPrestamos={librosPrestamos} />

        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default Otros;
