import { IonAccordionGroup, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Perfil.css';
import EstudianteCard from '../components/EstudianteCard';
import ContactoCard from '../components/ContactoCard';
import TiempoRendimientoCard from '../components/TiempoRendimientoCard';
import { TodaLaInfoStore } from '../data/TodaLaInfoStore';
import { exitSharp } from 'ionicons/icons';
import { useAutenticacion } from '../contexts/AutenticacionContext';


const Perfil: React.FC = () => {

  const perfilData = TodaLaInfoStore.useState(s=>s.todo)

  const {logout} = useAutenticacion()


  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot='end'>
              <IonButton color="danger" onClick={()=>logout()}><IonIcon icon={exitSharp}/></IonButton>
            </IonButtons>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            
            <IonTitle size="large">Materias</IonTitle>
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
