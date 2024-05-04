import express from "express";
import { VehiculosController } from "../controllers/vehiculosController";
import { validarCampos } from "../middlewares/validarCampos";
import { check } from "express-validator";

export const vehiculosRouter = express.Router();

vehiculosRouter.get("/", VehiculosController.getVehiculos);
vehiculosRouter.get(
  "/empleado/:id",
  [check("id", "El parametro debe ser un numero").isNumeric(), validarCampos],
  VehiculosController.getVehiculosPorEmpleado
);
vehiculosRouter.post(
  "/crear",

  [
    check("dominio", "El dominio es obligatorio.").not().isEmpty(),
    check("marca", "La marca es obligatoria y debe ser un texto.")
      .not()
      .isEmpty()
      .isString(),
    check("modelo", "El modelo es obligatorio y debe ser un texto.")
      .not()
      .isEmpty()
      .isString(),
    check("anio", "El año es obligatorio y debe ser un numero.")
      .not()
      .isEmpty()
      .isNumeric(),
    check("kilometraje", "El kilometraje es obligatorio y debe ser un numero.")
      .not()
      .isEmpty()
      .isNumeric(),
    check("estado", "El estado debe ser un booleano.").isBoolean(),

    validarCampos,
  ],
  VehiculosController.crearVehiculo
);
vehiculosRouter.put(
  "/editar/:id",
  [
    check("id", "El parametro debe ser un numero").isNumeric(),
    check("dominio", "El dominio es obligatorio.").not().isEmpty(),
    check("marca", "La marca es obligatoria y debe ser un texto.")
      .not()
      .isEmpty()
      .isString(),
    check("modelo", "El modelo es obligatorio y debe ser un texto.")
      .not()
      .isEmpty()
      .isString(),
    check("anio", "El año es obligatorio y debe ser un numero.")
      .not()
      .isEmpty()
      .isNumeric(),
    check("kilometraje", "El kilometraje es obligatorio y debe ser un numero.")
      .not()
      .isEmpty()
      .isNumeric(),
    check("estado", "El estado debe ser un booleano.").isBoolean(),
    validarCampos,
  ],

  VehiculosController.editarVehiculo
);
vehiculosRouter.delete(
  "/eliminar/:id",
  [check("id", "El parametro debe ser un numero").isNumeric(), validarCampos],
  VehiculosController.eliminarVehiculo
);
