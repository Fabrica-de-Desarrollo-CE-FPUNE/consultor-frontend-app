import { IonAccordionGroup, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Otros.css';import ExtensionCard from '../components/ExtensionCard';
import ReservasCard from '../components/ReservasCard';
import { TodaLaInfoStore } from '../data/TodaLaInfoStore';

const Otros: React.FC = () => {

  

  const extensiones = TodaLaInfoStore.useState(s=>s.todo?.info_extensiones);
  const librosPrestamos = TodaLaInfoStore.useState(s=>s.todo?.info_libros_prestamos);
  const librosReservas = TodaLaInfoStore.useState(s=>s.todo?.info_libros_reservas);

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
