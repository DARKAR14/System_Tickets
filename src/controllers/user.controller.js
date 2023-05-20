const userCtrl = {};

const passport = require('passport')

const User = require ('../models/User')

userCtrl.renderSignUpForm = (req, res) => {  //esto es para que renderize el formnulario de registro
    res.render('user/signup');
}

userCtrl.SignUp = async (req, res) => {  //esta es la funcion que hara que se registre el usuario 
    var specialChars = /[!@#$%^&*]/;
    var uppercaseChars = /[A-Z]/;
    const errors = [];
    const { name, email, password, confirm_password } = req.body
    if (password != confirm_password) {
        errors.push({ text: 'las contraseñas no coinciden!' })
    }
    if (password.length < 5) {
        errors.push({ text: 'la contraseña debe estar compuesta por lo menos 5 caracteres!' })
    }
    if (!specialChars.test(password)) {
        errors.push({ text: '¡La contraseña debe contener al menos un carácter especial por ejemplo !,@,#,$,%,^,&,*,!' });
    }
    if (!uppercaseChars.test(password)) {
        errors.push({ text: '¡La contraseña debe contener al menos una letra en mayúscula!' });
    }
    if (errors.length > 0) {
        res.render('user/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        })
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('errors_msg', 'este email ya esta en uso')
            res.redirect('/user/signup')
        }else{
            const newUser = new User({name, email, password})
            newUser.password = await newUser.encryptPassword(password) //esta linea cifra la contraseña
            await newUser.save()
            req.flash('success_msg', '¡Registro con exito!')
            res.redirect('/user/signin')
        }
    }
}

userCtrl.renderSigninForm = (req, res) => {  //esto es para que renderize el formnulario de logueo
    
    res.render('user/signin');
}

userCtrl.Signin = passport.authenticate('local', {   //esta es la funcion que hara que se logue el usuario 
    failureRedirect: '/user/signin',
    successRedirect: '/tickets',
    failureFlash: true
}); 
//esta es la funcion que hara que se cierra la sesion 
userCtrl.Logout = (req, res) => {
    
    req.logout( (err) => {

        if (err) { return next(err); }
        req.flash( "success_msg" , "Session cerrada con exito!" );
        res.redirect( "/user/signin" );

    });
}

module.exports = userCtrl;