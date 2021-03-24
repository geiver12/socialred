const router = require('express').Router();
const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.get('/users/new-user', (req, res) => {
    res.render('users/new-user');
});

router.get('/users', async(req, res) => {
    const users = await User.find();
    res.render('users/all-users', {
        users
    });
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.post('/users/signup', async(req, res) => {
    const {
        name,
        nombre,
        apellido,
        cedula,
        email,
        password,
        confirm_password
    } = req.body;

    const errors = [];
    if (name.length <= 0) {
        errors.push({
            text: 'Please insert your name'
        });
    }

    if (password != confirm_password) {
        errors.push({
            text: 'Password do no match'
        });
    }
    if (password.length < 4) {
        errors.push({
            text: 'Password must be at least 4 characters'
        });
    }
    if (nombre.length < 2) {
        errors.push({
            text: 'Nombre must be at least 2 characters'
        });
    }
    if (apellido.length < 2) {
        errors.push({
            text: 'Apellido must be at least 2 characters'
        });
    }
    if (cedula.length < 5) {
        errors.push({
            text: 'Cedula must be at least 5 characters'
        });
    }

    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            nombre,
            apellido,
            cedula,
            email,
            password,
            confirm_password
        });
    } else {
        const emailUser = await User.findOne({
            email: email
        });
        if (emailUser) {
            req.flash('success_msg', 'The email is already in use');
            res.redirect('/users/signup');
        }
        const NewUser = new User({
            name,
            email,
            password,
            nombre,
            apellido,
            cedula
        });
        NewUser.password = await NewUser.encryptPassword(password);
        NewUser.rol = "user";
        await NewUser.save();
        req.flash('errors_msg', 'The user has register!');
        res.redirect('/users/signin');
    }
});

router.put('/users/update/:id', async(req, res) => {
    const errors = [];
    const {
        password,
        confirm_password
    } = req.body;

    if (password != confirm_password) {
        errors.push({
            text: 'Password do no match'
        });
    }
    if (password.length < 4) {
        errors.push({
            text: 'Password must be at least 4 characters'
        });
    }
    if (errors.length > 0) {
        const user = await User.findById(req.params.id);
        res.render('users/updatepassword', {
            user,
            errors
        });
    } else {
        const NewUser = new User({
            password
        });
        const password2 = await NewUser.encryptPassword(password);

        console.log(password2);
        await User.findByIdAndUpdate(req.params.id, {
            password2
        });
        req.flash('success_msg', 'Password Updated Successfully');
        res.redirect('/users');
    }
});

router.put('/users/change/:id', async(req, res) => {
    const errors = [];
    const {
        password,
        confirm_password
    } = req.body;

    if (password != confirm_password) {
        errors.push({
            text: 'Password do no match'
        });
    }
    if (password.length < 4) {
        errors.push({
            text: 'Password must be at least 4 characters'
        });
    }
    if (errors.length > 0) {
        const user = await User.findById(req.params.id);
        res.render('users/change', {
            user,
            errors
        });
    } else {
        const NewUser = new User({
            password
        });
        const password2 = await NewUser.encryptPassword(password);

        console.log(password2);
        await User.findByIdAndUpdate(req.params.id, {
            password2
        });
        req.flash('success_msg', 'Password Updated Successfully');
        res.redirect('/clientes/sucursales');
    }
});


router.put('/users/edit-user/:id', async(req, res) => {
    const {
        name,
        nombre,
        apellido,
        cedula,
        email
    } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
        name,
        nombre,
        apellido,
        cedula,
        email
    });
    req.flash('success_msg', 'Cliente Updated Successfully');
    res.redirect('/users');
});

router.put('/users/edit-profile/:id', async(req, res) => {
    const {
        name,
        nombre,
        apellido,
        cedula,
        email
    } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
        name,
        nombre,
        apellido,
        cedula,
        email
    });
    req.flash('success_msg', 'Profile Updated Successfully');
    res.redirect('/clientes/sucursales');
});

router.delete('/users/delete/:id', async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'User Deleted Successfully');
    res.redirect('/users');
});

router.get('/users/edit/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.render('users/edit-user', {
        user,
    });
});

router.get('/clientes/profile/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    res.render('users/edit-profile', {
        user,
    });
});

router.get('/users/updatepassword/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.render('users/updatepassword', {
        user
    });
});

router.get('/clientes/change/:id', async(req, res) => {
    const user = await User.findById(req.params.id);
    res.render('clientes/change', {
        user
    });
});

router.post('/users/new-user', async(req, res) => {
    const {
        name,
        nombre,
        apellido,
        cedula,
        email,
        password,
        confirm_password
    } = req.body;

    const errors = [];
    if (name.length <= 0) {
        errors.push({
            text: 'Please insert your name'
        });
    }

    if (password != confirm_password) {
        errors.push({
            text: 'Password do no match'
        });
    }
    if (password.length < 4) {
        errors.push({
            text: 'Password must be at least 4 characters'
        });
    }
    if (nombre.length < 2) {
        errors.push({
            text: 'Nombre must be at least 2 characters'
        });
    }
    if (apellido.length < 2) {
        errors.push({
            text: 'Apellido must be at least 2 characters'
        });
    }
    if (cedula.length < 5) {
        errors.push({
            text: 'Cedula must be at least 5 characters'
        });
    }

    if (errors.length > 0) {
        res.render('users/new-user', {
            errors,
            name,
            nombre,
            apellido,
            cedula,
            email,
            password,
            confirm_password
        });
    } else {
        const emailUser = await User.findOne({
            email: email
        });
        if (emailUser) {
            req.flash('success_msg', 'The email is already in use');
            res.redirect('/users/new-user');
        }
        const NewUser = new User({
            name,
            email,
            password,
            nombre,
            apellido,
            cedula
        });
        NewUser.password = await NewUser.encryptPassword(password);
        NewUser.rol = "user";
        await NewUser.save();
        req.flash('errors_msg', 'You are Register');
        res.redirect('/users');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;