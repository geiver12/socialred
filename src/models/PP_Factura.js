const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const PPFacturaSchema = new Schema({
    factura_id: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    title: {
        type: String,

    },
    description: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },

});

module.exports = mongoose.model('PPFactura', PPFacturaSchema)