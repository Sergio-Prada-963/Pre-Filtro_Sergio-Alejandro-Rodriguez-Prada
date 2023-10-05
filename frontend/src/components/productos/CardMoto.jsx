const Card = ({data})=>{
    console.log(data, "sldjhfksdhfkjdskj");
    const {Imagen, Marca, Modelo, Color, PotenciaHP, Precio, Tipo, Cilindraje, Año, NúmeroDeSerie, proveedorInfo} = data;
    return (
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
                    <p><span>Año:</span> {Año}</p>
                    <p><span>Número </span>De Serie: {NúmeroDeSerie}</p>
                    <p><span>Proveedor:</span> {proveedorInfo[0].Nombre}</p>
                </details>
            </div>
        </div>
    )
}

export default Card;