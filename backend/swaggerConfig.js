// swaggerConfig.js

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
        title: "API de Administracion",
        description: "Esta es un API que gestiona el manejo de algunos productos que se venden en muchos concecionarios la cual contiene todos los datos sobre los conceccionario, dos tipos de productos, empleados, clientes, ventas, inventarios, proveedores.    Tambien tiene un sistema de autenticacion por medio de un login por el cual solo podran ingresar empleados y podran ingresar editar eliminar y ver datos",
        version: "1.0.11"
      },
    servers:[
        {
            url: "http://localhost:3309"
        }
    ]
  },
  apis: ['./app/routes/aviones.routes.js','./app/routes/clientes.routes.js','./app/routes/conceccionarios.routes.js','./app/routes/empleados.routes.js'], // Rutas de tus controladores
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;