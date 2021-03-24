const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const PanSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Pan', UserSchema)