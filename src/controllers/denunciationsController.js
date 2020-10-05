const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../config/database.js');

//Obtener denuncias por microred
exports.GetDenunciationsMicrored = async (req, res) => {
  const { USU_MICRORED } = req.params;
  
  try {
    await mysqlConnection.query('SELECT * FROM DENUNCIAS WHERE USU_MICRORED = ?', [USU_MICRORED], (err, rows, fields) => {
        if(!err) {
          res.json(rows);
        } else {
          console.log("Error al realizar la consulta en denuncias mysql: "+err);
          res.status(400).send('Hubo un error al realizar la consulta mysql a la tabla DENUNCIAS');
        }
      });
  } catch (error) {
      console.log(error+' Hubo un error al consultar OBTENER datos de la tabla DENUNCIAS');
      res.status(400).send('Hubo un error al consultar OBTENER datos de la tabla DENUNCIAS');
  }  
}

//Obtener todas las denuncias
exports.GetDenunciations = async (req, res) => {
	try {
		await mysqlConnection.query('SELECT * FROM DENUNCIAS', (err, rows, fields) => {
		    if(!err) {
		      res.json(rows);
		    } else {
		      console.log(err);
		    }
  		});
	} catch (error) {
      console.log(error+' Hubo un error al consultar OBTENER datos de la tabla DENUNCIAS');
      res.status(400).send('Hubo un error al consultar OBTENER datos de la tabla DENUNCIAS');
  }
}

//Insertar denuncia
exports.InsertDenunciation = async (req, res) => {
	
  const { 
  	den_id, den_id_custom, usu_cuenta, usu_microred, den_fecha_recepcion, den_medio,
    den_tipo, den_agente_nombre, den_insecto, den_insecto_otro, den_insecto_otro2, den_habitante_nombre,
    den_habitante_telefono1, den_otro_telefono, den_habitante_telefono2, den_provincia, den_distrito,
    den_localidad, den_direccion, den_referencia, den_fecha_probable_inspeccion, 
    den_unicode, den_cant_colindantes, den_estado
  } = req.body;
  var result = {};

  const query = `
    SET @DEN_ID = ?;
    SET @DEN_ID_CUSTOM = ?;
    SET @USU_CUENTA = ?;
    SET @USU_MICRORED = ?;
    SET @DEN_FECHA_RECEPCION = ?;
    SET @DEN_MEDIO = ?;
    SET @DEN_TIPO = ?;
    SET @DEN_AGENTE_NOMBRE = ?; 
    SET @DEN_INSECTO = ?;
    SET @DEN_INSECTO_OTRO = ?;
    SET @DEN_INSECTO_OTRO2 = ?;
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
    SET @DEN_UNICODE = ?;
    SET @DEN_CANT_COLINDANTES = ?;
    SET @DEN_ESTADO = ?;
    CALL denunciationAddOrEdit(@DEN_ID, @DEN_ID_CUSTOM, @USU_CUENTA, @USU_MICRORED, @DEN_FECHA_RECEPCION,
          @DEN_MEDIO, @DEN_TIPO, @DEN_AGENTE_NOMBRE, @DEN_INSECTO, @DEN_INSECTO_OTRO, @DEN_INSECTO_OTRO2, @DEN_HABITANTE_NOMBRE, 
          @DEN_HABITANTE_TELEFONO1, @DEN_OTRO_TELEFONO, @DEN_HABITANTE_TELEFONO2, @DEN_PROVINCIA, @DEN_DISTRITO, 
          @DEN_LOCALIDAD, @DEN_DIRECCION, @DEN_REFERENCIA, @DEN_FECHA_PROBABLE_INSPECCION,
          @DEN_UNICODE, @DEN_CANT_COLINDANTES, @DEN_ESTADO);
  `;

  	try {
	  await mysqlConnection.query(query, [den_id, den_id_custom, usu_cuenta, usu_microred, den_fecha_recepcion, 
          den_medio, den_tipo, den_agente_nombre, den_insecto, den_insecto_otro, den_insecto_otro2, den_habitante_nombre,
	        den_habitante_telefono1, den_otro_telefono, den_habitante_telefono2, den_provincia, den_distrito,
	        den_localidad, den_direccion, den_referencia, den_fecha_probable_inspeccion,
          den_unicode, den_cant_colindantes, den_estado], (err, rows, fields) => {
	    if(!err) {
        result.option ='successful';
	    } else {
        result.option ='error';
        result.msg ="Error posible en mysql"
	      console.log("Error:"+err);
	    }
      res.json(result);
	  });
	} catch {
		console.log(error+' Hubo un error al consultar INSERTAR datos de la tabla DENUNCIAS');
        res.status(400).send('Hubo un error al consultar INSERTAR datos de la tabla DENUNCIAS');
	}
} 

