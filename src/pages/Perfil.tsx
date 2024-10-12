import { IonAccordionGroup, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Perfil.css';
import { InfoContacto, InfoEstudiante, InfoTiempoRendimiento } from '../data/types';
import EstudianteCard from '../components/EstudianteCard';
import ContactoCard from '../components/ContactoCard';
import TiempoRendimientoCard from '../components/TiempoRendimientoCard';
import { TodaLaInfoStore } from '../data/TodaLaInfoStore';


const Perfil: React.FC = () => {

  const perfilData = TodaLaInfoStore.useState(s=>s.todo)



  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        {
          perfilData && (
            <IonAccordionGroup expand='compact'>

              <EstudianteCard data={perfilData.info_cabecera}/>

              <ContactoCard data={perfilData.info_contacto}/>

              <TiempoRendimientoCard data={perfilData.info_rendimiento}/>
          
          </IonAccordionGroup>
          )
        }
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
