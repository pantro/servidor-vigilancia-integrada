//Para utilizar Router
const express = require('express');
const router = express.Router();

//Controlador
const visitsAppController = require('../controllers/visitsAppController');

// INSERTAR VISITA AL APP
router.post('/', visitsAppController.InsertVisitsApp);

module.exports = router;
