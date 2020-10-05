//Para utilizar Router
const express = require('express');
const router = express.Router();

//Controlador
const inspectionsController = require('../controllers/inspectionsController');

// GET todas las inspecciones
router.get('/', inspectionsController.GetInspections);

// INSERTAR DENUNCIAS
router.post('/', inspectionsController.InsertInspection);

//Obtener denuncias por microred
router.post('/:USU_MICRORED', inspectionsController.GetInspectionsMicrored);

module.exports = router;
