import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import { check, param } from "express-validator";
import validateDocuments from "../middlewares/validateDocuments.js";
import {getMotos, postMotos, deleteMoto, updateMoto} from "../controller/motos.controller.js";

const router = Router();
router.get('/all', getMotos);

router.post('/',[
    /* validJWT, */
    check('Marca','Debe tener una Marca').notEmpty(), 
    check('Modelo','Debe tener un Modelo').notEmpty(), 
    check('Ano','Debe tener un Ano').notEmpty(), 
    check('Ano','Debe ser un numero').isInt(), 
    check('NumeroDeSerie','Debe tener un NumeroDeSerie').notEmpty(), 
    check('Tipo','Debe tener un Tipo').notEmpty(), 
    check('Cilindraje','Debe tener un Cilindraje').notEmpty(), 
    check('Cilindraje','Debe ser un numero').isInt(), 
    check('PotenciaHP','Debe tener una PotenciaHP').notEmpty(), 
    check('PotenciaHP','Debe ser un numero').isInt(), 
    check('Color','Debe tener un Color').notEmpty(), 
    check('Precio','Debe tener un Precio').notEmpty(), 
    check('Precio','Debe ser un numero').isInt(), 
    check('Estado','Debe tener un Estado').notEmpty(), 
    check('proveedor','Debe tener un proveedor').notEmpty(), 
    check('proveedor','No es un id mongo valido').isMongoId(), 
    check('Imagen','Debe tener una Imagen').notEmpty(),
validateDocuments], postMotos);

router.delete('/:id',[
    validJWT,
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], deleteMoto);

router.patch('/:id',[
    validJWT,
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], updateMoto);


export default router