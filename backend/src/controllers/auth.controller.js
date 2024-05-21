import { pool } from "../database/conexion.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body

        const [ resultado ] = await pool.query("insert into users(fullname, email, password) values (?, ?, ?)", [fullname, email, password])

        if (resultado.affectedRows > 0) {
            return res.status(200).json({
                "mensaje": "Usuario registrado con exito"
            })
        } else {
            return res.status(404).json({
                "mensaje": "No se ha podido registrar el usuario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        
        const [ resultado ] = await pool.query('select * from users where email=? and password=?', [email, password])

        if (resultado.length > 0) {
            const token = jwt.sign({ resultado }, "clavesecreta", {expiresIn: "24h"})
            return res.status(200).json({
                resultado,
                token
            })
        } else {
            return res.status(404).json({
                "mensaje": "Usuario no encontrado"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        })
    }
}

export const validarToken = async (req, res, next) => {
    try {
        const token = req.headers['token']
        if (!token) {
            return res.status(404).json({
                "mensaje": "El token es requerido"
            })
        } else {
            jwt.verify(token, process.env.AUTH_SECRET, (error) => {
                if (error) {
                    return res.status(404).json({
                        "mensaje": "El token es incorrecto"
                    })
                } else {
                    next()
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}