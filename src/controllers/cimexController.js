const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../config/database.js');

//Insertar inspeccion
exports.InsertCimex = async (req, res) => {
  
  const { 
  	unicode,
    user_name,
    usu_microred,
    fecha,
    cimex_alguien_picado_casa_ultimo_anio,
    cimex_sabe_insecto_pico,
    cimex_conoce,
    cimex_en_su_vivienda,
    cimex_inspeccion_gratuita,
    cimex_fecha_tentativa_inspeccion,
    cimex_hora_tentativa_inspeccion,
  } = req.body;
  
  const newData = {
    UNICODE: unicode,
    USER_NAME: user_name,
    USU_MICRORED: usu_microred,
    FECHA: fecha,
    CIMEX_ALGUIEN_PICADO_CASA_ULTIMO_ANIO: cimex_alguien_picado_casa_ultimo_anio,
    CIMEX_SABE_INSECTO_PICO: cimex_sabe_insecto_pico,
    CIMEX_CONOCE: cimex_conoce,
    CIMEX_EN_SU_VIVIENDA: cimex_en_su_vivienda,
    CIMEX_INSPECCION_GRATUITA: cimex_inspeccion_gratuita,
    CIMEX_FECHA_TENTATIVA_INSPECCION: cimex_fecha_tentativa_inspeccion,
    CIMEX_HORA_TENTATIVA_INSPECCION: cimex_hora_tentativa_inspeccion,
  }
  
  const query = `
    INSERT INTO CIMEX_SENSIBILIZATION (UNICODE, USER_NAME, USU_MICRORED, FECHA, CIMEX_ALGUIEN_PICADO_CASA_ULTIMO_ANIO,
      CIMEX_SABE_INSECTO_PICO, CIMEX_CONOCE, CIMEX_EN_SU_VIVIENDA, CIMEX_INSPECCION_GRATUITA, CIMEX_FECHA_TENTATIVA_INSPECCION,
      CIMEX_HORA_TENTATIVA_INSPECCION)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  
  try {
	  await mysqlConnection.query(query, [unicode, user_name, usu_microred, fecha, cimex_alguien_picado_casa_ultimo_anio,
      cimex_sabe_insecto_pico, cimex_conoce, cimex_en_su_vivienda, cimex_inspeccion_gratuita, cimex_fecha_tentativa_inspeccion,
      cimex_hora_tentativa_inspeccion], (err, rows, fields) => {
        res.json(newData);
      });

	} catch {
		console.log(error+' Hubo un error al consultar INSERTAR datos de la tabla CIMEX_SENSIBILIZATION');
        res.status(400).send('Hubo un error al consultar INSERTAR datos de la tabla CIMEX_SENSIBILIZATION');
	}
} 