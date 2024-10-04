import { IonAccordion, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { InfoContacto } from "../data/types";
import { callSharp } from "ionicons/icons";



interface ContactoCardData {
    data:InfoContacto
}

const ContactoCard: React.FC<ContactoCardData> = (contactoData)=>{

    const contacto = contactoData.data;

    return(

        <IonCard>
            <IonAccordion>
                <IonItem slot='header'>
                    <IonIcon icon={callSharp}/>
                    <IonCardHeader >
                        <IonCardTitle>Contacto</IonCardTitle>
                    </IonCardHeader>
                    
                </IonItem>

                <IonCardContent slot='content'style={{"backgroundColor":"red"}}>

                <IonItem>
                    <IonGrid>
                        <IonRow>
                            <IonCol sizeXs="12" sizeXl="4" sizeLg="8" sizeMd="8" sizeSm="12">
                                <IonLabel>
                                    <h2>Email</h2>
                                    <p>{contacto.email}</p>
                                </IonLabel>
                                
                            </IonCol>
                            <IonCol sizeXs="12" sizeXl="4" sizeLg="4" sizeMd="4" sizeSm="12">
                                <IonLabel>
                                    <h2>T. Particular</h2>
                                    <p>{contacto.telefono_particular}</p>
                                </IonLabel>
                            </IonCol>
                            <IonCol sizeXs="12" sizeXl="4" sizeLg="4" sizeMd="4" sizeSm="12">
                                <IonLabel>
                                    <h2>Celular</h2>
                                    <p>{contacto.celular}</p>
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

export default ContactoCard;