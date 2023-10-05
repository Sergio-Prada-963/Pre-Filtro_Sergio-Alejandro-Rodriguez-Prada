import Modal from 'react-modal';
import React,{useState} from "react";
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function ModalAvion() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const [Marca, setMarca] = useState('') 
  const [Modelo, setModelo] = useState('') 
  const [NumeroDeRegistro, setNumeroDeRegistro] = useState('') 
  const [Imagen, setImagen] = useState('') 
  const [Tipo, setTipo] = useState('') 
  const [AnoDeFabricacion, setAnoDeFabricacion] = useState(0) 
  const [NumeroDeSerie, setNumeroDeSerie] = useState('') 
  const [CapacidadDePasajeros, setCapacidadDePasajeros] = useState(0) 
  const [RangoDeVuelo, setRangoDeVuelo] = useState('') 
  const [TipoDeMotor, setTipoDeMotor] = useState('') 
  const [VelocidadMaxima, setVelocidadMaxima] = useState('') 
  const [AltitudMaximaDeCrucero, setAltitudMaximaDeCrucero] = useState('') 
  const [Longitud, setLongitud] = useState('') 
  const [Envergadura, setEnvergadura] = useState('') 
  const [proveedor, setproveedor] = useState('') 
  const [Valor, setValor] = useState('') 
  const [Estado, setEstado] = useState(false)

  const postAvion = ()=>{
    console.log({
      Marca,
      Modelo,
      NumeroDeRegistro,
      Imagen,
      Tipo,
      AnoDeFabricacion,
      NumeroDeSerie,
      CapacidadDePasajeros,
      RangoDeVuelo,
      TipoDeMotor,
      VelocidadMaxima,
      AltitudMaximaDeCrucero,
      Longitud,
      Envergadura,
      proveedor,
      Valor,
      Estado
    });
    axios.post(`http://localhost:3309/api/aviones`,
        {
          Marca,
          Modelo,
          NumeroDeRegistro,
          Imagen,
          Tipo,        
          AnoDeFabricacion,
          NumeroDeSerie,
          CapacidadDePasajeros,
          RangoDeVuelo,
          TipoDeMotor,
          VelocidadMaxima,
          AltitudMaximaDeCrucero,
          Longitud,
          Envergadura,
          proveedor,
          Valor,
          Estado
        })
        .then((response)=>{
          if(!response) console.warn("El api no funshion ;V");
      });
  }


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Añadir Avion</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Productos</h2>
        {/* <button onClick={()=>closeModal()}>close</button> */}
        <div>Añadir Producto</div>
        <form>  
          <h1>Terrestres</h1>
            <div className='datos-Moto'>
              <input type='text' placeholder='Marca' onChange={(e)=>setMarca(e.target.value)} />
              <input type='text' placeholder='Modelo' onChange={(e)=>setModelo(e.target.value)} />
              <input type='text' placeholder='NumeroDeRegistro' onChange={(e)=>setNumeroDeRegistro(e.target.value)} />
              <input type='text' placeholder='Imagen' onChange={(e)=>setImagen(e.target.value)} />
              <input type='text' placeholder='Tipo' onChange={(e)=>setTipo(e.target.value)} />
              <input type='number' placeholder='AnoDeFabricacion' onChange={(e)=>setAnoDeFabricacion(e.target.value)} />
              <input type='text' placeholder='NumeroDeSerie' onChange={(e)=>setNumeroDeSerie(e.target.value)} />
              <input type='number' placeholder='CapacidadDePasajeros' onChange={(e)=>setCapacidadDePasajeros(e.target.value)} />
              <input type='text' placeholder='RangoDeVuelo' onChange={(e)=>setRangoDeVuelo(e.target.value)} />
              <input type='text' placeholder='TipoDeMotor' onChange={(e)=>setTipoDeMotor(e.target.value)} />
              <input type='text' placeholder='VelocidadMaxima' onChange={(e)=>setVelocidadMaxima(e.target.value)} />
              <input type='text' placeholder='AltitudMaximaDeCrucero' onChange={(e)=>setAltitudMaximaDeCrucero(e.target.value)} />
              <input type='text' placeholder='Longitud' onChange={(e)=>setLongitud(e.target.value)} />
              <input type='text' placeholder='Envergadura' onChange={(e)=>setEnvergadura(e.target.value)} />
              <input type='text' placeholder='proveedor' onChange={(e)=>setproveedor(e.target.value)} />
              <input type='text' placeholder='Valor' onChange={(e)=>setValor(e.target.value)} />
              <label for="check">Producto Disponible?</label>
              <input type='checkbox' id='check' onChange={()=>setEstado(!Estado)} />
            </div>
            <button type="submit" onClick={()=>postAvion()}>Añadir</button>
        </form>
      </Modal>
    </div>
  );
}
