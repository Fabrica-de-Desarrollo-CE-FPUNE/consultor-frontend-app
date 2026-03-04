import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonAccordion, IonGrid, IonCol, IonIcon, IonButton, IonPopover, IonContent, IonRow, IonLabel } from "@ionic/react";
import { InfoContacto, InfoTiempoRendimiento } from "../data/types";
import { hourglassSharp, informationCircleSharp } from "ionicons/icons";
import { parseDate } from "../data/utils";

interface TiempoRendimientoCardData {
    data: InfoTiempoRendimiento
}

const TiempoRendimientoCard: React.FC<TiempoRendimientoCardData> = ({ data }) => {

    const noIncluir = [
        'foto_estudiante',
        'porcentaje_materias_reprobadas',
        'id', "nombre", "cedula_de_identidad", "celular"
    ];

    return (

        <IonCard>
            <IonAccordion>
                <IonItem slot="header">
                    <IonIcon icon={hourglassSharp} />
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonLabel>
                                <h1>Rendimiento Académico</h1>
                            </IonLabel>
                        </IonCardTitle>
                    </IonCardHeader>
                </IonItem>
                <IonCardContent slot="content">
                    <IonItem >
                        <IonGrid className="ion-justify-content-center">
                            <IonRow className="ion-text-center ion-justify-content-center ">
                                {
                                    Object.keys(data).map((parametro, index) => {
                                        const valor = data[parametro as keyof InfoTiempoRendimiento];
                                        if (valor && !noIncluir.includes(parametro)) {
                                            return (
                                                <IonCol key={index} sizeXl="4" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                                    <IonLabel className="ion-text-capitalize">
                                                        <h2>{parseDate(parametro.replace(/_/g, ' '))}</h2>
                                                        <p>{valor}</p>
                                                    </IonLabel>
                                                </IonCol>
                                            )
                                        }
                                        return null
                                    })
                                }

                                <IonCol sizeXl="2" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                    <IonItem lines="inset">
                                        <IonLabel className="ion-text-capitalize">
                                            <h2>Porcentaje Materias Reprobadas</h2>
                                            <p>{
                                                (data.materias_reprobadas * 100 / (data.materias_aprobadas + data.materias_reprobadas)).toPrecision(3)
                                            } %</p>
                                        </IonLabel>
                                        <IonButton id="porcentaje_pop" slot="end" color="warning"><IonIcon size="100px" icon={informationCircleSharp} /></IonButton>
                                        <IonPopover trigger="porcentaje_pop" side="left" alignment="start">
                                            <IonContent class="ion-padding ion-text-center">
                                                <IonLabel color="primary" className="ion-text-capitalize">
                                                    <h2 className="ion-padding-bottom">Regla de Tres</h2>
                                                </IonLabel>
                                                <IonLabel className="ion-text-capitalize">
                                                    <h4 ><code>(100</code> <b className="ion-text-lowercase">x</b> <code>materias reprobadas)</code></h4>
                                                    <p className="ion-padding-bottom">____________________________</p>
                                                    <h4>materias en total</h4>
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