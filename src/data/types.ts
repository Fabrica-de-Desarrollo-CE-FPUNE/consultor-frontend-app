import { IonInput } from "@ionic/react";


export interface AuthToken {
    token?: string;
}
export interface ErrorMessage {
    id: string,
    message: string
}

export interface CustomInputHTMLAttributes extends React.ComponentProps<typeof IonInput> {
    state: {
        value: any;
        reset: (newValue: React.SetStateAction<any>) => void;
        onIonInput: any;
        onKeyUp: any;
    }
}

export interface KeySearch {
    [key: string]: any
}

export interface InfoPerfil extends InfoEstudiante, InfoContacto, InfoTiempoRendimiento {
}

export interface InfoEstudiante {
    nombre: string,
    apellido: string,
    cedula_de_identidad: string,
}

export interface InfoContacto {
    email: string,
    telefono_particular: string,
    celular: string,

}

export interface InfoTiempoRendimiento {
    carrera: string,
    fecha_ingreso: string,
    fecha_estimada_egreso: string,
    promedio: number,
    materias_aprobadas: number,
    materias_reprobadas: number,
    status_arancel_cero: string,
}

export interface InfoInscripcionesAsistencia {
    materia: string,
    fecha_inscripto: string,
    validez: string,
    grupo: string,
    porc_asistencias: string,
}

export interface InfoUltimosPagos{
    arancel: string,
    vencimiento: string,
    fecha_pago: string,
    importe: string,
    situacion: string
}
export interface InfoResultadoParcial extends InfoEscala, KeySearch {
    materia: string,
    evaluacion?: string,
}

export interface InfoEscala{
    id?: number,
    nombre?: string,
    primera_parcial: string,
    segunda_parcial: string,
    trabajo_practico: string,
    trabajo_laboratorio: string
}

export interface InfoHabilitacionActual{
    materia: string,
    bonificacion: string,
    vencimiento: string,
    periodo: string
}

export interface InfoResultadoEvaluacionFinal{
    materia: string,
    fecha: string,
    final: string,
    bonificacion: string,
    total: string,
    nota: string
}

export interface InfoCalificaciones{
    materia: string,
    semestre: string,
    fecha: string,
    nota: string,
    acta: string
}

export interface InfoMateriaPendiente{
    materia: string,
    semestre: string,
    correlatividad?: string
}
export interface InfoExtension{
    carrera: string,
    actividad: string,
    tipo_actividad: string,
    maxima: string,
    cantidad: string,
    horas: string
}

export interface InfoHorarioClase {
    carrera: string,
    materia: string,
    grupo: string,
    dia: string,
    horario: string,
    programa_estudio: string
}
export interface InfoHorarioDocente {
    carrera: string,
    materia: string,
    grupo: string,
    dia: string,
    horario: string,
    programa_estudio: string
}
export interface InfoLibrosReservas {
    libro: string,
    reserva: string,
    disponible: string,
    estado: string
}
export interface InfoLibrosPrestamo {
    libro: string,
    prestamo: string,
    devolver: string,
    estado: string
}

export interface ErrorMessageServer {
    error: {
        message: string
        errorCode: string
    }
}

export interface TodaLaInfo {
    info_cabecera: InfoEstudiante,
    info_contacto: InfoContacto,
    info_rendimiento: InfoTiempoRendimiento,
    info_inscripciones: InfoInscripcionesAsistencia[],
    info_pagos: InfoUltimosPagos[],
    info_parciales: InfoResultadoParcial[],
    info_habilitaciones: InfoHabilitacionActual[],
    info_finales: InfoResultadoEvaluacionFinal[],
    info_calificaciones: InfoCalificaciones[],
    info_materias_pendientes: InfoMateriaPendiente[],
    info_extensiones: InfoExtension[],
    info_horario_clase: InfoHorarioClase[],
    info_horario_docente: InfoHorarioDocente[],
    info_libros_reservas: InfoLibrosReservas[],
    info_libros_prestamos: InfoLibrosPrestamo[]
}