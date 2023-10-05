import conexion from "../../config/conexion.js";
import {response} from 'express';
import { ObjectId } from "mongodb";

export const getAviones = async (req, res = response) => {
  try {
    const collection = conexion('Aviones');
    const total = await collection.countDocuments();
    const aviones = await collection.aggregate([
      {
        $lookup: {
          from: 'Proveedores', 
          localField: 'proveedor',
          foreignField: '_id', 
          as: 'proveedorInfo', 
        },
      },
    ]).toArray();
    res.status(200).json({ total, aviones });
  } catch (error) {
    console.error(error, 'Error en get Aviones');
  }
};

export const postAvion = async (req,res)=>{
    try {
        const collection = conexion('Aviones');
        const {Marca, Modelo, NúmeroDeRegistro, Imagen, Tipo, AñoDeFabricación, NúmeroDeSerie, CapacidadDePasajeros, RangoDeVuelo, TipoDeMotor, VelocidadMáxima, AltitudMáximaDeCrucero, Longitud, Envergadura, proveedor, Valor, Estado} = req.body
        const existAvion = await collection.findOne({Marca,Modelo})
        if (existAvion) return res.json({error: `El avion ${Marca} ya existe`});
        const data = await collection.insertOne({Marca, Modelo, NúmeroDeRegistro, Imagen, Tipo, AñoDeFabricación, NúmeroDeSerie, CapacidadDePasajeros, RangoDeVuelo, TipoDeMotor, VelocidadMáxima, AltitudMáximaDeCrucero, Longitud, Envergadura, proveedor, Valor, Estado});
        res.status(200).json(data)
    } catch (error) {
        console.error(error, "Error en post Avion");
    }
}

export const deleteAvion = async (req,res)=>{
    try {
        const collection = conexion('Aviones');
        const data = await collection.findOneAndDelete({_id: new ObjectId(req.params.id)});
        if (!data) return res.json({error: `No se encontro el avion ${req.params.id}`})
        res.status(200).json({"Eliminado": true, trash: data})
    } catch (error) {
        console.error(error, "Error en delete Avion");
    }
}

export const updateAvion = async (req,res)=>{
    try {
        const collection = conexion('Aviones');
        const {id} = req.params;
        const {Marca, Modelo, NúmeroDeRegistro, Imagen, Tipo, AñoDeFabricación, NúmeroDeSerie, CapacidadDePasajeros, RangoDeVuelo, TipoDeMotor, VelocidadMáxima, AltitudMáximaDeCrucero, Longitud, Envergadura, proveedor, Valor, Estado} = req.body
        const existeAvion = await collection.findOne({_id: new ObjectId(id)});
        if (!existeAvion) return res.json({error: `El avion ${Marca} ${Modelo} no existe`});
        const data = await collection.updateOne({_id: new ObjectId(id)},{$set: {Marca, Modelo, NúmeroDeRegistro, Imagen, Tipo, AñoDeFabricación, NúmeroDeSerie, CapacidadDePasajeros, RangoDeVuelo, TipoDeMotor, VelocidadMáxima, AltitudMáximaDeCrucero, Longitud, Envergadura, proveedor, Valor, Estado}})
        res.status(200).json({"Actualizado": true, data})
    } catch (error) {
        console.error(error, "Error en update Avion");
    }
}