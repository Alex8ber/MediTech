// Express sesiones y el Path
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');


app.use(cookieParser());

//encriptador de contraseñas
const bcryptjs = require('bcryptjs') ;

//config del entorno
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,'./env/.env')});

//aca es para poder sacar valores del formulario
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// motor de plantillas
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Rutas
const routeindex = require('./rutas/ruta.index');
const routelogin = require('./rutas/ruta.login');
const routeRegister = require('./rutas/ruta.register');
const routeAgenda = require('./rutas/ruta.agenda');
const routePacientes = require('./rutas/ruta.pacientes');
const routeHome = require('./rutas/ruta.home');
const routePersonal = require('./rutas/ruta.personal');
const routeHistorialMedico = require('./rutas/ruta.historialmedico');

app.use ('/', routeHome);
app.use ('/', routelogin);
app.use ('/', routeindex);
app.use ('/', routeRegister);
app.use ('/', routeAgenda);
app.use ('/', routePacientes);
app.use ('/', routePersonal);
app.use ('/', routeHistorialMedico);

// archivos estaticos
app.use(express.static(path.join(__dirname,'../public')));

//servidor
app.listen(process.env.PORT, () => {
    console.log('servidor en espera')
    console.log('http://localhost:'+process.env.PORT)
  });