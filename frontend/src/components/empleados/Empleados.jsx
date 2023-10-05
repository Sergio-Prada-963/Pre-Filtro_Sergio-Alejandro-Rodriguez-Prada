import axios from "axios";
import React,{useEffect,useState} from "react";

const Empleados = ()=>{
    const [isLoading, setLoading] = useState(true);
    const [dataEmpleados, setDataEmpelado] = useState([]);
    let content = ('');
    useEffect(()=>{
        if(isLoading){
            async function fetchData(){
                try {
                    axios.get(`http://localhost:3309/api/empleados/all`)
                    .then((response)=>{
                        setDataEmpelado(response.data.empleados);
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
                        <th>Teléfono</th>
                        <th>Cargo</th>
                        <th>Email</th>
                        <th>Conceccionario</th>
                        <th>NumeroId</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                        {dataEmpleados.map((e)=>(
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

export default Empleados;