const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../config/database.js');

//Obtener todas las inspecciones
exports.GetInspections = async (req, res) => {
    //Obteniendo solo visitas desde cutoff
    const reduceDays = (24*60*60*1000) * 365;
    const currentDate = new Date();
    const cutoff = DateFull(new Date(currentDate -  reduceDays));
    console.log("cutoff: "+cutoff);
    //const arreglo = ["1.23.8", "1.18.25"];

    try {
		//await mysqlConnection.query('SELECT * FROM INSPECCIONES WHERE FECHA >= (?) && CODE_LOCALITY IN (?)', [fecha], (err, rows, fields) => {
		await mysqlConnection.query('SELECT UNICODE, FECHA, STATUS_INSPECCION, INTRA_CHIRIS, PERI_CHIRIS FROM INSPECCIONES WHERE FECHA >= (?)', [cutoff], (err, rows, fields) => {
            res.json(rows);
  		});
	} catch (error) {
        console.log(error+' Hubo un error al consultar OBTENER datos de la tabla INSPECCIONES');
        res.status(400).send('Hubo un error al consultar OBTENER datos de la tabla INSPECCIONES');
    }
}

//Insertar inspeccion
exports.InsertInspection = async (req, res) => {

  const { 
  	user_name,
    den_id_custom,
    insp_den_colin,
    unicode,
    code_locality,
    obs_unicode,
    obs_text,
    fecha,
    caract_predio,
    tipo_lp,
    status_inspeccion,
    entrevista,
    motivo_volver,
    fecha_volver,
    renuente,
    intra_inspeccion,
    intra_chiris,
    intra_rastros,
    peri_inspeccion,
    peri_chiris,
    peri_rastros,
    personas_predio,
    cant_perros,
    cant_gatos,
    cant_aves_corral,
    cant_cuyes,
    cant_conejos,
    text_otros,
    cant_otros,
    hora_inicio,
    hora_fin
  } = req.body;
  console.log(req.body);
  const newData = {
    UNICODE:unicode,
    FECHA:fecha,
    STATUS_INSPECCION:status_inspeccion,
    INTRA_CHIRIS:intra_chiris,
    PERI_CHIRIS:peri_chiris
  }

  const query = `
    SET @USER_NAME = ?;
    SET @DEN_ID_CUSTOM = ?;
    SET @INSP_DEN_COLIN = ?;
    SET @UNICODE = ?;
    SET @CODE_LOCALITY = ?;
    SET @OBS_UNICODE = ?;
    SET @OBS_TEXT = ?;
    SET @FECHA = ?;
    SET @CARACT_PREDIO = ?;
    SET @TIPO_LP = ?;
    SET @STATUS_INSPECCION = ?;
    SET @ENTREVISTA = ?;
    SET @MOTIVO_VOLVER = ?;
    SET @FECHA_VOLVER = ?;
    SET @RENUENTE = ?;
    SET @INTRA_INSPECCION = ?;
    SET @INTRA_CHIRIS = ?;
    SET @INTRA_RASTROS = ?;
    SET @PERI_INSPECCION = ?;
    SET @PERI_CHIRIS = ?;
    SET @PERI_RASTROS = ?;
    SET @PERSONAS_PREDIO = ?;
    SET @CANT_PERROS = ?;
    SET @CANT_GATOS = ?;
    SET @CANT_AVES_CORRAL = ?;
    SET @CANT_CUYES = ?;
    SET @CANT_CONEJOS = ?;
    SET @TEXT_OTROS = ?;
    SET @CANT_OTROS = ?;
    SET @HORA_INICIO = ?;
    SET @HORA_FIN = ?;
    CALL inspectionAdd(@USER_NAME, @DEN_ID_CUSTOM, @INSP_DEN_COLIN, @UNICODE, @CODE_LOCALITY, @OBS_UNICODE, @OBS_TEXT, 
                       @FECHA, @CARACT_PREDIO, @TIPO_LP, @STATUS_INSPECCION, @ENTREVISTA, @MOTIVO_VOLVER, 
                       @FECHA_VOLVER, @RENUENTE, @INTRA_INSPECCION, @INTRA_CHIRIS, @INTRA_RASTROS, @PERI_INSPECCION,
                       @PERI_CHIRIS, @PERI_RASTROS, @PERSONAS_PREDIO, @CANT_PERROS, @CANT_GATOS, @CANT_AVES_CORRAL,
                       @CANT_CUYES, @CANT_CONEJOS, @TEXT_OTROS, @CANT_OTROS, @HORA_INICIO, @HORA_FIN);
  `;

  	try {
	  await mysqlConnection.query(query, [user_name, den_id_custom, insp_den_colin, unicode, code_locality, obs_unicode,
                        obs_text, fecha, caract_predio, tipo_lp, status_inspeccion, entrevista, motivo_volver,
                        fecha_volver, renuente, intra_inspeccion, intra_chiris, intra_rastros, peri_inspeccion,
                        peri_chiris, peri_rastros, personas_predio, cant_perros, cant_gatos, cant_aves_corral,
                        cant_cuyes, cant_conejos, text_otros, cant_otros, hora_inicio, hora_fin], (err, rows, fields) => {
        	    res.json(newData);
        	});

	} catch {
		console.log(error+' Hubo un error al consultar INSERTAR datos de la tabla INSPECCIONES');
        res.status(400).send('Hubo un error al consultar INSERTAR datos de la tabla INSPECCIONES');
	}
} 

//Funcion para obtener la fecha en el formato yyyy-mm-dd
const DateFull = ( date ) => {
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(month < 10){
        month = "0"+ month;
    }
    if ( day < 10) {
        day = "0"+day;
    }
    return(`${year}-${month}-${day}`);
}