import express from "express";
import { ViajesController } from "../controllers/viajesController";
import { validarCampos } from "../middlewares/validarCampos";
import { check } from "express-validator";

export const viajesRouter = express.Router();

viajesRouter.get("/", ViajesController.obtenerViajes);

viajesRouter.get(
  "/viaje/:id",
  [check("id", "El parametro debe ser un numero").isNumeric(), validarCampos],
  ViajesController.obtenerViajePorId
);

viajesRouter.post(
  "/crear",
  [
    check("fecha", "La fecha del viaje es requerida.").not().isEmpty(),
    check("kilometros", "El kilometraje es requerido y debe ser un numero.")
      .not()
      .isEmpty()
      .isNumeric(),
    check(
      "id_vehiculo",
      "El id del vehiculo es requerido y debe ser un numero."
    )
      .not()
      .isEmpty()
      .isNumeric(),
    check(
      "id_empleado",
      "El id del empleado es requerido y debe ser un numero."
    )
      .not()
      .isEmpty()
      .isNumeric(),
    validarCampos,
  ],
  ViajesController.crearViaje
);

viajesRouter.put(
  "/editar/:id",

  [
    check("id", "El parametro debe ser un numero").isNumeric(),
    check("fecha", "La fecha del viaje es requerida.").not().isEmpty(),
    check("kilometros", "El kilometraje es requerido y debe ser un numero.")
      .not()
      .isEmpty()
      .isNumeric(),
    check(
      "id_vehiculo",
      "El id del vehiculo es requerido y debe ser un numero."
    )
      .not()
      .isEmpty()
      .isNumeric(),
    check(
      "id_empleado",
      "El id del empleado es requerido y debe ser un numero."
    )
      .not()
      .isEmpty()
      .isNumeric(),
    validarCampos,
  ],

  ViajesController.editarViaje
);

viajesRouter.delete(
  "/eliminar/:id",
  [check("id", "El parametro debe ser un numero").isNumeric()],

  ViajesController.eliminarViaje
);
