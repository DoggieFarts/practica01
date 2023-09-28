const express = require('express');
var bodyparser = require('body-parser');
const {response} = require('express');
const app = express();
const puerto = process.env.PORT || 3000;
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


let proyectos = [{ id: 1, nombre: 'Proyecto 1', descripcion: 'Descripcion 1', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 2, nombre: 'Proyecto 2', descripcion: 'Descripcion 2', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 3, nombre: 'Proyecto 3', descripcion: 'Descripcion 3', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 4, nombre: 'Proyecto 4', descripcion: 'Descripcion 4', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 5, nombre: 'Proyecto 5', descripcion: 'Descripcion 5', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 6, nombre: 'Proyecto 6', descripcion: 'Descripcion 6', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 7, nombre: 'Proyecto 7', descripcion: 'Descripcion 7', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 8, nombre: 'Proyecto 8', descripcion: 'Descripcion 8', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 9, nombre: 'Proyecto 9', descripcion: 'Descripcion 9', fechaInicio: "10/07/22", fechaFin: "10/08/22" },
{ id: 10, nombre: 'Proyecto 10', descripcion: 'Descripcion 10', fechaInicio: "10/07/22", fechaFin: "10/08/22" }
];

let tareas = [{ id: 1, nombre: 'Tarea 1', descripcion: 'Descripcion 1', fechaAsignacion: "10/07/22", idProyecto: 1, estatus: "En progreso" },
{ id: 2, nombre: 'Tarea 2', descripcion: 'Descripcion 2', fechaAsignacion: "10/07/22", idProyecto: 1, estatus: "En progreso" },
{ id: 3, nombre: 'Tarea 3', descripcion: 'Descripcion 3', fechaAsignacion: "10/07/22", idProyecto: 2, estatus: "No iniciada" },
{ id: 4, nombre: 'Tarea 4', descripcion: 'Descripcion 4', fechaAsignacion: "10/07/22", idProyecto: 3, estatus: "No iniciada" },
{ id: 5, nombre: 'Tarea 5', descripcion: 'Descripcion 5', fechaAsignacion: "10/07/22", idProyecto: 4, estatus: "Completada" },
{ id: 6, nombre: 'Tarea 6', descripcion: 'Descripcion 6', fechaAsignacion: "10/07/22", idProyecto: 5, estatus: "Completada" },
{ id: 7, nombre: 'Tarea 7', descripcion: 'Descripcion 7', fechaAsignacion: "10/07/22", idProyecto: 6, estatus: "En proceso" },
{ id: 8, nombre: 'Tarea 8', descripcion: 'Descripcion 8', fechaAsignacion: "10/07/22", idProyecto: 7, estatus: "No iniciada" },
{ id: 9, nombre: 'Tarea 9', descripcion: 'Descripcion 9', fechaAsignacion: "10/07/22", idProyecto: 8, estatus: "No iniciada" },
{ id: 10, nombre: 'Tarea 10', descripcion: 'Descripcion 10', fechaAsignacion: "10/07/22", idProyecto: 9, estatus: "En proceso" }
];


//API DE TAREAS
app.get('/tareas', (req, res) => {
    res.json(tareas);
} );

app.get('/tareas/:id', (req, res) => {
    let id = req.params.id;
    res.json(tareas[id-1]);
} );

app.post('/tareas', (req, res) => {
   let {nombre, descripcion, fechaAsignacion, idProyecto, status} = req.body;
    const id = tareas.length + 1;
    if (nombre == undefined || descripcion == undefined|| fechaAsignacion == undefined|| idProyecto == undefined|| status == undefined) {
        res.status(400).json({error: 'Datos incompletos'});
    }else {
        const tarea = {id, nombre, descripcion, fechaAsignacion, idProyecto, status};
        tareas.push(tarea);
        res.status(201).json(tarea);

    }
} );

app.put('/tareas/:id', (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, fechaAsignacion, idProyecto, status} = req.body;
    if (nombre == undefined || descripcion == undefined|| fechaAsignacion == undefined|| idProyecto == undefined|| status == undefined) {
        res.status(400).json({error: 'Datos incompletos'});
    }else {
        const tarea = tareas.find((tarea) => tarea.id == id);
        if (tarea) {
            tarea.nombre = nombre;
            tarea.descripcion = descripcion;
            tarea.fechaAsignacion = fechaAsignacion;
            tarea.idProyecto = idProyecto;
            tarea.status = status;
            res.status(200).json(tarea);

        }else {
            res.status(404).json({error: 'Tarea no encontrada'});
        }
    }

} );

