import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem,  IonAccordion, IonGrid, IonInput, IonCol, IonIcon, IonButton, IonPopover, IonContent, IonText, IonRow } from "@ionic/react";
import { InfoTiempoRendimiento } from "../data/types";
import { hourglassSharp, informationCircleSharp} from "ionicons/icons";

interface TiempoRendimientoCardData {
    data:InfoTiempoRendimiento
}

const TiempoRendimientoCard:React.FC<TiempoRendimientoCardData> = (tiempoRendimientoData) => {

    const tiemporend = tiempoRendimientoData.data;

    return(

        <IonCard>
            <IonAccordion>
                <IonItem slot="header">
                    <IonIcon icon={hourglassSharp}/>
                    <IonCardHeader>
                        <IonCardTitle>Tiempo y Rendimiento Académico</IonCardTitle>
                    </IonCardHeader>
                </IonItem>
                <IonCardContent slot="content" style={{"backgroundColor":"red"}}>
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonInput readonly label="Carrera" labelPlacement="stacked" placeholder={tiemporend.carrera}/>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonInput readonly label="Fecha Ingreso" labelPlacement="stacked" placeholder={tiemporend.fecha_ingreso}/>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonInput readonly label="Fecha estimada de Egreso" labelPlacement="stacked" placeholder={tiemporend.fecha_estimada_egreso}/>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonInput readonly label="Promedio" labelPlacement="stacked" placeholder={tiemporend.promedio}/>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonInput readonly label="Total Materias Aprobadas" labelPlacement="stacked" placeholder={tiemporend.total_materias_aprobada}/>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonInput readonly label="Total Materias Reprobadas" labelPlacement="stacked" placeholder={tiemporend.total_materias_reprobadas}/>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonInput readonly label="Total Materias Aprobadas" labelPlacement="stacked" placeholder={tiemporend.total_materias_aprobada}/>
                                </IonCol>
                                <IonCol size="12">
                                    <IonItem lines="inset">
                                        <IonInput  readonly label="Porcentaje Materias Reprobadas" labelPlacement="stacked" placeholder={tiemporend.porcentaje_materias_reprobadas}/>
                                        <IonButton id="porcentaje_pop" slot="end" color="warning"><IonIcon size="100px" icon={informationCircleSharp}/></IonButton>
                                        <IonPopover trigger="porcentaje_pop" side="left" alignment="start">
                                            <IonContent class="ion-padding">
                                                <IonText  color="primary">
                                                Regla de tres 
                                                </IonText><br/><br/>
                                                <IonText>
                                                    100 * materias en total
                                                </IonText><br/>
                                                <IonText>_________________</IonText><br/><br/>
                                                <IonText>materias reprobadas</IonText>
                                            </IonContent>
                                        </IonPopover>
                                    </IonItem>
                                </IonCol>
                                <IonCol size="12">
                                    <p>ART. 71: A los alumnos que hayan acumulado durante su carrera un número de aplazos equivalente al 30% (treinta por ciento) del número de asignaturas de su plan de estudios, se les cancelará automática y definitivamente la matricula (Ref. Art. 67; Estatuto UNE)</p>
                                    <p>ART. 49: Desde el ingreso a la Universidad, el alumno tendrá como plazo máximo para completar el curriculum de la carrera elegida un periodo no mayor al de la duración de la misma más sus tres cuartas partes matemáticas. Al no completar el curriculum en el periodo máximo establecido la matricula se le cancelará automática y definitivamente (Ref. Art. 65; Estatuto UNE).</p>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
               </IonCardContent>
          </IonAccordion>
        </IonCard>
    );
}

export default TiempoRendimientoCard;