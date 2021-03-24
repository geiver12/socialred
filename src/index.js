const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const routes = require('./routes');

const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
const { format } = require('timeago.js');

//inits 
const app = express();
require('./database');
require('./config/passport');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./config/helpers'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//Midlewares

app.use(morgan('dev'));

app.use(multer({ dest: path.join(__dirname, './public/upload/temp') }).single('image'));

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json()); //likes

app.use(methodOverride('_method'));

app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const DB_URI = process.env.DB_URI
  const PORT = process.env.PORT

//Global Variables

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    app.locals.format = format;
    res.locals.user = req.user || null;
    next();
});

//Routes

routes(app);


//Static Files
//app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'public')));
//server is listening

app.listen(app.get('port'), () => {
    console.log("Server :: ", app.get('port'));
});