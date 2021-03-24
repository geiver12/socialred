const mongoose = require('mongoose');
const {
    Schema
} = mongoose;


const IngredientesSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ingredientes', IngredientesSchema)