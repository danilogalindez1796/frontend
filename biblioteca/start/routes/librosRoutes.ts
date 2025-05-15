import Router from "@adonisjs/core/services/router";
import LibrosController from "#controllers/LibrosController";

const libros = new LibrosController();

Router.get('/Libros', libros.obtenerLibros);
Router.get('/Libros/:id', libros.obtenerLibrosId);
Router.post('/Libros', libros.crearLibro);
Router.put('/Libros/:id', libros.actualizarLibro);
Router.delete('/Libros/:id', libros.eliminarLibro);

Router.get('/Libros/anio/:anio', libros.obtenerLibrosPorAnio);
Router.get('/Libros/buscar/:titulo', libros.buscarLibrosPorTitulo);