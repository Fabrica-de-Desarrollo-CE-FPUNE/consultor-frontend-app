import { IonAccordion, IonAccordionGroup, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow } from "@ionic/react";
import { InfoLibrosPrestamo, InfoLibrosReservas } from '../data/types';
import { bookmarkSharp, bookSharp, librarySharp } from "ionicons/icons";

interface ReservasCardData {
    librosReservas: InfoLibrosReservas[];
    librosPrestamos: InfoLibrosPrestamo[];
}

interface ReservarMiniCardData {
    data: InfoLibrosReservas | InfoLibrosPrestamo;
}

const ReservarMiniCard: React.FC<ReservarMiniCardData> = ({ data }) => {

    const retornarPorKeys = (info: InfoLibrosPrestamo | InfoLibrosReservas) => {
        // Determinar el tipo y extraer las propiedades diferentes
        const diferencias: Partial<Record<keyof (InfoLibrosPrestamo & InfoLibrosReservas), string>> = {};
    
        if ('prestamo' in info) { // Si es InfoLibrosPrestamo
            diferencias.prestamo = info.prestamo;
            diferencias.devolver = info.devolver;
        } else { // Si es InfoLibrosReservas
            diferencias.reserva = info.reserva;
            diferencias.disponible = info.disponible;
        }
    
        return Object.entries(diferencias).map(([key, value]) => (
            value !== undefined && value !== null ? (
                <IonCol key={key}>
                    <IonLabel>
                        <h4>{key.toLocaleUpperCase()}</h4>
                        <p>{value}</p>
                    </IonLabel>
                </IonCol>
            ) : null
        ));
    };

    return (
        <IonCard>
            <IonAccordion>
                <IonItem slot="header">
                    <IonCardHeader>
                        <IonCardTitle>
                            <h3>{data.libro}</h3>
                        </IonCardTitle>
                        <IonCardSubtitle>
                            {data.estado}
                        </IonCardSubtitle>
                    </IonCardHeader>
                </IonItem>
                <IonCardContent slot="content">
                    <IonGrid>
                        <IonRow>
                            {retornarPorKeys(data)}
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonAccordion>
        </IonCard>
    );
}

const ReservasCard: React.FC<ReservasCardData> = ({ librosPrestamos, librosReservas }) => {
    return (
        <IonCard>
            <IonAccordion>
                <IonItem slot="header">
                    <IonIcon icon={librarySharp} />
                    <IonCardHeader>
                        <IonCardTitle>Biblioteca</IonCardTitle>
                    </IonCardHeader>
                </IonItem>
                <IonCardContent slot='content'>
                    <IonAccordionGroup>
                        <IonCard>
                            <IonAccordion>
                                <IonItem slot="header">
                                    <IonIcon icon={bookSharp}/>
                                    <IonCardHeader>
                                        <IonCardTitle>Reservas</IonCardTitle>
                                    </IonCardHeader>
                                </IonItem>
                                <IonCardContent slot="content">
                                    <IonAccordionGroup>
                                        {librosReservas.map((libro, index) => (
                                            <ReservarMiniCard key={index} data={libro} />
                                        ))}
                                    </IonAccordionGroup>
                                </IonCardContent>
                            </IonAccordion>
                        </IonCard>
                        <IonCard>
                            <IonAccordion>
                                <IonItem slot="header">
                                    <IonIcon icon={bookmarkSharp}/>
                                    <IonCardHeader>
                                        <IonCardTitle>Prestamos</IonCardTitle>
                                    </IonCardHeader>
                                </IonItem>
                                <IonCardContent slot="content">
                                    <IonAccordionGroup>
                                        {librosPrestamos.map((libro, index) => (
                                            <ReservarMiniCard key={index} data={libro} />
                                        ))}
                                    </IonAccordionGroup>
                                </IonCardContent>
                            </IonAccordion>
                        </IonCard>
                    </IonAccordionGroup>
                </IonCardContent>
            </IonAccordion>
        </IonCard>
    );
}

export default ReservasCard;
