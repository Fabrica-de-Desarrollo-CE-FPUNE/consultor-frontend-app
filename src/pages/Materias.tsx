import React, { useEffect, useState } from 'react';
import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, useIonModal} from '@ionic/react';
import { calculatorOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import MateriaCard from '../components/MateriaCard';
import './Materias.css';
import { TodaLaInfoStore } from '../data/TodaLaInfoStore';
import { primerasLetrasMayusculas } from '../data/utils';
import CalculadoraSimple from '../components/CalculadoraSimple';


interface MateriasFiltro {
  nombre: string,
  semestre:string
}

const Materias: React.FC = () => {

  const history = useHistory();


  const materiasData = TodaLaInfoStore.useState(s=>s.todo);
  
  const [filtroMaterias, setFiltroMaterias] = useState<MateriasFiltro[]>([]);

  const cerrar = ()=>{
    cerrarCalculadora();
  }


  const [mostrarCalculadora, cerrarCalculadora] = useIonModal(CalculadoraSimple,{
    cerrar,
    evaluaciones: [...new Set(materiasData?.info_parciales.map((val=>val.evaluacion)))]
  })

  useEffect(()=>{
    
    const actualizarFiltroMaterias = () => {
      if(materiasData) {
        const regex = /^(\d+)\s+([A-Za-zÁÉÍÓÚáéíóú\s.,()!?-]+)\.\s*Sem\.\s*:\s*(\d+)/;
        const nuevoFiltroMaterias = materiasData.info_inscripciones.map(materiaInscripta=>{
          const limpiarEstructura = materiaInscripta.materia.match(regex)||[]
          // por si algun dia necesitamos el codigo es limpiarEstructura[1]
          const materiaFiltrada: MateriasFiltro = {
            nombre: primerasLetrasMayusculas(limpiarEstructura[2]),
            semestre: limpiarEstructura[3]
          }
  
          return materiaFiltrada
  
        });
  
        setFiltroMaterias(nuevoFiltroMaterias);
        
      }
    }
    actualizarFiltroMaterias()

  },[materiasData])

  const handleMateriaClick = (nombre: string) => {
    history.push(`/materias/${nombre}`);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Materias</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className='ion-padding'>
        <IonGrid>
          <IonRow>
            {
              filtroMaterias.map((materia, index) => (
                  <IonCol key={index} sizeXs='12' sizeSm='6'  sizeLg='4'  sizeMd='4'  sizeXl='3' >
                    <MateriaCard
                      nombre={materia.nombre}
                      semestre={materia.semestre}
                      onClick={() => handleMateriaClick(materia.nombre)}
                    />
                  </IonCol>
                )
              )
            }
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={()=>mostrarCalculadora()}>
            <IonIcon icon={calculatorOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Materias;
