import { IonAccordion, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { InfoContacto } from "../data/types";
import { callSharp, personSharp } from "ionicons/icons";
import { parseDate } from "../data/utils";



interface ContactoCardData {
    data:InfoContacto
}

const ContactoCard: React.FC<ContactoCardData> = ({data})=>{

    const noIncluir = [
        'id', 'materias_aprobadas', 'materias_reprobadas'
    ];


    return(

        <IonCard>
            <IonAccordion>
                <IonItem slot='header'>
                    <IonIcon icon={personSharp}/>
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
                                Object.keys(data).map((parametro, index)=>{
                                    const valor = data[parametro as keyof InfoContacto];
                                    if(valor && !noIncluir.includes(parametro)){
                                        return(
                                            <IonCol key={index} sizeXs="12" sizeXl="4" sizeLg="8" sizeMd="8" sizeSm="12">
                                                <IonLabel className="ion-text-capitalize">
                                                    <h2>{parseDate(parametro.replaceAll('_',' '))}</h2>
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