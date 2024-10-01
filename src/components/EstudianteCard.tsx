import { IonCard, IonAccordion, IonItem, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonGrid, IonRow, IonCol, IonIcon } from "@ionic/react"
import { InfoEstudiante } from "../data/types"
import { personSharp } from "ionicons/icons";


interface EstudianteCardData {
    data:InfoEstudiante
}

const EstudianteCard: React.FC<EstudianteCardData> = (usuarioData)=>{

    const estudiante = usuarioData.data;

    return(

        <IonCard>
            <IonAccordion>

                <IonItem slot='header'>
                    <IonIcon icon={personSharp}/>
                    <IonCardHeader >
                        <IonCardTitle>Usuario</IonCardTitle>
                    </IonCardHeader>
                </IonItem>
            
                <IonCardContent slot='content'style={{"backgroundColor":"red"}}>

                    <IonItem>
                        <IonGrid>
                            <IonRow >
                                <IonCol sizeXs="12" sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6">
                                    <IonInput label="Estudiante" labelPlacement="fixed" readonly placeholder={estudiante.nombre}/>
                                </IonCol>
                                <IonCol sizeXs="12" sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6">
                                    <IonInput label="Cédula de Identidad" labelPlacement="start" readonly placeholder={estudiante.cedula}/>
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