//Para utilizar Router
const express = require('express');
const router = express.Router();

//Controlador
const inspectionsController = require('../controllers/inspectionsController');

// GET todas las inspecciones
router.get('/', inspectionsController.GetInspections);

// INSERTAR DENUNCIAS
router.post('/', inspectionsController.InsertInspection);

module.exports = router;
