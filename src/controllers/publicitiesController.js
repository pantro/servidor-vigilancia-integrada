const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../config/database.js');

//Obtener denuncias por microred
exports.GetPublicitiesMicrored = async (req, res) => {
  const { USU_MICRORED } = req.params;
  
  try {
    await mysqlConnection.query('SELECT UNICODE FROM PUBLICIDADES WHERE USU_MICRORED = ?', [USU_MICRORED], (err, rows, fields) => {
        if(!err) {
          res.json(rows);
        } else {
          console.log("Error al realizar la consulta en inspecciones mysql: "+err);
          res.status(400).send('Hubo un error al realizar la consulta mysql a la tabla PUBLICIDADES');
        }
      });
  } catch (error) {
      console.log(error+' Hubo un error al consultar OBTENER datos de la tabla PUBLICIDADES');
      res.status(400).send('Hubo un error al consultar OBTENER datos de la tabla PUBLICIDADES');
  }  
}

//Insertar inspeccion
exports.InsertPublicity = async (req, res) => {

  const { 
    usu_cuenta,
    usu_microred,
    unicode,
    pub_insp_positiva_unicode
  } = req.body;

  const query = `
    INSERT INTO PUBLICIDADES (USU_CUENTA, USU_MICRORED, UNICODE, PUB_INSP_POSITIVA_UNICODE)
        VALUES (?, ?, ?, ?);
  `;

  try {
    await mysqlConnection.query(query, [usu_cuenta, usu_microred, unicode, pub_insp_positiva_unicode], (err, rows, fields) => {
      let result = {};
      if(!err) {
        result.option ='successful';
      } else {
        result.option ='error';
        result.msg ="Error posible en mysql"
          console.log("Se produjo un "+err);
      }
      res.json(result);
    });

  } catch {
    	console.log(error+' Hubo un error al consultar INSERTAR datos de la tabla PUBLICIDADES');
        res.status(400).send('Hubo un error al consultar INSERTAR datos de la tabla PUBLICIDADES');
  }
} 