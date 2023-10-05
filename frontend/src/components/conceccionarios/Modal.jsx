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

export default function ModalConce() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

    const [Nombre, setNombre] = useState('')
    const [Ubicacion, setUbicacion] = useState('')
    const [Cantidad_ventas, setCantidad_ventas] = useState(0)
    const [Inventario, setInventario] = useState('')

  const postConce = ()=>{
    console.log({
        Nombre,
        Ubicacion,
        Cantidad_ventas,
        Inventario
    });
    axios.post(`http://localhost:3309/api/conceccionarios`,
        {
            Nombre,
            Ubicacion,
            Cantidad_ventas,
            Inventario
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
      <button onClick={openModal}>Añadir Conceccionario</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Productos</h2>
        {/* <button onClick={()=>closeModal()}>close</button> */}
        <div>Añadir Conceccionario</div>
        <form>  
            <div className='datos-Moto'>
              <input type='text' placeholder='Nombre' onChange={(e)=>setNombre(e.target.value)} />
              <input type='text' placeholder='Ubicacion' onChange={(e)=>setUbicacion(e.target.value)} />
              <input type='text' placeholder='Cantidad_ventas' onChange={(e)=>setCantidad_ventas(e.target.value)} />
              <input type='text' placeholder='Inventario' onChange={(e)=>setInventario(e.target.value)} />
            </div>
            <button type="submit" onClick={()=>postConce()}>Añadir</button>
        </form>
      </Modal>
    </div>
  );
}
