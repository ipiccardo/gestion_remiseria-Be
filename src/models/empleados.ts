import pool from "../database/database";
import { checkDate } from "../utils/functions";
import { EmpleadoWithLicencia } from "../utils/types";
import { Fail, Success } from "../utils/handleSuccessAndError";
import { ViajeModel } from "./viajes";
import { SalarioModel } from "./salario";

export class EmpleadoModel {
  static getEmpleados = async () => {
    try {
      const empleados = await pool.query(
        `
                SELECT empleado.id, empleado.nombre, empleado.apellido, empleado.dni, licencia.tipo, empleado_licencia.vigente AS licencia_vigente, empleado_licencia.fecha_emision, salario.salario, salario.periodo AS ult_periodo
                FROM empleado_licencia 
                INNER JOIN empleado ON empleado_licencia.id_empleado = empleado.id 
                FULL OUTER JOIN salario ON empleado_licencia.id_empleado = salario.id_empleado
                INNER JOIN licencia ON empleado_licencia.id_licencia = licencia.id
                WHERE (salario.id_empleado, salario.periodo) IN (SELECT id_empleado, MAX(periodo) FROM salario GROUP BY id_empleado) OR salario.id_empleado IS NULL 
                `
      );

      if (empleados.rowCount) {
        return { ...Success.GET, EMPLEADOS: empleados.rows };
      } else {
        return { ...Fail.NOT_FOUND };
      }
    } catch (error) {
      throw error;
    }
  };

  static getEmpleado = async (id: number) => {
    try {
      const empleado = await pool.query(
        `
                SELECT empleado.id, empleado.nombre, empleado.apellido, empleado.dni, licencia.tipo, empleado_licencia.fecha_emision
                FROM empleado_licencia 
                INNER JOIN empleado ON empleado_licencia.id_empleado = empleado.id 
                INNER JOIN licencia ON empleado_licencia.id_licencia = licencia.id
                WHERE empleado.id = $1
                `,
        [id]
      );

      if (empleado.rowCount) {
        return { ...Success.GET, EMPLEADO: empleado.rows[0] };
      } else {
        return { ...Fail.NOT_FOUND };
      }
    } catch (error) {
      throw error;
    }
  };

  static crearEmpleado = async (empleado: EmpleadoWithLicencia) => {
    try {
      const licenciaValida = checkDate(empleado);

      await pool.query("BEGIN");

      const crearEmpleadoResult = await pool.query(
        `INSERT INTO empleado (nombre, apellido, dni) VALUES ($1, $2, $3) RETURNING id`,
        [empleado.nombre, empleado.apellido, empleado.dni]
      );
      const empleadoId = crearEmpleadoResult.rows[0].id;

      const relacionarEmpleadoLicencia = await pool.query(
        `INSERT INTO empleado_licencia (id_empleado, id_licencia, fecha_emision, vigente) VALUES ($1, $2, $3, $4) RETURNING id`,
        [
          empleadoId,
          empleado.licencia.id_licencia,
          empleado.fecha_emision,
          licenciaValida,
        ]
      );

      await pool.query("COMMIT");

      if (
        crearEmpleadoResult.rows.length > 0 &&
        relacionarEmpleadoLicencia.rows.length > 0
      )
        return Success.CREATION;
    } catch (error) {
      throw error;
    }
    return;
  };

  static editarEmpleado = async (
    empleado: EmpleadoWithLicencia,
    idEmpleado: number
  ) => {
    try {
      const licenciaValida = checkDate(empleado);

      console.log(empleado, "empleado");

      await pool.query("BEGIN");

      const editarEmpleado = await pool.query(
        `UPDATE empleado SET nombre= $1, apellido= $2, dni= $3 WHERE id = ${idEmpleado} RETURNING id`,
        [empleado.nombre, empleado.apellido, empleado.dni]
      );

      const editarRelacionEmpleadoLicencia = await pool.query(
        `UPDATE empleado_licencia SET id_licencia = $1, fecha_emision = $2, vigente = $3 WHERE empleado_licencia.id_empleado = ${idEmpleado} RETURNING id`,
        [empleado.licencia.id_licencia, empleado.fecha_emision, licenciaValida]
      );

      await pool.query("COMMIT");

      if (
        editarEmpleado.rows.length > 0 &&
        editarRelacionEmpleadoLicencia.rows.length > 0
      ) {
        return Success.EDIT;
      } else {
        return Fail.NOT_FOUND;
      }
    } catch (error) {
      throw error;
    }
  };

  static eliminarEmpleado = async (idEmpleado: number) => {
    try {
      await pool.query("BEGIN");

      const eliminarRelacionSalario = await SalarioModel.eliminarSalario(
        idEmpleado
      );

      const eliminarRelacionViaje = await ViajeModel.eliminarViaje(
        idEmpleado,
        "id_empleado"
      );

      const eliminarRelacion = await pool.query(
        `DELETE FROM empleado_licencia WHERE id_empleado = ${idEmpleado}`
      );

      const eliminarEmpleado = await pool.query(
        `DELETE FROM empleado WHERE id = ${idEmpleado}`
      );

      await pool.query("COMMIT");

      if (
        eliminarEmpleado.rowCount &&
        eliminarRelacion.rowCount &&
        eliminarRelacionViaje.CODE === 200 &&
        eliminarRelacionSalario.rowCount
      ) {
        return Success.DELETE;
      } else {
        return Fail.NOT_FOUND;
      }
    } catch (error) {
      throw error;
    }
  };
}
