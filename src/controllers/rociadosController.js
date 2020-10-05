const express = require('express');

//llamando a la conexion MySQL
const mysqlConection = require('../config/database.js');

// Obtener todos los rociados
exports.GetRociados = async (req, res) => {
    //Obtener los rociados desde cutoff
    const reduceDays = (24*60*60*1000) * 365;
    const currentDate = new Date();
    const cutoff = DateFull(new Date(currentDate -  reduceDays));
    console.log("cutoff: "+cutoff);

    try {
        await mysqlConection.query('SELECT USU_CUENTA, USU_MICRORED, UNICODE, ROC_FECHA, ROC_TRATAMIENTO_RESIDUAL, ROC_DESHABITADA_ROCIADA, ROC_NOMBRE_ROCIADOR, ROC_NOMBRE_INSECTICIDA, ROC_JEFE_FAMILIA, ROC_CANT_PERSONAS, ROC_INTRA_CANT_AMBIENTES, ROC_INTRA_AMBIENTES_CERRADOS, ROC_INTRA_MATERIAL_PREDOMINANTE, ROC_INTRA_GRIETAS, ROC_INTRA_CANT_CAPTURADOS, ROC_PERI_CANT_AMBIENTES, ROC_PERI_MATERIAL_PREDOMINANTE, ROC_PERI_GRIETAS, ROC_PERI_CANT_CAPTURADOS, ROC_TECHO_CANT_PERROS, ROC_TECHO_CANT_GATOS, ROC_TECHO_CANT_AVES_CORRAL, ROC_TECHO_CANT_CUYES, ROC_TECHO_CANT_CONEJOS, ROC_TECHO_TEXT_OTROS, ROC_TECHO_CANT_OTROS, ROC_PATIO_CANT_PERROS, ROC_PATIO_CANT_GATOS, ROC_PATIO_CANT_AVES_CORRAL, ROC_PATIO_CANT_CUYES, ROC_PATIO_CANT_CONEJOS, ROC_PATIO_TEXT_OTROS, ROC_PATIO_CANT_OTROS, ROC_CANT_INSECTICIDA, ROC_SUPERFICIE_TRATADA, ROC_OBSERVACIONES FROM ROCIADOS WHERE ROC_FECHA >= (?)', [cutoff], (err, rows, fields) => {
            res.json(rows);
        });
    }catch (error) {
        console.log(error+ 'Hubo un error al obtener datos de la tabla ROCIADOS');
        res.status(400).send('Hubo un error al obtener datos de la tabla ROCIADOS');
    }
}

