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

export default function ModalMoto() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const [Marca, setMarca] = useState('')
  const [Imagen, setImagen] = useState('')
  const [Modelo, setModelo] = useState('')
  const [Color, setColor] = useState('')
  const [PotenciaHP, setPotenciaHP] = useState(0)
  const [Precio, setPrecio] = useState(0)
  const [Tipo, setTipo] = useState('')
  const [Cilindraje, setCilindraje] = useState(0)
  const [Ano, setAño] = useState(0)
  const [NumeroDeSerie, setNúmeroDeSerie] = useState('')
  const [proveedor, setProveedor] = useState('')
  const [Estado, setEstado] = useState(false)

  const postMoto = ()=>{
    console.log({
      Marca,
      Imagen,
      Modelo,
      Color,
      PotenciaHP,
      Precio,
      Tipo,
      Cilindraje,
      Ano,
      NumeroDeSerie,
      proveedor,
      Estado
    });
    axios.post(`http://localhost:3309/api/motos`,
        {
          Marca,
          Imagen,
          Modelo,
          Color,
          PotenciaHP,
          Precio,
          Tipo,
          Cilindraje,
          Ano,
          NumeroDeSerie,
          proveedor,
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
      <button onClick={openModal}>Añadir Moto</button>
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
              <input type='text' placeholder='Imagen' onChange={(e)=>setImagen(e.target.value)} />
              <input type='text' placeholder='Modelo' onChange={(e)=>setModelo(e.target.value)} />
              <input type='text' placeholder='Color' onChange={(e)=>setColor(e.target.value)} />
              <input type='number' onChange={(e)=>setPotenciaHP(e.target.value)} />
              <input type='number' onChange={(e)=>setPrecio(e.target.value)} />
              <input type='text' placeholder='Tipo' onChange={(e)=>setTipo(e.target.value)} />
              <input type='number' onChange={(e)=>setCilindraje(e.target.value)} />
              <input type='number' onChange={(e)=>setAño(e.target.value)} />
              <input type='text' placeholder='Número De Serie' onChange={(e)=>setNúmeroDeSerie(e.target.value)} />
              <input type='text' placeholder='Proveedor' onChange={(e)=>setProveedor(e.target.value)} />
              <label for="check">Producto Disponible?</label>
              <input type='checkbox' id='check' onChange={()=>setEstado(!Estado)} />
            </div>
            <button type="submit" onClick={()=>postMoto()}>Añadir</button>
        </form>
      </Modal>
    </div>
  );
}
