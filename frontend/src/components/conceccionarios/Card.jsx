import axios from "axios";
import { useState } from "react";

const Card =({data, setLoading})=>{
    const [isEditing, setEditing] = useState(false);
    let content = ('');

    const {Nombre, Ubicacion, Cantidad_ventas, Inventario, InventarioInfo, _id} = data;
    const [newNombre, setNombre] = useState(Nombre)
    const [newUbicacion, setUbicacion] = useState(Ubicacion)
    const [newCantidad_ventas, setCantidad_ventas] = useState(Cantidad_ventas)
    const [newInventario, setInventario] = useState(Inventario)
    let cantidad =0;
    InventarioInfo[0].productos.map((e)=>cantidad = cantidad + e.cantidad)
    const oneDelete = (_id)=>{
        setLoading(true);
        axios.delete(`http://localhost:3309/api/conceccionarios/${_id}`)
        .then((response)=>{
            console.log(response,"eliminado");
        })
    };

    const updateData = ()=>{
        console.log((
            {
                Nombre: newNombre,
                Ubicacion: newUbicacion,
                Cantidad_ventas: newCantidad_ventas,
                Inventario: newInventario
            }
        ));
        axios.patch(`http://localhost:3309/api/conceccionarios/${_id}`,
        {
            Nombre: newNombre,
            Ubicacion: newUbicacion,
            Cantidad_ventas: newCantidad_ventas,
            Inventario: newInventario
        })
        .then((response)=>{
            setEditing(false)
            window.location.reload();
          if(!response) console.warn("El api no funshion ;V");
        });
    }
    if(isEditing){
        content = (
        <tr>
            <td><input type="text" value={newNombre} onChange={(e)=>setNombre(e.target.value)}/></td>
            <td><input type="text" value={newUbicacion} onChange={(e)=>setUbicacion(e.target.value)}/></td>
            <td><input type="number" value={newCantidad_ventas} onChange={(e)=>setCantidad_ventas(e.target.value)}/></td>
            <td><input type="text" value={newInventario} onChange={(e)=>setInventario(e.target.value)}/></td>
            <td><button onClick={()=>setEditing(false)}>Cancelar</button>
              <button onClick={()=>updateData()}>Guardar</button></td>
        </tr>
        )
    }else {
        content = (
            <tr>
                <td>{Nombre}</td>
                <td>{Ubicacion}</td>
                <td>{Cantidad_ventas}</td>
                <td>{cantidad}</td>
                <td><button type="submit" onClick={()=>oneDelete(_id)}>Eliminar</button>
                <button onClick={()=>setEditing(true)}>Actualizar</button></td>
            </tr>
        )
    }
    return(
        <>
            {content}
        </>
    )
}

export default Card;