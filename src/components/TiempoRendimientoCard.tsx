import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem,  IonAccordion, IonGrid, IonCol, IonIcon, IonButton, IonPopover, IonContent, IonRow, IonLabel } from "@ionic/react";
import { InfoTiempoRendimiento } from "../data/types";
import { hourglassSharp, informationCircleSharp} from "ionicons/icons";
import { primerasLetrasMayusculas } from "../data/utils";

interface TiempoRendimientoCardData {
    data:InfoTiempoRendimiento
}

const TiempoRendimientoCard:React.FC<TiempoRendimientoCardData> = (tiempoRendimientoData) => {

    const tiemporend = tiempoRendimientoData.data;

    const noIncluir = [
        tiemporend.foto_estudiante,
        tiemporend.porcentaje_materias_reprobadas,
    ];
    
    return(

        <IonCard>
            <IonAccordion>
                <IonItem slot="header">
                    <IonIcon icon={hourglassSharp}/>
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
                                    Object.keys(tiemporend).map((parametro, index) =>{
                                        const valor = tiemporend[parametro] as string|null;
                                        if(valor && !noIncluir.includes(valor)){
                                            return (
                                                <IonCol key={index} sizeXl="4" sizeLg="3" sizeMd="4" sizeXs="12" sizeSm="4">
                                                    <IonLabel>
                                                        <h2>{primerasLetrasMayusculas(parametro.replace(/_/g,' '))}</h2>
                                                        <p>{(valor).substring(valor.length-1,valor.length)==='.'?(valor).substring(0,valor.length-1):valor}</p>
                                                    </IonLabel>
                                                </IonCol>
                                            )
                                        }
                                        return null
                                    })
                                }
                                
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