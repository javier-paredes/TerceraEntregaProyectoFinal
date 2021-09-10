require('dotenv').config()
const path = require('path')
const express = require('express');
require('../accounts/usuarios')
const passport = require('passport');

const routerUsuarios = express.Router();

// LOGIN 
routerUsuarios.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        var user = req.user;
        console.log(req.user)
        console.log('El usuario SI esta logeuado')
        res.render('vista', { showLogin: false, showContent: true, bienvenida: user.nombre, showBienvenida: true });
    }
    else {
        console.log('El usuario NO está logueado');
        res.render('vista', { showLogin: true, showContent: false, showBienvenida: false });
    }
})

routerUsuarios.get('/faillogin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/failLogin.html'))
})

routerUsuarios.post('/login', passport.authenticate('login', { failureRedirect: '/users/faillogin' }), (req, res) => {
  
    res.render('vista', { showLogin: false, showContent: true, bienvenida: req.user.nombre, showBienvenida: true });

});


// LOGOUT
routerUsuarios.get('/logout', (req, res) => {
    req.logout();
    res.sendFile(path.join(__dirname, '../public/logout.html'))
})

// REGISTRO

routerUsuarios.get('/signup', (req, res) => {
    res.render('register', {})
})

routerUsuarios.post('/signup', passport.authenticate('signup', { failureRedirect: '/users/failsignup' }), (req, res) => {
    var user = req.email;
    console.log(req.user)
    res.render('vista', { showLogin: false, showContent: true, bienvenida: user.nombre, showBienvenida: true });
})

routerUsuarios.get('/failsignup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/failSignup.html'))
})

module.exports = routerUsuarios;