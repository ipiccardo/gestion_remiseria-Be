import { ViajeModel } from "../models/viajes";
import { Fail } from "../utils/handleSuccessAndError";
import { Viaje } from "../utils/types";
import { Request, Response } from "express";

export class ViajesController {
  /**
   * Obtener todos los viajes
   *
   * @param _req Objeto de solicitud, no se utiliza en este metodo
   * @param res Objeto de respuesta
   * @returns Respuesta JSON con la lista de viajes registrados, mensaje de exito o error y codigo de estado de la respuesta
   */

  static obtenerViajes = async (_req: Request, res: Response) => {
    try {
      const viajes: any = await ViajeModel.obtenerViajes();
      res.status(viajes.CODE).json(viajes);
    } catch (error) {
      res.status(500).json({ ...Fail.GET, error });
    }
  };

  /**
   * Obtener viaje
   *
   * @param req Objeto de solicitud, se espera por params el id del viaje
   * @param res Objeto de respuesta
   * @returns Respuesta JSON con el viaje encontrado, mensaje de exito o error y codigo de estado de la respuesta.
   */

  static obtenerViajePorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const obtenerViaje: any = await ViajeModel.obtenerViaje(parseInt(id));
      res.status(obtenerViaje.CODE).json(obtenerViaje);
    } catch (error) {
      res.status(500).json({ ...Fail.GET, error });
    }
  };

  /**
   * Crear viaje
   *
   * @param req Objeto de solicitud, se espera por params el id del viaje
   * @param res Objeto de respuesta, se espera en el body un objeto del tipo Viaje
   * @returns Respuesta JSON con mensaje de exito o error y codigo de estado de la respuesta.
   */

  static crearViaje = async (req: Request, res: Response) => {
    try {
      const viaje: Viaje = req.body;

      const crearViaje = await ViajeModel.crearViaje(viaje);

      res.status(200).json(crearViaje);
    } catch (error) {
      console.log("ENTRO AL CATCH", error);
      res.status(500).json({ ...Fail.CREATE, error });
    }
  };

  /**
   * Editar viaje
   *
   * @param req Objeto de solicitud, se espera por params el id del viaje
   * @param res Objeto de respuesta, se espera en el body un objeto del tipo Viaje y el id del viaje por params
   * @returns Respuesta JSON con mensaje de exito o error y codigo de estado de la respuesta.
   */

  static editarViaje = async (req: Request, res: Response) => {
    try {
      const viaje: Viaje = req.body;
      const { id } = req.params;

      const editarViaje = await ViajeModel.editarViaje(viaje, parseInt(id));

      res.status(200).json(editarViaje);
    } catch (error) {
      res.status(500).json({ ...Fail.EDIT, error });
    }
  };

  /**
   * Eliminar viaje
   *
   * @param req Objeto de solicitud, se espera por params el id del viaje
   * @param res Objeto de respuesta, se espera el id del viaje por params
   * @returns Respuesta JSON con mensaje de exito o error y codigo de estado de la respuesta.
   */

  static eliminarViaje = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const eliminarViaje: any = await ViajeModel.eliminarViaje(
        parseInt(id),
        "id"
      );

      res.status(eliminarViaje.CODE).json(eliminarViaje);
    } catch (error) {
      res.status(500).json({ ...Fail.DELETE, error });
    }
  };
}
