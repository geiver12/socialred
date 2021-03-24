const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    const user = await User.findOne({
        email: email
    });
    if (!user) {
        return done(null, false, {
            message: 'Not User found'
        });
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            const rol = user.rol;
            if (rol == "user")
                return done(null, user, rol);
            else
                return done(null, user);


        } else {
            return done(null, false, {
                message: 'Incorrect Password'
            });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id, user.rol);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});