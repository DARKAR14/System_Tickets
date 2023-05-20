const helpers = {}

helpers.isAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("errors_msg", "Logueate o registrate pra continuar!");
    res.redirect('/user/signin');
}
module.exports = helpers;