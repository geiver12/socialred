const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const TipoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    pan: {
        type: String,
        required: true
    },
    salchicha: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tipo', TipoSchema)