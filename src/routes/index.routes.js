const {Router} = require ('express')
const router = Router();

const {renderIndex, renderAsistencias ,renderPrestamo, renderFallos ,renderAbout} = require('../controllers/index.controller')
router.get('/', renderIndex)

router.get('/asistencias', renderAsistencias)

router.get('/prestamo', renderPrestamo)

router.get('/fallos_presentados', renderFallos)

router.get('/about', renderAbout)

module.exports = router;