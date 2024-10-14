import { IonContent, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonSelect, IonItem, IonSelectOption, IonText, IonLabel } from "@ionic/react"
import { closeSharp, swapHorizontalSharp } from "ionicons/icons";
import { ErrorMessage, InfoResultadoParcial } from '../data/types';
import { useEffect, useState } from "react";
import { getValues, transformarEvaluacion, validateForm } from "../data/utils";
import { useCalculadoraBonificacionFields, useCalculadoraFinalFields } from "../data/fields";
import CustomField from "./CustomField";


interface CalculadoraSimpleProps {
    cerrar:()=>void,
    evaluaciones: string[]
}

const CalculadoraSimple: React.FC<CalculadoraSimpleProps> = ({cerrar, evaluaciones}) =>{

    const [escala, setEscala] = useState<number[]|undefined>();
    const camposCalculadoraBonificacion = useCalculadoraBonificacionFields({
        materia:'materia',
        primera_parcial:'',
        segunda_parcial:'',
        trabajo_practico:'',
        trabajo_laboratorio:'',  
        evaluacion:'evaluacion'
    } as InfoResultadoParcial, escala??[])
    const [ errors, setErrors ] = useState<ErrorMessage[]>([]);
    const [ bonificacion, setBonificacion ] = useState(0);
    const camposCalculadoraFinal = useCalculadoraFinalFields(bonificacion);
    const [calculadoraFinal, setCalculadoraFinal] = useState(false)
    const [notas, setNotas] = useState<{
        requiere: number;
        porciento: number;
    }[]>([]);


    const handleError = ()=>{
        setBonificacion(0);
        const errors = validateForm(calculadoraFinal?camposCalculadoraFinal:camposCalculadoraBonificacion);
        setErrors(errors);
        if(errors.length===0){
            if(!calculadoraFinal){
                handleCalculadoraBonificacion();
            } else {
                setNotas(handleCalculadoraFinal());
            }
            
        }
    }
    
    const handleCalculadoraBonificacion = () => {
        const valoresFormulario = getValues(camposCalculadoraBonificacion);
        const evaluacionFiltrada = escala ?? [];
        let bonificacionTotal = 0;
      
        Array.from(Object.keys(valoresFormulario)).forEach((parametro: string, index: number) => {
          const valor = Number(valoresFormulario[parametro]);
          bonificacionTotal += valor * evaluacionFiltrada[index] / 100;
        });
      
        setBonificacion(bonificacionTotal);
        camposCalculadoraFinal.forEach((campo) => campo.state.reset(bonificacionTotal.toPrecision(4)));
      };

    const handleCalculadoraFinal = ()=>{

        const notasMinimas = [60,70,81,94];
        const valoresFormulario = getValues(camposCalculadoraFinal);
        const bonificacionNuevo = Number(Object.keys(valoresFormulario).map((v,i)=>i===0? valoresFormulario[v]:null).filter(v=>v!==null)[0])|bonificacion;
        
        return notasMinimas.map((notaMin)=>{

            const requiere = notaMin-bonificacionNuevo
            const porciento = requiere*100/60
            return {
                requiere,
                porciento
            }
            
        })
    }

    useEffect(() => {

        return () => {

            camposCalculadoraBonificacion.forEach((campo) => campo.state.reset(campo.defaultValue));
            camposCalculadoraFinal.forEach(campo=>campo.state.reset(''));
            setErrors([]);

        }
    }, [escala]);

    return(
        <IonContent>
            <IonToolbar>
              <IonTitle>Calculadora</IonTitle>
              <IonButtons slot="end">
                <IonButton color="danger" onClick={()=>cerrar()}>Cerrar<IonIcon icon={closeSharp} /></IonButton>
              </IonButtons>
            </IonToolbar>
            <IonGrid>
                <IonRow>
                    {
                        !calculadoraFinal && (
                            <IonCol size="10" push="1" >
                                <IonItem >
                                    <IonSelect onIonChange={(e)=>setEscala(transformarEvaluacion(e.detail.value))} label="Seleccione una escala" placeholder="Escala" interface="action-sheet">
                                            {
                                                evaluaciones.map((evaluacion, index)=>{
                                                    return (
                                                        <IonSelectOption key={index} value={evaluacion}>{evaluacion}</IonSelectOption>
                                                    )
                                                })
                                            }
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                        )
                    }
                    {
                        !calculadoraFinal && camposCalculadoraBonificacion.map((campo, index)=>{
                            return (
                                <IonCol pull="1" push="1" size="10" key={index}>
                                    <CustomField  field={campo} errors={errors} />
                                </IonCol>
                            )
                        })
                    }
                    {
                        calculadoraFinal && camposCalculadoraFinal.map((campo,index)=>{
                            return (
                                <IonCol pull="1" push="1" size="10" key={index}>
                                    <CustomField field={campo} errors={errors}/>
                                </IonCol>
                            )
                        })
                    }
            
                    {
                     bonificacion>0 && !calculadoraFinal && (
                        <IonCol push="1" size="10" >
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
                {
                    notas.length>0 && notas.map((nota,index)=>{
                        return (
                            <IonCol push="1" size="5" key={index}> 
                                <IonItem>
                                    <IonLabel color={(nota.porciento<=100?'success':'danger')}>
                                        <h5>Para Nota {index+2}</h5>
                                        <p><code>{nota.requiere.toPrecision(4)}</code> de <code>60</code></p>
                                        <p><code>{nota.porciento.toPrecision(4)}%</code> de <code>100%</code></p>
                                    </IonLabel>
                                </IonItem>
                            </IonCol>
                        )
                    })
                }
                    <IonCol size="5" push="1">
                        <IonButton color="primary" expand="block" onClick={()=>handleError()}>Calcular</IonButton>
                    </IonCol>
                    <IonCol size="5" push="1">
                        <IonButton color="tertiary" expand="block" onClick={()=>{
                            camposCalculadoraFinal.forEach(campo=>campo.state.reset(bonificacion));
                            setCalculadoraFinal(!calculadoraFinal)
                           }
                            }>
                            {(!calculadoraFinal?'N. Finales':'Bonificación')} <IonIcon icon={swapHorizontalSharp}/> 
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
            
    )
}

export default CalculadoraSimple;