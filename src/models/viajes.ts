import pool from "../database/database";
import { getAnioyMes } from "../utils/functions";
import { Success, Fail } from "../utils/handleSuccessAndError";
import { Viaje } from "../utils/types";
import { SalarioModel } from "./salario";
import { VehiculosModel } from "./vehiculos";

export class ViajeModel {
  static obtenerViajes = async () => {
    try {
      const obtenerViajes = await pool.query(
        `
                SELECT viaje.id, empleado.nombre, empleado.apellido, empleado.dni, viaje.fecha, viaje.kilometros AS kilometros_recorridos, viaje.precio_kilometro,  vehiculo.marca, vehiculo.modelo, vehiculo.anio, vehiculo.dominio AS patente, vehiculo.kilometraje
                FROM viaje
                INNER JOIN empleado ON viaje.id_empleado = empleado.id 
                INNER JOIN vehiculo ON viaje.id_vehiculo = vehiculo.id
                `
      );

      if (obtenerViajes.rowCount) {
        return { ...Success.GET, VIAJES: obtenerViajes.rows };
      } else {
        return { ...Fail.NOT_FOUND };
      }
    } catch (error) {
      throw error;
    }
  };

  static obtenerViaje = async (idViaje: number) => {
    try {
      const obtenerViaje = await pool.query(
        `
                SELECT viaje.id, viaje.fecha, viaje.kilometros, viaje.precio_kilometro, vehiculo.id AS id_vehiculo, vehiculo.marca, vehiculo.modelo, vehiculo.dominio, empleado.nombre, empleado.apellido, empleado.id AS id_empleado
                FROM viaje 
                INNER JOIN vehiculo ON vehiculo.id = viaje.id_vehiculo
                INNER JOIN empleado ON empleado.id = viaje.id_empleado
                WHERE viaje.id = $1
                `,
        [idViaje]
      );

      if (obtenerViaje.rowCount) {
        return { ...Success.GET, VIAJE: obtenerViaje.rows[0] };
      } else {
        return { ...Fail.NOT_FOUND };
      }
    } catch (error) {
      throw error;
    }
  };

  static crearViaje = async (viaje: Viaje) => {
    try {
      const estadoVehiculo = await VehiculosModel.estadoVehiculo(
        viaje.id_vehiculo
      );

      if (estadoVehiculo) {
        await pool.query("BEGIN");

        const crearViaje = await pool.query(
          `
                    INSERT INTO viaje (fecha, kilometros, id_vehiculo, id_empleado, precio_kilometro)
                    VALUES($1, $2, $3, $4, $5)
    
                    `,
          [
            viaje.fecha,
            viaje.kilometros,
            viaje.id_vehiculo,
            viaje.id_empleado,
            viaje.precio_kilometro,
          ]
        );

        const salarioTotal = viaje.kilometros * viaje.precio_kilometro;

        const salario = {
          salario: salarioTotal,
          periodo: getAnioyMes(viaje.fecha),
          id_empleado: viaje.id_empleado,
        };
        const existeSalario = await SalarioModel.existeSalario(
          salario.periodo,
          viaje.id_empleado
        );

        if (existeSalario.rows[0]?.id) {
          await SalarioModel.editarSalario(salario, existeSalario.rows[0].id);
        } else {
          await SalarioModel.crearSalario(salario);
        }

        const actualizarKilometros = await VehiculosModel.actualizarKilometraje(
          viaje.kilometros,
          viaje.id_vehiculo
        );

        await pool.query("COMMIT");

        if (crearViaje.rowCount && actualizarKilometros.CODE === 200)
          return Success.CREATION;
      }

      return { ERROR: "Este vehiculo se encuentra inactivo", CODE: 400 };
    } catch (error) {
      throw error;
    }
  };

  static editarViaje = async (viaje: Viaje, idViaje: number) => {
    try {
      const estadoVehiculo = await VehiculosModel.estadoVehiculo(
        viaje.id_vehiculo
      );

      if (estadoVehiculo) {
        await pool.query("BEGIN");

        const editarViaje = await pool.query(
          `
                    UPDATE viaje SET fecha = $1, kilometros = $2, id_vehiculo = $3, id_empleado = $4, precio_kilometro = $5 WHERE viaje.id = $6
    
                    `,
          [
            viaje.fecha,
            viaje.kilometros,
            viaje.id_vehiculo,
            viaje.id_empleado,
            viaje.precio_kilometro,
            idViaje,
          ]
        );

        const actualizarKilometros = await VehiculosModel.actualizarKilometraje(
          viaje.kilometros,
          viaje.id_vehiculo
        );

        await pool.query("COMMIT");

        if (editarViaje.rowCount && actualizarKilometros.CODE === 200) {
          return Success.EDIT;
        } else {
          return { ...Fail.NOT_FOUND };
        }
      }

      return { ERROR: "Este vehiculo se encuentra inactivo", CODE: 400 };
    } catch (error) {
      throw error;
    }
  };

  static eliminarViaje = async (id: number, column: string) => {
    try {
      const eliminarViaje = await pool.query(
        `
                DELETE FROM viaje WHERE ${column} = $1
                `,
        [id]
      );

      if (eliminarViaje.rowCount) {
        return Success.DELETE;
      } else {
        return Fail.NOT_FOUND;
      }
    } catch (error) {
      throw error;
    }
  };
}
