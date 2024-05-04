import express from 'express';
import { validarCampos } from '../middlewares/validarCampos';
import { check } from 'express-validator'
import { EmpleadosController } from '../controllers/empleadosController';

export const empleadosRouter = express.Router()

empleadosRouter.get('/', EmpleadosController.getEmpleados)
empleadosRouter.get('/:id',
    [
        check('id', 'El parametro debe ser un numero').isNumeric(),
        validarCampos
    ],
    EmpleadosController.getEmpleado
)

empleadosRouter.post('/crear',
    [
        check("nombre", "El nombre del empleado es obligatorio").not().isEmpty(),
        check("apellido", "El nombre del empleado es obligatorio").not().isEmpty(),
        check("dni", "El dni del empleado es obligatorio y debe ser un numero").not().isEmpty().isNumeric(),
        validarCampos
    ],
    EmpleadosController.crearEmpleado
)

empleadosRouter.put('/editar/:id',
    [
        check("nombre", "El nombre del empleado es obligatorio").not().isEmpty(),
        check("apellido", "El nombre del empleado es obligatorio").not().isEmpty(),
        check("dni", "El dni del empleado es obligatorio y debe ser un numero").not().isEmpty().isNumeric(),
    ],
    EmpleadosController.editarEmpleado
)

empleadosRouter.delete('/eliminar/:id',
    [
        check('id', 'El parametro debe ser un numero').isNumeric(),
        validarCampos
    ],

    EmpleadosController.eliminarEmpleado
)
