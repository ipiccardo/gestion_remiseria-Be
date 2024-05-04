import pool from "../database/database";
import { Fail, Success } from "../utils/handleSuccessAndError";
import { Salario } from "../utils/types";

export class SalarioModel {


    static crearSalario = async (salario: Salario) => {

        try {

            const crearSalario = await pool.query(
                `
                INSERT INTO salario (salario, periodo, id_empleado) VALUES ($1, $2, $3)
                `,
                [salario.salario, salario.periodo, salario.id_empleado]
            )

            if (crearSalario.rowCount) {
                return Success.CREATION
            } else {
                return Fail.CREATION
            }

        } catch (error) {
            throw error
        }

    }

    static editarSalario = async (salario: Salario, idSalario: number) => {

        try {

            const crearSalario = await pool.query(
                `
                UPDATE salario SET salario = salario + $1, id_empleado = $2 WHERE salario.id = $3
                `,
                [salario.salario, salario.id_empleado, idSalario]
            )

            if (crearSalario.rowCount) {
                return Success.CREATION
            } else {
                return Fail.CREATION
            }

        } catch (error) {
            throw error
        }

    }

    static existeSalario = async (periodo: string, idEmpleado: number) => {
        try {

            const existeSalario = await pool.query(
                `
                SELECT id FROM salario WHERE periodo = $1 AND id_empleado = $2
                `,
                [periodo, idEmpleado]
            );

            return existeSalario;

        } catch (error) {
            throw error
        }
    }

    static eliminarSalario = async (idEmpleado: number) => {
        try {

            const eliminarSalario = await pool.query(
                `
                DELETE FROM salario WHERE id_empleado = $1
                `,
                [idEmpleado]
            );

            return eliminarSalario;

        } catch (error) {
            throw error
        }
    }


}