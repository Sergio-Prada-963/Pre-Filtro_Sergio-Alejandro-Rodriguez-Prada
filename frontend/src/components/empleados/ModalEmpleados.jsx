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

export default function ModalEmpleado() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

    const [Nombre, setNombre] = useState('')
    const [NumeroId, setNumeroId] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [Cargo, setCargo] = useState('')
    const [Email, setEmail] = useState('')
    const [Conceccionario, setConceccionario] = useState('')
    const [Estado, setEstado] = useState(false)

  const postEmpleado = ()=>{
    console.log({
        Nombre,
        NumeroId,
        Telefono,
        Cargo,
        Email,
        Conceccionario,
        Estado
    });
    axios.post(`http://localhost:3309/api/empleados`,
        {
            Nombre,
            NumeroId,
            Telefono,
            Cargo,
            Email,
            Conceccionario,
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
      <button onClick={openModal}>Añadir Empleado</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Empleados</h2>
        {/* <button onClick={()=>closeModal()}>close</button> */}
        <div>Añadir Empleado</div>
        <form>  
            <div className='datos-Moto'>
              <input type='text' placeholder='Nombre' onChange={(e)=>setNombre(e.target.value)} />
              <input type='text' placeholder='NumeroId' onChange={(e)=>setNumeroId(e.target.value)} />
              <input type='text' placeholder='Telefono' onChange={(e)=>setTelefono(e.target.value)} />
              <input type='text' placeholder='Cargo' onChange={(e)=>setCargo(e.target.value)} />
              <input type='text' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
              <input type='text' placeholder='Conceccionario' onChange={(e)=>setConceccionario(e.target.value)} />
              <label for="check">Empleado Activo?</label>
              <input type='checkbox' id='check' onChange={()=>setEstado(!Estado)} />
            </div>
            <button type="button" onClick={()=>postEmpleado()}>Añadir</button>
        </form>
      </Modal>
    </div>
  );
}
