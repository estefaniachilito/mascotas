import { pool } from "../database/conexion.js";
import multer from "multer"

const storage= multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img')
    },
    filename: function (req, file, cb){
        cb (null, file.originalname);
    }
})
const upload = multer({storage: storage})

export const cargarImagem = upload.single('photo')

export const getPets = async (req, res) => {
    try {
        const query = `
            SELECT 
                pets.id AS id,
                pets.pet_name,
                races.name AS race_name,
                pets.photo
            FROM 
                pets
            JOIN 
                races ON pets.race_id = races.id
        `;
        const [result] = await pool.query(query);
        if (result.length > 0) {
            return res.status(200).json(result);
        }
        return res.status(404).json({ message: 'No se encontraron mascotas' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const setPets = async (req, res) => {
    try {
        const { pet_name, race_id, category_id, gender_id, user_id } = req.body;
        const photo = req.file.originalname;
        const [ result ] = await pool.query('INSERT INTO pets (pet_name, race_id, category_id, photo, gender_id, user_id) values (?, ?, ?, ?, ?, ?)', [pet_name, race_id, category_id, photo || null, gender_id, user_id || null]);

        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'mascota creado con éxito' });
        }
        return res.status(400).json({ message: 'No se pudo crear la mascota' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getPetsById = async (req, res) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query('SELECT * FROM pets WHERE id=?', [id]);

        if (result.length > 0) {
            return res.status(200).json(result[0]);
        }
        return res.status(404).json({ message: 'mascota no encontrada' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updatePets = async (req, res) => {
    try {
        const { id } = req.params;
        const { pet_name, race_id, category_id, photo, gender_id, user_id  } = req.body;
        const [ result ] = await pool.query('UPDATE pets SET pet_name=?, race_id=?, category_id=?, photo=?, gender_id=?, user_id=? WHERE id=?', [ pet_name, race_id, category_id, photo, gender_id, user_id , id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'mascota actualizada con éxito' });
        }
        return res.status(400).json({ message: 'No se pudo actualizar la mascota' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deletePets = async (req, res) => {
    try {
        const { id } = req.params;
        const [ result ] = await pool.query('DELETE FROM pets WHERE id=?', [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'mascota eliminada con éxito' });
        }
        return res.status(400).json({ message: 'No se pudo eliminar la mascota' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}