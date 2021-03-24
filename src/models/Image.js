const moongose = require("mongoose");
const { Schema } = moongose;
const path = require("path");

const ImageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

ImageSchema.virtual('uniqueId').get(function() {
    return this.filename.replace(path.extname(this.filename), '');
});

module.exports = moongose.model('Image', ImageSchema);