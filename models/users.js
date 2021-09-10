const mongoose = require('mongoose');

const schema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    edad: { type: String, required: true },
    telefono: { type: String, required: true },
    foto: { type: String, required: true }
});

const Usuario = mongoose.model('Users', schema);

module.exports = Usuario;