import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import { check, param } from "express-validator";
import validateDocuments from "../middlewares/validateDocuments.js";
import {getProveedores, postProveedor, deleteProveedor, updateProveedor} from "../controller/proveedores.controller.js";

const router = Router();
router.get('/all', getProveedores);

router.post('/',[
    validJWT,
    check('Nombre','Debe tener un Nombre').notEmpty(), 
    check('Email','Debe tener un Email').notEmpty(), 
    check('Email','Debe ser un email valido').isEmail(), 
    check('Registro_mercantil','Debe tener un Registro_mercantil').notEmpty(), 
    check('Productos_vendidos','Debe tener un Productos_vendidos').notEmpty(),
    check('Productos_vendidos','Debe ser un numero').isInt(),
validateDocuments], postProveedor);

router.delete('/:id',[
    validJWT,
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], deleteProveedor);

router.patch('/:id',[
    validJWT,
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], updateProveedor);


export default router