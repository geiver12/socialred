const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const SucursalSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sucursal', SucursalSchema)