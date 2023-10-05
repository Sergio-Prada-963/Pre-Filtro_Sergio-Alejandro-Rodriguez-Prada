import axios from "axios";
import { useState } from "react";

const CardProveedor = ({data, setLoading})=>{
    const [isEditing, setEditing] = useState(false);
    let content = ('');
    const {Nombre, Email, Registro_mercantil, Productos_vendidos, _id} = data;
    const [newNombre, setNombre] = useState(Nombre);
    const [newEmail, setEmail] = useState(Email);
    const [newRegistro_mercantil, setRegistro_mercantil] = useState(Registro_mercantil);
    const [newProductos_vendidos, setProductos_vendidos] = useState(Productos_vendidos);
    
    const oneDelete = (_id)=>{
        setLoading(true);
        axios.delete(`http://localhost:3309/api/proveedores/${_id}`)
        .then((response)=>{
            console.log(response,"eliminado");
        })
    };

    const updateData = ()=>{
        console.log((
            {
                Nombre: newNombre,
                Email: newEmail,
                Registro_mercantil: newRegistro_mercantil,
                Productos_vendidos: newProductos_vendidos
            }
        ));
        axios.patch(`http://localhost:3309/api/proveedores/${_id}`,
        {
            Nombre: newNombre,
            Email: newEmail,
            Registro_mercantil: newRegistro_mercantil,
            Productos_vendidos: newProductos_vendidos
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
                <td><input type="text" value={newEmail} onChange={(e)=>setEmail(e.target.value)}/></td>
                <td><input type="number" value={newRegistro_mercantil} onChange={(e)=>setRegistro_mercantil(e.target.value)}/></td>
                <td><input type="number" value={newProductos_vendidos} onChange={(e)=>setProductos_vendidos(e.target.value)}/></td>
                <td><button onClick={()=>setEditing(false)}>Cancelar</button>
                  <button onClick={()=>updateData()}>Guardar</button></td>
            </tr>
        )
    }else {
        content = (
            <tr>
                <td>{Nombre}</td>
                <td>{Email}</td>
                <td>{Registro_mercantil}</td>
                <td>{Productos_vendidos}</td>
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

export default CardProveedor