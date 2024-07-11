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

export const petByMunicipio = async (req, res) => {
    try {
        const [ result ] = await pool.query('SELECT municipios.name AS municipio, GROUP_CONCAT(pets.pet_name ORDER BY pets.pet_name SEPARATOR ", ") AS pets FROM municipios LEFT JOIN pets ON municipios.id = pets.municipio_id GROUP BY municipios.name ORDER BY municipios.name')
        if (result.length > 0) {
            return res.status(200).json(result)
        } else {
            return res.status(404).json({message: 'Errror'})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }
}