//Para utilizar el router
const express = require('express');
const router = express.Router();

//Importar el controller
const rociadosController = require('../controllers/rociadosController');

// GET, obtener todos los rociados
router.get('/', rociadosController.GetRociados);

// GET, obtener rociados programados
router.get('/ROC_PROG', rociadosController.GetRociadosProg);

// Insertar rociados
// /api/rociados
router.post('/', rociadosController.InsertRociado);

// Insertar rociados programados
router.post('/ROC_PROG', rociadosController.InsertRociadoProg);



module.exports = router;