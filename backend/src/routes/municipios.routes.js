import { Router } from "express";
import { getMunicipios, petByMunicipio } from "../controllers/municipios.controller.js";

const router = Router()

router.get('/municipios', getMunicipios)
router.get('/petByMunicipio', petByMunicipio)

export default router