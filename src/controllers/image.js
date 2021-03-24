const control = {};
const path = require("path");
const { randomNumber } = require("../helpers/libs");
const { Image, Comment } = require("../models");
const fsextra = require("fs-extra");
const md5 = require("md5");
const sidebar = require("../helpers/sidebar");

control.index = async(req, res) => {
    let viewModel = { image: {}, comments: {},images:[] }
    const image = await Image.findOne({
        filename: { $regex: req.params.image_id }
    });
    if (image) {
        image.views = image.views + 1;
        await image.save();
        viewModel.image = image;
        
        const images = await Image.find().sort({ timestamp: -1 });
        viewModel.images = images;
       
        const comments = await Comment.find({ image_id: image._id }).sort({ timestamp: -1 });
        viewModel.comments = comments;

        viewModel = await sidebar(viewModel);

        res.render('image', viewModel);
        
    } else {
        res.redirect('/');
    }
};

control.create = async(req, res) => {

    const SaveImage = async() => {
        const imgUrl = randomNumber();
        const CountImages = await Image.find({ filename: imgUrl });
        if (CountImages.length > 0) {
            SaveImage();
        } else {
            const imgTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

            if (ext === ".jpg" || ext === ".png" || ext === ".jpeg" || ext === ".gif") {
                await fsextra.rename(imgTempPath, targetPath);
                const newImage = new Image({
                    title: req.body.title,
                    filename: imgUrl + ext,
                    description: req.body.description
                });
                const imagesaved = await newImage.save();
                res.redirect('/images/' + imgUrl);

            } else {
                await fsextra.unlink(imgTempPath);
                res.status(500).json({ error: 'Only images are allowed' });
            }
        }
    }
    SaveImage();
};

control.like = async(req, res) => {
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } })
    if (image) {
        image.likes += 1;
        await image.save();
        res.json({ likes: image.likes })
    } else {
        res.status(500).json({ error: 'Internal Error' });
    }
};
control.comment = async(req, res) => {
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
    if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/' + image.uniqueId);
    } else {
        res.redirect('/');
    }

};

control.remove = async(req, res) => {
    console.log("entra hasta aca pendejo");
    const image = await Image.findOne({ filename: { $regex: req.params.image_id } });
    if (image) {
        await fsextra.unlink(path.resolve('src/public/upload/' + image.filename));
        await Comment.deleteOne({ image_id: image._id });
        await image.remove();
        res.json(true);
    }
};



module.exports = control;