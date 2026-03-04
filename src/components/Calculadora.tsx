import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { ErrorMessage, InfoEscala, InfoResultadoParcial, KeySearch } from "../data/types";
import CustomField from "./CustomField";
import { closeSharp, swapHorizontalSharp } from "ionicons/icons";
import { EscalaStore } from "../data/EscalaStore";
import { useEscalaFields } from "../data/fields";
import { getValues, validateForm } from "../data/utils";
import { useEffect, useState } from "react";


interface CalculadoraProps {
    materia: string,
    escala?: InfoEscala,
    materiaParcial?: InfoResultadoParcial,
    cerrar: () => void
}

const Calculadora: React.FC<CalculadoraProps> = ({ materia, cerrar, escala, materiaParcial }) => {

    const escalas = EscalaStore.useState(s => s.escalas);
    const [bonificacion, setBonificacion] = useState(0);
    const [errors, setErrors] = useState<ErrorMessage[]>([]);
    const [escalaSelected, setEscalaSelected] = useState<InfoEscala>();
    const escalaFields = useEscalaFields();
    const [notas, setNotas] = useState<{
        requiere: number;
        porciento: number;
    }[]>([]);

    useEffect(() => {
        if (escalas.length > 0 && !escala) {
            setEscalaSelected(escalas[0]);
        } else {
            setEscalaSelected(escala);
        }
    }, [escalas, escala]);

    useEffect(() => {
        if (materiaParcial) {
            console.log("Materia Parcial:", materiaParcial);
            escalaFields.forEach(field => {
                const valorParcial = materiaParcial[field.id as keyof InfoEscala];
                field.state.reset(valorParcial ?? 0);
            });
        }
    }, [materiaParcial]);

    const handleCalculadoraFinal = () => {
        if (escalaSelected) {
            const errores = validateForm(escalaFields);
            setErrors(errores);
            if (errores.length === 0) {
                const notasMinimas = [60, 70, 81, 94];
                const valoresFormulario = getValues(escalaFields) as (InfoEscala & KeySearch);
                const bonificacionNuevo = Object.keys(valoresFormulario).map((key:string) => {
                    const bonificionNumerica = ((valoresFormulario[key] ?? 0) / 100) * ((escalaSelected[key as string as keyof InfoEscala] as number) ?? 0);
                    return bonificionNumerica;
                }).reduce((a, b) => a + b, 0);
                setBonificacion(bonificacionNuevo);
                const notas = notasMinimas.map(notaMin => {
                    const requiere = notaMin - bonificacionNuevo;
                    const porciento = (requiere * 100) / 60;

                    return { requiere, porciento };
                });

                setNotas(notas);
            }
        }
    };

    return (
        <IonContent>
            <IonToolbar>
                <IonTitle>{materia ?? "Simulación de Nota"}</IonTitle>
                <IonButtons slot="end">
                    <IonButton color="danger" onClick={() => cerrar()}>Cerrar<IonIcon icon={closeSharp} /></IonButton>
                </IonButtons>
            </IonToolbar>
            <IonGrid>
                <IonRow>
                    <IonCol size="10" offset="1">
                        <h4>Escala Actual {escalaSelected?.nombre}</h4>
                    </IonCol>
                    {
                        !escala && (
                            <IonCol size="12">
                                <IonItem>
                                    <IonSelect placeholder="Seleccionar Escala" value={escalaSelected}
                                        onIonChange={e => {
                                            setEscalaSelected(e.detail.value);
                                        }}
                                    >
                                        {escalas.map((escalaItem, index) => (
                                            <IonSelectOption key={index} value={escalaItem}>
                                                {escalaItem.nombre ?? `Escala ${index + 1}`}
                                            </IonSelectOption>
                                        ))}
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                        )
                    }
                </IonRow>
                <IonRow>
                    <IonCol size="10" offset="1">
                        <h3>Ingrese su puntuación (%)</h3>
                    </IonCol>
                    {escalaFields.map((field, index) => (
                        <IonCol size="8" key={index} offset="2">
                            <CustomField field={{
                                ...field,
                                disabled: escalaSelected && escalaSelected[field.id as keyof InfoEscala] === 0 
                                || materiaParcial && Number(materiaParcial[field.id as keyof InfoEscala] ?? 0) > 0,
                                required: escalaSelected && escalaSelected[field.id as keyof InfoEscala] !== 0,
                            }} errors={[]} />
                        </IonCol>
                    ))}
                </IonRow>
                <IonRow>
                    {
                        bonificacion > 0 && (
                            <IonCol push="1" size="10" >
                                <IonItem className="ion-text-center">
                                    <IonLabel color={(bonificacion > 37.6 ? 'success' : (bonificacion > 32.4 ? 'warning' : 'danger'))}>
                                        <h5>Tu bonificación es de: <code>{bonificacion.toPrecision(4)}</code></h5>
                                        {(bonificacion > 37.6 ? <h6>Exoneraste con <code>5</code>!</h6> :
                                            (bonificacion > 32.4 ? <h6>Exoneraste con <code>4</code>!</h6>
                                                : <h6>Imposible de exonerar, suerte 😣</h6>))}
                                    </IonLabel>
                                </IonItem>
                            </IonCol>
                        )
                    }
                    {
                        notas.length > 0 && notas.map((nota, index) => {
                            return (
                                <IonCol push="1" size="5" key={index}>
                                    <IonItem>
                                        <IonLabel color={(nota.porciento <= 100  ? 'success' : 'danger')}>
                                            <h5>Para Nota {index + 2}</h5>
                                            <p><code>{nota.requiere.toPrecision(4)}</code> de <code>60</code></p>
                                            <p><code>{nota.porciento.toPrecision(4)}%</code> de <code>100%</code></p>
                                        </IonLabel>
                                    </IonItem>
                                </IonCol>
                            )
                        })
                    }
                </IonRow>

                <IonRow>
                    <IonCol size="5" push="1">
                        <IonButton color="primary" expand="block" onClick={handleCalculadoraFinal}>Calcular</IonButton>
                    </IonCol>
                    <IonCol size="5" push="1">
                        <IonButton color="tertiary" expand="block">
                            Intercambiar Notas<IonIcon icon={swapHorizontalSharp} />
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>

        </IonContent>
    );
}

export default Calculadora;