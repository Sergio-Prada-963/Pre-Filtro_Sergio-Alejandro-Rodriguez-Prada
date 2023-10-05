import axios from "axios";
import React,{useEffect,useState} from "react";
import Card from "./CardMoto";
import CardAvion from "./CardAvion"

const Productos = ()=>{
    const [isLoading, setLoading] = useState(true);
    const [dataMoto, setDataMoto] = useState([]);
    const [dataAvion, setDataAvion] = useState([]);
    let content = ('');
    useEffect(()=>{
        if(isLoading){
            async function fetchData(){
                try {
                    axios.get(`http://localhost:3309/api/motos/all`)
                    .then((response)=>{
                        setDataMoto(response.data.motos)
                        if(!response) console.warn("El api no funshion ;V");
                    });
                    axios.get(`http://localhost:3309/api/aviones/all`)
                    .then((response)=>{
                        console.log(response.data);
                        setDataAvion(response.data.aviones)
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
                {dataMoto.map((e)=>(
                    <Card data={e} />
                ))}
                {dataAvion.map((e)=>(
                    <CardAvion data={e}/>
                ))}
            </div>
        )
    }
    return (
        <React.Fragment>
            <div className="section">
                <h1>Productos</h1>
            </div>
            <div className="parallax">
                <div className="sombra">
                </div>
                    <h1>Toda La informacion Sobre Sus productos</h1>
            </div>
            <div className="filtro">
                <select id="select">
                    <option value="">Filtrar por:</option>
                    <option value="aereo">Aereo</option>
                    <option value="terrestre">Terrestre</option>
                </select>
            </div>
            {content}
        </React.Fragment>
    )
}

export default Productos;