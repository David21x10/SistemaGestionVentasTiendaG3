'use strict'

//para trabajar con variables de entotno el dotenv
require('dotenv').config();

const App = require('./app/app');
const PORT = process.env.PORT || process.env.APP_PORT;

App.listen(parseInt(PORT), function (error){
    if(error) return console.log(error);
    console.info(`el servidor se está ejecutando en el puerto ${PORT}`)
})