import { IonAccordion, IonAccordionGroup, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow } from "@ionic/react";
import { InfoExtension } from "../data/types";
import { analyticsSharp } from "ionicons/icons";
import { primerasLetrasMayusculas } from "../data/utils";



interface ExtensionCardData {
    data:InfoExtension[]
}

interface MiniExtensionCard {
    data:InfoExtension
}

const MiniExtensionCard = (miniExtension:MiniExtensionCard)=>{
    const extension = miniExtension.data;
    return(
        <IonCard>
            <IonAccordion>
                <IonItem slot="header">
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonLabel>
                                <h3>{extension.tipo_actividad}</h3>
                            </IonLabel>
                        </IonCardTitle>
                    </IonCardHeader>
                </IonItem>
                <IonCardContent slot="content">
                    <IonItem className="ion-text-center">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel className="ion-text-wrap">
                                    <h4>Actividad</h4>
                                    <p>{primerasLetrasMayusculas(extension.actividad)}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonLabel>
                                        <h4>Horas Completadas</h4>
                                        <p>{extension.horas}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonLabel >
                                        <h4>H. Máxima</h4>
                                        <p>{extension.maxima}</p>
                                    </IonLabel>
                                </IonCol>
                            </IonRow>
                        </IonGrid>                
                    </IonItem>
                </IonCardContent>
            </IonAccordion>
        </IonCard>
    )
};

const ExtensionCard: React.FC<ExtensionCardData> = (extensionData)=>{

    const extension = [...extensionData.data];
    const resultado = extension.pop();

    return(

        <IonCard>
            <IonAccordion>
                <IonItem slot='header'>
                    <IonIcon icon={analyticsSharp}/>
                    <IonCardHeader >
                        <IonCardTitle>
                            <IonLabel>
                                <h1>Extensión</h1>
                            </IonLabel>
                        </IonCardTitle>
                    </IonCardHeader>
                    
                </IonItem>

                <IonCardContent slot='content'>

                <IonItem>
                    <IonAccordionGroup expand="compact">
                        <IonGrid>
                            <IonRow>                          
                            {
                               extension.map((value,i)=>{
                                return(
                                    <IonCol key={i} sizeXl="4" sizeLg="6" sizeMd="6"  sizeSm="12" sizeXs="12">
                                        <MiniExtensionCard data={value}/>
                                    </IonCol>
                                )
                               })
                            }
                            {
                                resultado && (
                                    <IonCol pull="1" size="10">
                                        <IonItem className="ion-text-center">
                                            <IonLabel>
                                                <h4>{resultado.carrera}</h4>
                                            </IonLabel>
                                            <IonLabel color={(Number(resultado.tipo_actividad)>=50?'success':'warning')}>
                                                <h5><code>{resultado.tipo_actividad}</code> horas</h5>
                                            </IonLabel>
                                        </IonItem>
                                    </IonCol>
                                )
                            }
                            </IonRow>
                        </IonGrid>
                    </IonAccordionGroup>
                </IonItem>

            </IonCardContent>
          </IonAccordion>
        </IonCard>
    );
}

export default ExtensionCard;