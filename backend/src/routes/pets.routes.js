import {Router} from 'express'
import { deletePets, getPets, getPetsById, setPets, updatePets } from '../controllers/pets.controller.js'


const router = Router()

router.get('/mascotas', getPets)
router.post('/mascotas', setPets)
router.get('/mascotas/:id', getPetsById)
router.put('/mascotas/:id', updatePets)
router.delete('/mascotas/:id', deletePets)


export default router
