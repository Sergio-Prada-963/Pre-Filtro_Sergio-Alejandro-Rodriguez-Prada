import conexion from "../../config/conexion.js";
import { ObjectId } from "mongodb";

export const getVentas = async (req, res) => {
	try {
		const collection = conexion("Ventas");
		const total = await collection.countDocuments();
        const ventas = await collection.aggregate([
          {
            $lookup: {
              from: 'Clientes', 
              localField: 'Cliente',
              foreignField: '_id', 
              as: 'clienteInfo', 
            },
          },
          {
            $lookup: {
              from: 'Motos', 
              localField: 'Producto',
              foreignField: '_id', 
              as: 'motosInfo', 
            },
          },
          {
            $lookup: {
              from: 'Aviones', 
              localField: 'Producto',
              foreignField: '_id', 
              as: 'avionesInfo', 
            },
          },
          {
            $lookup: {
              from: 'Empleados', 
              localField: 'Empleado',
              foreignField: '_id', 
              as: 'empleadoInfo', 
            },
          },
          {
            $lookup: {
              from: 'Conceccionarios', 
              localField: 'Conceccionario',
              foreignField: '_id', 
              as: 'conceccionarioInfo', 
            },
          },
        ]).toArray();
        res.status(200).json({ total, ventas });
	} catch (error) {
		console.error(error, "Error en get Ventas");
	}
};

export const postVentas = async (req, res) => {
	try {
		const collection = conexion("Ventas");
		const updateVentas = conexion("Conceccionarios");
		const updateInventario = conexion("Inventarios");
		const { Fecha, Cliente, Producto, Empleado, Conceccionario } = req.body;
        const concecciona = await updateVentas.findOne({ _id: new ObjectId(Conceccionario) });
        //Validaciones
        const stock = await updateInventario.aggregate([
            {
                $match: {
                    _id: concecciona.Inventario,
                }
            },
            {
                $unwind: "$productos"
            },
            {
                $match: {
                    "productos.producto": new ObjectId(Producto),
                }
            }
        ]).toArray();
        if (stock.length === 0) return res.status(400).json({"Advertencia": `No se pudo encontrar el producto ${Producto} en el conceccionario ${Conceccionario}`})
        if (stock[0].productos.cantidad <= 0) return res.status(400).json({"Advertencia": "No se puede realizar la venta por que no esta disponible este producto en stock"})
        const indice = await updateInventario
            .aggregate([
                {
                    $match: {
                        _id: concecciona.Inventario,
                    },
                },
                {
                    $group: {
                        _id: null,
                        indice: {
                            $push: { $indexOfArray: ["$productos.producto", new ObjectId(Producto)] },
                        },
                    },
                },
            ])
            .toArray();
        const position = `productos.${indice[0].indice[0]}.cantidad`;
        await updateInventario.updateOne({ _id: concecciona.Inventario }, { $inc: { [position]: -1 } });

		const data = await collection.insertOne({
			Fecha: new Date(Fecha),
			Cliente: new ObjectId(Cliente),
			Producto: new ObjectId(Producto),
			Empleado: new ObjectId(Empleado),
			Conceccionario: new ObjectId(Conceccionario),
		});
		await updateVentas.updateOne({ _id: new ObjectId(Conceccionario) }, { $inc: { Cantidad_ventas: 1 } });
		res.status(200).json(data);
	} catch (error) {
		console.error(error, " Error en post Ventas");
	}
};

export const deleteVenta = async (req, res) => {
	try {
		const collection = conexion("Ventas");
		const data = await collection.findOneAndDelete({ _id: new ObjectId(req.params.id) });
		if (!data) return res.json({ error: `No se encontro la Venta ${req.params.id}` });
		res.status(200).json({ eliminado: true, trash: data });
	} catch (error) {
		console.error(error, " Error en delete Venta");
	}
};

export const updateVenta = async (req, res) => {
	try {
		const collection = conexion("Ventas");
		const updateVentas = conexion("Conceccionarios");
		const updateInventario = conexion("Inventarios");
		const { id } = req.params;
		const { Fecha, Cliente, Producto, Empleado, Conceccionario } = req.body;
        //validacion Venta existe
		const existVenta = await collection.findOne({ _id: new ObjectId(id) });
		if (!existVenta) return res.json({ error: `La Venta con el id ${id} no existe` });
        //Validacion nuevo stock
        const concecciona = await updateVentas.findOne({ _id: new ObjectId(Conceccionario) });
        const stock = await updateInventario.aggregate([
            {
                $match: {
                    _id: concecciona.Inventario,
                }
            },
            {
                $unwind: "$productos"
            },
            {
                $match: {
                    "productos.producto": new ObjectId(Producto),
                }
            }
        ]).toArray();
        if (stock.length === 0) return res.status(400).json({"Advertencia": `No se pudo encontrar el producto ${Producto} en el conceccionario ${Conceccionario}`})
        if (stock[0].productos.cantidad <= 0) return res.status(400).json({"Advertencia": "No se puede actualizar la venta por que no esta disponible este producto en stock"})
        const indice = await updateInventario
            .aggregate([
                {
                    $match: {
                        _id: concecciona.Inventario,
                    },
                },
                {
                    $group: {
                        _id: null,
                        indice: {
                            $push: { $indexOfArray: ["$productos.producto", new ObjectId(Producto)] },
                        },
                    },
                },
            ])
            .toArray();
        const position = `productos.${indice[0].indice[0]}.cantidad`;
        await updateInventario.updateOne({ _id: concecciona.Inventario }, { $inc: { [position]: -1 } });
        await updateVentas.updateOne({ _id: new ObjectId(Conceccionario) }, { $inc: { Cantidad_ventas: 1 } });
        //restauracion numero stock
        const restaurarConccecionario = await updateVentas.findOne({_id: existVenta.Conceccionario})
        const restauracionIndice = await updateInventario
            .aggregate([
                {
                    $match: {
                        _id: restaurarConccecionario.Inventario,
                    },
                },
                {
                    $group: {
                        _id: null,
                        indice: {
                            $push: { $indexOfArray: ["$productos.producto", existVenta.Producto] },
                        },
                    },
                },
            ])
            .toArray();
        const restauracionPosition = `productos.${restauracionIndice[0].indice[0]}.cantidad`;
        await updateInventario.updateOne({ _id: restaurarConccecionario.Inventario }, { $inc: { [restauracionPosition]: 1 } });
        //restauracion numero de ventas
        await updateVentas.updateOne({ _id: existVenta.Conceccionario }, { $inc: { Cantidad_ventas: -1 } });
        //send data
		const data = await collection.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { Fecha: new Date(Fecha),
                Cliente: new ObjectId(Cliente),
                Producto: new ObjectId(Producto),
                Empleado: new ObjectId(Empleado),
                Conceccionario: new ObjectId(Conceccionario), } }
		);
		res.status(200).json({ actualizado: true, data });
	} catch (error) {
		console.error(error, " Error en update Venta");
	}
};
