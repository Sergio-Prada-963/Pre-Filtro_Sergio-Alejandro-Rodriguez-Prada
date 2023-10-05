import conexion from "../../config/conexion.js";
import { ObjectId } from "mongodb";

export const getProveedores = async (req,res)=>{
    try {
        const collection = conexion('Proveedores');
        const data = await collection.find().toArray();
        res.status(200).json(data);
    } catch (error) {
        console.error(error, "Error en get Proveedores");
    }
}

export const postProveedor = async (req,res)=>{
    try {
        const collection = conexion('Proveedores');
        const {Nombre, Email, Registro_mercantil, Productos_vendidos} = req.body
        const existProveedor = await collection.findOne({Nombre, Email})
        if (existProveedor) return res.json({error: `El Proveedor ${Nombre} ya existe`});
        const data = await collection.insertOne({Nombre, Email, Registro_mercantil, Productos_vendidos});
        res.status(200).json(data)
    } catch (error) {
        console.error(error, "Error en post Proveedor");
    }
}

export const deleteProveedor = async (req,res)=>{
    try {
        const collection = conexion('Proveedores');
        const data = await collection.findOneAndDelete({_id: new ObjectId(req.params.id)});
        if (!data) return res.json({error: `No se encontro el Proveedor ${req.params.id}`})
        res.status(200).json({"Eliminado": true, trash: data})
    } catch (error) {
        console.error(error, "Error en delete Proveedor");
    }
}

export const updateProveedor = async (req,res)=>{
    try {
        const collection = conexion('Proveedores');
        const {id} = req.params;
        const {Nombre, Email, Registro_mercantil, Productos_vendidos} = req.body
        const existeProveedor = await collection.findOne({_id: new ObjectId(id)});
        if (!existeProveedor) return res.json({error: `El Proveedor ${id} no existe`});
        const data = await collection.updateOne({_id: new ObjectId(id)},{$set: {Nombre, Email, Registro_mercantil, Productos_vendidos}})
        res.status(200).json({"Actualizado": true, data})
    } catch (error) {
        console.error(error, "Error en update Proveedor");
    }
}