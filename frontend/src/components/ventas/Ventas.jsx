import axios from "axios";
import React, { useEffect, useState } from "react";
import CardVentas from "./CardVentas";
import ModalVentas from "./ModalVentas";

const Ventas = () => {
    const [isLoading, setLoading] = useState(true);
    const [dataVentas, setDataVentas] = useState([]);
    let content = "";
    useEffect(() => {
        if (isLoading) {
            async function fetchData() {
                try {
                    axios
                        .get(`http://localhost:3309/api/ventas/all`)
                        .then((response) => {
                            setDataVentas(response.data.ventas);
                            setLoading(false);
                            if (!response) console.warn("El api no responde");
                        });
                } catch (error) {
                    console.error(error, " Algo anda aml :(");
                }
            }
            fetchData();
        }
    }, [isLoading]);
    if (isLoading) {
        content = (
            <div class="container">
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <span class="loading">Cargando...</span>
            </div>
        );
    } else {
        content = (
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Producto</th>
                            <th>Empleado</th>
                            <th>Conceccionario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataVentas.map((e) => (
                            <CardVentas data={e} setLoading={setLoading} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    return (
        <React.Fragment>
            <div className="section">
                <h1>Ventas</h1>
            </div>
            <div className="parallax5">
                <div className="sombra"></div>
                <h1>Tus ventas al detalle</h1>
            </div>
            <div className="filtro">
                <select id="select">
                    <option value="">Ordenar por:</option>
                    <option value="ventas">Ventas</option>
                    <option value="cantidadStock">Cantidad Stock</option>
                    <option value="cantidadStock">Opciones</option>
                </select>
            </div>
            <ModalVentas />
            {content}
        </React.Fragment>
    );
};

export default Ventas;
