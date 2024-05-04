import { EmpleadoModel } from "../models/empleados";
import { Fail } from "../utils/handleSuccessAndError";
import { Request, Response } from "express";
import { EmpleadoWithLicencia } from "../utils/types";

export class EmpleadosController {
  /**
   * Obtener todos los empleados registrados
   * @param _req Objeto de solicitud, no se utiliza en este metodo
   * @param res Objeto de respuesta.
   * @returns Devuelve todos los empleados registrados, mensaje de exito o error y codigo de estado de la respuesta.
   */

  static getEmpleados = async (_req: Request, res: Response) => {
    try {
      const empleados = await EmpleadoModel.getEmpleados();

      res.status(200).json(empleados);
    } catch (error) {
      res.status(500).json({ ...Fail.GET, error });
    }
  };

  /**
   * Obtener solo un empleado
   * @param req Objeto de solicitud, se espera el id del empleado a buscar por params
   * @param res Objeto de respuesta.
   * @returns Devuelve el empleado buscado, mensaje de exito o error y codigo de estado de la respuesta.
   */

  static getEmpleado = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const empleados: any = await EmpleadoModel.getEmpleado(parseInt(id));

      res.status(empleados.CODE).json(empleados);
    } catch (error) {
      res.status(500).json({ ...Fail.GET, error });
    }
  };

  /**
   * Crea un empleado y asocia la licencia que posee
   * @param req Objeto de solicitud, se espera en el body un objeto del tipo EmpleadoWithLicencia
   * @param res Objeto de respuesta.
   * @returns Devuelve mensaje de exito o error y codigo de estado de la respuesta.
   */

  static crearEmpleado = async (req: Request, res: Response) => {
    try {
      const empleadoLicencia: EmpleadoWithLicencia = req.body;
      const empleado = await EmpleadoModel.crearEmpleado(empleadoLicencia);

      res.status(200).json(empleado);
    } catch (error) {
      res.status(500).json({ ...Fail.CREATION, error });
    }
  };

  /**
   * Edita un empleado y asocia la licencia que posee
   * @param req Objeto de solicitud, se espera en el body un objeto del tipo EmpleadoWithLicencia y por params el id del empleado a editar
   * @param res Objeto de respuesta.
   * @returns Devuelve mensaje de exito o error y codigo de estado de la respuesta.
   */

  static editarEmpleado = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const { id } = req.params;

      const editar = await EmpleadoModel.editarEmpleado(body, parseInt(id));

      res.status(200).json(editar);
    } catch (error) {
      res.status(500).json({ ...Fail.EDIT, error });
    }
  };

  /**
   * Elimina un empleado
   * @param req Objeto de solicitud, se espera por params el id del empleado a eliminar
   * @param res Objeto de respuesta.
   * @returns Devuelve mensaje de exito o error y codigo de estado de la respuesta.
   */

  static eliminarEmpleado = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      console.log(id, "id");

      const eliminar = await EmpleadoModel.eliminarEmpleado(parseInt(id));

      res.status(200).json(eliminar);
    } catch (error) {
      res.status(500).json({ ...Fail.DELETE, error });
    }
  };
}
