const mongo = require('./config/mongo.json')
const mongoose = require('mongoose');
require('./loggers/log4js')
const log4js = require("log4js");

const loggerConsola = log4js.getLogger('consola');


async function connectDB() {
    //COMENTAR Y DESCOMENTAR SEGUN SE QUIERA USAR MONGO EN LA NUBE O MONGO LOCAL RESPECTIVAMENTE    
    let uri = mongo.MONGODBaaS;
    // let uri = mongo.MONGODB;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    loggerConsola.info(`mongoose conectado en ${uri}`);    
    return;
}
connectDB();