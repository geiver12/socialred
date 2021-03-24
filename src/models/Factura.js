const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const FacturaSchema = new Schema({
    sucursal_id: {
        type: String,
        required: true
    },
    sucursal_title: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_nombre: {
        type: String,
        required: true
    },
    user_apellido: {
        type: String,
        required: true
    },
    monto: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    fecha: {
        type: String,
    }

});

FacturaSchema.methods.getDate = function() {

    return this.date.toISOString().substring(0, 10);
};

module.exports = mongoose.model('Factura', FacturaSchema)