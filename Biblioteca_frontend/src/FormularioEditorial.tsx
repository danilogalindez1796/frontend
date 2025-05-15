import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const FormularioEditorial: React.FC = () => {
  const [id, setId] = useState<number>(0);
  const [nombre, setNombre] = useState<string>('');
  const [pais, setPais] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>("");

  const guardarEdit = async () => {
    const respuesta = await fetch("http://localhost:7777/Editorial", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, nombre, pais }),
    });

    const msj = await respuesta.json();
    setMensaje(msj.mensaje);
    console.log(msj.mensaje);
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4">
        <h2 className="text-center text-success mb-4">🏢 Crear Editorial</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Escriba el ID"
              onChange={(e) => setId(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escriba el nombre"
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escriba el país"
              onChange={(e) => setPais(e.target.value)}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="success" onClick={guardarEdit}>
              Guardar Editorial
            </Button>
          </div>
        </Form>

        {mensaje && (
          <Alert variant="info" className="mt-4 text-center">
            {mensaje}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default FormularioEditorial;