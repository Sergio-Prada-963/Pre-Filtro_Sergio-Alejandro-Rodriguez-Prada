import axios from "axios";
import React,{useEffect,useState} from "react";
import CardProveedor from "./Card";
import ModalProvee from "./ModalProvee";

const Proveedores = ()=>{
    const [isLoading, setLoading] = useState(true);
    const [dataProveedores, setDataProveedores] = useState([]);
    let content = ('');
    useEffect(()=>{
        if(isLoading){
            async function fetchData(){
                try {
                    axios.get(`http://localhost:3309/api/proveedores/all`)
                    .then((response)=>{
                        setDataProveedores(response.data)
                        if(response) setLoading(false);
                        else console.warn("El api no funshion ;V");
                    });
                } catch (error) {
                    console.error(error," algo anda mal -_-");
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
    } else {
        content = (
            <div className="container">
                <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Registro Mercantil</th>
                        <th>Productos Vendidos</th>
                      </tr>
                    </thead>
                    <tbody>
                        {dataProveedores.map((e)=>(
                            <CardProveedor data={e} setLoading={setLoading} />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <React.Fragment>
            <div className="section">
                <h1>Proveedores</h1>
            </div>
            <div className="parallax3">
                <div className="sombra">
                </div>
                    <h1>Sus Proveedores Mas Confiables Estan Aqui</h1>
            </div>
            <div className="filtro">
                <select id="select">
                    <option value="">Filtrar por:</option>
                    <option value="aereo">Aereo</option>
                    <option value="terrestre">Terrestre</option>
                </select>
            </div>
            <ModalProvee/>
            {content}
        </React.Fragment>
    )
}

export default Proveedores;