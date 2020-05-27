const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../config/database.js');

//Insertar visita al app
exports.InsertVisitsApp = async (req, res) => {
  const { username } = req.body;

	try {
		await mysqlConnection.query('INSERT INTO VISITA_APP SET ?', {VISITA_APP_CUENTA: username}, (err, rows, fields) => {
		    res.json("Se agregó correctamente la visita");
  		});
	} catch (error) {
        console.log(error+' Hubo un error al consultar a la tabla VISITA_APP');
        res.status(400).send('Hubo un error al consultar a la tabla VISITA_APP');
    }
}