import conexion from "../../config/conexion.js";
import { ObjectId } from "mongodb";

export const getConceccionario = async (req,res)=>{
    try {
        const collection = conexion('Conceccionarios');
        const total = await collection.countDocuments();
        const conceccionarios = await collection.aggregate([
          {
            $lookup: {
              from: 'Inventarios', 
              localField: 'Inventario',
              foreignField: '_id', 
              as: 'InventarioInfo', 
            },
          },
        ]).toArray();
        res.status(200).json({ total, conceccionarios });
    } catch (error) {
        console.error(error, "Error en get Conceccionario");
    }
}

export const postConceccionario = async (req,res)=>{
    try {
        const collection = conexion('Conceccionarios');
        const {Nombre, Ubicacion, Cantidad_ventas, Inventario} = req.body;
        const existConceccionario = await collection.findOne({Nombre});
        if (existConceccionario) return res.json({error: `El Conceccionario ${Nombre} ya existe...`});
        const data = await collection.insertOne({Nombre, Ubicacion, Cantidad_ventas, Inventario: new ObjectId(Inventario)});
        res.status(200).json(data)
    } catch (error) {
        console.error(error, "Error en post Conceccionario");
    }
}

export const deleteConceccionario = async (req,res)=>{
    try {
        const collection = conexion('Conceccionarios');
        const data = await collection.findOneAndDelete({_id: new ObjectId(req.params.id)}) ;
        if(!data) return res.json({error: `No se encontro el Conceccionario ${req.params.id}`});
        res.json({"Eliminado": true, trash: data});
    } catch (error) {
        console.error(error, "Error en delete Conceccionario");
    }
}

export const updateConceccionario = async (req,res)=>{
    try {
        const collection = conexion('Conceccionarios');
        const {id} = req.params;
        const {Nombre, Ubicacion, Cantidad_ventas, Inventario} = req.body;
        const existConceccionario = await collection.findOne({_id: new ObjectId(id)});
        if(!existConceccionario) return res.json({error: `El Conceccionario ${Nombre} no se encontro`});
        const data = await collection.updateOne({_id: new ObjectId(id)},{$set: {Nombre, Ubicacion, Cantidad_ventas, Inventario: new ObjectId(Inventario)}});
        res.status(200).json({"Actiualizado": true, data});
    } catch (error) {
        console.error(error, "Error en update Conceccionario");
    }
}