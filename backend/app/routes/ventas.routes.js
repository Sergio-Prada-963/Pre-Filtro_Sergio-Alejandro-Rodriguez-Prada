import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import { check, param } from "express-validator";
import validateDocuments from "../middlewares/validateDocuments.js";
import {getVentas, postVentas, deleteVenta, updateVenta} from "../controller/ventas.controller.js";

const router = Router();
router.get('/all', getVentas);

router.post('/',[
    /* validJWT, */
    check('Fecha','Debe tener una Fecha').notEmpty(), 
    check('Fecha','Debe ser una fecha ISO valida').isISO8601(), 
    check('Cliente','Debe tener un Cliente').notEmpty(), 
    check('Cliente','Debe ser un id mongo valido').isMongoId(), 
    check('Producto','Debe tener un Producto').notEmpty(), 
    check('Producto','Debe ser un id mongo valido').isMongoId(), 
    check('Empleado','Debe tener un Empleado').notEmpty(), 
    check('Empleado','Debe ser un id mongo valido').isMongoId(), 
    check('Conceccionario','Debe tener un Conceccionario').notEmpty(),
    check('Conceccionario','Debe ser un id mongo valido').isMongoId(),
validateDocuments], postVentas);

router.delete('/:id',[
    /* validJWT, */
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], deleteVenta);

router.patch('/:id',[
    /* validJWT, */
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], updateVenta);

export default router