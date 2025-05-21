import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditarEditorial = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [id, setId] = useState<number>(0);
  const [nombre, setNombre] = useState<string>("");
  const [pais, setPais] = useState<string>("");

  const { ids } = location.state as { ids: number };

  useEffect(() => {
    TraerEditorial();
  }, []);

  const TraerEditorial = async () => {
    const respuesta = await fetch(`http://localhost:7777/Editorial/${ids}`);
    const dato = await respuesta.json();
    console.log(dato.data[0]);
    setId(dato.data[0].id);
    setNombre(dato.data[0].nombre);
    setPais(dato.data[0].pais);
  };

  const actualizar = async () => {
    await fetch(`http://localhost:7777/Editorial/${id}`, 
        {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ nombre, pais }),
    });
    navigate("/Listar");
  };

  return (
    <div>
      <input type="text" value={id}/>
      <input type="text" value={nombre} onChange={(event) => setNombre(event.target.value)}/>
      <input type="text" value={pais} onChange={(event) => setPais(event.target.value)} />
      <button onClick={actualizar}>Actualizar</button>
    </div>
  );
};

export default EditarEditorial;