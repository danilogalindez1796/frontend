import pgDatabase from '../database/pgDatabase.js';

export default class EditorialController {
    async obtenerEditorial({ request, response }) {
        const result = await pgDatabase.query('SELECT * FROM "Editoriales"');
        return response.json({ mensaje: "editoriales  obtenidas correctamente", data: result.rows });

    }

    
    async obtenerEditorialId({ params, request, response }) {
        const result=await pgDatabase.query(`SELECT * FROM "Editoriales" WHERE "id" = ${params.id}; `)
        if (result.rowCount>0){
            return response.json({ 
                mensaje:"editorial encontrada",
                data: result.rows });
        } else {
            return response.json({
                mensaje:"editorial no encontrada"});
        }
    }


    async crearEditorial({ request, response}) {
    const { id , nombre, pais } = request.body();
    if (typeof nombre !== "string") {
        return response.json({ mensaje: "El nombre es obligatorio y debe ser una cadena de texto." });
        }
    
        if (typeof pais !== "string") {
            return response.json({ mensaje: "El pais es obligatorio y debe ser una cadena de texto." });
        }

    const result = await pgDatabase.query(
        'INSERT INTO "Editoriales" ("id","nombre", "pais") VALUES ($1, $2, $3) RETURNING *',
        [id, nombre, pais]
    );
    if (result.rowCount > 0) {
        return response.json({
            mensaje:"editorial Creada exitosamente",
            data: result.rows[0] 
        });
    } else {
        return response.json({ mensaje: "editorial no creada" });
    }
}



    async actualizarEditorial({ request, response, params }) {
    const id = params.id;
    const { nombre, pais } = await request.body();

    if (typeof nombre !== "string") {
        return response.json({ mensaje: "El nombre es obligatorio y debe ser una cadena de texto." });
        }
    
        if (typeof pais !== "string") {
            return response.json({ mensaje: "El pais es obligatorio y debe ser una cadena de texto." });
        }

    const result = await pgDatabase.query(
        'UPDATE "Editoriales" SET "nombre" = $1, "pais" = $2 WHERE "id" = $3 RETURNING *',
        [nombre, pais, id]
    );

    if (result.rowCount > 0) {
        return response.json({
            mensaje: "Editorial actualizada exitosamente",
            data: result.rows[0]
        });
    } else {
        return response.json({ mensaje: "Editorial no encontrada o no se actualizó" });
    }
}


    async eliminarEditorial({ request, response, params }) {
    const id= params.id;

    const result = await pgDatabase.query(
        'DELETE FROM "Editoriales" WHERE "id" = $1',[id] );
    if (result.rowCount > 0) {
        return response.json({
            mensaje: "Editorial eliminado exitosamente",
        });
    } else {
        return response.json({ mensaje: "Editorial no encontrado" });
    }
}


async obtenerLibrosPorEditorial({ params, response, request }) {
    const editorial_Id = params.id;

    const result = await pgDatabase.query(
        'SELECT * FROM "Libros" WHERE editorial_id = $1',
        [editorial_Id]
    );

    if (result.rowCount > 0) {
        return response.json({
            mensaje: "Libros de la editorial obtenidos correctamente",
            data: result.rows
        });
    } else {
        return response.json({
            mensaje: "No se encontraron libros para esta editorial"
        });
    }
}
}