import { IonCard, IonAccordion, IonItem, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonGrid, IonRow, IonCol, IonIcon, IonLabel } from "@ionic/react"
import { InfoEstudiante } from "../data/types"
import { personSharp } from "ionicons/icons";
import { parseDate } from "../data/utils";


interface EstudianteCardData {
    data:InfoEstudiante
}

const EstudianteCard: React.FC<EstudianteCardData> = ({data})=>{

    
    
  const noIncluir = [
        'foto_estudiante',
        'porcentaje_materias_reprobadas',
        'id'
    ];

    return(

        <IonCard>
            <IonAccordion>

                <IonItem slot='header'>
                    <IonIcon icon={personSharp}/>
                    <IonCardHeader >
                        <IonCardTitle>
                            <IonLabel>
                                <h1>Usuario</h1>
                            </IonLabel>
                        </IonCardTitle>
                    </IonCardHeader>
                </IonItem>
            
                <IonCardContent slot='content'>

                    <IonItem>
                        <IonGrid>
                            <IonRow >
                                <IonCol sizeXs="12" sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6">
                                    <IonLabel className="ion-text-capitalize">
                                        <h2>Nombre completo del Estudiante</h2>
                                        <p>{data.nombre}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol sizeXs="12" sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6">
                                    <IonLabel className="ion-text-capitalize">
                                        <h2>Cédula de identidad</h2>
                                        <p>{data.cedula_de_identidad}</p>
                                    </IonLabel>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        
                    </IonItem>

                </IonCardContent>

            </IonAccordion>
        </IonCard>
    );
}

export default EstudianteCard;