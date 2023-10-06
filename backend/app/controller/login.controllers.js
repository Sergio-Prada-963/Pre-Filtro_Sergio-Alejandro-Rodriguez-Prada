import { response } from "express";
import conexion from "../../config/conexion.js";
import bcryptjs from 'bcryptjs';
import generateJWT from '../helpers/generate.JWT.js';

const login = async (req,res=response)=>{
    const {Email, NumeroId} = req.body;
    const collection = conexion('Empleados')
    try {
        const usuario = await collection.findOne({Email});
        if(!usuario)
            return res.status(400).json({message: 'Usuario no es correcto'});
        if(!usuario.Estado)
            return res.status(400).json({message: 'Usuario desactivado'});

        const validarNumeroId = bcryptjs.compareSync(NumeroId, usuario.NumeroId);
        if(!validarNumeroId)
            return res.status(400).json({message: 'Contraseña Incorrecta'});
        
            const token = await generateJWT(usuario._id)
            res.cookie("tokenX",token)
            res.json({usuario,token});
    } catch (error) {
        console.log(error);
        return res.json({message:"Auto contactarme (Servicio tecnico)"})
    }
}
export default login