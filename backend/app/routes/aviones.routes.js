import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import { check, param } from "express-validator";
import validateDocuments from "../middlewares/validateDocuments.js";
import {getAviones, postAvion, deleteAvion, updateAvion} from "../controller/aviones.controller.js";

const router = Router();
router.get('/all', getAviones);

router.post('/',[
    validJWT,
    check('Marca','Debe tener una Marca').not().isEmpty(), 
    check('Modelo','Debe tener un Modelo').not().isEmpty(), 
    check('NúmeroDeRegistro','Debe tener un NúmeroDeRegistro').not().isEmpty(), 
    check('Imagen','Debe tener una Imagen').not().isEmpty(), 
    check('Tipo','Debe tener un Tipo').not().isEmpty(), 
    check('AñoDeFabricación','Debe tener un AñoDeFabricación').not().isEmpty(), 
    check('NúmeroDeSerie','Debe tener un NúmeroDeSerie').not().isEmpty(), 
    check('CapacidadDePasajeros','Debe tener una CapacidadDePasajeros').not().isEmpty(), 
    check('RangoDeVuelo','Debe tener un RangoDeVuelo').not().isEmpty(), 
    check('TipoDeMotor','Debe tener un TipoDeMotor').not().isEmpty(), 
    check('VelocidadMáxima','Debe tener una VelocidadMáxima').not().isEmpty(), 
    check('AltitudMáximaDeCrucero','Debe tener una AltitudMáximaDeCrucero').not().isEmpty(), 
    check('Longitud','Debe tener una Longitud').not().isEmpty(), 
    check('Envergadura','Debe tener una Envergadura').not().isEmpty(), 
    check('proveedor','Debe tener un proveedor').not().isEmpty(),
    check('proveedor','No es un id valido').isMongoId(), 
    check('Valor','Debe tener un Valor').not().isEmpty(), 
    check('Estado','Debe tener un Estado').not().isEmpty(),
validateDocuments], postAvion);

router.delete('/:id',[
    validJWT,
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], deleteAvion);

router.patch('/:id',[
    validJWT,
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], updateAvion);

export default router;