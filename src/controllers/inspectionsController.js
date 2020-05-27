const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../config/database.js');

//Obtener todas las inspecciones
exports.GetInspections = async (req, res) => {
	try {
		await mysqlConnection.query('SELECT * FROM INSPECCIONES', (err, rows, fields) => {
		    if(!err) {
		      res.json(rows);
		    } else {
		      console.log(err);
		    }
  		});
	} catch (error) {
        console.log(error+' Hubo un error al consultar OBTENER datos de la tabla INSPECCIONES');
        res.status(400).send('Hubo un error al consultar OBTENER datos de la tabla INSPECCIONES');
    }
}

//Insertar inspeccion
exports.InsertInspection = async (req, res) => {
	
  const { 
  	den_id, den_id_custom, den_fecha_recepcion, usu_cuenta, usu_microred, den_medio,
    den_tipo, den_agente_nombre, den_insecto, den_insecto_otro, den_habitante_nombre,
    den_habitante_telefono1, den_otro_telefono, den_habitante_telefono2, den_provincia, den_distrito,
    den_localidad, den_direccion, den_referencia, den_fecha_probable_inspeccion, 
    den_denunciantes, den_colindantes 
  } = req.body;

  const newData = {
    DEN_ID_CUSTOM: den_id_custom, 
    DEN_FECHA_RECEPCION: den_fecha_recepcion, 
    USU_CUENTA: usu_cuenta, 
    USU_MICRORED:  usu_microred, 
    DEN_MEDIO:  den_medio,
    DEN_TIPO: den_tipo, 
    DEN_AGENTE_NOMBRE: den_agente_nombre,
    DEN_INSECTO: den_insecto, 
    DEN_INSECTO_OTRO:  den_insecto_otro,
    DEN_HABITANTE_NOMBRE:  den_habitante_nombre,
    DEN_HABITANTE_TELEFONO1: den_habitante_telefono1,
    DEN_OTRO_TELEFONO: den_otro_telefono,
    DEN_HABITANTE_TELEFONO2:  den_habitante_telefono2, 
    DEN_PROVINCIA:  den_provincia, 
    DEN_DISTRITO: den_distrito,
    DEN_LOCALIDAD: den_localidad,
    DEN_DIRECCION:  den_direccion, 
    DEN_REFERENCIA:  den_referencia, 
    DEN_FECHA_PROBABLE_INSPECCION:  den_fecha_probable_inspeccion, 
    DEN_DENUNCIANTES: den_denunciantes, 
    DEN_COLINDANTES: den_colindantes
  }

  const query = `
    SET @DEN_ID = ?;
    SET @DEN_ID_CUSTOM = ?;
    SET @DEN_FECHA_RECEPCION = ?;
    SET @USU_CUENTA = ?; 
    SET @USU_MICRORED = ?;
    SET @DEN_MEDIO = ?;
    SET @DEN_TIPO = ?;
    SET @DEN_AGENTE_NOMBRE = ?; 
    SET @DEN_INSECTO = ?;
    SET @DEN_INSECTO_OTRO = ?;
    SET @DEN_HABITANTE_NOMBRE = ?;
    SET @DEN_HABITANTE_TELEFONO1 = ?;
    SET @DEN_OTRO_TELEFONO = ?;
    SET @DEN_HABITANTE_TELEFONO2 = ?;
    SET @DEN_PROVINCIA = ?;
    SET @DEN_DISTRITO = ?;
    SET @DEN_LOCALIDAD = ?;
    SET @DEN_DIRECCION = ?;
    SET @DEN_REFERENCIA = ?;
    SET @DEN_FECHA_PROBABLE_INSPECCION = ?;
    SET @DEN_DENUNCIANTES = ?;
    SET @DEN_COLINDANTES = ?;
    CALL denunciationAddOrEdit(@DEN_ID, @DEN_ID_CUSTOM, @DEN_FECHA_RECEPCION, @USU_CUENTA, @USU_MICRORED,
          @DEN_MEDIO, @DEN_TIPO, @DEN_AGENTE_NOMBRE, @DEN_INSECTO, @DEN_INSECTO_OTRO, @DEN_HABITANTE_NOMBRE, 
          @DEN_HABITANTE_TELEFONO1, @DEN_OTRO_TELEFONO, @DEN_HABITANTE_TELEFONO2, @DEN_PROVINCIA, @DEN_DISTRITO, @DEN_LOCALIDAD, 
          @DEN_DIRECCION, @DEN_REFERENCIA, @DEN_FECHA_PROBABLE_INSPECCION, @DEN_DENUNCIANTES, @DEN_COLINDANTES);
  `;

  	try {
	  await mysqlConnection.query(query, [den_id, den_id_custom, den_fecha_recepcion, usu_cuenta, usu_microred, den_medio,
	        den_tipo, den_agente_nombre, den_insecto, den_insecto_otro, den_habitante_nombre,
	        den_habitante_telefono1, den_otro_telefono, den_habitante_telefono2, den_provincia, den_distrito,
	        den_localidad, den_direccion, den_referencia, den_fecha_probable_inspeccion, 
	        den_denunciantes, den_colindantes], (err, rows, fields) => {
        	    res.json(newData);
        	});

	} catch {
		console.log(error+' Hubo un error al consultar INSERTAR datos de la tabla INSPECCIONES');
        res.status(400).send('Hubo un error al consultar INSERTAR datos de la tabla INSPECCIONES');
	}
} 
