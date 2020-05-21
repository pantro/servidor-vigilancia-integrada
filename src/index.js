const express = require('express');
const cors = require('cors');

//Crear servidor
const app = express();

//Habilitar cors
app.use(cors());

// Middlewares
app.use(express.json());

// Settings
app.set('port', process.env.PORT || 3000);

// Routes
app.use('/api/denuncias', require('./routes/denunciations'));
app.use('/api/inspecciones', require('./routes/inspections'));
app.use('/api/acceder', require('./routes/authentication'));

// Starting the server
app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(`Server on port ${app.get('port')}`);
});
