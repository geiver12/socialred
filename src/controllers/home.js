const control = {};
const { Image } = require("../models");
const sidebar = require("../helpers/sidebar");
control.index = async(req, res) => {
    
    let viewModel = { images: [] }
    const images = await Image.find().sort({ timestamp: -1 });
    viewModel.images = images;
    viewModel = await sidebar(viewModel);

    res.render('index', viewModel);
};

module.exports = control;