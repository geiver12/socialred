const router = require('express').Router();

const Perro = require('../models/Perros');
const Tipo = require('../models/Tipo');

const {
    unlink
} = require('fs-extra');
const path = require('path');

const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/perros/new-perro', isAuthenticated, async(req, res) => {
    const tipos = await Tipo.find();
    res.render('perros/new-perro', {
        tipos
    });
});

router.post('/perros/new-perro', isAuthenticated, async(req, res) => {
    const {
        title,
        description,
        precio
    } = req.body;
    const errors = [];
    if (!title) {
        errors.push({
            text: 'Please Write a Title!'
        });
    }
    if (!description) {
        errors.push({
            text: 'Please Write a Description'
        });
    }
    if (precio < 0) {
        errors.push({
            text: 'Please Write a Prize!'
        });
    }
    if (req.file == null) {
        errors.push({
            text: 'Load file please!'
        });
    }
    if (errors.length > 0) {
        const tipos = await Tipo.find();
        res.render('perros/new-perro', {
            errors,
            description,
            tipos
        });
    } else {

        const newperro = new Perro();
        console.log(req.body.tipotitle);
        newperro.title = req.body.title;
        newperro.description = req.body.description;
        newperro.tipotitle = req.body.tipotitle;
        newperro.precio = req.body.precio;
        newperro.filename = req.file.filename;
        newperro.path = '/img/uploads/' + req.file.filename;
        newperro.originalname = req.file.originalname;
        newperro.mimetype = req.file.mimetype;
        newperro.size = req.file.size;

        await newperro.save();
        req.flash('success_msg', 'Producto Added Successfully');
        res.redirect('/perros');
    }
});

router.put('/perros/edit-perro/:id', isAuthenticated, async(req, res) => {

    const {
        title,
        description,
        precio,
        tipotitle
    } = req.body;

    const perro = await Perro.findByIdAndUpdate(req.params.id, {
        title,
        description,
        precio,
        tipotitle
    });
    if (req.file != null) {
        const {
            filename,
            originalname,
            mimetype,
            size
        } = req.file;
        const path = '/img/uploads/' + filename;

        const perro2 = await Perro.findByIdAndUpdate(req.params.id, {
            title,
            description,
            tipotitle,
            precio,
            filename,
            path,
            originalname,
            mimetype,
            size
        });
    }
    req.flash('success_msg', 'Producto Updated Successfully');
    res.redirect('/perros');
});

router.get('/perros', isAuthenticated, async(req, res) => {
    const perros = await Perro.find();
    res.render('perros/all-perros', {
        perros
    });
});

router.delete('/perros/delete/:id', isAuthenticated, async(req, res) => {
    const perro = await Perro.findByIdAndDelete(req.params.id);
    await unlink(path.resolve('./src/public' + perro.path));
    req.flash('success_msg', 'Product Deleted Successfully');
    res.redirect('/perros');
});

router.get('/perros/edit/:id', isAuthenticated, async(req, res) => {
    const perro = await Perro.findById(req.params.id);
    const tipos = await Tipo.find();
    res.render('perros/edit-perro', {
        perro,
        tipos
    });
});

module.exports = router;