//Actualizar denuncias
exports.EditDenunciation = async (req, res) => {
  
  const { 
    den_id, den_id_custom, usu_cuenta, usu_microred, den_fecha_recepcion, den_medio,
    den_tipo, den_agente_nombre, den_insecto, den_insecto_otro, den_insecto_otro2, den_habitante_nombre,
    den_habitante_telefono1, den_otro_telefono, den_habitante_telefono2, den_provincia, den_distrito,
    den_localidad, den_direccion, den_referencia, den_fecha_probable_inspeccion,
    den_unicode, den_cant_colindantes, den_estado
  } = req.body;
  
  const { DEN_ID } = req.params;
  
  const newData = {
    DEN_ID_CUSTOM: den_id_custom, 
    USU_CUENTA: usu_cuenta,
    USU_MICRORED: usu_microred,
    DEN_FECHA_RECEPCION: den_fecha_recepcion, 
    DEN_MEDIO:  den_medio,
    DEN_TIPO: den_tipo, 
    DEN_AGENTE_NOMBRE: den_agente_nombre,
    DEN_INSECTO: den_insecto, 
    DEN_INSECTO_OTRO:  den_insecto_otro,
    DEN_INSECTO_OTRO2:  den_insecto_otro2,
    DEN_HABITANTE_NOMBRE:  den_habitante_nombre,
    DEN_HABITANTE_TELEFONO1: den_habitante_telefono1,
    DEN_OTRO_TELEFONO: den_otro_telefono,
    DEN_HABITANTE_TELEFONO2:  den_habitante_telefono2, 
    DEN_PROVINCIA:  den_provincia, 
    DEN_DISTRITO: den_distrito,
    DEN_LOCALIDAD: den_localidad,
    DEN_DIRECCION:  den_direccion, 
    DEN_REFERENCIA:  den_referencia, 
    DEN_FECHA_PROBABLE_INSPECCION:  den_fecha_probable_inspeccion
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
    SET @DEN_INSECTO_OTRO2 = ?;
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
    SET @DEN_UNICODE = ?;
    SET @DEN_CANT_COLINDANTES = ?;
    SET @DEN_ESTADO = ?;
    CALL denunciationAddOrEdit(@DEN_ID, @DEN_ID_CUSTOM, @DEN_FECHA_RECEPCION, @USU_CUENTA, @USU_MICRORED,
          @DEN_MEDIO, @DEN_TIPO, @DEN_AGENTE_NOMBRE, @DEN_INSECTO, @DEN_INSECTO_OTRO, @DEN_INSECTO_OTRO2, @DEN_HABITANTE_NOMBRE, 
          @DEN_HABITANTE_TELEFONO1, @DEN_OTRO_TELEFONO, @DEN_HABITANTE_TELEFONO2, @DEN_PROVINCIA, @DEN_DISTRITO, @DEN_LOCALIDAD, 
          @DEN_DIRECCION, @DEN_REFERENCIA, @DEN_FECHA_PROBABLE_INSPECCION,
          @DEN_UNICODE, @DEN_CANT_COLINDANTES, @DEN_ESTADO);
  `;

  try {
	  await mysqlConnection.query(query, [den_id, den_id_custom, usu_cuenta, usu_microred, den_fecha_recepcion, den_medio,
          den_tipo, den_agente_nombre, den_insecto, den_insecto_otro, den_insecto_otro2, den_habitante_nombre,
          den_habitante_telefono1, den_otro_telefono, den_habitante_telefono2, den_provincia, den_distrito,
          den_localidad, den_direccion, den_referencia, den_fecha_probable_inspeccion,
          den_unicode, den_cant_colindantes, den_estado], (err, rows, fields) => {
	    if(!err) {
	      res.json(newData);
	    } else {
	      console.log(err);
	    }
	  });
  } catch {
	  console.log(error+' Hubo un error al consultar ACTUALIZAR datos de la tabla DENUNCIAS');
    res.status(400).send('Hubo un error al consultar ACTUALIZAR datos de la tabla DENUNCIAS');
  }
}