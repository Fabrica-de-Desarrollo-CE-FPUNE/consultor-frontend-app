import { IonAccordion, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { InfoContacto } from "../data/types";
import { callSharp } from "ionicons/icons";
import { primerasLetrasMayusculas } from "../data/utils";



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
                        <IonCardTitle>
                            <IonLabel>
                                <h1>Contacto</h1>
                            </IonLabel>
                        </IonCardTitle>
                    </IonCardHeader>
                    
                </IonItem>

                <IonCardContent slot='content'>

                <IonItem>
                    <IonGrid>
                        <IonRow>
                            {
                                Object.keys(contacto).map((parametro, index)=>{
                                    const valor = contacto[parametro]
                                    if(valor){
                                        return(
                                            <IonCol key={index} sizeXs="12" sizeXl="4" sizeLg="8" sizeMd="8" sizeSm="12">
                                                <IonLabel>
                                                    <h2>{primerasLetrasMayusculas(parametro)}</h2>
                                                    <p>{valor}</p>
                                                </IonLabel>
                                            </IonCol>
                                        )
                                    }
                                    return null
                                })
                            }
                        </IonRow>
                    </IonGrid>
                </IonItem>

            </IonCardContent>
          </IonAccordion>
        </IonCard>
    );
}

export default ContactoCard;