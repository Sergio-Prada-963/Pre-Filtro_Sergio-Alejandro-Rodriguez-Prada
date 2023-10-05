import conexion from "../../config/conexion.js";
import { ObjectId } from "mongodb";

export const getClientes = async (req,res)=>{
    try {
        const collection = conexion('Clientes');
        const total = await collection.countDocuments();
        const clientes = await collection.find().toArray();
        res.status(200).json({ total, clientes });
    } catch (error) {
        console.error(error, "Error en get Clientes");
    }
}

export const postClientes = async (req,res)=>{
    try {
        const collection = conexion('Clientes');
        const {Nombre, Email, Telefono} = req.body;
        const existCliente = await collection.findOne({Nombre, Email});
        if (existCliente) return res.json({error: `El cliente ${Nombre} ya se encuentra registrado`});
        const data = await collection.insertOne({Nombre, Email, Telefono});
        res.status(200).json(data)
    } catch (error) {
        console.error(error, "Error en post Clientes");
    }
}

export const deleteCliente = async (req,res)=>{
    try {
        const collection = conexion('Clientes');
        const data = await collection.findOneAndDelete({_id: new ObjectId(req.params.id)}) ;
        if(!data) return res.json({error: `No se encontro el Cliente ${req.params.id}`});
        res.json({"Eliminado": true, trash: data});
    } catch (error) {
        console.error(error, "Error en delete Cliente");
    }
}

export const updateCliente = async (req,res)=>{
    try {
        const collection = conexion('Clientes');
        const {id} = req.params;
        const {Nombre, Email, Telefono} = req.body;
        const existCliente = await collection.findOne({_id: new ObjectId(id)});
        if(!existCliente) return res.json({error: `El cliente ${Nombre} no se encontro`});
        const data = await collection.updateOne({_id: new ObjectId(id)},{$set: {Nombre, Email, Telefono}});
        res.status(200).json({"Actiualizado": true, data});
    } catch (error) {
        console.error(error, "Error en update Cliente");
    }
}