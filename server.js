require('dotenv').config()
const express = require('express');
const fs = require('fs');
const app = express();
const passport = require('passport')
const handlebars = require('express-handlebars')

require('./database/connection');


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
    console.log(`servidor escuchando en http://localhost:${process.env.PORT}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});

