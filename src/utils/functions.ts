import { EmpleadoWithLicencia } from "./types";

export const checkDate = (empleado: EmpleadoWithLicencia) => {
    const fechaEmision: any = new Date(empleado.fecha_emision)

    const fechaActual: any = new Date();

    const diferencia: number = fechaActual - fechaEmision

    const milisegundosEnAnio = 1000 * 60 * 60 * 24 * 365;
    const aniosPasados = diferencia / milisegundosEnAnio;

    return aniosPasados < empleado.licencia.duracion
}


export const getAnioyMes = (fecha: string) => {

    const date = new Date(fecha);
    const anio = date.getFullYear();
    const mes = date.getMonth() + 1;
    const dia = 1


    return `${anio}-0${mes}-0${dia}`
}
