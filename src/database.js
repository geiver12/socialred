const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dbredsocial', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('db this connet')).catch(err => console.log('error  database?'));