const express = require('express');
const cors = require('cors');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

//Habilitar cors
app.use(cors());

// Middlewares
app.use(express.json());

// Routes
app.use(require('./routes/denunciations'));
app.use(require('./routes/inspections'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
