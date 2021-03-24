const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const IngredientesPerrosSchema = new Schema({
    perros_id: {
        type: Number,
        required: true
    },
    ingredientes_id: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('IngredientesPerros', IngredientesPerrosSchema)