import axios from "axios";
import { useState } from "react";

const Card = ({data, setLoading})=>{
    const [isEditing, setEditing] = useState(false);

    let content = ('');
    const {Imagen, Marca, Modelo, Color, PotenciaHP, Precio, Tipo, Cilindraje, Ano, NumeroDeSerie, proveedorInfo, _id, proveedor, Estado} = data;
    
    const [newMarca, setMarca] = useState(Marca)
    const [newImagen, setImagen] = useState(Imagen)
    const [newModelo, setModelo] = useState(Modelo)
    const [newColor, setColor] = useState(Color)
    const [newPotenciaHP, setPotenciaHP] = useState(PotenciaHP)
    const [newPrecio, setPrecio] = useState(Precio)
    const [newTipo, setTipo] = useState(Tipo)
    const [newCilindraje, setCilindraje] = useState(Cilindraje)
    const [newAno, setAño] = useState(Ano)
    const [newNumeroDeSerie, setNúmeroDeSerie] = useState(NumeroDeSerie)
    const [newproveedor, setProveedor] = useState(proveedor)
    const [newEstado, setEstado] = useState(Estado)
    
    const oneDelete = (_id)=>{
        setLoading(true)
        axios.delete(`http://localhost:3309/api/motos/${_id}`)
        .then((response)=>{
            console.log(response,"eliminado");
        })
    };

    const updateData = ()=>{
        axios.patch(`http://localhost:3309/api/motos/${_id}`,
        {
          Marca: newMarca,
          Imagen: newImagen,
          Modelo: newModelo,
          Color: newColor,
          PotenciaHP: newPotenciaHP,
          Precio: newPrecio,
          Tipo: newTipo,
          Cilindraje: newCilindraje,
          Ano: newAno,
          NumeroDeSerie: newNumeroDeSerie,
          proveedor: newproveedor,
          Estado: newEstado
        })
        .then((response)=>{
          if(!response) console.warn("El api no funshion ;V");
      });
    }

    if(isEditing){
        content = (
            <div className="info">
                <input type='text' value={newMarca} onChange={(e)=>setMarca(e.target.value)} />
              <input type='text' value={newImagen} onChange={(e)=>setImagen(e.target.value)} />
              <input type='text' value={newModelo} onChange={(e)=>setModelo(e.target.value)} />
              <input type='text' value={newColor} onChange={(e)=>setColor(e.target.value)} />
              <input type='number' value={newPotenciaHP} onChange={(e)=>setPotenciaHP(e.target.value)} />
              <input type='number' value={newPrecio} onChange={(e)=>setPrecio(e.target.value)} />
              <input type='text' value={newTipo} onChange={(e)=>setTipo(e.target.value)} />
              <input type='number' value={newCilindraje} onChange={(e)=>setCilindraje(e.target.value)} />
              <input type='number' value={newAno} onChange={(e)=>setAño(e.target.value)} />
              <input type='text' value={newNumeroDeSerie} onChange={(e)=>setNúmeroDeSerie(e.target.value)} />
              <input type='text' value={newproveedor} onChange={(e)=>setProveedor(e.target.value)} />
              <label for="check">Producto Disponible?</label>
              <input type='checkbox' id='check' onChange={()=>setEstado(!Estado)} />
              <button onClick={()=>setEditing(false)}>Cancelar</button>
              <button onClick={()=>updateData(data)}>Guardar</button>
            </div>
        )
    }else {
        content = (
<div className="content">
            <div className="cont-image">
                <img src={Imagen} alt="No found img" />
            </div>
            <div className="info">
                <h1>Terrestre</h1> 
                <p><span>Marca:</span> {Marca}</p>
                <p><span>Modelo:</span> {Modelo}</p>
                <p><span>Color:</span> {Color}</p>
                <details>
                    <summary>Ver Mas <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-badge-down" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 13v-6l-5 4l-5 -4v6l5 4z" /></svg></summary>
                    <p><span>PotenciaHP:</span> {PotenciaHP}</p>
                    <p><span>Precio:</span> {Precio}</p>
                    <p><span>Tipo:</span> {Tipo}</p>
                    <p><span>Cilindraje:</span> {Cilindraje}</p>
                    <p><span>Año:</span> {Ano}</p>
                    <p><span>Número De Serie:</span> {NumeroDeSerie}</p>
                    <p><span>Proveedor:</span> {proveedorInfo[0].Nombre}</p>
                    <button type="submit" onClick={()=>oneDelete(_id)}>Eliminar</button>
                    <button onClick={()=>setEditing(true)}>Actualizar</button>
                </details>
            </div>
        </div>
        )
    }

    return (
        <>
            {content}
        </>
    )
}

export default Card;