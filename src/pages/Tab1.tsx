import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className='ion-padding'>
      
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Usuario</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonLabel position= "floating">Nombre del usuario</IonLabel>
              <IonTextarea readonly placeholder='Aquí contenemos el nombre por ejemplo: Alejandro Martinez'></IonTextarea>
              <IonLabel position= "floating">Número de cédula de Identidad</IonLabel>
              <IonTextarea readonly placeholder='Aquí contenemos el ci, por ejemplo: 5144324'></IonTextarea>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Contacto</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonLabel position= "floating">Email</IonLabel>
              <IonTextarea readonly placeholder='Aquí contenemos el correo por ejemplo: fulano@outlook.com'></IonTextarea>
              <IonLabel position= "floating">Teléfono Particular</IonLabel>
              <IonTextarea readonly placeholder='Aquí contenemos el teléfono de línea baja por ejemplo: 021-111-222'></IonTextarea>
              <IonLabel position= "floating">Celular</IonLabel>
              <IonTextarea readonly placeholder='Aquí contenemos el teléfono particular por ejemplo: 0981-111222'></IonTextarea>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Tiempo y Rendimiento Académico</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonLabel position= "floating">Carrera</IonLabel>
              <IonTextarea readonly placeholder='Información aquí'></IonTextarea>
              <IonLabel position= "floating">Fecha de ingreso</IonLabel>
              <IonTextarea readonly placeholder='Fecha aquí'></IonTextarea>
              <IonLabel position= "floating">Fecha estimada de egreso</IonLabel>
              <IonTextarea readonly placeholder='Fecha aquí'></IonTextarea>
              <IonLabel position= "floating">Promedio</IonLabel>
              <IonTextarea readonly placeholder='Número decimal aquí'></IonTextarea>
              <IonLabel position= "floating">Total Materias Aprobadas</IonLabel>
              <IonTextarea readonly placeholder='Número entero aquí'></IonTextarea>
              <IonLabel position= "floating">Total Materias Reprobadas</IonLabel>
              <IonTextarea readonly placeholder='Número entero aquí'></IonTextarea>
              <IonLabel position= "floating">Porcentaje Materias Reprobadas</IonLabel>
              <IonTextarea readonly placeholder='Porcentaje de regla de tres [(100 * materias en total)/materias reprobadas]'></IonTextarea>
            </IonItem>
          </IonCardContent>
        </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
