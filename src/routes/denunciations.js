//Para utilizar Router
const express = require('express');
const router = express.Router();

//Para almacenar imagenes en el servidor
const multer = require('multer')({
    dest: 'public/imgs'
})
const fs = require('fs')
const path = require('path')

//Controlador
const denunciationsController = require('../controllers/denunciationsController');

// GET todas las denuncias
router.get('/', denunciationsController.GetDenunciations);

// INSERTAR DENUNCIAS
router.post('/', [multer.single('attachment')], denunciationsController.InsertDenunciation);

//ACTUALIZAR DENUNCIAS
router.put('/:DEN_ID', denunciationsController.EditDenunciation);

//Obtener denuncias por microred
router.post('/:USU_MICRORED', denunciationsController.GetDenunciationsMicrored);

module.exports = router;
