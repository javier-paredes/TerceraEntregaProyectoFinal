const passport = require('passport');
const express = require('express');
const bCrypt = require('bCrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users')
require('../loggers/log4js')
const log4js = require("log4js");

const loggerConsola = log4js.getLogger('consola');
const loggerError = log4js.getLogger('error');


// PASSPORT
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    function (req, username, password, done) {
        findOrCreateUser = function () {

            User.findOne({ 'email': username }, function (error, user) {
                if (error) {
                    loggerError.error('Error al registrar: ' + error);
                    return done(error);
                }
                if (user) {
                    loggerConsola.info('El usuario ya existe');
                    return done(null, false,
                        loggerConsola.info('El usuario ya existe'));
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
                            loggerError.error('Error al guardar usuario: ' + err);
                            throw err;
                        }
                        loggerConsola.info('Se registró al usuario con éxito')
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
                    loggerError.warn('User Not Found with email ' + username)
                    return done(null, false,
                        loggerError.warn('message', 'User Not found.'))
                }
                if (!isValidPassword(user, password)) {
                    loggerConsole.warn('Invalid Password');
                    return done(null, false,
                        loggerConsole.warn('message', 'Invalid Password'));
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
