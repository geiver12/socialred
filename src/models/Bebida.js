const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const BebidaSchema = new Schema({
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
    filename: {
        type: String
    },
    path: {
        type: String
    },
    originalname: {
        type: String
    },
    mimetype: {
        type: String
    },
    size: {
        type: Number
    },
    create_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bebida', BebidaSchema)