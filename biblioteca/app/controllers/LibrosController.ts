import pgDatabase from '../database/pgDatabase.js';

export default class LibrosController {
    async obtenerLibros({ request, response }) {
        const result = await pgDatabase.query('SELECT * FROM "Libros"');
        return response.json({ mensaje: "Libros obtenidos correctamente", data: result.rows });
    }


    async obtenerLibrosId({ params, request, response }) {
    const result = await pgDatabase.query(`SELECT * FROM "Libros" WHERE "id" = $1;`, [params.id]);

    if (result.rowCount > 0) {
        return response.json({
            mensaje: "Libro encontrado",
            datos: result.rows
        });
    } else {
        return response.json({ mensaje: "Libro no encontrado" });
    }
}


   async crearLibro({ request, response}) {
    const { titulo, autor, anio_publicacion, editorial_id } = request.body();

    if (typeof titulo !== "string") {
    return response.json({ mensaje: "El título es obligatorio y debe ser una cadena de texto." });
    }

    if (typeof autor !== "string") {
        return response.json({ mensaje: "El autor es obligatorio y debe ser una cadena de texto." });
    }

    if (typeof anio_publicacion !== "number" || anio_publicacion.toString().length !== 4 ) {
        return response.json({ mensaje: "El año de publicación debe ser un número de 4 dígitos." });
    }

    const result = await pgDatabase.query(
        'INSERT INTO "Libros" ("titulo", "autor", "anio_publicacion", "editorial_id") VALUES ($1, $2, $3, $4) RETURNING *',
        [titulo, autor, anio_publicacion, editorial_id]
    );

    if (result.rowCount > 0) {
        return response.json({
            mensaje:"Libro Creado exitosamente",
            data: result.rows[0] 
        });
    } else {
        return response.json({ mensaje: "Libro no creado" });
    }
}



    async actualizarLibro({ request, response, params }) {
    const id = params.id;
    const { titulo, autor, anio_publicacion, editorial_id } = request.body();

    if (typeof titulo !== "string") {
        return response.json({ mensaje: "El título es obligatorio y debe ser una cadena de texto." });
    }

    if (typeof autor !== "string") {
        return response.json({ mensaje: "El autor es obligatorio y debe ser una cadena de texto." });
    }

    if (typeof anio_publicacion !== "number" || anio_publicacion.toString().length !== 4) {
        return response.json({ mensaje: "El año de publicación debe ser un número de 4 dígitos." });
    }

    const result = await pgDatabase.query(
        'UPDATE "Libros" SET "titulo" = $1, "autor" = $2, "anio_publicacion" = $3, "editorial_id" = $4 WHERE "id" = $5',
        [titulo, autor, anio_publicacion, editorial_id, id]
    );

    if (result.rowCount > 0) {
        return response.json({
            mensaje: "Libro actualizado exitosamente",
            data: { id, titulo, autor, anio_publicacion, editorial_id }
        });
    } else {
        return response.json({ mensaje: "Libro no encontrado o no se actualizó" });
    }
}


async eliminarLibro({ request, response, params }) {
    const id= params.id;

    const result = await pgDatabase.query(
        'DELETE FROM "Libros" WHERE "id" = $1',[id] );
    if (result.rowCount > 0) {
        return response.json({
            mensaje: "Libro eliminado exitosamente",
        });
    } else {
        return response.json({ mensaje: "Libro no encontrado" });
    }
}



async obtenerLibrosPorAnio({  request, response, params}) {
    const anio = params.anio;

    const result = await pgDatabase.query(
        'SELECT * FROM "Libros" WHERE anio_publicacion = $1',
        [anio]
    );

    if (result.rowCount > 0) {
        return response.json({
            mensaje: `Libros del año ${anio} obtenidos correctamente`,
            data: result.rows
        });
    } else {
        return response.json({
            mensaje: `No se encontraron libros del año ${anio}`
        });
    }
}




async buscarLibrosPorTitulo({  request, response, params }) {
    const palabraClave = `%${params.titulo}%`;

    const result = await pgDatabase.query(
        'SELECT * FROM "Libros" WHERE titulo ILIKE $1',
        [palabraClave]
    );

    if (result.rowCount > 0) {
        return response.json({
            mensaje: `Resultados para: "${params.titulo}"`,
            data: result.rows
        });
    } else {
        return response.json({
            mensaje: `No se encontraron libros con el título que contenga: "${params.titulo}"`
        });
    }
}


}
