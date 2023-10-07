import { Router } from "express";
import validJWT from "../middlewares/validateJWT.js";
import { check, param } from "express-validator";
import validateDocuments from "../middlewares/validateDocuments.js";
import {getAviones, postAvion, deleteAvion, updateAvion} from "../controller/aviones.controller.js";

const router = Router();
router.get('/all', getAviones);

router.post('/',[
    /* validJWT, */
    check('Marca','Debe tener una Marca').not().isEmpty(), 
    check('Modelo','Debe tener un Modelo').not().isEmpty(), 
    check('NumeroDeRegistro','Debe tener un NumeroDeRegistro').not().isEmpty(), 
    check('Imagen','Debe tener una Imagen').not().isEmpty(), 
    check('Tipo','Debe tener un Tipo').not().isEmpty(), 
    check('AnoDeFabricacion','Debe tener un AnoDeFabricacion').not().isEmpty(), 
    check('NumeroDeSerie','Debe tener un NumeroDeSerie').not().isEmpty(), 
    check('CapacidadDePasajeros','Debe tener una CapacidadDePasajeros').not().isEmpty(), 
    check('RangoDeVuelo','Debe tener un RangoDeVuelo').not().isEmpty(), 
    check('TipoDeMotor','Debe tener un TipoDeMotor').not().isEmpty(), 
    check('VelocidadMaxima','Debe tener una VelocidadMaxima').not().isEmpty(), 
    check('AltitudMaximaDeCrucero','Debe tener una AltitudMaximaDeCrucero').not().isEmpty(), 
    check('Longitud','Debe tener una Longitud').not().isEmpty(), 
    check('Envergadura','Debe tener una Envergadura').not().isEmpty(), 
    check('proveedor','Debe tener un proveedor').not().isEmpty(),
    check('proveedor','No es un id valido').isMongoId(), 
    check('Valor','Debe tener un Valor').not().isEmpty(), 
    check('Estado','Debe tener un Estado').not().isEmpty(),
validateDocuments], postAvion);

router.delete('/:id',[
    /* validJWT, */
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], deleteAvion);

router.patch('/:id',[
    /* validJWT, */
    param('id','No es un id valido').isMongoId(),
    param('id','Debe tener un id').notEmpty(),
validateDocuments], updateAvion);

/**
     * @swagger
     * components:
     *  schemas:
     *      Aviones:
     *          type: object
     *          properties:
     *              Marca:
     *                  type: string
     *                  description: Marca del avion
     *              Modelo:
     *                  type: string
     *                  description: Numero de modelo del avion
     *              NumeroDeRegistro:
     *                  type: string
     *                  description: Numero de registro del avion
     *              Imagen:
     *                  type: string
     *                  description: Img correspondiente al avion
     *              Tipo:
     *                  type: string
     *                  description: Tipo de avion
     *              AnoDeFabricacion:
     *                  type: number
     *                  description: Año en el cual fue fabricado
     *              NumeroDeSerie:
     *                  type: string
     *                  description: Numero de serie del avion
     *              CapacidadDePasajeros:
     *                  type: number
     *                  description: Cantidad de pasajeros que puede llevar el avion
     *              RangoDeVuelo:
     *                  type: string
     *                  description: Rabgo de vuelo del avion
     *              TipoDeMotor:
     *                  type: string
     *                  description: Tipo de motor del avion
     *              VelocidadMaxima:
     *                  type: string
     *                  description: Velocidad maxima a la cual puede ir el avion
     *              AltitudMaximaDeCrucero:
     *                  type: string
     *                  description: Altura maxima que puede alcanzar
     *              Longitud:
     *                  type: string
     *                  description: Longitud del avion
     *              Envergadura:
     *                  type: string
     *                  description: Ancho total del avion
     *              proveedor:
     *                  type: string
     *                  description: Numero id del proveedor
     *              Valor:
     *                  type: string
     *                  description: Valor del avion
     *              Estado:
     *                  type: string
     *                  description: Si el avion esta disponible
     *          required:
     *              - Marca
     *              - Modelo
     *              - NumeroDeRegistro
     *              - Imagen
     *              - Tipo
     *              - AnoDeFabricacion
     *              - NumeroDeSerie
     *              - CapacidadDePasajeros
     *              - RangoDeVuelo
     *              - TipoDeMotor
     *              - VelocidadMaxima
     *              - AltitudMaximaDeCrucero
     *              - Longitud
     *              - Envergadura
     *              - proveedor
     *              - Valor
     *              - Estado
     *          example: 
     *              Marca: "Gulfstream"
     *              Modelo: "G650"
     *              NumeroDeRegistro: "N5432"
     *              Imagen: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jetmonde-executive.com%2Fwp-content%2Fuploads%2F2020%2F07%2FGULFSTREAM-G650.png&f=1&nofb=1&ipt=bff064d2c807d2e6085e5550080420c0f29b86da1eb03ae8bf4c6e54458be9b7&ipo=images"
     *              Tipo: "Avión Privado"
     *              AnoDeFabricacion: 2018
     *              NumeroDeSerie: "G650-5432"
     *              CapacidadDePasajeros: 19
     *              RangoDeVuelo: "13,890 km"
     *              TipoDeMotor: "Motores a reacción Rolls-Royce BR725"
     *              VelocidadMaxima: "1,025 km/h"
     *              AltitudMaximaDeCrucero: "15,545 metros"
     *              Longitud: "30.4 metros"
     *              Envergadura: "30.3 metros"
     *              proveedor: "65130a9acb3364ee6e346cb5"
     *              Valor: "$70,000,000"
     *              Estado: true
     *              
     */



     /**
     * @swagger
     * /api/aviones/all:
     *  get:
     *      summary: Retornar todos los aviones
     *      tags: [Aviones]
     *      responses:
     *          200:
     *              description: Todos los aviones!
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: '#/components/schemas/Aviones'
     */

          

    /**
     * @swagger
     * /api/aviones/:
     *  post:
     *      summary: Añade un nuevo avion
     *      tags: [Aviones]
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Aviones'
     *      responses:
     *          200:
     *              description: Nuevo avion añadido!
     */



     /**
     * @swagger
     * /api/aviones/{id}:
     *  delete:
     *      summary: Eliminar un avion
     *      tags: [Aviones]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: El id del avion
     *      responses:
     *          200:
     *              description: Avion eliminado
     *          404:
     *              description: El avion no existe
     */


          /**
     * @swagger
     * /api/aviones/{id}:
     *  patch:
     *      summary: Actualizar un Avion
     *      tags: [Aviones]
     *      parameters:
     *          - in: path
     *            name: id
     *            schema: 
     *                type: string
     *            required: true
     *            description: El id del avion
     *      requestBody:
     *          required: true 
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Aviones'
     *      responses:
     *          200:
     *              description: Avion Actualizado
     *          404:
     *              description: Avion no encontrado
     */

export default router;