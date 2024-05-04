export interface config {

    user: string | string | undefined
    host: string | string | undefined
    password: string | string | undefined
    port: any
    database: any
}

interface licencia {
    id_licencia: number,
    tipo: string,
    duracion: number
}

export interface Empleado {
    nombre: string,
    apellido: string,
    dni: number,
}


export interface Vehiculo {
    dominio: string,
    marca: string,
    modelo: string,
    anio: string,
    estado: boolean,
    kilometraje: string,
    id_empleado: number
}


export interface EmpleadoWithLicencia extends Empleado {
    licencia: licencia,
    fecha_emision: string
}


export interface Viaje {
    fecha: string,
    kilometros: number, 
    precio_kilometro: number, 
    id_vehiculo: number,
    id_empleado: number,
}

export interface Salario {
    salario: number,
    periodo: string, 
    id_empleado: number
}