//Insertar rociado
exports.InsertRociado = async (req, res) => {

    console.log("LLEGO HASTA EL CONTROLLER DE ROCIADOS");
    console.log(req.body);

    const {
        usu_cuenta,
        usu_microred,
        roc_unicode,
        roc_fecha,
        roc_tratamiento_residual,
        roc_deshabitada_rociada,
        roc_nombre_rociador,
        roc_nombre_insecticida,
        roc_jefe_familia,
        roc_cant_personas,
        roc_intra_cant_ambientes,
        roc_intra_ambientes_cerrados,
        roc_intra_material_predominante,
        roc_intra_grietas,
        roc_intra_cant_capturados,
        roc_peri_cant_ambientes,
        roc_peri_material_predominante,
        roc_peri_grietas,
        roc_peri_cant_capturados,
        roc_techo_cant_perros,
        roc_techo_cant_gatos,
        roc_techo_cant_aves_corral,
        roc_techo_cant_cuyes,
        roc_techo_cant_conejos,
        roc_techo_text_otros,
        roc_techo_cant_otros,
        roc_patio_cant_perros,
        roc_patio_cant_gatos,
        roc_patio_cant_aves_corral,
        roc_patio_cant_cuyes,
        roc_patio_cant_conejos,
        roc_patio_text_otros,
        roc_patio_cant_otros,
        roc_cant_insecticida,
        roc_superficie_tratada,
        roc_observaciones_text
    } = req.body;

    const respuesta = {
        USU_CUENTA: usu_cuenta,
        USU_MICRORED: usu_microred,
        UNICODE: roc_unicode,
        ROC_FECHA: roc_fecha,
        ROC_TRATAMIENTO_RESIDUAL: roc_tratamiento_residual,
        ROC_DESHABITADA_ROCIADA: roc_deshabitada_rociada,
        ROC_NOMBRE_ROCIADOR: roc_nombre_rociador,
        ROC_NOMBRE_INSECTICIDA: roc_nombre_insecticida,
        ROC_JEFE_FAMILIA: roc_jefe_familia,
        ROC_CANT_PERSONAS: roc_cant_personas,
        ROC_INTRA_CANT_AMBIENTES: roc_intra_cant_ambientes,
        ROC_INTRA_AMBIENTES_CERRADOS: roc_intra_ambientes_cerrados,
        ROC_INTRA_MATERIAL_PREDOMINANTE: roc_intra_material_predominante,
        ROC_INTRA_GRIETAS: roc_intra_grietas,
        ROC_INTRA_CANT_CAPTURADOS: roc_intra_cant_capturados,
        ROC_PERI_CANT_AMBIENTES: roc_peri_cant_ambientes,
        ROC_PERI_MATERIAL_PREDOMINANTE: roc_peri_material_predominante,
        ROC_PERI_GRIETAS: roc_peri_grietas,
        ROC_PERI_CANT_CAPTURADOS: roc_peri_cant_capturados,
        ROC_TECHO_CANT_PERROS: roc_techo_cant_perros,
        ROC_TECHO_CANT_GATOS: roc_techo_cant_gatos,
        ROC_TECHO_CANT_AVES_CORRAL: roc_techo_cant_aves_corral,
        ROC_TECHO_CANT_CUYES: roc_techo_cant_cuyes,
        ROC_TECHO_CANT_CONEJOS: roc_techo_cant_conejos,
        ROC_TECHO_TEXT_OTROS: roc_techo_text_otros,
        ROC_TECHO_CANT_OTROS: roc_techo_cant_otros,
        ROC_PATIO_CANT_PERROS: roc_patio_cant_perros,
        ROC_PATIO_CANT_GATOS: roc_patio_cant_gatos,
        ROC_PATIO_CANT_AVES_CORRAL: roc_patio_cant_aves_corral,
        ROC_PATIO_CANT_CUYES: roc_patio_cant_cuyes,
        ROC_PATIO_CANT_CONEJOS: roc_patio_cant_conejos,
        ROC_PATIO_TEXT_OTROS: roc_patio_text_otros,
        ROC_PATIO_CANT_OTROS: roc_patio_cant_otros,
        ROC_CANT_INSECTICIDA: roc_cant_insecticida,
        ROC_SUPERFICIE_TRATADA: roc_superficie_tratada,
        ROC_OBSERVACIONES: roc_observaciones_text
    }

    const query = `CALL RociadosAdd("${usu_cuenta}", "${usu_microred}", "${roc_unicode}", "${roc_fecha}", "${roc_tratamiento_residual}", 
                                    "${roc_deshabitada_rociada}", "${roc_nombre_rociador}", "${roc_nombre_insecticida}", 
                                    "${roc_jefe_familia}", "${roc_cant_personas}", "${roc_intra_cant_ambientes}", 
                                    "${roc_intra_ambientes_cerrados}", "${roc_intra_material_predominante}", "${roc_intra_grietas}", 
                                    "${roc_intra_cant_capturados}", "${roc_peri_cant_ambientes}", "${roc_peri_material_predominante}", 
                                    "${roc_peri_grietas}", "${roc_peri_cant_capturados}", "${roc_techo_cant_perros}", "${roc_techo_cant_gatos}",
                                    "${roc_techo_cant_aves_corral}", "${roc_techo_cant_cuyes}", "${roc_techo_cant_conejos}", "${roc_techo_text_otros}",
                                    "${roc_techo_cant_otros}", "${roc_patio_cant_perros}", "${roc_patio_cant_gatos}", "${roc_patio_cant_aves_corral}", 
                                    "${roc_patio_cant_cuyes}", "${roc_patio_cant_conejos}", "${roc_patio_text_otros}", "${roc_patio_cant_otros}", 
                                    "${roc_cant_insecticida}", "${roc_superficie_tratada}", "${roc_observaciones_text}");
                    `;

    try {

        console.log(query);
        await mysqlConection.query(query, (err, rows, fields) => {
            res.json(respuesta);
        });
        
    } catch (error) {
        console.log(error+' Hubo un error al INSERTAR datos en la tabla ROCIADOS');
        res.status(400).send('Hubo un error al INSERTAR datos en la tabla ROCIADOS');
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