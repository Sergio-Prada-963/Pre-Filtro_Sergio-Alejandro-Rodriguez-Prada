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

export default function Modalventas() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const [Fecha, setFecha] = useState('');
  const [Cliente, setCliente] = useState('');
  const [Producto, setProducto] = useState('');
  const [Empleado, setEmpleado] = useState('');
  const [Conceccionario, setConceccionario] = useState('');

  const postVenta = ()=>{
    console.log({
        Fecha,
        Cliente,
        Producto,
        Empleado,
        Conceccionario
    });
    axios.post(`http://localhost:3309/api/ventas`,
        {
            Fecha,
            Cliente,
            Producto,
            Empleado,
            Conceccionario
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
      <button onClick={openModal}>Añadir ventas</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Ventas</h2>
        {/* <button onClick={()=>closeModal()}>close</button> */}
        <div>Añadir Venta</div>
        <form>  
            <div className='datos-Moto'>
              <input type='date' onChange={(e)=>setFecha(e.target.value)} />
              <input type='text' placeholder='Cliente' onChange={(e)=>setCliente(e.target.value)} />
              <input type='text' placeholder='Producto' onChange={(e)=>setProducto(e.target.value)} />
              <input type='text' placeholder='Empleado' onChange={(e)=>setEmpleado(e.target.value)} />
              <input type='text' placeholder='Conceccionario' onChange={(e)=>setConceccionario(e.target.value)} />
            </div>
            <button type="button" onClick={()=>postVenta()}>Añadir</button>
        </form>
      </Modal>
    </div>
  );
}
