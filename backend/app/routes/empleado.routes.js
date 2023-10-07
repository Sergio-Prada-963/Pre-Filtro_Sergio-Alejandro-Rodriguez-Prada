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

/**
     * @swagger
     * components:
     *  schemas:
     *      Aviones:
     *          type: object
     *          properties:
     *              Nombre:
     *                  type: string
     *                  description: Nombre del empleado
     *              NumeroId:
     *                  type: string
     *                  description: Numero del empleado que funcionara como contraseña
     *              Telefono:
     *                  type: string
     *                  description: Numero de telefono del empleado
     *              Cargo:
     *                  type: string
     *                  description: Cargo del empleado
     *              Email:
     *                  type: string
     *                  description: Email del empleado
     *              Conceccionario:
     *                  type: number
     *                  description: Conceccionario al cual pertenece el empleado
     *              Estado:
     *                  type: string
     *                  description: Si el empleado esta activo
     *          required:
     *              - Nombre
     *              - NumeroId
     *              - Telefono
     *              - Cargo
     *              - Email
     *              - Conceccionario
     *              - Estado
     *          example: 
     *              Nombre: "María González"
     *              Cargo: "Analista de Marketing"
     *              Email: "maria.gonzalez@example.com"
     *              Conceccionario: "65139dd0bf54cfc7566db64a"
     *              NumeroId: "B2345678"
     *              Estado: true
     *              Telefono: "2345678901"
     *              
     */



     /**
     * @swagger
     * /api/empleado/all:
     *  get:
     *      summary: Retornar todos los empleados
     *      tags: [Empleados]
     *      responses:
     *          200:
     *              description: Todos los empleados!
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Empleados'
     */

          

    /**
     * @swagger
     * /api/empleados/:
     *  post:
     *      summary: Añade un nuevo empleados
     *      tags: [Empleados]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Empleados'
     *      responses:
     *          200:
     *              description: Nuevo empleado añadido!
     */



     /**
     * @swagger
     * /api/empleados/{id}:
     *  delete:
     *      summary: Eliminar un empleado
     *      tags: [Empleados]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: El id del empleado
     *      responses:
     *          200:
     *              description: Empleado eliminado
     *          404:
     *              description: El Empleado no existe
     */


          /**
     * @swagger
     * /api/empleados/{id}:
     *  patch:
     *      summary: Actualizar un Empleado
     *      tags: [Empleados]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: El id del Empleado
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Empleados'
     *      responses:
     *          200:
     *              description: Empleado Actualizado
     *          404:
     *              description: Empleado no encontrado
     */

export default router