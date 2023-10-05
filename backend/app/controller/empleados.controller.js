import conexion from "../../config/conexion.js";
import bcryptjs from 'bcryptjs';
import { ObjectId } from 'mongodb';

export const getEmpleados = async (req,res)=>{
    try {
        const collection = conexion('Empleados');
        const data = await collection.find({Estado: true}).toArray();
        res.status(200).json(data)
    } catch (error) {
        console.error(error, "Error en get Empleados");
    }
}

export const postEmpleado = async (req,res)=>{
    try {
        const collection = conexion('Empleados');
        const {Nombre, NumeroId, Teléfono, Cargo, Email, Conceccionario, Estado} = req.body;
        const salt = bcryptjs.genSaltSync();
        req.body.NumeroId = bcryptjs.hashSync(NumeroId,salt);
        const data = await collection.insertOne({Nombre, NumeroId: req.body.NumeroId, Teléfono, Cargo, Email, Conceccionario, Estado});
        res.status(200).json(data);
    } catch (error) {
        console.error(error," Error en post Empleado");
    }
}

export const deleteEmpleado = async (req,res)=>{
    try {
        const collection = conexion('Empleados');
        const data = await collection.updateOne({_id: new ObjectId(req.params.id)},{Estado: false})
        if (!data) return res.json({error: `No se encontro El Empleado ${req.params.id}`})
        res.status(200).json({"eliminado": true, trash: data})
    } catch (error) {
        console.error(error," Error en delete Empleado");
    }
}

export const updateEmpleado = async (req,res)=>{
    try {
        const collection = conexion('Empleados');
        const {id} = req.params;
        const {Nombre, NumeroId, Teléfono, Cargo, Email, Conceccionario, Estado} = req.body;
        const salt = bcryptjs.genSaltSync();
        req.body.NumeroId = bcryptjs.hashSync(NumeroId,salt);
        const existEmpleado = await collection.findOne({_id: new ObjectId(id)});
        if (!existEmpleado) return res.json({error: `El Empleado ${Nombre} con el id ${id} no existe`})
        const data = await collection.updateOne({_id: new ObjectId(id)},{$set: {Nombre, NumeroId: req.body.NumeroId, Teléfono, Cargo, Email, Conceccionario, Estado}})
        res.status(200).json({"actualizado": true, data})
    } catch (error) {
        console.error(error," Error en update Empleado");
    }
}