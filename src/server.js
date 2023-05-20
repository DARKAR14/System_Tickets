const express = require ("express")
const exphbs = require('express-handlebars');
const path = require ('path');
const morgan = require('morgan')
const methodOverride = require ('method-override')
const flash = require ('connect-flash')
const session = require ('express-session')
const passport = require ('passport')
const cors = require ('cors')
const multer = require ('multer')

// Inicializacion
const app = express();
require ('./config/passport')

//settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//middlewares
app.use(cors())//esto es para permitir el acceso a otras direcciones de cosumir la api 
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({ //esto tampien es para la subida de imagenes
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'))//esto es para la subida de imagenes 
app.use(methodOverride('_method'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


//estos middlewarts hace que funcione passport 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//global variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.errors_msg = req.flash('errors_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next();
})


//rutas
app.use(require('./routes/index.routes'))
app.use(require('./routes/user.routes'))
app.use(require('./routes/ticket.routes'))


//variables estaticas
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;