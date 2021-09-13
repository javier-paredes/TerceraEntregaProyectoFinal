require('dotenv').config()
const express = require('express');
const fs = require('fs');
const app = express();
const passport = require('passport')
const handlebars = require('express-handlebars')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
require('./loggers/log4js')
const log4js = require("log4js");

const loggerConsola = log4js.getLogger('consola');
const loggerError = log4js.getLogger('error');


require('./database/connection');

const modoCluster = false // CAMBIAR A TRUE O FALSE SEGUN SE QUIERA O NO ARRANCAR EL CLUSTER

if (modoCluster == true && cluster.isMaster) {
    loggerConsola.info('num CPUs', numCPUs)
    loggerConsola.info(`PID MASTER ${process.pid}`)
    

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // creamos un worker para cada cpu
    }

    // controlamos la salida de los workers
    cluster.on('exit', worker => {
        loggerConsola.info('Worker', worker.process.pid, 'murió')        
    });

}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// ARCHIVOS ESTÁTICOS
app.use(express.static('public'));
//CONFIGURAR HANDLEBARS
app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts'
}));

// ESTABLECER MOTOR DE PLANTILLAS
app.set("view engine", "hbs");
// DIRECTORIO ARCHIVOS PLANTILLAS
app.set("views", "./views");


// ROUTERS
const productosRouter = require('./routes/productos')
const carritoRouter = require('./routes/carrito')
const usuarioRouter = require('./routes/usuarios')

// CREACION ROUTERS CARRITO Y PRODUCTOS
app.use('/api', productosRouter);
app.use('/api', carritoRouter);
app.use('/users', usuarioRouter);


const server = app.listen(process.env.PORT, () => {
    loggerConsola.info(`servidor escuchando en http://localhost:${process.env.PORT}`)    
});

// en caso de error, avisar
server.on('error', error => {
    loggerError.error('error en el servidor:', error);    
});

