import { IonAccordionGroup, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Perfil.css';
import ContactoCard from '../components/ContactoCard';
import TiempoRendimientoCard from '../components/TiempoRendimientoCard';
import { exitSharp } from 'ionicons/icons';
import { InfoPerfil, InfoTiempoRendimiento } from '../data/types';
import { useFetcher } from '../contexts/FetcherContext';
import { getPerfilApi } from '../data/fetchers/EstudianteClient';
import { useEffect, useState } from 'react';

const Perfil: React.FC = () => {

  const { logout } = useFetcher();

  const [perfil, setPerfil] = useState<InfoPerfil>();

  const fetchPerfil = async () => {
    const perfil = await getPerfilApi();
    setPerfil(perfil);
  }

  useEffect(() => {
    fetchPerfil();
  }, []);





  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='end'>
            <IonButton color="danger" onClick={logout}><IonIcon icon={exitSharp} /></IonButton>
          </IonButtons>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonAccordionGroup expand='compact'>

          {perfil && (<>

            <ContactoCard data={perfil} />

            <TiempoRendimientoCard data={perfil as InfoTiempoRendimiento} />
          </>)}

        </IonAccordionGroup>

      </IonContent>
    </IonPage>
  );
};

export default Perfil;
