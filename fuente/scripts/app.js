// Express sesiones y el Path
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');

//encriptador de contraseñas
const bcryptjs = require('bcryptjs') ;

//config del entorno
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,'./env/.env')});

//aca es para poder sacar valores del formulario
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
  secret:'admin',
  resave: true,
  saveUninitialized: true
}))
// motor de plantillas
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Rutas
const routeindex = require('./rutas/ruta.index');
const routelogin = require('./rutas/ruta.login');
const routeRegister = require('./rutas/ruta.register');
const routeCitas = require('./rutas/ruta.citas');
const routePaciente = require('./rutas/ruta.paciente');

app.use ('/', routelogin);
app.use ('/', routeindex);
app.use ('/', routeRegister);
app.use ('/citas', routeCitas);
app.use ('/pacientes', routePaciente);

// archivos estaticos
app.use(express.static(path.join(__dirname,'../public')));

//servidor
app.listen(process.env.PORT, () => {
    console.log('servidor en espera')
    console.log('http://localhost:'+process.env.PORT)
  });