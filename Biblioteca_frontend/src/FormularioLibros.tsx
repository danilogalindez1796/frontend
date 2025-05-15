import React, {useState} from "react";

const FormularioLibros:React.FC=()=>{
    
    const [titulo, setTitulo]=useState<string>('');
    const [autor, setAutor]=useState<string>('');
    const [anio, setAnio]=useState<number>(0);
    const [idEditorial, setIdEditorial]=useState<number>(0);
    const [mensaje, setMensaje]=useState<string>("")
    

    const guardarLibro = async () => {
        const respuesta=await fetch("http://localhost:7777/Libros",{
             method: 'POST',
            headers: {'content-type': 'application/json' },
            body: JSON.stringify({ titulo:titulo, autor:autor, anio_publicacion:anio, editorial_id:idEditorial })


        })
        const msj=await respuesta.json()
        setMensaje(msj.mensaje)
        console.log(msj.mensaje)
    }
    return (
        <div>
            <h1>Crear libros</h1>
            <label>titulo</label>
            <input type="text" onChange={(e) => setTitulo(e.target.value)} placeholder="Escriba el titulo"/>
            <label>autor</label>
            <input type="text" onChange={(e) => setAutor(e.target.value)} placeholder="Escriba el autor"/>
            <label>Año publicacion</label>
            <input type="number" onChange={(e) => setAnio(Number(e.target.value))}placeholder="Escriba el año de publicacion"/>
            <label>id Editorial</label>
            <input type="number" onChange={(e) => setIdEditorial(Number(e.target.value))}placeholder="Escriba el id de la editorial"/>
            <button onClick={guardarLibro}>Guardar</button>
            <h1>{mensaje}</h1>
        </div>
    );

}
export default FormularioLibros;