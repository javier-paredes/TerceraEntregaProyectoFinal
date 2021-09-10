const mongo = require('./config/mongo.json')
const mongoose = require('mongoose');

async function connectDB() {
    //COMENTAR Y DESCOMENTAR SEGUN SE QUIERA USAR MONGO EN LA NUBE O MONGO LOCAL RESPECTIVAMENTE    
    let uri = mongo.MONGODBaaS;
    // let uri = mongo.MONGODB;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`mongoose conectado en ${uri}`);
    return;
}
connectDB();