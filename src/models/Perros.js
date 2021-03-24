const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const PerrosSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tipotitle: {
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

module.exports = mongoose.model('Perros', PerrosSchema)