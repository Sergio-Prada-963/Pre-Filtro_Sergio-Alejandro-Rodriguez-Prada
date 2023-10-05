const CardAvion = ({data})=>{
    console.log(data, "sldjhfksdhfkjdskj");
    const {Imagen, AltitudMáximaDeCrucero, AñoDeFabricación, CapacidadDePasajeros, Envergadura, Longitud, Marca, Modelo, NúmeroDeRegistro, NúmeroDeSerie, RangoDeVuelo, Tipo, TipoDeMotor, Valor, VelocidadMáxima, proveedorInfo} = data;
    return (
        <div className="content">
            <div className="cont-image">
                <img src={Imagen} alt="No found img" />
            </div> 
            <div className="info">
                <h1>Aereo</h1>
                <p><span>Marca:</span> {Marca}</p>
                <p><span>Modelo:</span> {Modelo}</p>
                <p><span>Longitud:</span> {Longitud}</p>
                <details>
                    <summary>Ver Mas <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-badge-down" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 13v-6l-5 4l-5 -4v6l5 4z" /></svg></summary>
                    <p><span>Altitud Máxima Crucero:</span> {AltitudMáximaDeCrucero}</p>
                    <p><span>Capacidad Pasajeros:</span> {CapacidadDePasajeros}</p>
                    <p><span>Tipo:</span> {Tipo}</p>
                    <p><span>Envergadura:</span> {Envergadura}</p>
                    <p><span>Año Fabricación:</span> {AñoDeFabricación}</p>
                    <p><span>Número De Serie:</span> {NúmeroDeSerie}</p>
                    <p><span>Número Registro:</span> {NúmeroDeRegistro}</p>
                    <p><span>Rango Vuelo:</span> {RangoDeVuelo}</p>
                    <p><span>Tipo Motor:</span> {TipoDeMotor}</p>
                    <p><span>Velocidad Máxima:</span> {VelocidadMáxima}</p>
                    <p><span>Valor:</span> {Valor}</p>
                    <p><span>Proveedor:</span> {proveedorInfo[0].Nombre}</p>
                </details>
            </div>
        </div>
    )
}

export default CardAvion;
