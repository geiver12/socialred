const { Image } = require("../models");

module.exports = {
    async popular() {
        const images = await Image.find().limit(9).sort({ like: -1 });
        return images;
    }
}