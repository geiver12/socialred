const router = require('express').Router();

const Bebida = require('../models/Bebida');

const {
    unlink
} = require('fs-extra');
const path = require('path');

const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/bebidas/new-bebida', isAuthenticated, (req, res) => {
    res.render('bebidas/new-bebida');
});

router.post('/bebidas/new-bebida', isAuthenticated, async(req, res) => {
    const {
        description,
        precio
    } = req.body;
    const errors = [];
    if (!description) {
        errors.push({
            text: 'Please Write a Description'
        });
    }
    if (precio <= 0) {
        errors.push({
            text: 'Please Write a precio > 0'
        });
    }
    if (req.file == null) {
        errors.push({
            text: 'Load file please!'
        });
    }
    if (errors.length > 0) {
        res.render('bebidas/new-bebida', {
            errors,
            description
        });
    } else {

        const newBebida = new Bebida();

        newBebida.title = req.body.title;
        newBebida.description = req.body.description;
        newBebida.precio = req.body.precio;
        newBebida.filename = req.file.filename;
        newBebida.path = '/img/uploads/' + req.file.filename;
        newBebida.originalname = req.file.originalname;
        newBebida.mimetype = req.file.mimetype;
        newBebida.size = req.file.size;

        await newBebida.save();
        req.flash('success_msg', 'Bebida Added Successfully');
        res.redirect('/bebidas');
    }
});

router.put('/bebidas/edit-bebida/:id', isAuthenticated, async(req, res) => {
    const {
        title,
        description,
        precio
    } = req.body;

    const bebida = await Bebida.findByIdAndUpdate(req.params.id, {
        title,
        description,
        precio
    });
    console.log(req.body);
    console.log(req.file);

    if (req.file != null) {
        const {
            filename,
            originalname,
            mimetype,
            size
        } = req.file;
        const path = '/img/uploads/' + filename;

        const bebida2 = await Bebida.findByIdAndUpdate(req.params.id, {
            title,
            description,
            precio,
            filename,
            path,
            originalname,
            mimetype,
            size
        });
    }
    req.flash('success_msg', 'Producto Updated Successfully');
    res.redirect('/bebidas');
});

router.get('/bebidas', isAuthenticated, async(req, res) => {
    const bebidas = await Bebida.find();
    res.render('bebidas/all-bebidas', {
        bebidas
    });
});

router.delete('/bebidas/delete/:id', isAuthenticated, async(req, res) => {
    const bebida = await Bebida.findByIdAndDelete(req.params.id);
    await unlink(path.resolve('./src/public' + bebida.path));
    req.flash('success_msg', 'Product Deleted Successfully');
    res.redirect('/bebidas');
});

router.get('/bebidas/edit/:id', isAuthenticated, async(req, res) => {
    const bebida = await Bebida.findById(req.params.id);
    res.render('bebidas/edit-bebida', {
        bebida
    });
});

module.exports = router;