//Para utilizar Router
const express = require('express');
const router = express.Router();

//Controlador
const publicitiesController = require('../controllers/publicitiesController');
// INSERTAR DENUNCIAS
router.post('/', publicitiesController.InsertPublicity);

//Obtener denuncias por microred
router.post('/:USU_MICRORED', publicitiesController.GetPublicitiesMicrored);

module.exports = router;
