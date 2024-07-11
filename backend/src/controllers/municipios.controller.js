import { pool } from "../database/conexion.js"

export const getMunicipios = async (req, res) => {
    try {
        const [ result ] = await pool.query('select * from municipios')
        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({ message: 'No se encontraron municipios'})
        }

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}