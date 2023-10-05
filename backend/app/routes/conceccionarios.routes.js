import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import { check, param } from "express-validator";
import validateDocuments from "../middlewares/validateDocuments.js";
import {getConceccionario, postConceccionario, deleteConceccionario, updateConceccionario} from "../controller/conceccionarios.controller.js";

const router = Router();
router.get('/all', getConceccionario);

router.post('/',[
    validJWT,
    check('Nombre','Debe tener un Nombre').not().isEmpty(), 
    check('Ubicacion','Debe tener una Ubicacion').not().isEmpty(), 
    check('Cantidad_ventas','Debe tener una Cantidad_ventas').not().isEmpty(), 
    check('Inventario','No es un id de mongo valido').isMongoId(),
validateDocuments], postConceccionario);

router.delete('/:id',[
    validJWT,
    param('id','No es un id Valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], deleteConceccionario);

router.patch('/:id',[
    validJWT,
    param('id','No es un id Valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], updateConceccionario);

export default router