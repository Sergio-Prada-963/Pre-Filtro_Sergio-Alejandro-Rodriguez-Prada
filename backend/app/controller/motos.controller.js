import conexion from "../../config/conexion.js";
import { ObjectId } from 'mongodb';

export const getMotos = async (req,res)=>{
    try {
        const collection = conexion('Motos');
        const total = await collection.countDocuments();
        const motos = await collection.aggregate([
            {
                $lookup: {
                  from: 'Proveedores', 
                  localField: 'proveedor',
                  foreignField: '_id', 
                  as: 'proveedorInfo', 
                },
          },
        ]).toArray();
        res.status(200).json({ total, motos });
    } catch (error) {
        console.error(error, "Error en get Motos");
    }
}

export const postMotos = async (req,res)=>{
    try {
        const collection = conexion('Motos');
        const {Marca, Modelo, Año, NumeroDeSerie, Tipo, Cilindraje, PotenciaHp, Color, Precio, Estado, proveedor, Imagen} = req.body;
        const existMoto = await collection.findOne({Marca, Modelo});
        if (existMoto) return res.json({error: `La moto ${Marca} ya existe`});
        const data = await collection.insertOne({Marca, Modelo, Año, NumeroDeSerie, Tipo, Cilindraje, PotenciaHp, Color, Precio, Estado, proveedor, Imagen});
        res.status(200).json(data);
    } catch (error) {
        console.error(error," Error en pos tMotos");
    }
}

export const deleteMoto = async (req,res)=>{
    try {
        const collection = conexion('Motos');
        const data = await collection.findOneAndDelete({_id: new ObjectId(req.params.id)})
        if (!data) return res.json({error: `No se encontro la moto ${req.params.id}`})
        res.status(200).json({"eliminado": true, trash: data})
    } catch (error) {
        console.error(error," Error en delete Moto");
    }
}

export const updateMoto = async (req,res)=>{
    try {
        const collection = conexion('Motos');
        const {id} = req.params;
        const {Marca, Modelo, Año, NumeroDeSerie, Tipo, Cilindraje, PotenciaHp, Color, Precio, Estado, proveedor, Imagen} = req.body
        const existMoto = await collection.findOne({_id: new ObjectId(id)});
        if (!existMoto) return res.json({error: `La moto ${Marca} con el id ${id} no existe`})
        const data = await collection.updateOne({_id: new ObjectId(id)},{$set: {Marca, Modelo, Año, NumeroDeSerie, Tipo, Cilindraje, PotenciaHp, Color, Precio, Estado, proveedor, Imagen}})
        res.status(200).json({"actualizado": true, data})
    } catch (error) {
        console.error(error," Error en update Moto");
    }
}