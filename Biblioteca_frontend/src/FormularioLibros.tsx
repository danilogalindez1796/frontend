import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

const FormularioLibros: React.FC = () => {
  const [titulo, setTitulo] = useState<string>('');
  const [autor, setAutor] = useState<string>('');
  const [anio, setAnio] = useState<number>(0);
  const [idEditorial, setIdEditorial] = useState<number>(0);
  const [mensaje, setMensaje] = useState<string>("");

  const guardarLibro = async () => {
    const respuesta = await fetch("http://localhost:7777/Libros", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: titulo,
        autor: autor,
        anio_publicacion: anio,
        editorial_id: idEditorial,
      }),
    });

    const msj = await respuesta.json();
    setMensaje(msj.mensaje);
    console.log(msj.mensaje);
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4">
        <h2 className="text-center text-primary mb-4">📚 Crear Libro</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escriba el título"
              onChange={(e) => setTitulo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Escriba el autor"
              onChange={(e) => setAutor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Año de Publicación</Form.Label>
            <Form.Control
              type="number"
              placeholder="Escriba el año"
              onChange={(e) => setAnio(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>ID Editorial</Form.Label>
            <Form.Control
              type="number"
              placeholder="Escriba el ID de la editorial"
              onChange={(e) => setIdEditorial(Number(e.target.value))}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" onClick={guardarLibro}>
              Guardar Libro
            </Button>
          </div>
        </Form>

        {mensaje && (
          <Alert variant="success" className="mt-4 text-center">
            {mensaje}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default FormularioLibros;
