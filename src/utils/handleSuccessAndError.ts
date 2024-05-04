export const Fail: {[key: string]: {[key: string]: string | number}} = {

    GET: { ERROR: 'Ocurrio un error al obtener el registro', CODE: 500 },
    CREATION: { ERROR: 'Ocurrio un error al crear el registro', CODE: 500 },
    EDIT: { ERROR: 'Ocurrio un error al editar el registro', CODE: 500 },
    DELETE: { ERROR: 'Ocurrio un error al eliminar el registro', CODE: 500 },
    NOT_FOUND: { ERROR: 'Registro no encontrado', CODE: 404 }
    
}

export const Success: {[key: string]: {[key: string]: string | number}} = {

    GET: { SUCCES: 'Registro encontrado con exito', CODE: 200 },
    CREATION: { SUCCESS: 'Registro creado con exito', CODE: 200 },
    EDIT: { SUCCESS: 'Registro editado con exito', CODE: 200 },
    DELETE: { SUCCESS: 'Registro eliminado con exito', CODE: 200 }
    
}

export interface SuccessType {
    SUCCESS: string,
    CODE: number,
}

export interface FailType {
    ERROR: string,
    CODE: number
}


