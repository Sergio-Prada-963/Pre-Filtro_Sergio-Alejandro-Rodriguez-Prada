import axios from "axios";
import { useState } from "react";

const CardAvion = ({data, setLoading})=>{
    const [isEditing, setEditing] = useState(false);
    
    let content = ('');
    const {Imagen, AltitudMaximaDeCrucero, AnoDeFabricacion, CapacidadDePasajeros, Envergadura, Longitud, Marca, Modelo, NumeroDeRegistro, NumeroDeSerie, RangoDeVuelo, Tipo, TipoDeMotor, Valor, VelocidadMaxima, proveedorInfo, _id, proveedor} = data;
    const [newMarca, setMarca] = useState(Marca) 
    const [newModelo, setModelo] = useState(Modelo) 
    const [newNumeroDeRegistro, setNumeroDeRegistro] = useState(NumeroDeRegistro) 
    const [newImagen, setImagen] = useState(Imagen) 
    const [newTipo, setTipo] = useState(Tipo) 
    const [newAnoDeFabricacion, setAnoDeFabricacion] = useState(AnoDeFabricacion) 
    const [newNumeroDeSerie, setNumeroDeSerie] = useState(NumeroDeSerie) 
    const [newCapacidadDePasajeros, setCapacidadDePasajeros] = useState(CapacidadDePasajeros) 
    const [newRangoDeVuelo, setRangoDeVuelo] = useState(RangoDeVuelo) 
    const [newTipoDeMotor, setTipoDeMotor] = useState(TipoDeMotor) 
    const [newVelocidadMaxima, setVelocidadMaxima] = useState(VelocidadMaxima) 
    const [newAltitudMaximaDeCrucero, setAltitudMaximaDeCrucero] = useState(AltitudMaximaDeCrucero) 
    const [newLongitud, setLongitud] = useState(Longitud) 
    const [newEnvergadura, setEnvergadura] = useState(Envergadura) 
    const [newproveedor, setproveedor] = useState(proveedor) 
    const [newproveedorInfo, setproveedorInfo] = useState(proveedorInfo) 
    const [newValor, setValor] = useState(Valor) 

    const oneDelete = (_id)=>{
        setLoading(true)
        axios.delete(`http://localhost:3309/api/aviones/${_id}`)
        .then((response)=>{
            console.log(response,"eliminado");
        })
    };

    const updateData = ()=>{
          axios.patch(`http://localhost:3309/api/aviones/${_id}`,
              {
                Marca: newMarca,
                Modelo: newModelo,
                NumeroDeRegistro: newNumeroDeRegistro,
                Imagen: newImagen,
                Tipo: newTipo,        
                AnoDeFabricacion: newAnoDeFabricacion,
                NumeroDeSerie: newNumeroDeSerie,
                CapacidadDePasajeros: newCapacidadDePasajeros,
                RangoDeVuelo: newRangoDeVuelo,
                TipoDeMotor: newTipoDeMotor,
                VelocidadMaxima: newVelocidadMaxima,
                AltitudMaximaDeCrucero: newAltitudMaximaDeCrucero,
                Longitud: newLongitud,
                Envergadura: newEnvergadura,
                proveedor: newproveedor,
                Valor: newValor
              })
              .then((response)=>{
                setEditing(false)
                if(!response) console.warn("El api no funshion ;V");
            });
    }

    if(isEditing){
        content = (
            <div className="content">
            <div className="cont-image">
                <input type="text" value={newImagen} onChange={(e)=>setImagen(e.target.value)} />
            </div> 
            <div className="info">
                <h1>Aereo</h1>
                <input type="text" value={newMarca} onChange={(e)=>setMarca(e.target.value)} />
                <input type="text" value={newModelo} onChange={(e)=>setModelo(e.target.value)} />
                <input type="text" value={newLongitud} onChange={(e)=>setLongitud(e.target.value)} />
                <input type="text" value={newAltitudMaximaDeCrucero} onChange={(e)=>setAltitudMaximaDeCrucero(e.target.value)} />
                <input type="number" value={newCapacidadDePasajeros} onChange={(e)=>setCapacidadDePasajeros(e.target.value)} />
                <input type="text" value={newTipo} onChange={(e)=>setTipo(e.target.value)} />
                <input type="text" value={newEnvergadura} onChange={(e)=>setEnvergadura(e.target.value)} />
                <input type="number" value={newAnoDeFabricacion} onChange={(e)=>setAnoDeFabricacion(e.target.value)} />
                <input type="text" value={newNumeroDeSerie} onChange={(e)=>setNumeroDeSerie(e.target.value)} />
                <input type="text" value={newNumeroDeRegistro} onChange={(e)=>setNumeroDeRegistro(e.target.value)} />
                <input type="text" value={newRangoDeVuelo} onChange={(e)=>setRangoDeVuelo(e.target.value)} />
                <input type="text" value={newTipoDeMotor} onChange={(e)=>setTipoDeMotor(e.target.value)} />
                <input type="text" value={newVelocidadMaxima} onChange={(e)=>setVelocidadMaxima(e.target.value)} />
                <input type="text" value={newValor} onChange={(e)=>setValor(e.target.value)} />
                <input type="text" value={newproveedor} onChange={(e)=>setproveedor(e.target.value)} />
                
                <button onClick={()=>setEditing(false)}>Cancelar</button>
                <button onClick={()=>updateData(data)}>Guardar</button>
            </div>
        </div>
        )
    } else {
        content = (
        <div className="content">
            <div className="cont-image">
                <img src={newImagen} alt="No found img" />
            </div> 
            <div className="info">
                <h1>Aereo</h1>
                <p><span>Marca:</span> {newMarca}</p>
                <p><span>Modelo:</span> {newModelo}</p>
                <p><span>Longitud:</span> {newLongitud}</p>
                <details>
                    <summary>Ver Mas <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-badge-down" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 13v-6l-5 4l-5 -4v6l5 4z" /></svg></summary>
                    <p><span>Altitud Máxima Crucero:</span> {newAltitudMaximaDeCrucero}</p>
                    <p><span>Capacidad Pasajeros:</span> {newCapacidadDePasajeros}</p>
                    <p><span>Tipo:</span> {newTipo}</p>
                    <p><span>Envergadura:</span> {newEnvergadura}</p>
                    <p><span>Año Fabricación:</span> {newAnoDeFabricacion}</p>
                    <p><span>Número De Serie:</span> {newNumeroDeSerie}</p>
                    <p><span>Número Registro:</span> {newNumeroDeRegistro}</p>
                    <p><span>Rango Vuelo:</span> {newRangoDeVuelo}</p>
                    <p><span>Tipo Motor:</span> {newTipoDeMotor}</p>
                    <p><span>Velocidad Máxima:</span> {newVelocidadMaxima}</p>
                    <p><span>Valor:</span> {newValor}</p>
                    <p><span>Proveedor:</span> {newproveedorInfo[0].Nombre}</p>
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

export default CardAvion;
