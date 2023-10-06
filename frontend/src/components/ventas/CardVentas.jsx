import axios from "axios";
import { useState } from "react";

const CardVentas = ({ data, setLoading }) => {
    const [isEditing, setEditing] = useState(false);
    let content = "";
    const {
        Fecha,
        Cliente,
        clienteInfo,
        Producto,
        motoInfo,
        avionInfo,
        Empleado,
        empleadoInfo,
        Conceccionario,
        conceccionarioInfo,
        _id,
    } = data;
    const [newFecha, setFecha] = useState(Fecha);
    const [newCliente, setCliente] = useState(Cliente);
    const [newProducto, setProducto] = useState(Producto);
    const [newEmpleado, setEmpleado] = useState(Empleado);
    const [newConceccionario, setConceccionario] = useState(Conceccionario);

    const oneDelete = (_id) => {
        setLoading(true);
        axios
            .delete(`http://localhost:3309/api/ventas/${_id}`)
            .then((response) => {
                console.log(response, "eliminado");
            });
    };

    const updateData = () => {
        console.log({
            Fecha: newFecha,
            Cliente: newCliente,
            Producto: newProducto,
            Empleado: newEmpleado,
            Conceccionario: newConceccionario,
        });
        axios
            .patch(`http://localhost:3309/api/ventas/${_id}`, {
                Fecha: newFecha,
                Cliente: newCliente,
                Producto: newProducto,
                Empleado: newEmpleado,
                Conceccionario: newConceccionario,
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
                        value={newFecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={newCliente}
                        onChange={(e) => setCliente(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={newProducto}
                        onChange={(e) => setProducto(e.target.value)}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        value={newEmpleado}
                        onChange={(e) => setEmpleado(e.target.value)}
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
                    <button onClick={() => setEditing(false)}>Cancelar</button>
                    <button type="submit" onClick={() => updateData()}>
                        Guardar
                    </button>
                </td>
            </tr>
        );
    } else {
        content = (
            <tr>
                <td>{Fecha}</td>
                <td>{clienteInfo[0].Nombre}</td>
                <td>
                    {avionInfo.length > 0
                        ? avionInfo[0].Marca
                        : motoInfo[0].Marca}
                </td>
                <td>{empleadoInfo[0].Nombre}</td>
                <td>{conceccionarioInfo[0].Nombre}</td>
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

export default CardVentas;
