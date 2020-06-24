//Para utilizar Router
const express = require('express');
const router = express.Router();

//Controlador
const denunciationsController = require('../controllers/denunciationsController');

// GET todas las denuncias
router.get('/', denunciationsController.GetDenunciations);

// INSERTAR DENUNCIAS
router.post('/', denunciationsController.InsertDenunciation);

//ACTUALIZAR DENUNCIAS
router.put('/:DEN_ID', denunciationsController.EditDenunciation);

//Crear custom id denuncias
router.post('/:USU_MICRORED', denunciationsController.GetDenunciationsMicrored);

module.exports = router;
