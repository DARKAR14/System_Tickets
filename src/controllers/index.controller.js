const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderAsistencias = (req, res) => {
    res.render('asistencias')
};
indexCtrl.renderPrestamo = (req, res) => {
    res.render('prestamo')
};
indexCtrl.renderFallos = (req, res) => {
    res.render('fallos/fallos')
};
indexCtrl.renderAbout = (req, res) => {
    res.render('about')
};

module.exports = indexCtrl;