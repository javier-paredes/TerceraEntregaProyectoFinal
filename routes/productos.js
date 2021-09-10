require('dotenv').config()
const express = require('express');
const productos = require('../api/productosMongo')   // BASE DE DATOS DE MONGO
const app = express();

const routerProductos = express.Router()


// PRODUCTOS
// LISTAR
routerProductos.get('/productos/listar', async (req, res) => {
    let resultado = await productos.listar();
    res.json(resultado)
})
// LISTAR POR ID
routerProductos.get('/productos/listar/:id', async (req, res) => {
    let idProducto = req.params.id;
    let productoPedido = await productos.listarPorId(idProducto);
    res.json(productoPedido);
})
// AGREGAR
routerProductos.post('/productos/agregar', async (req, res) => {
    let nuevoProducto = req.body;
    let resultado = await productos.guardar(nuevoProducto);
    res.json(resultado);
})
// ACTUALIZAR
routerProductos.put('/productos/actualizar/:id', async (req, res) => {
    let idProducto = req.params.id;
    let productoActualizado = req.body;
    let resultado = await productos.actualizar(idProducto, productoActualizado);
    res.json(resultado);
})
// BORRAR
routerProductos.delete('/productos/borrar/:id', async (req, res) => {
    let idProducto = req.params.id;
    let resultado = await productos.borrar(idProducto);
    res.json(resultado);
})

module.exports = routerProductos;