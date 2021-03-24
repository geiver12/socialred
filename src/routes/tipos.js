const router = require('express').Router();

const Tipo = require('../models/Tipo');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/tipos/add', isAuthenticated, (req, res) => {
    res.render('tipos/new-tipo');
});

router.post('/tipos/new-tipo', isAuthenticated, async(req, res) => {
    const {
        title,
        pan,
        salchicha
    } = req.body;
    const errors = [];
    if (!title) {
        errors.push({
            text: 'Please Write a Title'
        });
    }
    if (!pan) {
        errors.push({
            text: 'Please Write a Pan'
        });
    }
    if (!salchicha) {
        errors.push({
            text: 'Please Write a Salchicha'
        });
    }

    if (errors.length > 0) {
        res.render('tipos/new-tipo', {
            errors,
            title,
        });
    } else {
        const newtipo = new Tipo({
            title,
            pan,
            salchicha
        });

        await newtipo.save();
        req.flash('success_msg', 'tipo Added Successfully');
        res.redirect('/tipos');
    }
});

router.put('/tipos/edit-tipo/:id', isAuthenticated, async(req, res) => {
    const {
        title,
        pan,
        salchicha
    } = req.body;

    await Tipo.findByIdAndUpdate(req.params.id, {
        title,
        pan,
        salchicha
    });
    req.flash('success_msg', 'tipo Updated Successfully');
    res.redirect('/tipos');
});


router.get('/tipos', isAuthenticated, async(req, res) => {
    const tipos = await Tipo.find();
    res.render('tipos/all-tipos', {
        tipos
    });
});

router.delete('/tipos/delete/:id', isAuthenticated, async(req, res) => {
    await Tipo.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'tipo Deleted Successfully');
    res.redirect('/tipos');
});

router.get('/tipos/edit/:id', isAuthenticated, async(req, res) => {
    const tipo = await Tipo.findById(req.params.id);
    res.render('tipos/edit-tipo', {
        tipo
    });
});

module.exports = router;