import axios from "axios";
import { useState } from "react";

const CardEmpleados = ({ data, setLoading }) => {
    const [isEditing, setEditing] = useState(false);
    let content = "";

    const {
        Nombre,
        NumeroId,
        Telefono,
        Cargo,
        Email,
        Conceccionario,
        Estado,
        ConcecionarioInfo,
        _id,
    } = data;
    const [newNombre, setNombre] = useState(Nombre);
    const [newNumeroId, setNumeroId] = useState(NumeroId);
    const [newTelefono, setTelefono] = useState(Telefono);
    const [newCargo, setCargo] = useState(Cargo);
    const [newEmail, setEmail] = useState(Email);
    const [newConceccionario, setConceccionario] = useState(Conceccionario);
    const [newEstado, setEstado] = useState(Estado);

    const oneDelete = (_id) => {
        setLoading(true);
        axios
            .delete(`http://localhost:3309/api/empleados/${_id}`)
            .then((response) => {
                console.log(response, "eliminado");
            });
    };

    const updateData = () => {
        console.log({
            Nombre: newNombre,
            NumeroId: newNumeroId,
            Telefono: newTelefono,
            Cargo: newCargo,
            Email: newEmail,
            Conceccionario: newConceccionario,
            Estado: newEstado,
        });
        axios
            .patch(`http://localhost:3309/api/empleados/${_id}`, {
                Nombre: newNombre,
                NumeroId: newNumeroId,
                Telefono: newTelefono,
                Cargo: newCargo,
                Email: newEmail,
                Conceccionario: newConceccionario,
                Estado: newEstado,
            })
            .then((response) => {
                setEditing(false);
                window.location.reload();
                if (!response) console.warn("El api no funshion ;V");
            });
    };
    if (isEditing) {
        content = (
            <tr>
                <td>
                    <input
                        type="text"
                        value={newNombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={newTelefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={newCargo}
                        onChange={(e) => setCargo(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={newConceccionario}
                        onChange={(e) => setConceccionario(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={newEmail}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </td>
                <td>
                    <label for="check">Empleados Activo?</label>
                    <input
                        type="checkbox"
                        id="check"
                        onChange={() => setEstado(!Estado)}
                    />
                </td>
                <td>
                    <button onClick={() => setEditing(false)}>Cancelar</button>
                    <button onClick={() => updateData()}>Guardar</button>
                </td>
            </tr>
        );
    } else {
        content = (
            <tr>
                <td>{Nombre}</td>
                <td>{Telefono}</td>
                <td>{Cargo}</td>
                <td>{Email}</td>
                <td>{ConcecionarioInfo[0].Nombre}</td>
                <td>
                    <button type="submit" onClick={() => oneDelete(_id)}>
                        Eliminar
                    </button>
                    <button onClick={() => setEditing(true)}>Actualizar</button>
                </td>
            </tr>
        );
    }
    return <>{content}</>;
};

export default CardEmpleados;
