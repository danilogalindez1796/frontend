import Router from "@adonisjs/core/services/router";
import EditorialController from "#controllers/EditorialController";

const editorial = new EditorialController();

Router.get('/Editorial', editorial.obtenerEditorial);
Router.get('/Editorial/:id', editorial.obtenerEditorialId);
Router.post('/Editorial/', editorial.crearEditorial);
Router.put('/Editorial/:id', editorial.actualizarEditorial);
Router.delete('/Editorial/:id', editorial.eliminarEditorial);

Router.get('/Editorial/:id/Libros', editorial.obtenerLibrosPorEditorial);