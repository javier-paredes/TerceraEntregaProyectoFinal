require('dotenv').config()
const express = require('express');
const carrito = require('../api/carritoMongo')
const SMS = require('../mensajeria/sms')
const Ethereal = require('../mensajeria/emailEthereal')

const routerCarrito = express.Router();

// CARRITO
//LISTAR
routerCarrito.get('/carrito/listar', async (req, res) => {
    let resultado = await carrito.listar();
    res.json(resultado);
})
routerCarrito.get('/carrito/listar/:id', async (req, res) => {
    let idCarrito = req.params.id;
    let resultado = await carrito.listarPorId(idCarrito);
    res.json(resultado);
})

// AGREGAR PRODUCTOS
routerCarrito.post('/carrito/agregar/:id_producto', async (req, res) => {
    let idProducto = req.params.id_producto;
    let resultado = await carrito.guardar(idProducto);
    res.json(resultado);
})

//ACTUALIZAR PRODUCTO
routerCarrito.put('/carrito/actualizar/:id', async (req, res) => {
    let idCarrito = req.params.id;
    let nuevoProducto = req.body;
    let resultado = await carrito.actualizar(idCarrito, nuevoProducto);
    res.json(resultado);
})

//BORRAR PRODUCTOS
routerCarrito.delete('/carrito/borrar/:id', async (req, res) => {
    let resultado = carrito.borrar(req.params.id);
    res.json(resultado);
})

//BOTON COMPRAR CARRITO
routerCarrito.get('/carrito/comprar', async(req, res) => {
    let contenidoCarrito = carrito.listar()
    SMS.enviarSMSCompra(req.user.telefono)
    SMS.enviarWhatsappAdmin(req.user.telefono)
    Ethereal.enviarMailOrdenCompra(contenidoCarrito, req.user.nombre, req.user.email)
})

module.exports = routerCarrito;