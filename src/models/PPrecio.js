const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const PPrecioSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    perros_id: {
        type: Number,
    },
    bebidas_id: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    precio: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('PPrecio', PPrecioSchema)