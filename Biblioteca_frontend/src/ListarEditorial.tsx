import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface Editorial{
    id:number;
    nombre:string;
    pais:string;

}

const ListarEditorial: React.FC =()=>{
    const navigate=useNavigate()
    const [Editoriales,setEditoriales]=useState<Editorial[]>([])
    const Listar= async ()=>{
     const rest=await  fetch('http://localhost:7777/Editorial')
     const datos= await rest.json()
     console.log(datos)
     setEditoriales(datos.data);

    }

    const Eliminar = async(id:number)=>{
        console.log(id)
        const restp=await fetch(`http://localhost:7777/Editorial/${id} `,
            {
                method:'DELETE'
            })
        const msj= await restp.json()
        console.log(msj)
        Listar()
    }

    const actualizar=(ids:number)=>{
    navigate('/ActualizarEdt', {state:ids})
}

    useEffect(()=>{
        Listar();
    },[])
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Pais</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Editoriales.map((index)=>(
                            <tr>
                                <td>{index.id}</td>
                                <td>{index.nombre}</td>
                                <td>{index.pais}</td>
                                <td><button onClick={()=>Eliminar(index.id)}>Eliminar</button></td>
                                <td><button onClick={()=>actualizar(index.id)}>Actualizar</button></td>
                            </tr>
                         ))
                    }
                </tbody>
            </table>
        </div>
    )

}
export default ListarEditorial;