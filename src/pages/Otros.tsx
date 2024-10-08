import { IonAccordionGroup, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Otros.css';
import { InfoExtension, InfoLibrosPrestamo, InfoLibrosReservas } from '../data/types';
import ExtensionCard from '../components/ExtensionCard';
import ReservasCard from '../components/ReservasCard';

const Otros: React.FC = () => {

  const extensionData:InfoExtension[] = [

    {
      actividad:'Aliqua consectetur Lorem nulla labore dolore nulla dolor minim dolore elit do dolor.',
      cantidad:'1',
      carrera:'',
      horas:'20',
      maxima:'20',
      tipo_actividad:'Quis dolore velit dolor dolore deserunt sit dolore dolore do cupidatat consectetur aliquip esse ipsum.'
    },
    {
      actividad:'Aute cupidatat officia veniam id elit adipisicing amet eiusmod labore sint sunt eu dolor enim.',
      cantidad:'1',
      carrera:'',
      horas:'4',
      maxima:'20',
      tipo_actividad:'Cupidatat tempor fugiat dolor tempor.'
    },
    {
      actividad:'Duis proident adipisicing duis elit reprehenderit velit fugiat occaecat dolore aute occaecat.',
      cantidad:'1',
      carrera:'',
      horas:'4',
      maxima:'20',
      tipo_actividad:'In cupidatat tempor in sunt id incididunt esse anim aute ullamco sint elit exercitation.'
    },
    {
      actividad:'Laborum est anim eu minim eu sunt adipisicing anim irure ipsum consequat officia esse amet.',
      cantidad:'1',
      carrera:'',
      horas:'4',
      maxima:'20',
      tipo_actividad:'Sit ullamco nostrud ea laboris dolor excepteur.'
    },
    {
      actividad:'Elit Lorem culpa eu quis.',
      cantidad:'1',
      carrera:'',
      horas:'4',
      maxima:'20',
      tipo_actividad:'Sint ullamco et Lorem dolore laboris laborum quis consequat.'
    },
    {
      actividad: 'Occaecat minim do in sunt proident non quis consectetur ullamco enim ex quis.',
      cantidad:'1',
      carrera:'',
      horas:'4',
      maxima:'20',
      tipo_actividad:'Amet id in ex do.'
    },
    {
      actividad:'Eu minim laborum Lorem incididunt officia dolor aliqua non ea ea officia.',
      cantidad:'1',
      carrera:'',
      horas:'4',
      maxima:'20',
      tipo_actividad:'Tempor deserunt amet ipsum incididunt exercitation mollit pariatur anim Lorem laborum excepteur.'
    }
  ]

  const librosPrestamo: InfoLibrosPrestamo[] = [
    {
      devolver:'Mollit Lorem est consequat cillum cupidat',
      estado:'algo aca',
      libro: 'Velit non sint irure magna id.',
      prestamo: 'Aliqua anim laboris esse cillum officia enim reprehenderi'
    }
  ];

  const infoLibrosReservas: InfoLibrosReservas[] = [
    {
      disponible: 'Sunt eiusmod pariatur incididunt amet minim nulla.',
      estado: 'No se que onda',
      libro: 'Dolore laboris culpa enim esse quis occaecat lab',
      reserva: 'Ex aliquip irure esse ex ad consequat dolore anim elit.'
    }
  ]

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

          <ExtensionCard data={extensionData}/>

          <ReservasCard librosReservas={infoLibrosReservas} librosPrestamos={librosPrestamo} />

        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default Otros;
