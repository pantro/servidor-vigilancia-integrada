const express = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mysqlConnection  = require('../config/database.js');

//Obtener todas las inspecciones
/*exports.LoginAuthentication = async (req, res) => {
	try {
		await mysqlConnection.query('SELECT * FROM INSPECCIONES', (err, rows, fields) => {
		    if(!err) {
		      res.json(rows);
		    } else {
		      console.log(err);
		    }
  		});
	} catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
*/
//Iniciar sesion
exports.LoginAuthentication = async (req, res) => {
    //Extraer el email y password
    const { username, password } = req.body;

    try {
        //Revisar que sea un asuario registrado
        await mysqlConnection.query('SELECT * FROM USUARIOS WHERE USU_CUENTA = ?', [username], (err, rows, fields) => {
            if(!err) {
                //res.json(rows);
                const usuario = rows;

                if (usuario.length === 0) {
                  console.log("usuario no existe")
                  return res.status(400).json({msg: 'El usuario no existe'});
                }

                //Revisar password
                //const passCorrecto = await bcryptjs.compare(password, usuario.password);
                const passCorrecto = ( usuario[0].USU_CONTRASENIA === password)
                if (!passCorrecto) {
                  return res.status(400).json({msg: 'Password Incorrecto'});
                }

                //Si todod es correcto crear y firmar JWT
                const payload = {
                    usuario: {
                        id: usuario[0].USU_ID
                    }
                };
                //Firmar
                jwt.sign(payload, process.env.SECRETA,{
                    expiresIn: 3600 //1 horas
                }, (error, token)=>{
                    if(error) throw error;

                    //Mensaje de confirmacion
                    console.log("creacion de token correcto");
                    res.json({token});
                });
                

            } else {
              console.log(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
} 
