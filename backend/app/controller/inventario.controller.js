import conexion from "../../config/conexion.js";
import { ObjectId } from 'mongodb';

export const getInventarios = async (req,res)=>{
    try {
        const collection = conexion('Inventarios');
        const total = await collection.countDocuments();
        const Inventarios = await collection.aggregate([
            {
                $unwind: "$productos"
            },
          {
            $lookup: {
              from: 'Motos', 
              localField: 'productos.producto',
              foreignField: '_id', 
              as: 'motos', 
            },
          },
          {
            $lookup: {
              from: 'Aviones', 
              localField: 'productos.producto',
              foreignField: '_id', 
              as: 'aviones', 
            }
          },
        ]).toArray();
        res.status(200).json({ total, Inventarios });
    } catch (error) {
        console.error(error, "Error en get Inventarios");
    }
}

export const postInventarios = async (req,res)=>{
    try {
        const collection = conexion('Inventarios');
        const {productos} = req.body;
        const data = await collection.insertOne({productos});
        res.status(200).json(data);
    } catch (error) {
        console.error(error," Error en post Inventarios");
    }
}

export const deleteInventario = async (req,res)=>{
    try {
        const collection = conexion('Inventarios');
        const data = await collection.findOneAndDelete({_id: new ObjectId(req.params.id)})
        if (!data) return res.json({error: `No se encontro El inventario ${req.params.id}`})
        res.status(200).json({"eliminado": true, trash: data})
    } catch (error) {
        console.error(error," Error en delete Inventario");
    }
}

export const updateInventario = async (req,res)=>{
    try {
        const collection = conexion('Inventarios');
        const {id} = req.params;
        const {productos} = req.body
        const existInventario = await collection.findOne({_id: new ObjectId(id)});
        if (!existInventario) return res.json({error: `El inventario ${Marca} con el id ${id} no existe`})
        const data = await collection.updateOne({_id: new ObjectId(id)},{$set: {productos}})
        res.status(200).json({"actualizado": true, data})
    } catch (error) {
        console.error(error," Error en update Inventario");
    }
}

export const updateOneInventario = async (req, res) => {
    try {
        const collection = conexion('Inventarios');
        const indice = await collection.aggregate([
            {
                $match: {
                    _id: new ObjectId(req.params.id)
                }
            },
            {
                $group: {
                    _id: null,
                    indice: { $push: { $indexOfArray: ["$productos.producto", req.body.producto] } }
                }
            }
        ]).toArray();
        const position = `productos.${indice[0].indice[0]}.cantidad`;
        const data = await collection.updateOne({_id: new ObjectId(req.params.id)},{$set: {[position]: req.body.cantidad}});
        res.status(200).json(data );
    } catch (error) {
        console.error(error, " Error en update One Inventario");
        res.status(500).json({ error: "Error interno del servidor" });
    }
}