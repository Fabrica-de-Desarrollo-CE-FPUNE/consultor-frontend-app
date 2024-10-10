import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem,  IonAccordion, IonGrid, IonCol, IonIcon, IonButton, IonPopover, IonContent, IonRow, IonLabel } from "@ionic/react";
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
                        <IonCardTitle>
                            Tiempo y Rendimiento Académico
                        </IonCardTitle>
                    </IonCardHeader>
                </IonItem>
                <IonCardContent slot="content"  style={{"backgroundColor":"red"}} >
                    <IonItem >
                        <IonGrid className="ion-justify-content-center">
                            <IonRow className="ion-text-center ion-justify-content-center ">
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonLabel>
                                        <h2>Carrera</h2>
                                        <p>{tiemporend.carrera}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonLabel>
                                        <h2>Fecha de Ingreso</h2>
                                        <p>{tiemporend.fecha_ingreso}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonLabel>
                                        <h2>Fecha estimada de Egreso</h2>
                                        <p>{tiemporend.fecha_estimada_egreso}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonLabel>
                                        <h2>Promedio</h2>
                                        <p>{tiemporend.promedio}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonLabel>
                                        <h2>Total Materias Aprobadas</h2>
                                        <p>{tiemporend.total_materias_aprobada}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonLabel>
                                        <h2>Total Materias Reprobadas</h2>
                                        <p>{tiemporend.total_materias_reprobadas}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonLabel>
                                        <h2>Total Materias Aprobadas</h2>
                                        <p>{tiemporend.total_materias_aprobada}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonItem lines="inset">
                                        <IonLabel>
                                            <h2>Porcentaje Materias Reprobadas</h2>
                                            <p>{tiemporend.porcentaje_materias_reprobadas}</p>
                                        </IonLabel>
                                        <IonButton id="porcentaje_pop" slot="end" color="warning"><IonIcon size="100px" icon={informationCircleSharp}/></IonButton>
                                        <IonPopover trigger="porcentaje_pop" side="left" alignment="start">
                                            <IonContent class="ion-padding ion-text-center">
                                                <IonLabel color="primary">
                                                    <h2 className="ion-padding-bottom">Regla de Tres</h2>
                                                </IonLabel>
                                                <IonLabel>
                                                    <h4 ><code>100</code> * <code>materias en total</code></h4>
                                                    <p className="ion-padding-bottom">__________________</p>
                                                    <h4>materias reprobadas</h4>
                                                </IonLabel>
                                            </IonContent>
                                        </IonPopover>
                                    </IonItem>
                                </IonCol>
                                <IonCol size="12" className="ion-text-wrap">
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