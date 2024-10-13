import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { ErrorMessage, InfoResultadoParcial } from "../data/types";
import CustomField from "./CustomField";
import { useCalculadoraFields } from "../data/fields";
import { getValues, transformarEvaluacion, validateForm } from "../data/utils";
import { useEffect, useState } from "react";
import { closeSharp } from "ionicons/icons";


interface CalculadoraProps {
    materia?:string,
    infoParcial: InfoResultadoParcial,
    cerrar: ()=>void
}

const Calculadora: React.FC<CalculadoraProps> = ({materia, infoParcial, cerrar})=>{

    const evaluacionParcial = transformarEvaluacion(infoParcial.evaluacion);
    const camposCalculadora = useCalculadoraFields(infoParcial, evaluacionParcial);
    const [ errors, setErrors ] = useState<ErrorMessage[]>([]);
    const [ bonificacion, setBonificacion ] = useState(0)

    const handleError = ()=>{
        setBonificacion(0);
        const errors = validateForm(camposCalculadora);
        setErrors(errors);
        if(errors.length===0){
            
            const valoresFormulario = getValues(camposCalculadora);
            const evaluacionFiltrada = evaluacionParcial.filter(evaluacion=>evaluacion!==0);
            let bonificacionTotal = 0

            Object.keys(valoresFormulario).values().forEach((parametro,index)=>{
                const valor = Number(valoresFormulario[parametro])
                bonificacionTotal = bonificacionTotal + valor* evaluacionFiltrada[index] / 100;
            });

            setBonificacion(bonificacionTotal)
        }
    }

    useEffect(() => {

        return () => {

            camposCalculadora.forEach((campo) => campo.state.reset(campo.defaultValue));
            
            setErrors([]);

        }
    }, []);

    return(
        <IonContent>
            <IonToolbar>
              <IonTitle>{materia??"Simulación de Nota"}</IonTitle>
              <IonButtons slot="end">
                <IonButton color="danger" onClick={()=>cerrar()}>Cerrar<IonIcon icon={closeSharp} /></IonButton>
              </IonButtons>
            </IonToolbar>
            <IonGrid>
                <IonRow>
                {
                    camposCalculadora.map((campo, index)=>{
                        return (
                            <IonCol pull="1" push="1" size="10" key={index}>
                                <CustomField  field={campo} errors={errors} />
                            </IonCol>
                        )
                    })
                }
                    <IonCol size="8" push="2">
                        <IonButton expand="block" onClick={()=>handleError()}>Calcular</IonButton>
                    </IonCol>
                {
                    bonificacion>0 && (
                        <IonCol size="12" >
                            <IonItem className="ion-text-center">
                                <IonLabel color={(bonificacion>37.6?'success':(bonificacion>32.4?'warning':'danger'))}>
                                    <h5>Tu bonificación es de: <code>{bonificacion.toPrecision(4)}</code></h5>
                                    {(bonificacion>37.6?<h6>Exoneraste con <code>5</code>!</h6>:
                                        (bonificacion>32.4?<h6>Exoneraste con <code>4</code>!</h6>
                                        :<h6>Imposible de exonerar, suerte 😣</h6>))}
                                </IonLabel>
                            </IonItem>
                        </IonCol>
                    )
                }
                </IonRow>
            </IonGrid>
            
        </IonContent>
    );
}

export default Calculadora;