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

/**
     * @swagger
     * components:
     *  schemas:
     *      Clientes:
     *          type: object
     *          properties:
     *              Nombre:
     *                  type: string
     *                  description: Nombre del cliente
     *              Email:
     *                  type: string
     *                  description: Direccion email del cliente
     *              Telefono:
     *                  type: string
     *                  description: Telefono del cliente
     *          required:
     *              - Nombre
     *              - Email
     *              - Telefono
     *          example: 
     *              Nombre: "María García"
     *              Email: "maria.garcia@example.com"
     *              Telefono: "+1-555-987-6543"
     *              
     */



     /**
     * @swagger
     * /api/clientes/all:
     *  get:
     *      summary: Retornar todos los clientes
     *      tags: [Clientes]
     *      responses:
     *          200:
     *              description: Todos los clientes!
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Clientes'
     */

          

    /**
     * @swagger
     * /api/clientes/:
     *  post:
     *      summary: Añade un nuevo cliente
     *      tags: [Clientes]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Clientes'
     *      responses:
     *          200:
     *              description: Nuevo cliente añadido!
     */



     /**
     * @swagger
     * /api/clientes/{id}:
     *  delete:
     *      summary: Eliminar un cliente
     *      tags: [Clientes]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: El id del cliente
     *      responses:
     *          200:
     *              description: Cliente eliminado
     *          404:
     *              description: El cliente no existe
     */


          /**
     * @swagger
     * /api/clientes/{id}:
     *  patch:
     *      summary: Actualizar un cliente
     *      tags: [Clientes]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: El id del cliente
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Clientes'
     *      responses:
     *          200:
     *              description: Cliente Actualizado
     *          404:
     *              description: Cliente no encontrado
     */

export default router;