import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import { check, param } from "express-validator";
import validateDocuments from "../middlewares/validateDocuments.js";
import {getConceccionario, postConceccionario, deleteConceccionario, updateConceccionario} from "../controller/conceccionarios.controller.js";

const router = Router();
router.get('/all', getConceccionario);

router.post('/',[
    /* validJWT, */
    check('Nombre','Debe tener un Nombre').not().isEmpty(), 
    check('Ubicacion','Debe tener una Ubicacion').not().isEmpty(), 
    check('Cantidad_ventas','Debe tener una Cantidad_ventas').not().isEmpty(), 
    check('Inventario','No es un id de mongo valido').isMongoId(),
validateDocuments], postConceccionario);

router.delete('/:id',[
    /* validJWT, */
    param('id','No es un id Valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], deleteConceccionario);

router.patch('/:id',[
    /* validJWT, */
    param('id','No es un id Valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], updateConceccionario);

/**
     * @swagger
     * components:
     *  schemas:
     *      Conceccionarios:
     *          type: object
     *          properties:
     *              Nombre:
     *                  type: string
     *                  description: Nombre del conceccionario
     *              Ubicacion:
     *                  type: string
     *                  description: Ubicacion del conceccionario
     *              Cantidad_ventas:
     *                  type: number
     *                  description: Cantidad de ventas
     *              Inventario:
     *                  type: string
     *                  description: Numeri id del inventario
     *          required:
     *              - Nombre
     *              - Ubicacion
     *              - Cantidad_ventas
     *              - Inventario
     *          example: 
     *              Nombre: "Motorcars Premium"
     *              Ubicacion: "Avenida Principal, Ciudad B"
     *              Cantidad_ventas: 12
     *              Inventario: "6516f5c98072ef0ca9669b26"
     *              
     */



     /**
     * @swagger
     * /api/conceccionarios/all:
     *  get:
     *      summary: Retornar todos los conceccionarios
     *      tags: [Conceccionarios]
     *      responses:
     *          200:
     *              description: Todos los conceccionarios!
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Conceccionarios'
     */

          

    /**
     * @swagger
     * /api/conceccionarios/:
     *  post:
     *      summary: Añade un nuevo conceccionario
     *      tags: [Conceccionarios]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Conceccionarios'
     *      responses:
     *          200:
     *              description: Nuevo conceccionario añadido!
     */



     /**
     * @swagger
     * /api/conceccionarios/{id}:
     *  delete:
     *      summary: Eliminar un conceccionario
     *      tags: [Conceccionarios]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: El id del conceccionario
     *      responses:
     *          200:
     *              description: Conceccionario eliminado
     *          404:
     *              description: El conceccionario no existe
     */


          /**
     * @swagger
     * /api/conceccionario/{id}:
     *  patch:
     *      summary: Actualizar un conceccionario
     *      tags: [Conceccionarios]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: El id del conceccionario
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Conceccionarios'
     *      responses:
     *          200:
     *              description: Conceccionario Actualizado
     *          404:
     *              description: Conceccionario no encontrado
     */

export default router