//Para utilizar Router
const express = require('express');
const router = express.Router();

//Controlador
const authenticationController = require('../controllers/authenticationController');
//Middleware
//const auth = require('../middleware/auth');

// GET todas las denuncias
//router.get('/', authenticationController.UserAuthentication);

// INSERTAR DENUNCIAS
router.post('/', authenticationController.LoginAuthentication);

//ACTUALIZAR DENUNCIAS
//router.put('/:DEN_ID', denunciationsController.UpdateDenunciation);

module.exports = router;
