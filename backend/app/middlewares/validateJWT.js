import { response, request } from "express";
import jwt from 'jsonwebtoken';
import conexion from "../../config/conexion.js";

const validJWT = async (req = request, res = response, next) =>{
    const {tokenX} = req.cookies;
    if(!tokenX)
        return res.status(400).json({message: "no hay token en la peticion"});
    try {
        const collection = conexion('Empleados');
        const {_id} = jwt.verify(tokenX,process.env.SECRET_OR_PRIVATE_KEY);
        const usuario = await collection.findOne(_id);
        if(!usuario)
            return res.status(400).json({message: "Token no valido - Usuario no existe en la BD"});
        if(!usuario.Estado)
            return res.status(400).json({message: "Token no valido - Usuario con estado false"});
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "jmmmm token no valido.. -_-"});
    }
}

export default validJWT