import axios from "axios";
import React,{useEffect,useState} from "react";
import Card from "./Card";
import ModalConce from "./Modal";

const Conceccionarios = ()=>{
    const [isLoading, setLoading] = useState(true);
    const [dataConce, setDataConce] = useState([]);
    let content = ('');
    useEffect(()=>{
        if(isLoading){
            async function fetchData(){
                try {
                    axios.get(`http://localhost:3309/api/conceccionarios/all`)
                    .then((response)=>{
                        setDataConce(response.data.conceccionarios);
                        setLoading(false)
                        if(!response) console.warn("El api no responde");
                    })
                } catch (error) {
                    console.error(error, " Algo anda aml :(");
                }
            }fetchData();
        }
    },[isLoading]);
    if(isLoading){
        content = (
            <div class="container">
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <span class="loading">Cargando...</span>
            </div>
        )
    }else {
        content = (
            <div className="container">
                <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Ubicacion</th>
                        <th>Cant. Ventas</th>
                        <th>Cantidad Productos</th>
                      </tr>
                    </thead>
                    <tbody>
                        {dataConce.map((e)=>(
                            <Card data={e} setLoading={setLoading} />
                        ))}
                    </tbody>
                </table>
                
            </div>
        )
    }
    return (
        <React.Fragment>
            <div className="section">
                <h1>Conceccionarios</h1>
            </div>
            <div className="parallax2">
                <div className="sombra"></div>
                <h1>Todos los datos sobre sus conceccionarios</h1>
            </div>
            <div className="filtro">
                <select id="select">
                    <option value="">Ordenar por:</option>
                    <option value="ventas">Ventas</option>
                    <option value="cantidadStock">Cantidad Stock</option>
                    <option value="cantidadStock">Opciones</option>
                </select>
            </div>
            <ModalConce />
            {content}
        </React.Fragment>
    )
}

export default Conceccionarios;