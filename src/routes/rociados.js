//Para utilizar el router
const express = require('express');
const router = express.Router();

//Importar el controller
const rociadosController = require('../controllers/rociadosController');

// GET, obtener todos los rociados
router.get('/', rociadosController.GetRociados);

// Insertar rociados
// /api/rociados
router.post('/', rociadosController.InsertRociado);


module.exports = router;