app.delete('/tareas/:id', (req, res) => {
    const {id} = req.params.id;
    const tarea = tareas.find((tarea) => tarea.id == id);
    if (tarea) {
        const index = tarea.indexOf(tarea);
        tareas.splice(index, 1);
        res.status(200).json(tarea);
    }else {
        res.status(404).json({error: 'Tarea no encontrada'});
    }
} );


//API DE PROYECTOS
app.get('/proyectos', (req, res) => {
    res.json(proyectos);
}   );

app.get('/proyectos/:id', (req, res) => {
    let id = req.params.id;
    res.json(proyectos[id-1]);
} );

app.post('/proyectos', (req, res) => {
    let {nombre, descripcion, fechaInicio, fechaFin} = req.body;
    const id = proyectos.length + 1;
    if (nombre == undefined || descripcion == undefined|| fechaInicio == undefined|| fechaFin == undefined) {
        res.status(400).json({error: 'Datos incompletos'});
    }else {
        const proyecto = {id, nombre, descripcion, fechaInicio, fechaFin};
        proyectos.push(proyecto);
        res.status(201).json(proyecto);

    }
} );

app.put('/proyectos/:id', (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, fechaInicio, fechaFin} = req.body;
    if (nombre == undefined || descripcion == undefined|| fechaInicio == undefined|| fechaFin == undefined) {
        res.status(400).json({error: 'Datos incompletos'});
    }else {
        const proyecto = proyectos.find((proyecto) => proyecto.id == id);
        if (proyecto) {
            proyecto.nombre = nombre;
            proyecto.descripcion = descripcion;
            proyecto.fechaInicio = fechaInicio;
            proyecto.fechaFin = fechaFin;
            res.status(200).json(proyecto);

        }else {
            res.status(404).json({error: 'Proyecto no encontrado'});
        }
    }

} );

app.delete('/proyectos/:id', (req, res) => {
    const {id} = req.params.id;
    const proyecto = proyectos.find((proyecto) => proyecto.id == id);
    if (proyecto) {
        const index = proyecto.indexOf(proyecto);
        proyectos.splice(index, 1);
        res.status(200).json(proyecto);
    }else {
        res.status(404).json({error: 'Proyecto no encontrado'});
    }
} );

//mostrar todas las tareas de un proyecto
app.get('/proyectos/:id/tareas', (req, res) => {
    let id = req.params.id
    let tareasProyecto = tareas.filter((tarea) => tarea.idProyecto == id);
 //   console.log(tareasProyecto);
    res.json(tareasProyecto);
} );

//mostrar una tarea de un proyecto
app.get('/proyectos/:id/tareas/:idProyecto', (req, res) => {
    let id = req.params.id
    let idProyecto = req.params.idProyecto
    let tareasProyecto = tareas.filter((tarea) => tarea.idProyecto == idProyecto && tarea.id == id);
    //console.log(tareasProyecto);
    res.json(tareasProyecto);
} );

//mostrar todas las tareas de un proyecto con un status
app.get('/proyectos/:id/tareas', (req, res) => {
    let id = req.params.id
    let status = req.query.status
    let tareasProyecto = tareas.filter((tarea) => tarea.idProyecto === id && tarea.estatus === status);
    console.log(tareasProyecto);
    res.json(tareasProyecto);

} );

//mostrar todas las tareas de un proyecto paginadas
app.get('/proyectos/:id/tareas?_page=:page&_limit=:limit', (req, res) => {
    let id = req.params.id
    let page = req.params.page
    let limit = req.params.limit
    let tareasProyecto = tareas.filter((tarea) => tarea.idProyecto == id);
    //console.log(tareasProyecto);
    res.json(tareasProyecto);

} );

//Mostrar tareas de un proyecto por fecha de asignacion
app.get('/proyectos/:id/tareas?fechaAsignacion=:fechaAsignacion', (req, res) => {
    let id = req.params.id
    let fechaAsignacion = req.params.fechaAsignacion
    let tareasProyecto = tareas.filter((tarea) => tarea.idProyecto == id && tarea.fechaAsignacion == fechaAsignacion);
    console.log(tareasProyecto);
    res.json(tareasProyecto);

} );



app.listen(puerto, () => {
    console.log("Servidor en el puerto " + puerto);
} );

