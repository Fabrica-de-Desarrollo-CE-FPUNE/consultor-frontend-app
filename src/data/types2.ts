import { KeySearch } from "./types";

export interface InfoMateriaAllDetalles extends KeySearch{
    id:                    number;
    porcentaje_asistencia: number;
    grupo:                 string;
    materiaCarrera:        MateriaCarrera;
    periodo:               Periodo;
    resultadoParcial:      Escala;
    examenesFinales:       any[];
    escala:                Escala;
}

export interface Escala extends KeySearch {
    primera_parcial:     number;
    segunda_parcial:     number;
    trabajo_practico:    number;
    trabajo_laboratorio: number;
    id:                  number;
    nombre?:             string;
}

export interface MateriaCarrera {
    id:       number;
    semestre: number;
    materia:  Materia;
}

export interface Materia {
    id:     number;
    nombre: string;
    semestre: number;
}

export interface Periodo {
    id:                number;
    nombre:            string;
    fecha_inscripcion: Date;
    fecha_vigencia:    Date;
}