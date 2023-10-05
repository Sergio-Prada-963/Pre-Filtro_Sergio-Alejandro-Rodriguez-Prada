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

export default function ModalProvee() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const [Nombre, setNombre] = useState('');
  const [Email, setEmail] = useState('');
  const [Registro_mercantil, setRegistro_mercantil] = useState('');
  const [Productos_vendidos, setProductos_vendidos] = useState(0);

  const postProvee = ()=>{
    console.log({
        Nombre,
        Email,
        Registro_mercantil,
        Productos_vendidos
    });
    axios.post(`http://localhost:3309/api/proveedores`,
        {
            Nombre,
            Email,
            Registro_mercantil,
            Productos_vendidos
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
      <button onClick={openModal}>Añadir Proveedores</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Proveedores</h2>
        {/* <button onClick={()=>closeModal()}>close</button> */}
        <div>Añadir Proveedor</div>
        <form>  
            <div className='datos-Moto'>
              <input type='text' placeholder='Nombre' onChange={(e)=>setNombre(e.target.value)} />
              <input type='text' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
              <input type='text' placeholder='Registro_mercantil' onChange={(e)=>setRegistro_mercantil(e.target.value)} />
              <input type='number' placeholder='Productos_vendidos' onChange={(e)=>setProductos_vendidos(e.target.value)} />
            </div>
            <button type="submit" onClick={()=>postProvee()}>Añadir</button>
        </form>
      </Modal>
    </div>
  );
}
