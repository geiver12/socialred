const router = require('express').Router();

const Perro = require('../models/Perros');
const Bebida = require('../models/Bebida');
const Temporal = require('../models/Temporal');
const User = require('../models/User');
const Factura = require('../models/Factura');
const PPFactura = require('../models/PP_Factura');
const Sucursal = require('../models/Sucursal');

const {
    unlink
} = require('fs-extra');
const path = require('path');

const {
    isAuthenticated
} = require('../helpers/auth');


router.get('/compras', isAuthenticated, async(req, res) => {
    const perros = await Perro.find();
    const bebidas = await Bebida.find();
    await Temporal.deleteMany();

    res.render('compras/all-compras', {
        perros,
        bebidas
    });
});

router.delete('/compras/delete/:id', isAuthenticated, async(req, res) => {
    const temporal = await Temporal.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Product Deleted Successfully');
    const perros = await Perro.find();
    const bebidas = await Bebida.find();
    const temporals = await Temporal.find();
    res.render('compras/all-compras', {
        perros,
        bebidas,
        temporals
    });
});

router.get('/compras/proceso', isAuthenticated, async(req, res) => {
    const perros = await Perro.find();
    const temporals = await Temporal.find();
    const bebidas = await Bebida.find();
    const user = await User.findById(req.user.id);

    var montoTotal = 0;
    //console.log(temporals.values());

    temporals.forEach(element => {

        element.monto = element.precio * element.cantidad
        montoTotal = montoTotal + (element.precio * element.cantidad);

    });

    res.render('compras/factura', {
        temporals,
        perros,
        bebidas,
        montoTotal,
        user
    });
});

router.get('/compras/cancel-factura', isAuthenticated, async(req, res) => {
    const perros = await Perro.findById();
    const temporals = await Temporal.find();
    const bebidas = await Bebida.find();
    console.log(req.user.id);

    res.render('compras/all-compras', {
        temporals,
        perros,
        bebidas
    });
});

router.get('/compras/factura-aprobada/:monto', isAuthenticated, async(req, res) => {

    const factura = new Factura();
    const sucursales = await Sucursal.find();
    const ran = Math.floor(Math.random() * sucursales.length + 1)

    const random = await Sucursal.find();
    const obj = new Sucursal();
    
    console.log(random.length);;
    for (var i = 0; i < random.length; i++) {
       
        obj.id = random[i].id;
        obj.title = random[i].title;
    }
   
    const user = await User.findById(req.user.id);

    factura.monto = req.params.monto;
    factura.sucursal_id = obj.id;
    factura.sucursal_title = obj.title;
    factura.user_id = user.id;
    factura.user_nombre = user.nombre;
    factura.user_apellido = user.apellido;
    await factura.save();

    const factura2 = await Factura.findOne().sort({ user_id: 'desc' })

    const temporal = await Temporal.find();

    for (var i = 1; i < temporal.length; i++) {
        const ppfactura = new PPFactura();
        ppfactura.factura_id = factura2.id;
        ppfactura.monto = temporal[i].monto;
        ppfactura.title = temporal[i].title;
        ppfactura.description = temporal[i].description;
        ppfactura.precio = temporal[i].precio;
        ppfactura.cantidad = temporal[i].cantidad;
        await ppfactura.save();
    }

    await Temporal.deleteMany();

    req.flash('success_msg', 'Factura ejecutada Satisfactoriamente!');
    res.redirect('/compras');
});

router.post('/compras/add', isAuthenticated, async(req, res) => {
    const errors = [];
    const {
        title,
        description,
        precio,
        cantidad,
    } = req.body;
    if (cantidad <= 0) {
        errors.push({
            text: 'Inserte valores mayores a 0!'
        });
        const perros = await Perro.find();
        const bebidas = await Bebida.find();
        const temporals = await Temporal.find();
        res.render('compras/all-compras', {
            perros,
            bebidas,
            temporals,
            errors
        });
    }
    const monto = precio * cantidad
    const temporal = new Temporal({ title, description, precio, cantidad, monto });
    await temporal.save();

    req.flash('success_msg', 'Producto Added Successfully');

    const perros = await Perro.find();
    const bebidas = await Bebida.find();
    const temporals = await Temporal.find();
    res.render('compras/all-compras', {
        perros,
        bebidas,
        temporals
    });
});

module.exports = router;