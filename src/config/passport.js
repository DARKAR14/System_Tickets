const passport = require ('passport')
const LocalStrategy = require ('passport-local').Strategy;

 const User = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},async (email, password, done ) => {

    //compara el email del usuario
    const user = await User.findOne({email})
    if(!user){
return done(null, false,{message:'no se encontro el usuario con ese correo'})
    }else{
        //comparar las contraseñas
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        }else {
            return done(null, false, {message: 'Contraseña Incorrecta'})
        }
    }
}))

//esto hace que passport matenga al usuario siempre en linea y pueda navergar entre rutas
passport.serializeUser((user, done) =>{
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
  