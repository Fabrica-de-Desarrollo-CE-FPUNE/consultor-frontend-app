import { primerasLetrasMayusculas, useFormInput } from './utils';
import { CustomInputHTMLAttributes, KeySearch } from './types';


export const useLoginFields = ():CustomInputHTMLAttributes[] => {
    const campos:CustomInputHTMLAttributes [] = [
        {
            id: 'usuario',
            name: 'usuario',
            inputMode:"text",
            type:'text',
            title:'Usuario',
            placeholder:'Ingrese su usuario',
            required:true,
            state: useFormInput(),
        },
        {
            id: 'clave',
            name: 'clave',
            type:'password',
            title:'Clave',
            placeholder:'Ingrese su clave',
            required:true,
            state: useFormInput(),
        },
    ];
    return campos;
}

export const useCalculadoraFinalFields = (bonificacion?:number) => {
    const calculadoraFinalField:CustomInputHTMLAttributes[] = [
        {
            id:'bonificacion',
            name:'bonificacion',
            title:'Bonificación',
            type: 'number',
            inputMode: 'decimal',
            min:'0',
            max:'40',
            placeholder:'Ingrese su Bonificación',
            required:true,
            defaultValue:bonificacion,
            state: useFormInput(bonificacion)
    
        }
    ]
    return calculadoraFinalField;
}

export const useCalculadoraBonificacionFields = (evaluacionesData:KeySearch, evaluacionMax:number[]):CustomInputHTMLAttributes[] => {
    const evaluacionMaxRefact = [...evaluacionMax]
    evaluacionMaxRefact.pop();
    
    
    return Object.keys(evaluacionesData).map((parametro,index)=>{
        const indexEscala = index-1; //Debido a que no consideraremos a materias
        const valorEvaluacion = evaluacionesData[parametro];
        

        if(!isNaN(Number(valorEvaluacion))){
            
            const noSeEvalua = evaluacionMaxRefact[indexEscala] === 0 || !evaluacionMaxRefact[indexEscala];
            const tituloParametro = primerasLetrasMayusculas(parametro.replace(/_/g," "));
            const defaultValue = (!noSeEvalua?(valorEvaluacion!=""?valorEvaluacion:''):"");
            const hayNota = (defaultValue === valorEvaluacion 
                && (valorEvaluacion !== '0' && defaultValue!== ""));

            const field: CustomInputHTMLAttributes = {
                id:parametro,
                name:tituloParametro,
                inputMode:'decimal',
                type:'number',
                min:'0',
                max:'100',
                title: `${tituloParametro} ${hayNota?'(Porcentaje Oficial)':''}`,
                placeholder:(!noSeEvalua?`Ingrese valor para ${tituloParametro}`:`${tituloParametro} no se evalúa.`),
                required: !noSeEvalua,
                disabled: noSeEvalua || hayNota ,
                defaultValue: defaultValue,
                state: useFormInput(defaultValue)
            }
            return field
        }
        return null
    }).filter(field=>field!==null);
}