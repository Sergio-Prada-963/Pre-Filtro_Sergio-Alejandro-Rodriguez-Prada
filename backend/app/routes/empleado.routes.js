import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import { check, param } from "express-validator";
import validateDocuments from "../middlewares/validateDocuments.js";
import {getEmpleados, postEmpleado, deleteEmpleado, updateEmpleado} from "../controller/empleados.controller.js";

const router = Router();
router.get('/all', getEmpleados);

router.post('/',[
    /* validJWT, */
    check('Nombre','Debe tener un Nombre').notEmpty(), 
    check('NumeroId','Debe tener un NumeroId').notEmpty(), 
    check('Telefono','Debe tener un Telefono').notEmpty(), 
    check('Cargo','Debe tener un Cargo').notEmpty(), 
    check('Email','Debe tener un Email').notEmpty(), 
    check('Conceccionario','Debe tener un Conceccionario').notEmpty(), 
    check('Estado','Debe tener un Estado').notEmpty(),
    check('Estado','Debe ser un boolean').isBoolean(),
validateDocuments], postEmpleado);

router.delete('/:id',[
    /* validJWT, */
    param('id','No es un id mongo valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], deleteEmpleado);

router.patch('/:id',[
    /* validJWT, */
    param('id','No es un id mongo valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], updateEmpleado);

export default router