//Documentacion de la API
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API de proyectos y tareas',
            version: '1.0.0',
            description: 'API de proyectos y tareas',
            contact: {
                name: 'Antonio David Gutiérrez Páez',
                email: 'david212gutierrez@gmail.com'
            },
            servers: ['http://localhost:3000'],
            basePath: '/',
            produces: ['application/json'],
            consumes: ['application/json'],
            schemes: ['http', 'https']
        },
    },
    apis: ['./app.js']
} ;
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
module.exports = app;

/**
 * @swagger
 * /proyectos:
 *  get:
 *    summary: Obtener todos los proyectos
 *    description: Obtener todos los proyectos
 *    responses:
 *     200:
 *      description: Lista de proyectos
 *      content:
 *       application/json:
 *       schema:
 *        type: array
 */

/**
 * @swagger
 * /proyectos/{id}:
 *  get:
 *   summary: Obtener un proyecto
 *   description: Obtener un proyecto
 *   parameters:
 *    - in: path
 *      name: id
 *      description: id del proyecto
 *      required: true
 *      schema:
 *       type: integer
 *       minimum: 1
 *       maximum: 10
 *
 */

/**
 * @swagger
 * /proyectos:
 *  post:
 *   summary: Crear un proyecto
 *   description: Crear un proyecto
 *   parameters:
 *    - in: body
 *      name: proyecto
 *      description: Proyecto a crear
 *      required: true
 *      schema:
 *       type: object
 *       required:
 *        - nombre
 *        - descripcion
 *        - fechaInicio
 *        - fechaFin
 *       properties:
 *        nombre:
 *         type: string
 *        description:
 *         type: string
 *        fechaInicio:
 *         type: string
 *        fechaFin:
 *         type: string
 *   responses:
 *    201:
 *     description: Proyecto creado
 *     content:
 *      application/json:
 *      schema:
 *       type: object
 *       properties:
 *        id:
 *        type: integer
 *
 */

/**
 * @swagger
 * /proyectos/{id}:
 *  put:
 *   summary: Actualizar un proyecto
 *   description: Actualizar un proyecto
 *   parameters:
 *    - in: path
 *      name: id
 *      description: id del proyecto
 *      required: true
 *      schema:
 *       type: integer
 *       minimum: 1
 *       maximum: 10
 *       properties:
 *        nombre:
 *         type: string
 *        description:
 *         type: string
 *    - in: body
 *      name: proyecto
 *      description: Proyecto a actualizar
 *      required: true
 *      schema:
 *       type: object
 *       required:
 *       - nombre
 *       - descripcion
 *       - fechaInicio
 *       - fechaFin
 *       properties:
 *        nombre:
 *         type: string
 *        description:
 *         type: string
 *        fechaInicio:
 *         type: string
 *        fechaFin:
 *         type: string
 */

/**
 * @swagger
 * /proyectos/{id}:
 *  delete:
 *   summary: Eliminar un proyecto
 *   description: Eliminar un proyecto
 *   parameters:
 *     - in: path
 *       name: id
 *
 */

/**
 * @swagger
 * /proyectos/{id}/tareas:
 *  get:
 *   summary: Obtener todas las tareas de un proyecto
 *   description: Obtener todas las tareas de un proyecto
 *   parameters:
 *    - in: path
 *      name: id
 *      description: id del proyecto
 *      required: true
 *      schema:
 *       type: integer
 *       minimum: 1
 *       maximum: 10
 *       properties:
 *        nombre:
 *         type: string
 *        description:
 *         type: string
 *        fechaInicio:
 *         type: string
 *        fechaFin:
 *         type: string
 */

/**
 * @swagger
 * /proyectos/{id}/tareas/{idProyecto}:
 *  get:
 *   summary: Obtener una tarea de un proyecto
 *   description: Obtener una tarea de un proyecto
 *   parameters:
 *    - in: path
 *      name: id
 *      description: id del proyecto
 *      required: true
 *      schema:
 *       type: integer
 *       minimum: 1
 *       maximum: 10
 *       properties:
 *        nombre:
 *         type: string
 *        description:
 *         type: string
 *    - in: path
 *      name: idProyecto
 *      description: id del proyecto en la tarea
 *      required: true
 *      schema:
 *       type: integer
 *       minimum: 1
 *       maximum: 10
 *
 */

/**
 * @swagger
 * /proyectos/{id}/tareas?status={status}:
 *  get:
 *   summary: Obtener todas las tareas de un proyecto con un status
 *   description: Obtener todas las tareas de un proyecto con un status
 *   parameters:
 *    - in: path
 *      name: id
 *      description: id del proyecto
 *      required: true
 *      schema:
 *       type: integer
 *       minimum: 1
 *       maximum: 10
 *
 */