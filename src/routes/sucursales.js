const router = require('express').Router();

const Sucursal = require('../models/Sucursal');

const {
    unlink
} = require('fs-extra');
const path = require('path');

const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/sucursales/new-sucursal', isAuthenticated, (req, res) => {
    res.render('sucursales/new-sucursal');
});

router.post('/sucursales/new-sucursal', isAuthenticated, async(req, res) => {
    const {
        description
    } = req.body;
    const errors = [];
    if (!description) {
        errors.push({
            text: 'Please Write a Description'
        });
    }
    if (req.file == null) {
        errors.push({
            text: 'Load file please!'
        });
    }
    if (errors.length > 0) {
        res.render('sucursales/new-sucursal', {
            errors,
            description
        });
    } else {

        const newsucursal = new Sucursal();

        newsucursal.title = req.body.title;
        newsucursal.description = req.body.description;
        newsucursal.direccion = req.body.direccion;
        newsucursal.filename = req.file.filename;
        newsucursal.path = '/img/uploads/' + req.file.filename;
        newsucursal.originalname = req.file.originalname;
        newsucursal.mimetype = req.file.mimetype;
        newsucursal.size = req.file.size;

        await newsucursal.save();
        req.flash('success_msg', 'sucursal Added Successfully');
        res.redirect('/sucursales');
    }
});

router.put('/sucursales/edit-sucursal/:id', isAuthenticated, async(req, res) => {



    const {
        title,
        description,
        direccion
    } = req.body;

    const sucursal = await Sucursal.findByIdAndUpdate(req.params.id, {
        title,
        description,
        direccion
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

        const sucursal2 = await Sucursal.findByIdAndUpdate(req.params.id, {
            title,
            description,
            direccion,
            filename,
            path,
            originalname,
            mimetype,
            size
        });
    }
    req.flash('success_msg', 'Producto Updated Successfully');
    res.redirect('/sucursales');
});


router.get('/sucursales', isAuthenticated, async(req, res) => {
    const sucursales = await Sucursal.find();
    res.render('sucursales/all-sucursales', {
        sucursales
    });
});

router.get('/clientes/sucursales', isAuthenticated, async(req, res) => {
    const sucursales = await Sucursal.find();
    res.render('clientes/sucursales', {
        sucursales
    });
});

router.delete('/sucursales/delete/:id', isAuthenticated, async(req, res) => {
    const sucursal = await Sucursal.findByIdAndDelete(req.params.id);
    await unlink(path.resolve('./src/public' + sucursal.path));
    req.flash('success_msg', 'Product Deleted Successfully');
    res.redirect('/sucursales');
});

router.get('/sucursales/edit/:id', isAuthenticated, async(req, res) => {
    const sucursal = await Sucursal.findById(req.params.id);
    res.render('sucursales/edit-sucursal', {
        sucursal
    });
});

module.exports = router;