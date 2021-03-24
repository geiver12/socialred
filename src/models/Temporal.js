const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const TemporalSchema = new Schema({
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
    monto: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Temporal', TemporalSchema)