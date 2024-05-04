import pool from "../database/database";
import { Fail, Success } from "../utils/handleSuccessAndError";
import { Vehiculo } from "../utils/types";
import { ViajeModel } from "./viajes";

export class VehiculosModel {
  static estadoVehiculo = async (idVehiculo: number) => {
    try {
      const estadoVehiculo = await pool.query(
        "SELECT estado FROM vehiculo WHERE id = $1",
        [idVehiculo]
      );

      return estadoVehiculo.rows[0].estado;
    } catch (error) {
      throw error;
    }
  };

  static actualizarKilometraje = async (
    kilometrosRecorridos: number,
    idVehiculo: number
  ) => {
    try {
      const editarVehiculo = await pool.query(
        `
                UPDATE vehiculo SET kilometros_restantes = kilometros_restantes + $1 WHERE vehiculo.id = $2 RETURNING kilometros_restantes
                `,
        [kilometrosRecorridos, idVehiculo]
      );

      if (editarVehiculo.rows[0].kilometros_restantes >= 15000) {
        const desabilitarVehiculo = await pool.query(
          `
                    UPDATE vehiculo SET estado = $1, kilometros_restantes = $2, kilometraje = kilometraje + $3 WHERE vehiculo.id = $4
                    `,
          [false, 0, editarVehiculo.rows[0].kilometros_restantes, idVehiculo]
        );

        if (desabilitarVehiculo.rowCount) {
          return { ...Success.EDIT };
        } else {
          return Fail.NOT_FOUND;
        }
      }

      if (editarVehiculo.rowCount) {
        return { ...Success.EDIT };
      } else {
        return Fail.NOT_FOUND;
      }
    } catch (error) {
      throw error;
    }
  };

  static getVehiculos = async () => {
    try {
      const vehiculos = await pool.query(
        `SELECT empleado.nombre, empleado.apellido, vehiculo.marca, vehiculo.kilometraje, vehiculo.estado, vehiculo.modelo, vehiculo.dominio, vehiculo.anio, vehiculo.id, empleado.id as id_empleado
                FROM vehiculo 
                LEFT JOIN empleado ON vehiculo.id_empleado = empleado.id `
      );
      return { ...Success.GET, VEHICULOS: vehiculos.rows };
    } catch (error) {
      throw error;
    }
  };

  static getVehiculosPorEmpleado = async (idEmpleado: number) => {
    try {
      const vehiculosPorEmpleado = await pool.query(
        `SELECT vehiculo.marca, vehiculo.kilometraje, vehiculo.modelo, vehiculo.dominio, vehiculo.id 
                FROM vehiculo 
                INNER JOIN empleado ON vehiculo.id_empleado = empleado.id 
                WHERE empleado.id = $1  `,
        [idEmpleado]
      );

      if (!!vehiculosPorEmpleado.rowCount) {
        return { ...Success.GET, vehiculos: vehiculosPorEmpleado.rows };
      }
      return { ...Fail.NOT_FOUND };
    } catch (error) {
      throw error;
    }
  };

  static crearVehiculo = async (vehiculo: Vehiculo) => {
    try {
      const crearVehiculo = await pool.query(
        `
            INSERT INTO vehiculo (dominio, marca, modelo, anio, kilometraje, id_empleado, estado) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            `,
        [
          vehiculo.dominio,
          vehiculo.marca,
          vehiculo.modelo,
          vehiculo.anio,
          vehiculo.kilometraje,
          vehiculo.id_empleado,
          vehiculo.estado,
        ]
      );

      if (!!crearVehiculo.rowCount) return { ...Success.CREATION };

      return { ...Fail.CREATION };
    } catch (error) {
      throw error;
    }
  };

  static editarVehiculo = async (vehiculo: Vehiculo, idVehiculo: number) => {
    try {
      const editarVehiculo = await pool.query(
        `
                UPDATE vehiculo SET dominio = $1, marca = $2, modelo = $3, anio = $4, kilometraje = $5, id_empleado = $6, estado = $7 WHERE vehiculo.id = $8
                `,
        [
          vehiculo.dominio,
          vehiculo.marca,
          vehiculo.modelo,
          vehiculo.anio,
          vehiculo.kilometraje,
          vehiculo.id_empleado,
          vehiculo.estado,
          idVehiculo,
        ]
      );

      if (editarVehiculo.rowCount) {
        return { ...Success.EDIT };
      } else {
        return Fail.NOT_FOUND;
      }
    } catch (error) {
      throw error;
    }
  };

  static eliminarVehiculo = async (idVehiculo: number) => {
    try {
      const eliminarRelacion = await ViajeModel.eliminarViaje(
        idVehiculo,
        "id_vehiculo"
      );

      const eliminarVehiculo = await pool.query(
        `DELETE FROM vehiculo WHERE id = $1`,
        [idVehiculo]
      );

      if (eliminarVehiculo.rowCount && eliminarRelacion.CODE === 200) {
        return { ...Success.DELETE };
      } else {
        return Fail.NOT_FOUND;
      }
    } catch (error) {
      throw error;
    }
  };
}
