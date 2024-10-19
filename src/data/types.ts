import { IonInput } from "@ionic/react";

export interface ErrorMessage {
    id:string,
    message:string
}

export interface CustomInputHTMLAttributes extends React.ComponentProps<typeof IonInput>{
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

export interface InfoEstudiante{
    nombre:string, 
    apellido:string, 
    cedula:string, 
    cedula_nombre_apellido:string
}

export interface InfoContacto extends KeySearch{
    email:string, 
    telefono_particular:string, 
    celular:string,
    
}

export interface InfoTiempoRendimiento extends KeySearch{
    carrera:string, 
    fecha_ingreso:string,
    fecha_estimada_egreso:string, 
    promedio:string, 
    total_materias_aprobada:string,
    total_materias_reprobadas:string, 
    porcentaje_materias_reprobadas:string, 
    status_arancel_cero:string,
    foto_estudiante:string
}

export interface InfoInscripcionesAsistencia extends KeySearch {
    materia:string,
    fecha_inscripto:string, 
    validez:string, 
    grupo:string,
    porc_asistencias:string,
}

export interface InfoUltimosPagos extends KeySearch {
    arancel:string, 
    vencimiento:string, 
    fecha_pago:string,
    importe:string,
    situacion:string
}
export interface InfoResultadoParcial extends KeySearch{
    materia:string, 
    primera_parcial:string, 
    segunda_parcial:string, 
    trabajo_practico:string, 
    trabajo_laboratorio:string, 
    evaluacion:string,
}

export interface InfoHabilitacionActual extends KeySearch{
     materia:string, 
     bonificacion:string, 
     vencimiento:string,
     periodo:string
}

export interface InfoResultadoEvaluacionFinal extends KeySearch{
    materia:string, 
    fecha:string, 
    final:string, 
    bonificacion:string,
    total:string,
    nota:string
}

export interface InfoCalificaciones extends KeySearch {
    materia:string, 
    semestre:string, 
    fecha:string, 
    nota:string, 
    acta:string
}

export interface InfoMateriaPendiente extends KeySearch{
    materia:string, 
    semestre:string, 
    correlatividad:string
}
export interface InfoExtension extends KeySearch{
    carrera:string,
    actividad:string, 
    tipo_actividad:string, 
    maxima:string, 
    cantidad:string, 
    horas:string
}

export interface InfoHorarioClase{
    carrera:string, 
    materia:string, 
    grupo:string, 
    dia:string, 
    horario:string, 
    programa_estudio:string
}
export interface InfoHorarioDocente{
    carrera:string, 
    materia:string, 
    grupo:string, 
    dia:string, 
    horario:string, 
    programa_estudio:string
}
export interface InfoLibrosReservas {
    libro:string, 
    reserva:string, 
    disponible:string, 
    estado:string
}
export interface InfoLibrosPrestamo {
    libro:string, 
    prestamo:string, 
    devolver:string, 
    estado:string
}

export interface ErrorMessageServer {
    error:{
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