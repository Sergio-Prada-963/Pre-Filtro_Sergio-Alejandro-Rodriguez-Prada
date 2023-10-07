import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig.js';

import roterMotos from './routes/motos.routes.js'
import routerAviones from "./routes/aviones.routes.js";
import routerClientes from "./routes/clientes.routes.js";
import routerConceccionarios from "./routes/conceccionarios.routes.js";
import routerProveedores from "./routes/proveedores.routes.js";
import routerInventario from "./routes/inventario.routes.js";
import routerVentas from "./routes/ventas.routes.js";
import routerEmpleado from "./routes/empleado.routes.js";
import routerLogin from './routes/login.routes.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PUERTO;
        this.app.use(cookieParser());
        this.path = {
            motos: "/api/motos",
            aviones: "/api/aviones",
            clientes: "/api/clientes",
            conceccionarios: "/api/conceccionarios",
            proveedores: "/api/proveedores",
            inventarios: "/api/inventario",
            ventas: "/api/ventas",
            empleado: "/api/empleados",
            login: "/api"
        }
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json())
    }
    routes(){
        this.app.use(this.path.motos, roterMotos);
        this.app.use(this.path.aviones, routerAviones);
        this.app.use(this.path.clientes, routerClientes);
        this.app.use(this.path.conceccionarios, routerConceccionarios);
        this.app.use(this.path.proveedores, routerProveedores);
        this.app.use(this.path.inventarios, routerInventario);
        this.app.use(this.path.ventas, routerVentas);
        this.app.use(this.path.empleado, routerEmpleado);
        this.app.use(this.path.login, routerLogin);
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Escuchando peticiones en el puerto ${this.port}`);
        })
    }
}
export default Server;