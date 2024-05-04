import { VehiculosModel } from "../models/vehiculos";
import { Request, Response } from "express";
import { Fail } from "../utils/handleSuccessAndError";
import { Vehiculo } from "../utils/types";

export class VehiculosController {
  /**
   * Obtener los vehiculos asignados y no asignados
   *
   * @param _req Objeto de solicitud, no se utiliza en este metodo
   * @param res Objeto de respuesta
   * @returns Respuesta JSON con la lista de vehiculos, mensaje de exito o error y codigo de estado de la respuesta.
   */

  static getVehiculos = async (_req: Request, res: Response) => {
    try {
      const vehiculos = await VehiculosModel.getVehiculos();
      res.status(200).json(vehiculos);
    } catch (error) {
      res.status(500).json({ ...Fail.GET, error });
    }
  };

  /**
   * Obtener los vehiculos asociados a un empleado
   *
   * @param res Objeto de respuesta
   * @param req Objeto de solicutud, se espera por params el id id del empleado
   * @returns Devuelve todos los vehiculos asignados a un empleado, mensaje de exito o error y codigo de estado de la respuesta.
   */

  static getVehiculosPorEmpleado = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const vehiculosPorEmpleado: any =
        await VehiculosModel.getVehiculosPorEmpleado(parseInt(id));

      res.status(vehiculosPorEmpleado.CODE).json(vehiculosPorEmpleado);
    } catch (error) {
      res.status(500).json({ ...Fail.GET, error });
    }
  };

  /**
   * Creacion de vehiculo
   *
   * @param req Objeto de solicitud, en el body de espera el objeto de tipo Vehiculo
   * @param res Objeto de respuesta
   * @returns Devuelve mensaje de exito o error y codigo de estado de la respuesta.
   */

  static crearVehiculo = async (req: Request, res: Response) => {
    const vehiculo: Vehiculo = req.body;

    try {
      const crearVehiculos: any = await VehiculosModel.crearVehiculo(vehiculo);

      res.status(200).json(crearVehiculos);
    } catch (error) {
      res.status(500).json({ ...Fail.CREATION, error });
    }
  };

  /**
   * Editar vehiculo
   *
   * @param req Objeto de solicitud, en el body de espera el objeto de tipo Vehiculo y el id del vehiculo por params
   * @param res Objeto de respuesta
   * @returns Devuelve mensaje de exito o error y codigo de estado de la respuesta.
   */

  static editarVehiculo = async (req: Request, res: Response) => {
    try {
      const vehiculo: Vehiculo = req.body;
      const { id } = req.params;

      const editarVehiculo: any = await VehiculosModel.editarVehiculo(
        vehiculo,
        parseInt(id)
      );

      res.status(editarVehiculo.CODE).json(editarVehiculo);
    } catch (error) {
      res.status(500).json({ ...Fail.EDIT, error });
    }
  };

  /**
   * Eliminar vehiculo
   *
   * @param req Objeto de solicitud, se espera el id del vehiculo por params
   * @param res Objeto de respuesta
   * @returns Devuelve mensaje de exito o error y codigo de estado de la respuesta.
   */

  static eliminarVehiculo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const eliminarVehiculo: any = await VehiculosModel.eliminarVehiculo(
        parseInt(id)
      );

      res.status(eliminarVehiculo.CODE).json(eliminarVehiculo);
    } catch (error) {
      res.status(500).json({ ...Fail.DELETE, error });
    }
  };
}
