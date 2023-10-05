import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import { check, param } from "express-validator";
import validateDocuments from "../middlewares/validateDocuments.js";
import { getClientes, postClientes, deleteCliente, updateCliente } from "../controller/clientes.controller.js";

const router = Router();
router.get('/all', getClientes);

router.post('/',[
    validJWT,
    check('Nombre','Debe tener un Nombre').not().isEmpty(), 
    check('Email','Debe tener un Email').not().isEmpty(), 
    check('Telefono','Debe tener un Telefono').not().isEmpty(),
validateDocuments], postClientes);

router.delete('/:id',[
    validJWT,
    param('id', 'No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], deleteCliente);

router.patch('/:id',[
    validJWT,
    param('id', 'No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], updateCliente);

export default router;