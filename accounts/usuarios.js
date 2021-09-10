const passport = require('passport');
const express = require('express');
const bCrypt = require('bCrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users')


// PASSPORT
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    function (req, username, password, done) {      
        findOrCreateUser = function () {
            console.log('INTENTANDO CREAR USUARIO, busqueda en mongo')
            User.findOne({ 'email': username }, function (error, user) {
                if (error) {
                    console.log('Error al registrar: ' + error);
                    return done(error);
                }
                if (user) {
                    console.log('El usuario ya existe');
                    return done(null, false,
                        console.log('El usuario ya existe'));
                } else {
                    var newUser = new User();
                    newUser.email = username;
                    newUser.password = createHash(password);
                    newUser.nombre = req.body.nombre;
                    newUser.direccion = req.body.direccion;
                    newUser.edad = req.body.edad;
                    newUser.telefono = req.body.telefono;
                    newUser.foto = req.body.foto;

                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error al guardar usuario: ' + err);
                            throw err;
                        }
                        console.log('Se registró al usuario con éxito');
                        return done(null, newUser);
                    });
                }                
            });
        }
        process.nextTick(findOrCreateUser);
    })
);

// Crea un hash usando bCrypt
var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    function (req, username, password, done) {
        User.findOne({ 'email': username },
            function (err, user) {
                if (err)
                    return done(err);
                if (!user) {
                    console.log('User Not Found with email ' + username);
                    return done(null, false,
                        console.log('message', 'User Not found.'));
                }
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false,
                        console.log('message', 'Invalid Password'));
                }
                return done(null, user);
            }
        );
    })
);

var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
}


passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(null, user);
    });
});
