const { Router } = require('express')
const router = Router();

const { renderAsistForm, 
    createAsist, 
    renderAsist, 
    EditForm, 
    UpdateAsist, 
    DeleteAsist,
    renderAsistJson 
} = require('../controllers/ticket.controller')

const {isAuthenticated} = require ('../helpers/auth')

//new asistencia
router.get('/tickets/add', isAuthenticated,renderAsistForm)

router.post('/tickets/new-ticket', isAuthenticated ,createAsist)

//obtener toda la asistencia
router.get('/tickets', isAuthenticated ,renderAsist)

//obtener toda la asistencia pero en json
router.get('/tickets/json',  isAuthenticated,renderAsistJson)

//editar la asistencia
router.get('/tickets/edit/:id',  isAuthenticated,EditForm)

router.put('/tickets/edit/:id',  isAuthenticated,UpdateAsist)

//eliminar una asistencia 
router.delete('/tickets/delete/:id', isAuthenticated, DeleteAsist)
module.exports = router;