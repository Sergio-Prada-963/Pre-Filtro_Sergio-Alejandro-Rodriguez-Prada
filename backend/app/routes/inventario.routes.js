import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import { check, param } from "express-validator";
import validateDocuments from "../middlewares/validateDocuments.js";
import {getInventarios, postInventarios, deleteInventario, updateInventario, updateOneInventario} from "../controller/inventario.controller.js";

const router = Router();
router.get('/all', getInventarios);

router.post('/',[
    validJWT,
    check('productos','Debe tener algun producto').notEmpty(),
validateDocuments], postInventarios);

router.delete('/:id',[
    validJWT,
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], deleteInventario);

router.patch('/:id',[
    validJWT,
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], updateInventario);

router.patch('/one/:id',[
    validJWT,
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], updateOneInventario);


export default router