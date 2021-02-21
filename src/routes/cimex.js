//Para utilizar Router
const express = require('express');
const router = express.Router();

//Controlador
const cimexController = require('../controllers/cimexController');

// INSERTAR CIMEX
router.post('/', cimexController.InsertCimex);

module.exports = router;
