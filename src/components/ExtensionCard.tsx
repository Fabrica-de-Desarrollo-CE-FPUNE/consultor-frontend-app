import { IonAccordion, IonAccordionGroup, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow } from "@ionic/react";
import { InfoExtension } from "../data/types";
import { analyticsSharp } from "ionicons/icons";



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
                            <h3>{extension.tipo_actividad}</h3>
                        </IonCardTitle>
                    </IonCardHeader>
                </IonItem>
                <IonCardContent slot="content" style={{"backgroundColor":"red"}}>
                    <IonItem className="ion-text-center">
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel className="ion-text-wrap">
                                    <h4>Actividad</h4>
                                    <p>{extension.actividad}</p>
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

    const extension = extensionData.data;

    return(

        <IonCard>
            <IonAccordion>
                <IonItem slot='header'>
                    <IonIcon icon={analyticsSharp}/>
                    <IonCardHeader >
                        <IonCardTitle>Extensión</IonCardTitle>
                    </IonCardHeader>
                    
                </IonItem>

                <IonCardContent slot='content'style={{"backgroundColor":"red"}}>

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