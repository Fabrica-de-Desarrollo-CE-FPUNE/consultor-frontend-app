import { IonCard, IonAccordion, IonItem, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonGrid, IonRow, IonCol, IonIcon, IonLabel } from "@ionic/react"
import { InfoEstudiante } from "../data/types"
import { personSharp } from "ionicons/icons";
import { primerasLetrasMayusculas } from "../data/utils";


interface EstudianteCardData {
    data:InfoEstudiante
}

const EstudianteCard: React.FC<EstudianteCardData> = (usuarioData)=>{

    
    
    const limpiarNombre = (infoEstudiante:InfoEstudiante)=>{
        const regex = /^(\d+)\s+([\p{L}\s.-´`¨']+)$/u;
        const limpiarNombre = infoEstudiante.cedula_nombre_apellido.match(regex)||[]
        const infoEstudianteNuevo = {...infoEstudiante};
        infoEstudianteNuevo.cedula = limpiarNombre[1];
        infoEstudianteNuevo.nombre = primerasLetrasMayusculas(limpiarNombre[2]);
        return infoEstudianteNuevo
    }

    const estudiante = limpiarNombre(usuarioData.data);

    return(

        <IonCard>
            <IonAccordion>

                <IonItem slot='header'>
                    <IonIcon icon={personSharp}/>
                    <IonCardHeader >
                        <IonCardTitle>Usuario</IonCardTitle>
                    </IonCardHeader>
                </IonItem>
            
                <IonCardContent slot='content'>

                    <IonItem>
                        <IonGrid>
                            <IonRow >
                                <IonCol sizeXs="12" sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6">
                                    <IonLabel>
                                        <h2>Nombre completo del Estudiante</h2>
                                        <p>{estudiante.nombre}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol sizeXs="12" sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6">
                                    <IonLabel>
                                        <h2>Cédula de identidad</h2>
                                        <p>{estudiante.cedula}</p>
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