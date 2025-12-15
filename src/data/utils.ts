import { ChangeEvent, SetStateAction, useState } from "react";
import { CustomInputHTMLAttributes, ErrorMessage, InfoResultadoParcial } from "./types";

export const useFormInput = (initialValue?: any) => {

  const [value, setValue] = useState<any>(initialValue);

  const handleChange = async (e: ChangeEvent<HTMLIonInputElement>) => {

    const target = e.target
    const tempValue = await e.currentTarget.value

    if (!isNaN(Number(tempValue)) && (target.type === "number" || target.inputmode === "decimal" || target.inputmode === "numeric")) {
      if (target.max || target.min) {
        if (target.max && target.min) {
          if (Number(target.max) >= Number(tempValue) && Number(target.min) <= Number(tempValue)) {
            setValue(tempValue);
          } else {
            if (tempValue) {
              setValue(tempValue.toString().substring(0, tempValue.toString().length - 2))
            }
          }
        }
      }
    } else if (isNaN(Number(tempValue)) || !(target.type === "number" || target.inputmode === "decimal" || target.inputmode === "numeric")) {

      setValue(tempValue)
    }


  }

  return {
    value,
    reset: (newValue: SetStateAction<any>) => setValue(newValue),
    onIonInput: handleChange,
    onKeyUp: handleChange
  };
}

export const validateForm = (fields: CustomInputHTMLAttributes[]) => {

  let errors: ErrorMessage[] = [];

  fields.forEach(field => {

    if (field.required) {

      const fieldValue = field.state.value;

      if (fieldValue === "") {

        const error: ErrorMessage = {

          id: field.id ?? '',
          message: `Por favor revisa su ${(field.id ?? '').replace(/_/g, " ").toLowerCase()}`,
        };

        errors.push(error);
      }
    }
  });

  return errors;
}

export const getValues = (fields: CustomInputHTMLAttributes[]) => {
  const values = fields.reduce((acc, field) => {
    if (field.state.value != "") {
      acc[field.id!] = field.state.value;
    }
    return acc;
  }, {} as { [key: string]: string });
  return values;
}

export const transformarEvaluacion = (texto: string): number[] => {
  const regex = /\d+/g;
  const matches = texto.match(regex);

  return matches ? matches.map(Number) : [];
}



export const parseDate = (texto: string) => {
  const nuevoTexto: string = texto;


  try {
    const dateObject = new Date(nuevoTexto);
    const textDate = new Intl.DateTimeFormat('es-ES', {

      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'

    }).format(dateObject);
    return textDate;
  } catch (error) {
    console.warn(error);
    return texto;
  }
}

interface EspacioEntreNumerosOpciones {
  texto: string,
  ignorarOtrosNumeros: boolean
}
export const espaciosEntreNumeros = (opciones: EspacioEntreNumerosOpciones) => {
  let resultado = "";
  let numeroEnCurso = "";

  if (!opciones.ignorarOtrosNumeros) {
    // If we're not ignoring other numbers, replace sequences of numbers with a space before each number
    resultado = opciones.texto.replace(/\d+\D+/g, (match) => {
      return match.split('').join(' ') + ' ';
    });
  } else {
    // If we are ignoring other numbers, replace sequences of non-space characters with a space before each number
    resultado = opciones.texto.replace(/(\D)\d+/g, (match, nonNumberChar) => {
      numeroEnCurso = (nonNumberChar || '') + match;
      return numeroEnCurso + ' ';
    });
  }

  // Remove the trailing space
  return resultado.trim();
}

export const isResultadoParcialCompleto = (materiaParcial: InfoResultadoParcial, evaluacion: number[]) => {
  if (materiaParcial) {
    const setDeDatos = new Set(
      Object.keys(materiaParcial).map((v, i, a) => {
        if (i > 0 && i < a.length - 1 && evaluacion.length && evaluacion[i - 1] > 0) {
          return Number(materiaParcial[v]) > 0
        }
        return null;
      }).filter(v => v !== null));
    const valuesArray = Array.from(setDeDatos.values())
    return setDeDatos.size === 1 && valuesArray.find((v, i) => i === 0);
  }
  return false;
}