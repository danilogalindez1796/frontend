import React, { useState } from "react";

const FormularioEditorial: React.FC = () => {
    const [id, setId] = useState<number>(0);
    const [nombre, setNombre] = useState<string>('');
    const [pais, setPais] = useState<string>('');
    const [mensaje, setMensaje]=useState<string>("")

    const guardarEdit = async () => {
        const respuesta=await fetch("http://localhost:7777/Editorial", {
            method: 'POST',
            headers: {'content-type': 'application/json' },
            body: JSON.stringify({ id: id, nombre: nombre, pais: pais })
        });
        const msj=await respuesta.json()
        setMensaje(msj.mensaje)
        console.log(msj.mensaje)
    }

    return (
        <div>
            <h1>Crear Editoriales</h1>
            <label>Id</label>
            <input type="number" onChange={(e) => setId(Number(e.target.value))} placeholder="Escriba Id"/>
            <label>Nombre</label>
            <input type="text" onChange={(e) => setNombre(e.target.value)} placeholder="Escriba Nombre"/>
            <label>Pais</label>
            <input type="text" onChange={(e) => setPais(e.target.value)}placeholder="Escriba Pais"/>
            <button onClick={guardarEdit}>Guardar</button>
            <h1>{mensaje}</h1>
        </div>
    );
}

export default FormularioEditorial;
