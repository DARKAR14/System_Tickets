const asistentCtrl = {};

const ticket = require('../models/ticket')
const cloudinary = require('cloudinary')

asistentCtrl.renderAsistForm = (req, res) => {
    res.render('ticket/new-ticket')
};

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAMNE,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const fs = require('fs-extra')

asistentCtrl.createAsist = async (req, res) => {
    const {documento, problema, nombre} = req.body;
    // Generar la letra aleatoria en mayúscula
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  
  // Generar los tres dígitos aleatorios
  const randomDigits = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  // Generar el número de ticket aleatorio
  const numerodeticket = `${randomLetter}${randomDigits}`;
  const result = await cloudinary.v2.uploader.upload(req.file.path);
    const newasist = new ticket({ 
        documento, 
        problema, 
        nombre, 
        numerodeticket,
        imageURL: result.secure_url,
        public_id: result.public_id, });
    await newasist.save(); 
    await fs.unlink(req.file.path);
    req.flash('success_msg', 'Ticket creado con exito')
    res.redirect('/tickets');
};
//metodo para obtener todas la asistencia
asistentCtrl.renderAsist = async (req, res) => {
    const jk = await ticket.find().lean();
    res.render('ticket/tickets', {jk});
}; 

//metodo para obtener todas la asistencia pero en json
asistentCtrl.renderAsistJson = async (req, res) => {
    const jk = await ticket.find().lean();
    res.json(jk);
}; 

//metodo para editar la asistencia
asistentCtrl.EditForm = async (req, res) => {
    const ps = await ticket.findById(req.params.id).lean()
    /* console.log(req.params.id) */
    res.render('ticket/edit-ticket', {ps})
};

//metodo para actualizar la asistencia
asistentCtrl.UpdateAsist = async (req, res) => {
    const {documento, problema, nombre} = req.body;
    await ticket.findByIdAndUpdate(req.params.id, { documento, problema, nombre});
    req.flash('success_msg', 'ticket actualizada con exito!')
    res.redirect('/tickets');
};

//metodo para eliminar la asistencia
asistentCtrl.DeleteAsist = async (req, res) => {
    await ticket.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'ticket eliminado con exito!')
    res.redirect('/tickets');
};
module.exports = asistentCtrl;