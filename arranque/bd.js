const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/final30112021')
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.error('No se pudo conectar a MongoDB...'));
}