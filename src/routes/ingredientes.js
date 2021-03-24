const router = require('express').Router();

const Ingrediente = require('../models/Ingredientes');
const {
    isAuthenticated
} = require('../helpers/auth');

router.get('/ingredientes/add', isAuthenticated, (req, res) => {

    res.render('ingredientes/new-ingrediente');
});

router.post('/ingredientes/new-ingrediente', isAuthenticated, async(req, res) => {
    const {
        title,
    } = req.body;
    const errors = [];
    if (!title) {
        errors.push({
            text: 'Please Write a Title'
        });
    }

    if (errors.length > 0) {
        res.render('ingredientes/new-ingrediente', {
            errors,
            title,
        });
    } else {
        const newingrediente = new Ingrediente({
            title
        });

        await newingrediente.save();
        req.flash('success_msg', 'ingrediente Added Successfully');
        res.redirect('/ingredientes');
    }
});

router.put('/ingredientes/edit-ingrediente/:id', isAuthenticated, async(req, res) => {
    const {
        title,
    } = req.body;

    await Ingrediente.findByIdAndUpdate(req.params.id, {
        title,
    });
    req.flash('success_msg', 'ingrediente Updated Successfully');
    res.redirect('/ingredientes');
});


router.get('/ingredientes', isAuthenticated, async(req, res) => {
    const ingredientes = await Ingrediente.find().sort({
        date: 'desc'
    });
    res.render('ingredientes/all-ingredientes', {
        ingredientes
    });
});

router.delete('/ingredientes/delete/:id', isAuthenticated, async(req, res) => {
    await Ingrediente.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'ingrediente Deleted Successfully');
    res.redirect('/ingredientes');
});

router.get('/ingredientes/edit/:id', isAuthenticated, async(req, res) => {
    const ingrediente = await Ingrediente.findById(req.params.id);
    res.render('ingredientes/edit-ingrediente', {
        ingrediente
    });
});

module.exports = router;