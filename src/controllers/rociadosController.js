const express = require('express');

//llamando a la conexion MySQL
const mysqlConection = require('../config/database.js');

// Obtener todos los rociados
exports.GetRociados = async (req, res) => {
    //En la parte de inspecciones gian le esta poniendo una fecha
    //No se el porque pero por ahora no voy a considerarlo

    try {
        await mysqlConection.query('SELECT UNICODE, USU_MICRORED, ROC_FECHA, ROC_TRATAMIENTO_RESIDUAL, ROC_DESHABITADA_ROCIADA FROM ROCIADOS', (err, rows, fields) => {
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
        UNICODE:roc_unicode,
        USU_MICRORED: usu_microred,
        ROC_FECHA:roc_fecha,
        ROC_TRATAMIENTO_RESIDUAL: roc_tratamiento_residual,
        ROC_DESHABITADA_ROCIADA: roc_deshabitada_rociada
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