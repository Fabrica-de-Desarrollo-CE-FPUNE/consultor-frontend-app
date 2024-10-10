import { IonAccordionGroup, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Perfil.css';
import { InfoContacto, InfoEstudiante, InfoTiempoRendimiento } from '../data/types';
import EstudianteCard from '../components/EstudianteCard';
import ContactoCard from '../components/ContactoCard';
import TiempoRendimientoCard from '../components/TiempoRendimientoCard';

interface PerfilDataEjemploCompleto {
  estudiante:InfoEstudiante,
  contacto:InfoContacto,
  rendimiento: InfoTiempoRendimiento
}


const Perfil: React.FC = () => {

  const perfilDataEjemplo:PerfilDataEjemploCompleto = {
    estudiante:{
      nombre:'David',
      apellido:'Delvalle',
      cedula:'5043206',
      cedula_nombre_apellido:''
    },
    contacto:{
      celular:'0983111111',
      telefono_particular:'6161000',
      email:'salylimon@correo.comercial'
    },
    rendimiento: {
      carrera:'Ing. de Sistemas',
      fecha_estimada_egreso:'2099',
      fecha_ingreso:'2019',
      foto_estudiante: 'fuap',
      porcentaje_materias_reprobadas:'100%',
      promedio:'0.99',
      status_arancel_cero:'Hay todo tío',
      total_materias_aprobada:'0',
      total_materias_reprobadas:'1000'
    }
  }

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
        <IonAccordionGroup expand='compact'>

          <EstudianteCard data={perfilDataEjemplo.estudiante}/>

          <ContactoCard data={perfilDataEjemplo.contacto}/>

          <TiempoRendimientoCard data={perfilDataEjemplo.rendimiento}/>
        
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
